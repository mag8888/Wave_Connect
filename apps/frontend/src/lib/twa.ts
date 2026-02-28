import WebApp from '@twa-dev/sdk';

export const tg = WebApp;

export const initTWA = () => {
    tg.ready();
    tg.expand();

    // Set theme colors if needed to match Wave Match branding 
    // or rely on Telegram's native CSS variables like var(--tg-theme-bg-color)
    try {
        tg.setHeaderColor('#0A0A0B');
        tg.setBackgroundColor('#0A0A0B');
    } catch (e) {
        console.error('TWA init error:', e);
    }
};

export const useTelegram = () => {
    return {
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    };
};
