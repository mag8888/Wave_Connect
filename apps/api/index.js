import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

dotenv.config();

const prisma = new PrismaClient();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'wave-match-api' });
});

// User initialization (Login/Signup)
app.post('/api/users/init', async (req, res) => {
    try {
        const { user: tgUser, startParam } = req.body;

        if (!tgUser || !tgUser.id) {
            return res.status(400).json({ error: 'Missing user data' });
        }

        const telegramId = BigInt(tgUser.id);

        let user = await prisma.user.findUnique({
            where: { telegramId },
            include: { profile: true }
        });

        if (!user) {
            // New user registration
            let referredBy = null;

            // Check if there is a referral in startParam like 'ref_123456789'
            if (startParam && startParam.startsWith('ref_')) {
                const referrerIdStr = startParam.replace('ref_', '');
                try {
                    const referrerId = BigInt(referrerIdStr);
                    // verify referrer exists
                    const referrer = await prisma.user.findUnique({
                        where: { telegramId: referrerId }
                    });

                    if (referrer) {
                        referredBy = referrer.telegramId.toString();

                        // Give the referrer 10 matches
                        await prisma.user.update({
                            where: { telegramId: referrer.telegramId },
                            data: { matchCredits: { increment: 10 } }
                        });
                    }
                } catch (e) {
                    console.error('Invalid referrer ID:', referrerIdStr);
                }
            }

            user = await prisma.user.create({
                data: {
                    telegramId,
                    firstName: tgUser.first_name || 'Guest',
                    lastName: tgUser.last_name || null,
                    username: tgUser.username || null,
                    photoUrl: tgUser.photo_url || null,
                    referredBy: referredBy,
                    matchCredits: 10 // Starting credits
                },
                include: { profile: true }
            });
        } else {
            // Update existing user info if needed
            user = await prisma.user.update({
                where: { telegramId },
                data: {
                    firstName: tgUser.first_name || user.firstName,
                    lastName: tgUser.last_name || user.lastName,
                    username: tgUser.username || user.username,
                    photoUrl: tgUser.photo_url || user.photoUrl
                },
                include: { profile: true }
            });
        }

        // Convert BigInt to string before sending JSON
        const userData = {
            ...user,
            telegramId: user.telegramId.toString()
        };

        res.json({ success: true, user: userData });
    } catch (error) {
        console.error('Error during user init:', error);
        res.status(500).json({ error: 'Failed to initialize user' });
    }
});

// User onboarding
app.post('/api/users/onboard', async (req, res) => {
    try {
        const { telegramId, role, goal1Year } = req.body;

        const user = await prisma.user.findUnique({
            where: { telegramId: BigInt(telegramId) }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const profile = await prisma.profile.upsert({
            where: { userId: user.id },
            update: { role, goal1Year, completion: 20 },
            create: {
                userId: user.id,
                role,
                goal1Year,
                completion: 20
            }
        });

        res.json({ success: true, profile });
    } catch (error) {
        console.error('Error during onboarding:', error);
        res.status(500).json({ error: 'Failed to save onboarding data' });
    }
});

// Get full Profile
app.get('/api/profile/:telegramId', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { telegramId: BigInt(req.params.telegramId) },
            include: { profile: true }
        });

        if (!user || !user.profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json({ profile: user.profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Update Profile
app.post('/api/profile', async (req, res) => {
    try {
        const { telegramId, ...profileData } = req.body;

        const user = await prisma.user.findUnique({
            where: { telegramId: BigInt(telegramId) }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate a mock completion percentage based on keys present
        const fields = ['role', 'turnover', 'industry', 'experience', 'location', 'company', 'helpOffer', 'goal1Year', 'goal5Year', 'mission'];
        const filled = fields.filter(f => profileData[f] && profileData[f].trim() !== '').length;
        const completion = Math.min(100, Math.round((filled / fields.length) * 100));

        const profile = await prisma.profile.upsert({
            where: { userId: user.id },
            update: { ...profileData, completion },
            create: { userId: user.id, ...profileData, completion }
        });

        res.json({ success: true, profile });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Get Referral Stats
app.get('/api/users/:telegramId/referrals', async (req, res) => {
    try {
        const telegramId = BigInt(req.params.telegramId);

        const user = await prisma.user.findUnique({
            where: { telegramId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const invitedCount = await prisma.user.count({
            where: { referredBy: telegramId.toString() }
        });

        res.json({
            invited: invitedCount,
            earned: user.matchCredits
        });
    } catch (error) {
        console.error('Error getting referral stats:', error);
        res.status(500).json({ error: 'Failed to load referral stats' });
    }
});

app.get('/api/matches/:telegramId', async (req, res) => {
    try {
        const telegramId = BigInt(req.params.telegramId);

        const currentUser = await prisma.user.findUnique({
            where: { telegramId },
            include: { profile: true }
        });

        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch up to 20 other users who have a profile
        const rawUsers = await prisma.user.findMany({
            where: {
                telegramId: { not: telegramId },
                profile: { isNot: null }
            },
            include: { profile: true },
            take: 20,
            orderBy: { createdAt: 'desc' }
        });

        // Calculate match percentage and format response
        const matches = rawUsers.map(u => {
            let matchPercent = Math.floor(Math.random() * (99 - 60 + 1)) + 60; // Base random 60-99%

            // Simple boosting logic based on shared data
            if (currentUser.profile && u.profile) {
                if (currentUser.profile.role === u.profile.role) matchPercent += 5;
                if (currentUser.profile.goal1Year === u.profile.goal1Year) matchPercent += 10;

                // Compare tags/hobbies (rough intersection)
                const cTags = currentUser.profile.tags || [];
                const uTags = u.profile.tags || [];
                const sharedTags = cTags.filter(t => uTags.includes(t));
                matchPercent += (sharedTags.length * 5);

                matchPercent = Math.min(99, matchPercent); // Cap at 99%
            }

            return {
                id: u.telegramId.toString(),
                firstName: u.firstName,
                lastName: u.lastName,
                photoUrl: u.photoUrl,
                matchPercent,
                profile: u.profile
            };
        });

        // Sort by match percentage descending
        matches.sort((a, b) => b.matchPercent - a.matchPercent);

        res.json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

app.post('/api/matches/analyze', async (req, res) => {
    try {
        const { myId, theirId } = req.body;

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: 'OpenAI API key not configured' });
        }

        const me = await prisma.user.findUnique({
            where: { telegramId: BigInt(myId) },
            include: { profile: true }
        });
        const them = await prisma.user.findUnique({
            where: { telegramId: BigInt(theirId) },
            include: { profile: true }
        });

        if (!me || !them || !me.profile || !them.profile) {
            return res.status(404).json({ error: 'Profiles not found' });
        }

        const prompt = `Пользователь 1: Роль - ${me.profile.role}, Индустрия - ${me.profile.industry}, Цель - ${me.profile.goal1Year}, Хобби - ${me.profile.hobbies?.join(', ')}, Опыт - ${me.profile.experience}, Чем может помочь - ${me.profile.helpOffer}.
Пользователь 2: Имя - ${them.firstName}, Роль - ${them.profile.role}, Индустрия - ${them.profile.industry}, Цель - ${them.profile.goal1Year}, Хобби - ${them.profile.hobbies?.join(', ')}, Опыт - ${them.profile.experience}, Чем может помочь - ${them.profile.helpOffer}.
Напиши короткий текст (питч) для Пользователя 1 о Пользователе 2, объясняющий почему им стоит познакомиться. 
Текст должен быть СТРОГО в таком формате:

Вы с ${them.firstName || 'этим пользователем'} можете быть интересны друг другу, потому что:
1. [первая причина на основе их общих индустрий, целей или опыта]
2. [вторая причина, как они могут дополнить друг друга]
3. [третья причина на основе хобби или личных качеств]

Если вам интересно встретиться, я напишу о вас этому пользователю.

Не добавляй никаких приветствий или других слов, только этот шаблон.`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 400,
        });

        const analysis = response.choices[0].message.content.trim();
        res.json({ analysis });

    } catch (error) {
        console.error('Error analyzing match:', error);
        res.status(500).json({ error: 'Failed to analyze match' });
    }
});

app.listen(port, () => {
    console.log(`API Service listening at http://localhost:${port}`);
});
