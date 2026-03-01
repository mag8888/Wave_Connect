import WebApp from '@twa-dev/sdk';

export const tg = WebApp;

export const initTWA = () => {
    tg.ready();
    tg.expand();
};

export const useTelegram = () => {
    return {
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    };
};
