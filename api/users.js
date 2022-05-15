const bcrypt = require('bcrypt');

const config = require('../config');
const pool = require('./initialize');

const users = {
    create: async (req, res) => {
        const {
            first_name,
            last_name,
            email,
            password
        } = req?.body || {};

        const query = async ps => {
            try {
                const dbResponse = await pool.query(
                    'insert into users (first_name, last_name, email, ps) values($1, $2, $3, $4) returning *',
                    [first_name, last_name, email, ps]
                );
                res.status(200).json(dbResponse?.rows?.[0]);
            } catch (e) {
                console.log(error);
                res.status(500).json('Error creating user');
            }
        }

        if (password) {
            bcrypt.hash(password, config?.saltRounds, (err, hash) => {
                if (err) {
                    res.status(500).json('Error hashing password');
                } else {
                    query(hash);
                }
            });
        } else {
            query(null);
        }
    },
    read: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = await pool.query(
                'select * from users where id = $1',
                [id]
            );
            res.status(200).json(dbResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error reading user');
        }
    },
    update: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbReadResponse = await pool.query(
                'select * from users where id = $1',
                [id]
            );
            const {
                first_name,
                last_name,
                email,
                ps
            } = {
                ...(dbReadResponse?.rows?.[0] || {}),
                ...(req.body || {})
            };
            const dbUpdateResponse = await pool.query(
                'update users set first_name = $1, last_name = $2, email = $3, ps = $4, timestamp = $5 where id = $6 returning *',
                [first_name, last_name, email, ps, new Date(), id]
            );
            res.status(200).json(dbUpdateResponse?.rows?.[0]);
        } catch (e) {
            res.status(500).json('Error updating user');
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req?.params || {};

        try {
            const dbResponse = await pool.query(
                'delete from users where id = $1',
                [id]
            );
            res.status(200).json('deleted');
        } catch (e) {
            res.status(500).json('Error deleting user');
        }
    }
}

module.exports = users;
