import dotenv from 'dotenv';
import { Connection, Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL //?? "postgres://postgres:postgres@localhost:5432/shopdb",
});

async function seed() {
  console.info("Connection String: ", process.env.DATABASE_URL);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      rating NUMERIC(10,2),
      ratedby NUMERIC(10,0),
      imagefile TEXT,
      description TEXT
    );
  `);

  const existing = await pool.query('SELECT COUNT(*)::int AS count FROM products;');
  // const rows = await pool.query ('SELECT * FROM products');
  if (existing.rows.at(0).count > 0) {
    console.log('Seed skipped; ', existing.rows.at(0).count, ' products already present');
    return;
  }

  await pool.query(`
      INSERT INTO products (name, price, rating, ratedby, imagefile, description)
      VALUES 
        ('Bamboo Watch', 99.99, 4.51, 23, 'bamboo-watch.jpg', 'Bamboo Watch'),
        ('Black Watch', 79.99, 4.72, 123, 'black-watch.jpg', 'Black Watch'),
        ('Blue Band', 39.99, 4.85, 33, 'blue-band.jpg', 'Blue Band'),
        ('Blue T-Shirt', 49.99, 4.25, 34, 'blue-t-shirt.jpg', 'Blue T-Shirt'),
        ('Black Bracelet', 34.99, 4.15, 25, 'bracelet.jpg', 'Black Bracelet'),
        ('Brown Purse', 199.99, 4.01, 56, 'brown-purse.jpg', 'Brown Purse'),
        ('Chakra Bracelet', 59.99, 4.25, 34, 'chakra-bracelet.jpg', 'Chakra Bracelet'),
        ('Galaxy Earrings', 129.99, 4.15, 23, 'galaxy-earrings.jpg', 'Galaxy Earrings'),
        ('Game Controller', 249.99, 4.36, 76, 'game-controller.jpg', 'Game Controller'),
        ('Gaming Set', 499.99, 4.25, 8, 'gaming-set.jpg', 'Gaming Set'),
        ('Gold Phone Case', 56.99, 3.85, 9, 'gold-phone-case.jpg', 'Gold Phone Case'),
        ('Green Earbuds', 139.99, 3.75, 5, 'green-earbuds.jpg', 'Green Earbuds'),
        ('Green T-Shirt', 49.99, 4.65, 75, 'green-t-shirt.jpg', 'Green T-Shirt'),
        ('Gray T-Shirt', 44.99, 4.95, 145, 'grey-t-shirt.jpg', 'Gray T-Shirt'),
        ('Purple T-Shirt', 49.99, 4.45, 31, 'purple-t-shirt.jpg', 'Purple T-Shirt'),
        ('Teal T-Shirt', 53.99, 4.65, 96, 'teal-t-shirt.jpg', 'Teal T-Shirt'),
        ('Headphones', 299.99, 4.17, 26, 'headphones.jpg', 'Headphones'),
        ('Lime Band', 19.99, 4.59, 83, 'lime-band.jpg', 'Lime Band'),
        ('Mini Speakers', 99.99, 4.45, 24, 'mini-speakers.jpg', 'Mini Speakers'),
        ('Painted Phone Case', 85.99, 4.12, 12, 'painted-phone-case.jpg', 'Painted Phone Case'),
        ('Pink Band', 21.99, 3.93, 19, 'pink-band.jpg', 'Pink Band'),
        ('Pink Purse', 169.99, 3.61, 17, 'pink-purse.jpg', 'Pink Purse'),
        ('Purple Band', 23.99, 4.15, 38, 'purple-band.jpg', 'Purple Band'),
        ('Purple Gemstone Necklace', 999.99, 4.90, 6, 'purple-gemstone-necklace.jpg', 'Purple Gemstone Necklace'),
        ('Blue Shoes', 152.99, 4.55, 39, 'shoes.jpg', 'Blue Shoes'),
        ('Black Sneakers', 234.99, 4.52, 38, 'sneakers.jpg', 'Black Sneakers'),
        ('Yellow Earbuds', 119.99, 3.51, 41, 'yellow-earbuds.jpg', 'Yellow Earbuds');
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      privileges TEXT
    );
    INSERT INTO users (email, password, name, privileges)
    VALUES 
      ('admin@shop.com','admin123', 'Administrator','Admin'),
      ('demo@shop.com','shop123', 'Mr. Fast Shop',NULL);
    `);

  console.log('Seed data inserted');
}

seed()
  .catch((err) => {
    console.error('Seed failed', err);
  })
  .finally(() => pool.end());
