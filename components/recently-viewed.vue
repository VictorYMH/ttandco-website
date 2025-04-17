<template>
    <div class="recently-viewed-container">
        <div class="recently-viewed-header">
            <div class="recently-viewed-title">最近浏览的商品
            </div>
        </div>
        <div class="recently-viewed-carousel">
            <NativeCarousel :items="recentlyVieweds" :visibleItems="3">
                <template #default="{ item }">
                    <a @click="goToProductPage">
                        <div class="recently-viewed-wrapper">
                            <img :src="item.image" :alt="item.alt" class="recently-viewed-product" />
                        </div>
                        <div class="recently-viewed-item-name">{{ item.name }}</div>
                    </a>
                </template>
            </NativeCarousel>
        </div>
    </div>
</template>

<script>
import NativeCarousel from './carousel.vue';
export default {
    name: "RecentlyViewed",
    components: {
        NativeCarousel
    },
    data() {
        return {
            recentlyVieweds: [
                {
                    id: 1,
                    name: "产品名称",
                    image: "/product1.jpg",
                },
                {
                    id: 2,
                    name: "产品名称",
                    image: "/product2.jpg",
                },
                {
                    id: 3,
                    name: "产品名称",
                    image: "/product3.jpg",
                },
                {
                    id: 4,
                    name: "产品名称",
                    image: "/product4.jpg",
                },
            ],
        };
    },
    mounted() {
        const storedItems = localStorage.getItem('recentlyVieweds');
        if (storedItems) {
            this.recentlyVieweds = JSON.parse(storedItems);
        }
    },
    methods: {
        goToProductPage() {
            this.$router.push(`/product/${this.product.product_id}`);
        }
    }
};
</script>

<style scoped>
.recently-viewed-container {
    padding: 0rem 0 2.4rem;
}
.recently-viewed-title {
    font-weight: 500;
}
.recently-viewed-wrapper {
    padding: 1.8rem;
    position: relative;
}

.recently-viewed-product {
    padding: 0.1rem;
    transition: box-shadow 0.3s ease;
    transition: all 0.3s ease;
}

.recently-viewed-product:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
.recently-viewed-item-name{
    text-align: center;
}
</style>
