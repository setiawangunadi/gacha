const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class GachasService {
    constructor(){
        this._gachas = [];
    }

    addGacha({ name, urlPhoto, position, number, isGet, totalGet }){
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newGacha = {
            name, urlPhoto, position, number, isGet, totalGet, id, createdAt, updatedAt,
        };

        this._gachas.push(newGacha);

        const isSuccess = this._gachas.filter((gacha) => gacha.id === id).length > 0;

        if (!isSuccess){
            throw new InvariantError('Gacha gagal ditambahkan');
        }

        return id;
    }

    getGachas(){
        return this._gachas;
    }

    getGachaById(id) {
        const gacha = this._gachas.filter((n) => n.id === id)[0];
        if (!gacha){
            throw new NotFoundError('Gacha tidak ditemukan');
        }
        return gacha;
    }

    editGachaById(id, { name, urlPhoto, position, number, isGet, totalGet }){
        const index = this._gachas.findIndex((gacha => gacha.id === id));

        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui gacha. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._gachas[index] = {
            ...this._gachas[index],
            name,
            urlPhoto,
            position,
            number,
            isGet,
            totalGet,
            updatedAt,
        };
    }

    editStatusGachaById(id, { isGet, totalGet }){
        const index = this._gachas.findIndex((gacha => gacha.id === id));

        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui status gacha. Id tidak ditemukan');
        }

        const name = this._gachas.filter(gacha => gacha.name);
        const urlPhoto = this._gachas.filter(gacha => gacha.urlPhoto);
        const position = this._gachas.filter(gacha => gacha.position);
        const number = this._gachas.filter(gacha => gacha.number);
        const updatedAt = new Date().toISOString();

        this._gachas[index] = {
            ...this._gachas[index],
            name,
            urlPhoto,
            position,
            number,
            isGet,
            totalGet,
            updatedAt,
        };
    }

    deleteGachaById(id) {
        const index = this._gachas.findIndex((gacha) => gacha.id === id);

        if (index === -1) {
            throw new NotFoundError('Gacha gagal dihapus. Id tidak ditemukan');
        }

        this._gachas.splice(index, 1);
    }
}

module.exports = GachasService;