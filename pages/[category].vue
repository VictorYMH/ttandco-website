<template>
  <div class="category-container">
    <h1 class="category-title">{{ categoryData.category.name }}</h1>
    <div class="description" v-html="categoryData.category.description"></div>
    <RecentlyViewed />
    <div v-if="categoryData.products && categoryData.products.length">
      <div class="paging-message">{{ totalCount }}件中的{{ start }}-{{ end }}件表示</div>
      <AllCategories :categories="categoryData.products">
        <template #default="{ item }">
          <div class="product-card-wrapper">
            <div class="product-card-wrapper">
              <ProductCard :key="item.product_id" :product="item" />
            </div>
          </div>
        </template>
      </AllCategories>
    </div>
    <div class="not-found-message" v-else>
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

const { data: categoryData, error } = await useAsyncData(`category-${categoryUrl}`, () =>
  $fetch(`/api/categories?url=${categoryUrl}`)
)


const totalCount = computed(() => categoryData.value?.products?.length || 0);
const start = computed(() => (totalCount.value > 0 ? 1 : 0));
const end = computed(() => totalCount.value);

if (error.value) {
  console.error('Failed to fetch category:', error.value)
}
</script>

<style scoped>
.category-container {
  padding: 3.2rem 0;
}

.category-title {
  background-color: #313131;
  color: white;
  padding: .2rem 1rem;
  font-size: 1rem;
  margin: 0;
}

.all-categories-header {
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1.6rem;
}

.all-categories-title {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  min-width: fit-content;
}

.all-categories-image-wrapper {
  padding: 1rem;
}

.all-categories-message {
  text-align: center;
  margin: 1rem 0;
  font-size: .9rem;
}

.paging-message {
  font-size: 0.9rem;
  font-weight: 500;
}

.not-found-message {
  width: 100%;

}
</style>