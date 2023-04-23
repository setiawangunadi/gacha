/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('gachas', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        name: {
          type: 'TEXT',
          notNull: false,
        },
        url_photo: {
          type: 'TEXT',
          notNull: false,
        },
        position: {
          type: 'TEXT',
          notNull: false,
        },
        number: {
          type: 'TEXT',
          notNull: false,
        },
        is_get: {
          type: 'BOOLEAN',
          notNull: false,
        },
        total_get: {
          type: 'INT',
          notNull: false,
        },
        created_at: {
          type: 'TEXT',
          notNull: false,
        },
        updated_at: {
          type: 'TEXT',
          notNull: false,
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('gachas');
};
