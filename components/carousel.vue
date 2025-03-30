<template>
    <div class="carousel">
        <div class="carousel-container" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="carousel-item" v-for="(item, index) in items" :key="index">
                <slot :item="item"></slot>
            </div>
        </div>
        <button class="carousel-button prev" @click="prevSlide">‹</button>
        <button class="carousel-button next" @click="nextSlide">›</button>
    </div>
</template>

<script>
export default {
    name: "Carousel",
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    methods: {
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
        },
        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        },
    },
};
</script>

<style scoped>
.carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
}

.carousel-container {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.carousel-item {
    min-width: 100%;
    height: 100%;
    position: relative;
}

.carousel-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
    pointer-events: none;
    z-index: 1;
}

.carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.4);
    color: white;
    border: none;
    padding: 0rem 0.8rem 0.4rem 1rem;
    cursor: pointer;
    z-index: 1;
    font-size: 2.4rem;
    border-radius: 0.2rem;
}

.carousel-button.prev {
    left: 0;
}

.carousel-button.next {
    right: 0;
}
</style>