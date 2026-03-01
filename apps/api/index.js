import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

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
            where: { telegramId }
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
                }
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
                }
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

app.get('/api/matches', (req, res) => {
    // Placeholder response
    res.json([
        { id: 1, name: 'David S.', role: 'Investor', matchPercent: 96 }
    ]);
});

app.listen(port, () => {
    console.log(`API Service listening at http://localhost:${port}`);
});
