<template>
  <div class="product-detail-container">
    <div v-if="product">
      <div class="product-header">{{ product.name }}</div>
      <div class="product-content-container">
        <div class="product-image-carousel-column" v-if="product && product.images && product.images.length">
          <NativeCarousel :items="product.images" :topShadow="false" :visibleItems="1"
            :navButtonBackground="'transparent'">
            <template #default="{ item }">
              <div class="product-image-wrapper">
                <img :src="item.image_url" class="product-image" />
              </div>
            </template>
          </NativeCarousel>
        </div>
        <div class="product-text-column">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-code">商品编号 {{ product.name }}</div>
          <div class="product-description">{{ product.description }}</div>
          <div class="mini-program-button">
            前往微信小程序订制购买
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Product not found</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import NativeCarousel from '~/components/carousel.vue';

definePageMeta({
  layout: 'left-nav-layout'
});

const route = useRoute()
const productId = route.params.id

const { data: product, error } = await useAsyncData(`product-${productId}`, () =>
  $fetch(`/api/products?id=${productId}`)
)
if (error.value) {
  console.error('Failed to fetch product:', error.value)
}
</script>

<style scoped>
.product-detail-container {
  padding: 3.2rem 0;
}

.product-header {
  background-color: #313131;
  color: white;
  padding: .2rem 1rem;

}

.product-content-container {
  display: flex;
  padding: 2.4rem 0;
  gap: 1.2rem;
}

.product-image-carousel-column {
  width: 60%;
}

.product-image-wrapper {
  padding: 2.2rem;
}

.product-text-column {
  width: 40%;
}

.product-name {
  line-height: 1.6;
  font-weight: 500;
  padding: 1rem 0;
  font-size: 1.2rem;
}

.product-code,
.product-description {
  color: #717171;
  line-height: 1.2;
  word-wrap: break-word;
  padding: .8rem 0;
}

.mini-program-button {
  background: #313131;
  color: white;
  padding: 0.4rem 1.8rem;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 0.4rem;
  text-align: center;
  cursor: pointer;
}
</style>