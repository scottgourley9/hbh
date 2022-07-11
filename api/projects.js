const bcrypt = require('bcrypt');

const pool = require('./initialize');

const mediaApi = require('./media');

module.exports = {
    create: async (req, res) => {
        let {
            user_id,
            shareable = false,
            name,
            cover_photo = '',
            budget,
            status = 'In Progress',
            color = '#ffffff',
            duration = null,
            ui_order = null,
            imageObject
        } = req?.body || {};

        try {
            if (imageObject) {
                cover_photo = await mediaApi?.create(imageObject) || '';
            }
        } catch (e) {
            console.error(e);
        }

        try {
            const dbResponse = await pool.query(
                'insert into projects (user_id, shareable, name, cover_photo, budget, status, color, duration, ui_order) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
                [user_id, shareable, name, cover_photo, budget, status, color, duration, ui_order]
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
            const dbResponse = await pool.query(
                'select * from projects where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading project');
        }
    },
    readAll: async (req, res) => {
        const {
            user_id
        } = req?.params || {};

        try {
            const dbResponse = await pool.query(
                'select * from projects where user_id = $1 ORDER BY timestamp DESC',
                [user_id]
            );

            res.status(200).json(dbResponse?.rows || []);
        } catch (e) {
            res.status(500).json('Error reading project');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = await pool.query(
                'select * from projects where id = $1',
                [id]
            );
            let {
                user_id,
                shareable,
                name,
                cover_photo,
                budget,
                status,
                color,
                duration,
                ui_order,
                imageObject
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };

            try {
                if (imageObject) {
                    cover_photo = await mediaApi?.create(imageObject) || '';
                }
            } catch (e) {
                console.error(e);
            }

            try {
                if (req?.body?.color !== dbReadResponse?.rows?.[0]?.color) {
                    const dbUpdateResponse = await pool.query(
                        'update task_items set color = $1 where project_id = $2',
                        [color, id]
                    );
                }
            } catch (e) {
                console.error(e?.message);
            }

            const dbUpdateResponse = await pool.query(
                'update projects set user_id = $1, shareable = $2, name = $3, cover_photo = $4, budget = $5, status = $6, color = $7, duration = $8, ui_order = $9, timestamp = $10 where id = $11 returning *',
                [user_id, shareable, name, cover_photo, budget, status, color, duration, ui_order, new Date(), id]
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
            const dbResponse = await pool.query(
                'delete from projects where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting project');
        }
    }
}
