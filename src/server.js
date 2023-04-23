require('dotenv').config();

const Hapi = require('@hapi/hapi');
const gachas = require('./api/gachas');
const GachasService = require('./services/postgres/GachasService');
const GachasValidator = require('./validator/gachas');

const init = async () => {
    const gachasService = new GachasService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
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
            validator: GachasValidator,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();