const bcrypt = require('bcrypt');

const pool = require('./initialize');

module.exports = {
    create: async (req, res) => {
        const {
            name,
            description,
            order,
            checked,
            date,
            time,
            video,
            section_id
        } = req?.body || {};

        try {
            const dbResponse = pool.query(
                'insert into task_items (name, description, order, checked, date, time, video, section_id) values($1, $2, $3, $4, $5, $6, $7, $8) returning *',
                [name, description, order, checked, date, time, video, section_id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error creating task_item');
        }
    },
    read: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'select * from task_items where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading task_item');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = pool.query(
                'select * from task_items where id = $1',
                [id]
            );
            const {
                name,
                description,
                order,
                checked,
                date,
                time,
                video,
                section_id
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };
            const dbUpdateResponse = pool.query(
                'update task_items set name = $1, description = $2, order = $3, checked = $4, date = $5, time = $6, video = $7, section_id = $8, timestamp = $9 where id = $10 returning *',
                [name, description, order, checked, date, time, video, section_id, new Date(), id]
            );
            res.status(200).json(dbUpdateResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error updating task_item');
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'delete from task_items where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting task_item');
        }
    }
}
