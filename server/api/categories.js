import { defineEventHandler, getQuery, readBody, createError } from 'h3';
import pool from '../dbPool.js';

async function getCategoryById(id) {
  const [categoryRows] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id]);
  if (categoryRows.length === 0) {
    console.log(`Category with ID ${id} not found`); // Add this line for logging
    throw createError({ statusCode: 404, statusMessage: 'Category not found' });
  }

  return categoryRows[0];
}

async function getCategoryByUrl(url) {
  const [categoryRows] = await pool.query('SELECT * FROM categories WHERE url = ?', [url]);
  if (categoryRows.length === 0) {
    console.log(`Category with URL ${url} not found`); // Add this line for logging
    throw createError({ statusCode: 404, statusMessage: 'Category not found' });
  }

  const category = categoryRows[0];
  const [productRows] = await pool.query(`
    SELECT p.*, pp.*
    FROM products p
    JOIN product_per_category ppc ON p.product_id = ppc.product_id
    LEFT JOIN product_images pp ON p.product_id = pp.product_id
    WHERE ppc.category_id = ?
  `, [category.category_id]);

  const products = productRows.reduce((acc, row) => {
    const product = acc.find(p => p.product_id === row.product_id);
    if (product) {
      product.images.push({
        image_id: row.image_id,
        image_url: row.image_url,
        // Add other image properties here
      });
    } else {
      acc.push({
        product_id: row.product_id,
        name: row.name,
        description: row.description,
        price: row.price,
        // Add other product properties here
        images: row.image_id ? [{
          image_id: row.image_id,
          image_url: row.image_url,
          // Add other image properties here
        }] : []
      });
    }
    return acc;
  }, []);

  return { category, products };
}

async function getAllCategories() {
  const [rows] = await pool.query('SELECT * FROM categories');
  return rows;
}

async function createCategory(body) {
  const { name, description, url } = body;
  const [result] = await pool.query(
    'INSERT INTO categories (name, description, url) VALUES (?, ?, ?)',
    [name, description, url]
  );
  return { category_id: result.insertId, ...body };
}

async function updateCategory(id, body) {
  const { name, description, url } = body;
  const [result] = await pool.query(
    'UPDATE categories SET name = ?, description = ?, url = ? WHERE category_id = ?',
    [name, description, url, id]
  );
  if (result.affectedRows === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' });
  }
  return { category_id: id, ...body };
}

async function deleteCategory(id) {
  const [result] = await pool.query('DELETE FROM categories WHERE category_id = ?', [id]);
  if (result.affectedRows === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' });
  }
  return { message: 'Category deleted' };
}

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const query = getQuery(event);
  const id = query.id || event.context.params?.id;
  const url = query.url;

  switch (method) {
    case 'GET':
      if (id) {
        return await getCategoryById(id);
      } else if (url) {
        return await getCategoryByUrl(url);
      } else {
        return await getAllCategories();
      }
    case 'POST':
      const postBody = await readBody(event);
      return await createCategory(postBody);
    case 'PUT':
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'Category ID is required' });
      }
      const putBody = await readBody(event);
      return await updateCategory(id, putBody);
    case 'DELETE':
      if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'Category ID is required' });
      }
      return await deleteCategory(id);
    default:
      throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
  }
});