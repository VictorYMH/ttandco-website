// filepath: d:\repos\ttandco-website\pages\_category.vue
<template>
  <div>
    <h1>{{ category.name }}</h1>
    <p>{{ category.description }}</p>
    <div v-if="category.products && category.products.length">
      <h2>Products</h2>
      <div class="product-list">
        <ProductCard v-for="product in category.products" :key="product.product_id" :product="product" />
      </div>
    </div>
    <div v-else>
      <p>No products available in this category.</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import ProductCard from '~/components/product_card.vue'

const route = useRoute()
const categoryUrl = route.params.category

const { data: category, error } = await useAsyncData(`category-${categoryUrl}`, () =>
  $fetch(`/api/categories?url=${categoryUrl}`)
)

if (error.value) {
  console.error('Failed to fetch category:', error.value)
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>