const Hapi = require('@hapi/hapi');
const gachas = require('./api/gachas');
const GachasService = require('./services/inMemory/GachasService');

const init = async () => {
    const gachasService = new GachasService();

    const server = Hapi.server({
        port: 5500,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        }
    });

    await server.register({
        plugin: gachas,
        options: {
            service: gachasService,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();