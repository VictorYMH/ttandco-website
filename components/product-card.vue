<template>
    <a class="product-card" @click="goToProductPage">
        <div class="product-image-container">
            <img :src="product.images[0].image_url" :alt="product.name" class="product-image" />
        </div>
        <div class="product-name"><span class="new-tag">NEW</span>{{ product.name }}</div>
    </a>
</template>

<script>


export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        goToProductPage() {
            this.$router.push(`/product/${this.product.product_id}`);
        }
    }
}
</script>

<style scoped>
.product-card {}

.product-image-container{
    padding: 1.8rem;
}
.product-image {
    max-width: 100%;
    height: auto;
    transition: all 0.3s ease;
}

.product-name {
    font-size: 1rem;
    text-align: center;
}

.new-tag {
    background: #333;
    color: white;
    padding: 0 0.2rem;
}

.product-image:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    transform: scale(1.05);
}
</style>