import { defineEventHandler, getQuery, readBody, createError } from 'h3';
import pool from '../dbPool.js';

async function getProductById(id) {
  const result = await pool.query('SELECT * FROM ttco.m_items WHERE it_cd = $1', [id]);
  if (result.rows.length === 0) {
    console.log(`Product with ID ${id} not found`);
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }

  const product = result.rows[0];
  product.images = product.item_imgs ? product.item_imgs.split('|').map(i=> {return {image_url:i}}) : [];
  return product;
}

async function getAllProducts() {
  const [rows] = await pool.query('SELECT * FROM m_items');
  return rows;
}

// async function createProduct(body) {
//   const {
//     siire_cd, brand_cd, item_cd, item_name_jp, item_name, item_alias,
//     item_info_1, item_info_2, item_info_3, item_cates, item_cates_name,
//     item_tags, item_tags_name, item_imgs, item_colors, item_colors_name,
//     item_sizes, item_sizes_name, item_zaiko_cnt, item_price_jp_org, item_price_jp,
//     item_exc_rate, item_fee_rate, item_tax_rate, item_price, sort_no, rank_no,
//     flg_top_slider, flg_top_banner, biko, del_flg, ins_datetime, upd_datetime,
//     ins_user_id, upd_user_id, spe_cd, skus, status, item_collections, item_product_type
//   } = body;

//   const [result] = await pool.query(
//     `INSERT INTO m_items (
//       siire_cd, brand_cd, item_cd, item_name_jp, item_name, item_alias,
//       item_info_1, item_info_2, item_info_3, item_cates, item_cates_name,
//       item_tags, item_tags_name, item_imgs, item_colors, item_colors_name,
//       item_sizes, item_sizes_name, item_zaiko_cnt, item_price_jp_org,
//       item_price_jp, item_exc_rate, item_fee_rate, item_tax_rate, item_price,
//       sort_no, rank_no, flg_top_slider, flg_top_banner, biko, del_flg,
//       ins_datetime, upd_datetime, ins_user_id, upd_user_id, spe_cd, skus,
//       status, item_collections, item_product_type
//     ) VALUES (${Array(39).fill('?').join(', ')})`
//   );
//   return { it_cd: result.insertId, ...body };
// }

// async function updateProduct(id, body) {
//   // Similar parameter destructuring to createProduct
//   const [result] = await pool.query(
//     `UPDATE m_items SET 
//      WHERE it_cd = ?`,
//     [/* All parameters including id */]
//   );
//   if (result.affectedRows === 0) {
//     throw createError({ statusCode: 404, statusMessage: 'Product not found' });
//   }
//   return { it_cd: id, ...body };
// }

async function deleteProduct(id) {
  const [result] = await pool.query('DELETE FROM m_items WHERE it_cd = ?', [id]);
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