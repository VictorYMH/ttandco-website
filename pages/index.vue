<template>
  <div class="homepage">
    <div class="carousel-container">
      <Carousel :items="carouselItems">
        <template #default="{ item }">
          <img :src="item.image" :alt="item.alt" class="carousel-image" />
        </template>
      </Carousel>
    </div>
   
    <div class="product-category-container">
      <div class="nav-column">
        <LeftNav :title="'TT&CO.产品分类'" :categories="categories" />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "~/components/carousel.vue";
import LeftNav from "~/components/left-nav.vue";

export default {
  name: "homepage",
  components: {
    Carousel,
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
      ]
    };
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
</style>