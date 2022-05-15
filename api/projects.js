const bcrypt = require('bcrypt');

const pool = require('./initialize');

module.exports = {
    create: async (req, res) => {
        const {
            user_id,
            shareable,
            name,
            cover_photo,
            budget,
            status,
            color,
            duration,
            order
        } = req?.body || {};

        try {
            const dbResponse = pool.query(
                'insert into projects (user_id, shareable, name, cover_photo, budget, status, color, duration, order) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
                [user_id, shareable, name, cover_photo, budget, status, color, duration, order]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error creating project');
        }
    },
    read: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'select * from projects where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading project');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = pool.query(
                'select * from projects where id = $1',
                [id]
            );
            const {
                user_id,
                shareable,
                name,
                cover_photo,
                budget,
                status,
                color,
                duration,
                order
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };
            const dbUpdateResponse = pool.query(
                'update projects set user_id = $1, shareable = $2, name = $3, cover_photo = $4, budget = $5, status = $6, color = $7, duration = $8, order = $9, timestamp = $10 where id = $11 returning *',
                [user_id, shareable, name, cover_photo, budget, status, color, duration, order, new Date(), id]
            );
            res.status(200).json(dbUpdateResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error updating project');
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'delete from projects where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting project');
        }
    }
}
