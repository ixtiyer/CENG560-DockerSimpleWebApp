import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/shopdb",
    user: "postgres",
    password: "postgres"
});

//console.log("env", process.env);
app.get('/', (req, res) => {
    res.json('Hello World! This NodeJS server application is currently running!');
});

app.get('/health', async (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/products', async (_req, res) => {
    try {
        console.log("pool", pool);
        console.log("reqres", _req, res);

        const result = await pool.query(
            'SELECT id, name, price, rating, ratedby, imagefile, description FROM products ORDER BY id ASC;'
        );
        res.json({ products: result.rows });
    } catch (error) {
        console.log("Error: fetch -> ", error);
        res.status(500).json({ error: 'Failed to load products' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body || {};

    const result = await pool.query(
        `SELECT id, email, password, name, privileges FROM users WHERE email='${email}' ORDER BY id ASC;`
    );

    let validUser = null;
    if (result.rowCount > 0) {
        validUser = result.rows.find(row => row.email === email && row.password === password);
    }
    if (validUser) {
        console.log("Success: Login for -> ", email);
        res.json({
            token: 'fake-jwt-token',
            user: { name: validUser.name, email: validUser.email },
        });
    } else {
        console.log("Error: Login failed for -> ", email);
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body || {};

    const result = await pool.query(
        `SELECT id, email, password, name, privileges FROM users WHERE email='${email}' ORDER BY id ASC;`
    );

    if (result.rowCount > 0) {
        console.log("Error: Signup failed for -> ", email);

        res.status(401).json({ error: 'This email is already signed up.' });
    } else {
        const insert = await pool.query(
            `INSERT INTO users (email, password, name, privileges)
        VALUES ('${email}','${password}', '${name}',NULL);`
        );
        if (insert.rowCount > 0) {
            console.log("Success: Signup for -> ", email);
            res.json({ user: { name: name, email: email }, });
        }
    }
});

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
    console.info("Connection String: ", process.env.DATABASE_URL);

});