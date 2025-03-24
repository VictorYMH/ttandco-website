<template>
    <div class="product-card" @click="goToProductPage">
        <img :src="product.images[0].image_url" :alt="product.name" class="product-image" />
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">{{ formatCurrency(product.price) }}</p>
    </div>
</template>

<script>

import { priceMixin } from '../mixins/priceMixin';

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatCurrency(value) {
            return `$${parseFloat(value).toFixed(2)}`;
        },
        goToProductPage() {
            this.$router.push(`/products/${this.product.product_id}`);
        }
    }
}
</script>

<style scoped>
.product-card {
    border: 1px solid #ddd;
    padding: 16px;
    text-align: center;
    cursor: pointer; /* Add cursor pointer to indicate clickable area */
}
.product-image {
    max-width: 100%;
    height: auto;
}
.product-name {
    font-size: 1.5em;
    margin: 16px 0;
}
.product-price {
    font-size: 1.2em;
    color: #333;
}
</style>