const { Pool } = require("pg");
const { nanoid } = require('nanoid');
const InvariantError = require("../../exceptions/InvariantError");
const { mapGachaToModel } = require('../../utils');
const NotFoundError = require("../../exceptions/NotFoundError");

class GachasService{
    constructor(){
        this._pool = new Pool();
    }

    async addGacha({ name, url_photo, position, number, is_get, total_get }){
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO gachas VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
            values: [id, name, url_photo, position, number, is_get, total_get, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Gacha gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getGachas(){
        const result = await this._pool.query('SELECT * FROM gachas');
        return result.rows.map(mapGachaToModel);
    }

    async getGachaById(number) {
        const query = {
            text: 'SELECT * FROM gachas WHERE number = $1',
            values: [number],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gacha tidak ditemukan');
        }

        return result.rows.map(mapGachaToModel)[0];
    }

    async getGachaByPosition(position) {
        const query = {
            text: 'SELECT * FROM gachas WHERE position = $1',
            values: [position],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gacha tidak ditemukan');
        }

        return result.rows.map(mapGachaToModel);
    }

    async editGachaById(id, { name, url_photo, position, number, is_get, total_get }){
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE gachas SET name = $1, url_photo = $2, position = $3, number = $4, is_get = $5, total_get = $6, updated_at = $7 WHERE id = $8 RETURNING id',
            values: [name, url_photo, position, number, is_get, total_get, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui gacha. Id tidak ditemukan');
        }
    }

    async editStatusGachaById(id, { is_get, total_get }){
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE gachas SET is_get = $1, total_get = $2, updated_at = $3 WHERE id = $4 RETURNING id',
            values: [is_get, total_get, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui gacha. Id tidak ditemukan');
        }
    }

    async deleteGachaById(id) {
        const query = {
            text: 'DELETE FROM gachas WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = GachasService;