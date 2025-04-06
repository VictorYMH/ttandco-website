<template>
  <div class="homepage">
    <div class="carousel-container">
      <NativeCarousel :items="carouselItems" :topShadow="true" :visibleItems="1">
        <template #default="{ item }">
          <img :src="item.image" :alt="item.alt" class="carousel-image" />
        </template>
      </NativeCarousel>
    </div>
   
    <div class="product-category-container">
      <div class="nav-column">
        <LeftNav :title="'TT&CO.产品分类'" :categories="categories" />
      </div>
      <div class="products-column">
        <div class="new-arrivals-carousel">
          <NativeCarousel :items="newArrivals" :visibleItems="3">
            <template #default="{ item }">
              <img :src="item.image" :alt="item.alt" class="new-arrivals-product" />
            </template>
          </NativeCarousel>
        </div>
      </div>
    </div>

    
    
  </div>
</template>

<script>
import NativeCarousel from "~/components/carousel.vue";
import LeftNav from "~/components/left-nav.vue";

export default {
  name: "homepage",
  components: {
    NativeCarousel,
    LeftNav,
  },
  data() {
    return {
      carouselItems: [
        { image: "/hero01.jpg", alt: "hero image 1" },
        { image: "/hero02.jpg", alt: "hero image 2" },
        { image: "/hero03.jpg", alt: "hero image 3" },
        { image: "/hero04.jpg", alt: "hero image 4" },
        { image: "/hero05.jpg", alt: "hero image 5" },
      ],
      categories: [
        { name: "Category 1", collapsed: true, subItems: ["Sub-item 1", "Sub-item 2"] },
        { name: "Category 2", collapsed: true, subItems: ["Sub-item A", "Sub-item B"] },
      ],
      carouselConfig: {
        itemsToShow: 2.5,
        wrapAround: true,
        items: [],
      },
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
      newArrivals: [
        {
          image: "/product1.jpg",
          alt: "New Arrival 1",
        },
        {
          image: "/product2.jpg",
          alt: "New Arrival 2",
        },
        {
          image: "/product3.jpg",
          alt: "New Arrival 3",
        },
        {
          image: "/product4.jpg",
          alt: "New Arrival 4",
        },
      ],
      
    };
  },
  mounted() {
  },
};
</script>

<style>
.carousel-image {
  width: 100%;
}
.product-category-container {
  display: flex;
  justify-content: center;
}
.products-column {
  max-width: 40rem;
}

.new-arrivals-product {
  padding: 0.1rem;
  transition: box-shadow 0.3s ease;
}

.new-arrivals-product:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transform: scale(1.05);
}
</style>