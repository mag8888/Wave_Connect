import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { tg } from './lib/twa';

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
                "edit_data": "Edit Data",
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
            }
        }
    }
};

// Check telegram user language or fallback to English
const tgUserLang = tg.initDataUnsafe?.user?.language_code;
const defaultLang = tgUserLang === 'ru' ? 'ru' : 'en';

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
