<template>
  <div class="homepage">
    <div class="carousel-container">
      <NativeCarousel :items="heroCarouselItems" :topShadow="true" :visibleItems="1" :navButtonBackground="'rgba(0, 0, 0, 0.5)'">
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
        <div class="new-arrivals-carousel row">
          <NativeCarousel :items="newArrivals" :visibleItems="3">
            <template #default="{ item }">
              <div class="new-arrivals-wrapper">
                <img :src="item.image" :alt="item.alt" class="new-arrivals-product" />
                <img src="/icons/new.png" alt="new" class="new-arrivals-tag" />
              </div>
            </template>
          </NativeCarousel>
        </div>
        <div class="product-carousel-container row">
          <NativeCarousel :items="productCarouselItems" :topShadow="false" :visibleItems="1" :navButtonBackground="'rgba(0, 0, 0, 0.5)'">
            <template #default="{ item }">
              <img :src="item.image" :alt="item.alt" class="carousel-image" />
              <div class="product-carousel-message">{{ item.message }}</div>
            </template>
          </NativeCarousel>
        </div>
        <div class="product-carousel-container row">
          <NativeCarousel :items="productCarouselItems" :topShadow="false" :visibleItems="1" :navButtonBackground="'rgba(0, 0, 0, 0.5)'">
            <template #default="{ item }">
              <img :src="item.image" :alt="item.alt" class="carousel-image" />
              <div class="product-carousel-message">{{ item.message }}</div>
            </template>
          </NativeCarousel>
        </div>
        <div class="top-sell-container row">
          <TopSellCategories :categories="topSellCategories">
            <template #default="{ item }">
              <div class="top-sell-wrapper">
                <img :src="item.image" :alt="item.alt" class="top-sell-category-image" />
                <div class="top-sell-category-message">{{ item.message }}</div>
              </div>
            </template>
          </TopSellCategories>
        </div>
        <div class="all-categories row">
          <div class="all-categories-header section-title">
            <div class="header-line"></div>
            <div class="all-categories-title">产品类别</div>
            <div class="header-line"></div>
          </div>
          <AllCategories :categories="allCategories">
            <template #default="{ item }">
              <div class="all-categories-wrapper">
                <div class="all-categories-image-wrapper">
                  <img :src="item.image" :alt="item.alt" class="all-categories-image" />
                </div>
                <div class="all-categories-message">{{ item.message }}</div>
              </div>
            </template>
          </AllCategories>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NativeCarousel from "~/components/carousel.vue";
import LeftNav from "~/components/left-nav.vue";
import TopSellCategories from "~/components/top-sell-categories.vue";
import AllCategories from "~/components/all-categories.vue";

export default {
  name: "homepage",
  components: {
    NativeCarousel,
    LeftNav,
    TopSellCategories,
    AllCategories
  },
  data() {
    return {
      heroCarouselItems: [
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
      productCarouselItems: [
        { image: "/hero01.jpg", alt: "hero image 1", message: "ONLY-ONE Series" },
        { image: "/hero02.jpg", alt: "hero image 2", message: "ONLY-ONE Series" },
        { image: "/hero03.jpg", alt: "hero image 3", message: "ONLY-ONE Series" },
        { image: "/hero04.jpg", alt: "hero image 4", message: "ONLY-ONE Series" },
        { image: "/hero05.jpg", alt: "hero image 5", message: "ONLY-ONE Series" },
      ],
      topSellCategories: [
        { image: "/top_sell_cat_1.jpg", alt: "hero image 1", message: "" },
        { image: "/top_sell_cat_2.jpg", alt: "hero image 2", message: "" },
        { image: "/top_sell_cat_3.jpg", alt: "hero image 3", message: "" },
        { image: "/top_sell_cat_4.jpg", alt: "hero image 4", message: "" },
        { image: "/top_sell_cat_5.jpg", alt: "hero image 5", message: "" },
        { image: "/top_sell_cat_6.jpg", alt: "hero image 5", message: "" },
      ],
      allCategories: [
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
      ],
    };
  },
  mounted() {
  },
};
</script>

<style scoped>
.carousel-image {
  width: 100%;
}

.product-category-container {
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 1rem 0;
}

.products-column {
  max-width: 40rem;
}

.products-column .row {
  margin: 0 0 1rem 0;
}

.new-arrivals-wrapper {
  padding: 1.8rem;
  position: relative;
}

.new-arrivals-product {
  padding: 0.1rem;
  transition: box-shadow 0.3s ease;
  transition: all 0.3s ease;
}

.new-arrivals-tag {
  position: absolute;
  top: 2.2rem;
  left: 1.4rem;
  width: 2.7rem;
  transition: transform 0.3s ease;
}

.new-arrivals-tag:hover {
  transform: scale(1.2);
}

.new-arrivals-product:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.new-arrivals-product:hover + .new-arrivals-tag {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

.product-carousel-container {
  position: relative;
}

.product-carousel-container .product-carousel-message {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: .8rem 1.6rem;
}

.top-sell-wrapper {
  position: relative;
}

.top-sell-category-message {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #b7b7b7;
  padding: 0.2rem 0;
  text-align: center;
  font-size: 0.9rem;
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

.section-title .header-line{
  height: 2px;
  flex: 1;
  border-top: 3px solid black;
  border-bottom: 1px solid black;
}
</style>