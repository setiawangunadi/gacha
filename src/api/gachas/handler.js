class GachasHandler {
    constructor(service) {
        this._service = service;

        this.postGachaHandler = this.postGachaHandler.bind(this);
        this.getAllGachasHandler = this.getAllGachasHandler.bind(this);
        this.getGachaByIdHandler = this.getGachaByIdHandler.bind(this);
        this.putGachaByIdHandler = this.putGachaByIdHandler.bind(this);
        this.putStatusGachaByIdHandler = this.putStatusGachaByIdHandler.bind(this);
        this.deleteGachaByIdHandler = this.deleteGachaByIdHandler.bind(this);
    }

    postGachaHandler(request, h) {
        try {
            const { name, urlPhoto, position, number, isGet, totalGet } = request.payload;

            const gachaId = this._service.addGacha({ name, urlPhoto, position, number, isGet, totalGet });
    
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
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(400);
            return response;
        }
    }

    getAllGachasHandler(request, h) {
        try {
            const gachas = this._service.getGachas();
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

    getGachaByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const gacha = this._service.getGachaById(id);
            return {
                status: 'success',
                data: {
                    gacha
                },
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

    putGachaByIdHandler(request, h) {
        try {
            const { id } = request.params;

            this._service.editGachaById(id, request.payload);
    
            return {
                status: 'success',
                message: 'Gacha berhasil diperbarui',
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

    putStatusGachaByIdHandler(request, h) {
        try {
            const { id } = request.params;

            this._service.editStatusGachaById(id, request.payload);
    
            return {
                status: 'success',
                message: 'Status Gacha berhasil diperbarui',
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

    deleteGachaByIdHandler(request, h) {
        try {
            const { id } = request.params;
            this._service.deleteGachaById(id);
            return {
                status: 'success',
                message: 'Gacha berhasil dihapus',
            }
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
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