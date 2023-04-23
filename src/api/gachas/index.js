const GachasHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: 'gachas',
    version: '1.0.0',
    register: async (server, { service }) => {
        const gachasHandler = new GachasHandler(service);
        server.route(routes(gachasHandler));
    },
};