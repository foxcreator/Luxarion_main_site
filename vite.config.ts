import { defineConfig } from 'vite';

export default defineConfig({
    base: '/',
    appType: 'mpa',
    plugins: [
        {
            name: 'mpa-clean-urls',
            configureServer(server) {
                server.middlewares.use((req, _res, next) => {
                    const request = req as { url?: string };

                    if (request.url === '/pitch-deck') {
                        request.url = '/pitch-deck/index.html';
                    }
                    if (request.url === '/endless-caravan-pitch-deck') {
                        request.url = '/endless-caravan-pitch-deck/index.html';
                    }
                    next();
                });
            },
        },
    ],
    build: {
        rollupOptions: {
            input: {
                main: new URL('./index.html', import.meta.url).pathname,
                pitchDeck: new URL('./pitch-deck/index.html', import.meta.url).pathname,
                endlessCaravanPitchDeck: new URL('./endless-caravan-pitch-deck/index.html', import.meta.url).pathname,
            },
        },
    },
});
