import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/',
    appType: 'mpa',
    plugins: [
        {
            name: 'mpa-clean-urls',
            configureServer(server) {
                server.middlewares.use((req, _res, next) => {
                    if (req.url === '/endless-caravan-pitch-deck') {
                        req.url = '/pitch-deck/index.html';
                    }
                    next();
                });
            },
        },
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                pitchDeck: resolve(__dirname, 'pitch-deck/index.html'),
            },
        },
    },
});
