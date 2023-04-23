const { nanoid } = require("nanoid");

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
            throw new Error('Gacha gagal ditambahkan');
        }

        return id;
    }

    getGachas(){
        return this._gachas;
    }

    getGachaById(id) {
        const gacha = this._gachas.filter((n) => n.id === id)[0];
        if (!gacha){
            throw new Error('Gacha tidak ditemukan');
        }
        return gacha;
    }

    editGachaById(id, { name, urlPhoto, position, number, isGet, totalGet }){
        const index = this._gachas.findIndex((gacha => gacha.id === id));

        if (index === -1) {
            throw new Error('Gagal memperbarui gacha. Id tidak ditemukan');
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
            throw new Error('Gagal memperbarui status gacha. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._gachas[index] = {
            ...this._gachas[index],
            isGet,
            totalGet,
            updatedAt,
        };
    }

    deleteGachaById(id) {
        const index = this._gachas.findIndex((gacha) => gacha.id === id);

        if (index === -1) {
            throw new Error('Gacha gagal dihapus. Id tidak ditemukan');
        }

        this._gachas.splice(index, 1);
    }
}

module.exports = GachasService;