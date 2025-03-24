<template>
    <div>
      <h1>Product Details</h1>
      <div v-if="product">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <div v-if="product.images && product.images.length">
          <h3>More Images</h3>
          <div v-for="(image, index) in product.images" :key="index">
            <img :src="image.image_url" :alt="`${product.name} image ${index + 1}`" />
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { useAsyncData } from '#app'
  
  const route = useRoute()
  const productId = route.params.id
  
  const { data: product, error } = await useAsyncData(`product-${productId}`, () =>
    $fetch(`/api/products?id=${productId}`)
  )
  
  if (error.value) {
    console.error('Failed to fetch product:', error.value)
  }
  </script>