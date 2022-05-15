const bcrypt = require('bcrypt');

const pool = require('./initialize');

module.exports = {
    create: async (req, res) => {
        const {
            project_id,
            image_url,
            order,
            name
        } = req?.body || {};

        try {
            const dbResponse = pool.query(
                'insert into project_images (project_id, image_url, order, name) values($1, $2, $3, $4) returning *',
                [project_id, image_url, order, name]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error creating project_image');
        }
    },
    read: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'select * from project_images where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading project_image');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = pool.query(
                'select * from project_images where id = $1',
                [id]
            );
            const {
                project_id,
                image_url,
                order,
                name
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };
            const dbUpdateResponse = pool.query(
                'update project_images set project_id = $1, image_url = $2, order = $3, name = $4, timestamp = $5 where id = $6 returning *',
                [project_id, image_url, order, name, new Date(), id]
            );
            res.status(200).json(dbUpdateResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error updating project_image');
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'delete from project_images where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting project_image');
        }
    }
}
