const routes = (handler) => [
    {
        method: 'POST',
        path: '/gacha',
        handler: handler.postGachaHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'GET',
        path: '/gacha',
        handler: handler.getAllGachasHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'GET',
        path: '/gacha/{id}',
        handler: handler.getGachaByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'PUT',
        path: '/gacha/{id}',
        handler: handler.putGachaByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'PUT',
        path: '/gacha/status/{id}',
        handler: handler.putStatusGachaByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'DELETE',
        path: '/gacha/{id}',
        handler: handler.deleteGachaByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
];

module.exports = routes;