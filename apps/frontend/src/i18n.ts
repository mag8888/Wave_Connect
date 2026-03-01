import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { tg } from './lib/twa';

const aiPromptEn = `Act as an elite business profiler. I will provide you with a bio or social media links. Extract the information into exactly this JSON format:
{
  "turnover": "$1M - $5M",
  "industry": "SaaS / Fintech",
  "experience": "8 years",
  "helpOffer": "I can share expertise in scaling B2B SaaS...",
  "goal1Year": "Close Seed round and expand",
  "goal5Year": "Reach $100M valuation",
  "mission": "Democratize access to tier-1 business networking",
  "tags": ["Investments", "Scaling", "IT"]
}
If any data is missing from the bio, guess intelligently based on context or return "Not specified". Return ONLY raw JSON without markdown.`;

const aiPromptRu = `Действуй как элитный бизнес-профайлер. Я предоставлю тебе биографию или ссылки на соцсети. Извлеки информацию строго в этом формате JSON:
{
  "turnover": "1M - 5M $",
  "industry": "SaaS / Финтех",
  "experience": "8 лет",
  "helpOffer": "Могу поделиться опытом в масштабировании...",
  "goal1Year": "Закрыть Seed раунд",
  "goal5Year": "Достигнуть оценки $100M",
  "mission": "Демократизировать доступ к премиум нетворкингу",
  "tags": ["Инвестиции", "Масштабирование", "IT"]
}
Если каких-то данных нет, догадайся логично из контекста или напиши "Не указано". Верни ТОЛЬКО сырой JSON без markdown.`;

// Define resources for English and Russian
const resources = {
    en: {
        translation: {
            "onboarding": {
                "welcome": "Welcome",
                "complete_profile": "Complete Profile",
                "select_role": "Select your role",
                "role_entrepreneur": "Entrepreneur",
                "role_investor": "Investor",
                "role_expert": "Expert",
                "role_creator": "Creator",
                "select_goal": "What's your primary goal?",
                "goal_networking": "Networking & Partnerships",
                "goal_investment": "Finding Investment",
                "goal_mentorship": "Mentorship",
                "goal_hiring": "Hiring Top Talent",
                "finish": "Finish & Start Matching"
            },
            "nav": {
                "main": "Main",
                "match": "Match",
                "events": "Events",
                "chat": "Chat",
                "profile": "Profile"
            },
            "home": {
                "greeting": "Good evening",
                "subtitle": "Here are the top leaders for you today",
                "top_leaders": "Top Leaders",
                "see_all": "See all",
                "view_profile": "View Profile",
                "match": "MATCH",
                "upcoming_tables": "Upcoming Tables",
                "seats_left": "seats left",
                "joined": "joined",
                "join": "Join",
                "masterminds": "Masterminds",
                "promoted": "PROMOTED",
                "book_now": "Book Now",
                "seat": "seat"
            },
            "profile": {
                "edit_data": "Edit Profile",
                "lang_switch": "Change Language",
                "profile_completion": "Profile Completion",
                "complete_prompt": "Complete your profile to get 2x more matches",
                "business_avatar": "Business Avatar",
                "turnover": "Turnover",
                "industry": "Industry",
                "experience": "Experience",
                "how_can_help": "How can I help",
                "vision_goals": "Vision & Goals",
                "1_year_goal": "1 Year Goal",
                "5_year_goal": "5 Year Goal",
                "mission": "Mission",
                "interests": "Interests"
            },
            "edit": {
                "title": "Edit Profile",
                "ai_magic_title": "✨ AI Magic Fill",
                "ai_magic_desc": "Fill your profile in 3 clicks using ChatGPT",
                "step1": "1. Copy this prompt",
                "copy_prompt": "Copy Prompt",
                "prompt_copied": "Copied!",
                "step2": "2. Send it to ChatGPT along with your bio/links",
                "step3": "3. Paste the ChatGPT response here",
                "paste_placeholder": "Paste JSON from ChatGPT here...",
                "apply_magic": "Apply Magic",
                "manual_edit": "Or fill manually",
                "save": "Save Profile",
                "apply_success": "Profile magic applied!",
                "apply_error": "Invalid format from ChatGPT."
            }
        }
    },
    ru: {
        translation: {
            "onboarding": {
                "welcome": "Добро пожаловать",
                "complete_profile": "Заполнить профиль",
                "select_role": "Выберите вашу роль",
                "role_entrepreneur": "Предприниматель",
                "role_investor": "Инвестор",
                "role_expert": "Эксперт",
                "role_creator": "Креатор",
                "select_goal": "Ваша главная цель?",
                "goal_networking": "Нетворкинг и партнерства",
                "goal_investment": "Поиск инвестиций",
                "goal_mentorship": "Менторство",
                "goal_hiring": "Поиск талантов",
                "finish": "Завершить и начать"
            },
            "nav": {
                "main": "Главная",
                "match": "Матч",
                "events": "События",
                "chat": "Чаты",
                "profile": "Профиль"
            },
            "home": {
                "greeting": "Добрый вечер",
                "subtitle": "Лучшие лидеры для вас на сегодня",
                "top_leaders": "Топ Лидеры",
                "see_all": "Все",
                "view_profile": "Открыть профиль",
                "match": "СОВПАДЕНИЕ",
                "upcoming_tables": "Ближайшие столы",
                "seats_left": "мест осталось",
                "joined": "участников",
                "join": "Вступить",
                "masterminds": "Мастермайнды",
                "promoted": "РЕКЛАМА",
                "book_now": "Забронировать",
                "seat": "место"
            },
            "profile": {
                "edit_data": "Редактировать",
                "lang_switch": "Сменить язык",
                "profile_completion": "Заполненность профиля",
                "complete_prompt": "Заполните профиль, чтобы получать в 2x больше мэтчей",
                "business_avatar": "Бизнес Аватар",
                "turnover": "Оборот",
                "industry": "Индустрия",
                "experience": "Опыт",
                "how_can_help": "Чем могу помочь",
                "vision_goals": "Видение и цели",
                "1_year_goal": "Цель на 1 год",
                "5_year_goal": "Цель на 5 лет",
                "mission": "Миссия",
                "interests": "Интересы"
            },
            "edit": {
                "title": "Редактирование",
                "ai_magic_title": "✨ AI Заполнение",
                "ai_magic_desc": "Заполните профиль в 3 клика с помощью ChatGPT",
                "step1": "1. Скопируйте этот промт",
                "copy_prompt": "Скопировать промт",
                "prompt_copied": "Скопировано",
                "step2": "2. Отправьте его в ChatGPT вместе с вашей биографией или ссылками",
                "step3": "3. Вставьте ответ от ChatGPT сюда",
                "paste_placeholder": "Вставьте JSON от ChatGPT...",
                "apply_magic": "Применить Магию",
                "manual_edit": "Или заполните вручную",
                "save": "Сохранить профиль",
                "apply_success": "Магия сработала!",
                "apply_error": "Неверный формат от ChatGPT."
            }
        }
    }
};

export const getAIPrompt = (language: string) => language === 'ru' ? aiPromptRu : aiPromptEn;

// Check telegram user language or fallback to English
const tgUserLang = tg.initDataUnsafe?.user?.language_code;
const savedLang = localStorage.getItem('appLang');
const defaultLang = savedLang || (tgUserLang === 'ru' ? 'ru' : 'en');

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: defaultLang,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // React already escapes values
        }
    });

export default i18n;
