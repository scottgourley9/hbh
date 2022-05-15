const bcrypt = require('bcrypt');

const pool = require('./initialize');

module.exports = {
    create: async (req, res) => {
        const {
            image_url,
            order,
            name,
            width,
            height,
            project_id
        } = req?.body || {};

        try {
            const dbResponse = await pool.query(
                'insert into moodboard_images (image_url, order, name, width, height, project_id) values($1, $2, $3, $4, $5, $6) returning *',
                [image_url, order, name, width, height, project_id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error creating moodboard_image');
        }
    },
    read: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = await pool.query(
                'select * from moodboard_images where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading moodboard_image');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = await pool.query(
                'select * from moodboard_images where id = $1',
                [id]
            );
            const {
                image_url,
                order,
                name,
                width,
                height,
                project_id
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };
            const dbUpdateResponse = await pool.query(
                'update moodboard_images set image_url = $1, order = $2, name = $3, width = $4, height = $5, project_id = $6, timestamp = $7 where id = $8 returning *',
                [image_url, order, name, width, height, project_id, new Date(), id]
            );
            res.status(200).json(dbUpdateResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error updating moodboard_image');
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = await pool.query(
                'delete from moodboard_images where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting moodboard_image');
        }
    }
}
