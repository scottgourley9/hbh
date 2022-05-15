const bcrypt = require('bcrypt');

const pool = require('./initialize');

module.exports = {
    create: async (req, res) => {
        const {
            name,
            amount,
            category,
            color,
            receipt_image_url,
            order,
            project_id
        } = req?.body || {};

        try {
            const dbResponse = pool.query(
                'insert into expenses (name, amount, category, color, receipt_image_url, order, project_id) values($1, $2, $3, $4, $5, $6, $7) returning *',
                [name, amount, category, color, receipt_image_url, order, project_id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error creating expense');
        }
    },
    read: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'select * from expenses where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading expense');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = pool.query(
                'select * from expenses where id = $1',
                [id]
            );
            const {
                name,
                amount,
                category,
                color,
                receipt_image_url,
                order,
                project_id
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };
            const dbUpdateResponse = pool.query(
                'update expenses set name = $1, amount = $2, category = $3, color = $4, receipt_image_url = $5, order = $6, project_id = $7, timestamp = $8 where id = $9 returning *',
                [name, amount, category, color, receipt_image_url, order, project_id, new Date(), id]
            );
            res.status(200).json(dbUpdateResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error updating expense');
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'delete from expenses where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting expense');
        }
    }
}
