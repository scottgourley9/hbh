const bcrypt = require('bcrypt');

const pool = require('./initialize');

module.exports = {
    create: async (req, res) => {
        const {
            name,
            order,
            project_id
        } = req?.body || {};

        try {
            const dbResponse = pool.query(
                'insert into task_sections (name, order, project_id) values($1, $2, $3) returning *',
                [name, order, project_id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error creating task_section');
        }
    },
    read: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'select * from task_sections where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading task_section');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = pool.query(
                'select * from task_sections where id = $1',
                [id]
            );
            const {
                name,
                order,
                project_id
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };
            const dbUpdateResponse = pool.query(
                'update task_sections set name = $1, order = $2, project_id = $3, timestamp = $4 where id = $5 returning *',
                [name, order, project_id, new Date(), id]
            );
            res.status(200).json(dbUpdateResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error updating task_section');
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = pool.query(
                'delete from task_sections where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting task_section');
        }
    }
}
