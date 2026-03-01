import WebApp from '@twa-dev/sdk';

export const tg = WebApp;

export const initTWA = () => {
    tg.ready();
    tg.expand();

    // Sync user with backend
    try {
        if (tg.initDataUnsafe?.user) {
            fetch('https://wave-match-production.up.railway.app/api/users/init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: tg.initDataUnsafe.user,
                    startParam: tg.initDataUnsafe.start_param
                })
            }).catch(e => console.error('Failed to init user:', e));
        }
    } catch (e) {
        console.error('API call error:', e);
    }
};

export const useTelegram = () => {
    return {
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    };
};
