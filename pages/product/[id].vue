<template>
  <div class="product-detail-container">
    <div v-if="product">
      <h1 class="product-header">{{ product.item_name }}</h1>
      <div class="product-content-container">
        <div class="product-image-carousel-column" v-if="product && product.images && product.images.length">
          <NativeCarousel :items="product.images" :topShadow="false" :visibleItems="1"
            :navButtonBackground="'transparent'" :enableSeeLargeButton="true">
            <template #default="{ item }">
              <div class="product-image-wrapper">
                <img :src="item.image_url" class="product-image" />
              </div>
            </template>
          </NativeCarousel>
        </div>
        <div class="product-text-column">
          <div class="product-name">{{ product.item_name }}</div>
          <div class="product-code">商品编号 {{ product.it_cd }}</div>
          <div class="product-listed-description" v-html="product.item_tags_name"></div>
          <div class="mini-program-button">
            前往微信商城选购
          </div>
          <div class="share-container">
            <div>分享</div>
            <div class="wechat"><img src="/icons/wechat_tk_grey.png"></div>
          </div>
        </div>
        <div class="product-description"  v-html="product.item_tags_name">
        </div>
      </div>
    </div>
    <div v-else>
      <p>Product not found</p>
    </div>
  </div>
  <RecentlyViewed />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import NativeCarousel from '~/components/carousel.vue';
import RecentlyViewed from '~/components/recently-viewed.vue';

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
  padding: 0 1rem .2rem;
  font-size: 1rem;
  margin: 0;
}

.product-content-container {
  display: flex;
  margin: 1.6rem 0;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.product-image-carousel-column {
  flex: 0 0 60%; /* Fixed 60% width */
  max-width: 60%;
}

.product-image-wrapper {
  padding: 2.2rem;
}

.product-text-column {
  flex: 1; /* Fills the remaining space */
}

.product-name {
  line-height: 1.6;
  font-weight: 500;
  padding: 1rem 0 0;
  font-size: 1.2rem;
}

.product-code{
  margin: .4rem 0 .8rem;
  font-size: .9rem;
}
.product-listed-description {
  margin: 0 0 .8rem;
  font-size: .9rem;
}
.product-code,
.product-listed-description {
  color: #717171;
  line-height: 1.2;
  word-wrap: break-word;
}

::v-deep(.product-listed-description ul) {
  margin: 0;
  padding: 0;
  list-style-type: disc;
  list-style-position: inside;
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

.share-container {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 1.2rem 0 0;
  font-size: 0.8rem;
  color: #313131;
}

.wechat{
  width:1.4rem;
}
.product-description {
  flex: 0 0 100%; /* Full width row */
}

@media (max-width: 576px) {
  .product-content-container {
    flex-direction: column; /* Stack columns on smaller screens */
    margin: 0;
  }
  .product-image-carousel-column,
  .product-text-column {
    flex: 1; /* Full width on small screens */
    max-width: 100%;
  }
  .product-detail-container{
    padding: 0 0 3.2rem
  }
  .product-image-wrapper {
    padding: 0 1.2rem;
  }
  .product-header {
    display: none;
  }
  .product-image-wrapper {
    padding: 1rem;
  }
}
</style>