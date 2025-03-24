<template>
    <div>
      <h1>Product List</h1>
      <ul>
        <li v-for="product in products" :key="product.product_id">{{ product.name }}</li>
      </ul>
    </div>
  </template>
  
<script setup>
import { useAsyncData } from '#app'
  
const { data: products, error } = await useAsyncData('products', () =>
    $fetch('/api/products')
)

if (error.value) {
    console.error('Failed to fetch products:', error.value)
}
</script>