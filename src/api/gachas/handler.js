const ClientError = require("../../exceptions/ClientError");

class GachasHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postGachaHandler = this.postGachaHandler.bind(this);
        this.getAllGachasHandler = this.getAllGachasHandler.bind(this);
        this.getGachaByIdHandler = this.getGachaByIdHandler.bind(this);
        this.getGachaByPositionHandler = this.getGachaByPositionHandler.bind(this);
        this.putGachaByIdHandler = this.putGachaByIdHandler.bind(this);
        this.putStatusGachaByIdHandler = this.putStatusGachaByIdHandler.bind(this);
        this.deleteGachaByIdHandler = this.deleteGachaByIdHandler.bind(this);
    }

    async postGachaHandler(request, h) {
        try {
            this._validator.validateGachaPayload(request.payload);
            const { name, url_photo, position, number, is_get, total_get } = request.payload;

            const gachaId = await this._service.addGacha({ name, url_photo, position, number, is_get, total_get });
    
            const response = h.response({
                status: 'success',
                message: 'Gacha berhasil ditambahkan',
                data: {
                    gachaId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(400);
                return response;
            }
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getAllGachasHandler(request, h) {
        try {
            const gachas = await this._service.getGachas();
            return {
                status: 'success',
                data: {
                    gachas,
                }
            };    
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;    
        }
    }

    async getGachaByIdHandler(request, h) {
        try {
            const { number } = request.params;
            const gacha = await this._service.getGachaById(number);
            return {
                status: 'success',
                data: {
                    gacha
                },
            };    
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(400);
                return response;
            }
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getGachaByPositionHandler(request, h) {
        try {
            const { position } = request.params;
            const gacha = await this._service.getGachaByPosition(position);
            return {
                status: 'success',
                data: {
                    gacha
                },
            };    
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(400);
                return response;
            }
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async putGachaByIdHandler(request, h) {
        try {
            this._validator.validateGachaPayload(request.payload);
            const { name, url_photo, position, number, is_get, total_get } = request.payload;
            const { id } = request.params;

            await this._service.editGachaById(id, { name, url_photo, position, number, is_get, total_get });
    
            return {
                status: 'success',
                message: 'Gacha berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(400);
                return response;
            }
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async putStatusGachaByIdHandler(request, h) {
        try {
            this._validator.validateGachaPayload(request.payload);
            const { is_get, total_get } = request.payload;
            const { id } = request.params;

            await this._service.editStatusGachaById(id, { is_get, total_get });
    
            return {
                status: 'success',
                message: 'Status Gacha berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(400);
                return response;
            }
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteGachaByIdHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteGachaById(id);
            return {
                status: 'success',
                message: 'Gacha berhasil dihapus',
            }
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(400);
                return response;
            }
            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = GachasHandler;

// const addGachaHandler = (request, h) => {
//     const { name, urlPhoto, position, number, isGet, totalGet } = request.payload;

//     const id = nanoid(16);
//     const createdAt = new Date().toISOString();
//     const updatedAt = createdAt;

//     const newGacha = {
//         name, urlPhoto, position, number, isGet, totalGet, id, createdAt, updatedAt,
//     };

//     gachas.push(newGacha);

//     const isSuccess = gachas.filter((gacha) => gacha.id === id).length > 0;

//     if (isSuccess) {
//         const response = h.response({
//             status: 'success',
//             message: 'Gacha berhasil ditambahkan',
//             data: {
//                 gachaId: id,
//             },
//         });
//         response.code(201);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Gacha gagal ditambahkan',
//     });
//     response.code(500);
//     return response;
// };

// const getAllGachasHandler = () => ({
//     status: 'success',
//     data: {
//         gachas,
//     },
// });

// const getGachaByIdHandler = (request, h) => {
//     const { id } = request.params;

//     const gacha = gachas.filter((n) => n.id === id)[0];

//     if (gacha !== undefined){
//         return {
//             status: 'success',
//             data: {
//                 gacha,
//             },
//         };
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Gacha tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// const editGachaByIdHandler = (request, h) => {
//     const { id } = request.params;

//     const { name, urlPhoto, position, number, isGet, totalGet } = request.payload;
//     const updatedAt = new Date().toISOString();

//     const index = gachas.findIndex((gacha) => gacha.id === id);

//     if (index !== -1){
//         gachas[index] = {
//             ...gachas[index],
//             name,
//             urlPhoto,
//             position,
//             number,
//             isGet,
//             totalGet,
//             updatedAt
//         };

//         const response = h.response({
//             status: 'success',
//             message: 'Gacha berhasil diperbarui',
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Gagal memperbarui gacha. Id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// const editStatusGachaByIdHandler = (request, h) => {
//     const { id } = request.params;

//     const { isGet, totalGet } = request.payload;
//     const updatedAt = new Date().toISOString();

//     const index = gachas.findIndex((gacha) => gacha.id === id);

//     if (index !== -1){
//         gachas[index] = {
//             ...gachas[index],
//             isGet,
//             totalGet,
//             updatedAt
//         };

//         const response = h.response({
//             status: 'success',
//             message: 'Gacha berhasil diperbarui',
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Gagal memperbarui gacha. Id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// const deleteGachaByIdHandler = (request, h) => {
//     const { id } = request.params;

//     const index = gachas.findIndex((gacha) => gacha.id === id);

//     if (index !== -1){
//         gachas.splice(index, 1);
//         const response = h.response({
//             status: 'success',
//             message: 'Gacha berhasil dihapus',
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Gacha gagal dihapus. Id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// module.exports = { 
//     addGachaHandler, 
//     getAllGachasHandler, 
//     getGachaByIdHandler, 
//     editGachaByIdHandler,
//     editStatusGachaByIdHandler,
//     deleteGachaByIdHandler
// };