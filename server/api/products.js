import { defineEventHandler, getQuery, readBody, createError } from 'h3';
import pool from '../dbPool.js';

async function getProductById(id) {
  const [productRows] = await pool.query('SELECT * FROM products WHERE product_id = ?', [id]);
  if (productRows.length === 0) {
    console.log(`Product with ID ${id} not found`); // Add this line for logging
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }

  const product = productRows[0];

  // Fetch product images
  const [imageRows] = await pool.query('SELECT * FROM product_images WHERE product_id = ?', [id]);
  product.images = imageRows;

  return product;
}

async function getAllProducts() {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
}

async function createProduct(body) {
  const { name, description, sort_order, price, stock_quantity, category_id, is_active } = body;
  const [result] = await pool.query(
    'INSERT INTO products (name, description, sort_order, price, stock_quantity, category_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, description, sort_order, price, stock_quantity, category_id, is_active]
  );
  return { product_id: result.insertId, ...body };
}

async function updateProduct(id, body) {
  const { name, description, sort_order, price, stock_quantity, category_id, is_active } = body;
  const [result] = await pool.query(
    'UPDATE products SET name = ?, description = ?, sort_order = ?, price = ?, stock_quantity = ?, category_id = ?, is_active = ? WHERE product_id = ?',
    [name, description, sort_order, price, stock_quantity, category_id, is_active, id]
  );
  if (result.affectedRows === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }
  return { product_id: id, ...body };
}

async function deleteProduct(id) {
  const [result] = await pool.query('DELETE FROM products WHERE product_id = ?', [id]);
  if (result.affectedRows === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }
  return { message: 'Product deleted' };
}

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const query = getQuery(event);
  const id = query.id || event.context.params?.id;

  switch (method) {
    case 'GET':
      return id ? await getProductById(id) : await getAllProducts();
    case 'POST':
      const postBody = await readBody(event);
      return await createProduct(postBody);
    case 'PUT':
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'Product ID is required' });
      }
      const putBody = await readBody(event);
      return await updateProduct(id, putBody);
    case 'DELETE':
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'Product ID is required' });
      }
      return await deleteProduct(id);
    default:
      throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
  }
});