const { 
    addGachaHandler, 
    getAllGachasHandler, 
    getGachaByIdHandler, 
    editGachaByIdHandler,
    editStatusGachaByIdHandler,
    deleteGachaByIdHandler
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/gacha',
        handler: addGachaHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'GET',
        path: '/gacha',
        handler: getAllGachasHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'GET',
        path: '/gacha/{id}',
        handler: getGachaByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'PUT',
        path: '/gacha/{id}',
        handler: editGachaByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'PUT',
        path: '/gacha/status/{id}',
        handler: editStatusGachaByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },
    {
        method: 'DELETE',
        path: '/gacha/{id}',
        handler: deleteGachaByIdHandler,
        options: {
            cors: {
                origin: ['*'],
            }
        },
    },

];

module.exports = routes;