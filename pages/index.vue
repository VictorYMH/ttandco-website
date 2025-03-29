<template>
  <div class="homepage">
    <Carousel :items="carouselItems">
    <template #default="{ item }">
        <img :src="item.image" :alt="item.alt" class="carousel-image" />
      </template>
    </Carousel>
  </div>
</template>

<script>
import Carousel from "~/components/carousel.vue";

export default {
  name: "homepage",
  components: {
    Carousel,
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
    };
  },
};
</script>

<style>
.carousel-image {
  width: 100%;
}
</style>