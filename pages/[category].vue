<template>
  <div>
    <h1>{{ category.name }}</h1>
    <p>{{ category.description }}</p>
    <div v-if="category.products && category.products.length">
      <div class="product-list">
        <!-- <ProductCard v-for="product in category.products" :key="product.product_id" :product="product" /> -->
      </div>
      <RecentlyViewed />
      <div class="paging-message">{{ totalCount }}件中的{{ start }}-{{ end }}件表示</div>
      <AllCategories :categories="category.products">
        <template #default="{ item }">
          <div class="product-card-wrapper">
            <div class="product-card-wrapper">
              <ProductCard :key="item.product_id" :product="item" />
            </div>
          </div>
        </template>
      </AllCategories>
    </div>
    <div v-else>
      <p>No products available in this category.</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import ProductCard from '~/components/product-card.vue'
import AllCategories from '~/components/all-categories.vue'
import RecentlyViewed from '~/components/recently-viewed.vue'
import { computed } from 'vue'

definePageMeta({
  layout: 'left-nav-layout'
})

const route = useRoute();
const categoryUrl = route.params.category;

const { data: category, error } = await useAsyncData(`category-${categoryUrl}`, () =>
  $fetch(`/api/categories?url=${categoryUrl}`)
)
const
  allCategories = [
    {
      image: "/product1.jpg",
      alt: "New Arrival 1",
      message: "ONLY-ONE Series"
    },
    {
      image: "/product2.jpg",
      alt: "New Arrival 2",
      message: "Sports"
    },
    {
      image: "/product3.jpg",
      alt: "New Arrival 3",
      message: "ONLY-ONE Series"
    },
    {
      image: "/product4.jpg",
      alt: "New Arrival 4",
      message: "ONLY-ONE Series"
    },
    {
      image: "/product1.jpg",
      alt: "New Arrival 1",
      message: "ONLY-ONE Series"
    },
    {
      image: "/product2.jpg",
      alt: "New Arrival 2",
      message: "Sports"
    },
    {
      image: "/product2.jpg",
      alt: "New Arrival 2",
      message: "Sports"
    },
    {
      image: "/product3.jpg",
      alt: "New Arrival 3",
      message: "ONLY-ONE Series"
    },
    {
      image: "/product4.jpg",
      alt: "New Arrival 4",
      message: "ONLY-ONE Series"
    },
  ];


  const totalCount = computed(() => category.value?.products?.length || 0);
  const start = computed(() => (totalCount.value > 0 ? 1 : 0));
  const end = computed(() => totalCount.value);

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

.all-categories-header{
  display: flex;  
  justify-content: center;
  margin: 2rem 0 1rem;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1.6rem;
}

.all-categories-title{
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  min-width: fit-content;
}

.all-categories-image-wrapper{
  padding: 1rem;
}

.all-categories-message {
  text-align: center;
  margin: 1rem 0;
  font-size: .9rem;
}

.paging-message{
  font-size: 0.9rem;
  font-weight: 500;
}
</style>