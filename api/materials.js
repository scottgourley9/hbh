const bcrypt = require('bcrypt');

const pool = require('./initialize');

module.exports = {
    create: async (req, res) => {
        const {
            name,
            type,
            checked,
            link,
            order,
            project_id
        } = req?.body || {};

        try {
            const dbResponse = pool.query(
                'insert into materials (name, type, checked, link, order, project_id) values($1, $2, $3, $4, $5, $6) returning *',
                [name, type, checked, link, order, project_id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error creating material');
        }
    },
    read: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'select * from materials where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading material');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = pool.query(
                'select * from materials where id = $1',
                [id]
            );
            const {
                name,
                type,
                checked,
                link,
                order,
                project_id
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };

            const dbUpdateResponse = pool.query(
                'update materials set name = $1, type = $2, checked = $3, link = $4, order = $5, project_id = $6, timestamp = $7 where id = $8 returning *',
                [name, type, checked, link, order, project_id, new Date(), id]
            );
            res.status(200).json(dbUpdateResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error updating material');
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dpResponse = pool.query(
                'delete from materials where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting material');
        }
    }
}
