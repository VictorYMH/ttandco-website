<template>
    <div class="carousel">
        <div
            class="carousel-container"
            :style="{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }"
        >
            <div
                :class="['carousel-item', { 'top-shadow': topShadow }]"
                v-for="(item, index) in itemsWithClones"
                :key="index"
                :style="{ flex: `0 0 ${100 / visibleItems}%` }"
            >
                <slot :item="item"></slot>
            </div>
        </div>
        <button 
            class="carousel-button prev" 
            @click="prevSlide" 
            :style="{ backgroundColor: navButtonBackground }"
        >
            <img src="/icons/left_arrow.png" />
        </button>
        <button 
            class="carousel-button next" 
            :style="{ backgroundColor: navButtonBackground }"
            @click="nextSlide">
            <img src="/icons/right_arrow.png" />
        </button>
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
        topShadow: {
            type: Boolean,
            default: false,
        },
        visibleItems: {
            type: Number,
            default: 1, // Show 1 item by default
        },
        navButtonBackground: {
            type: String,
            default: 'transparent',
        },
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    computed: {
        itemsWithClones() {
            // Add clones of the first and last items for infinite looping
            return [
                ...this.items.slice(-this.visibleItems),
                ...this.items,
                ...this.items.slice(0, this.visibleItems),
            ];
        },
    },
    methods: {
        nextSlide() {
            this.currentIndex++;
            if (this.currentIndex > this.items.length) {
                // Reset to the first item (after clones)
                setTimeout(() => {
                    this.currentIndex = this.visibleItems;
                }, 500); // Match the transition duration
            }
        },
        prevSlide() {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                // Reset to the last item (before clones)
                setTimeout(() => {
                    this.currentIndex = this.items.length - 1;
                }, 500); // Match the transition duration
            }
        },
    },
    mounted() {
        // Start at the first real item (after clones)
        this.currentIndex = this.visibleItems;
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
    will-change: transform;
}

.carousel-item {
    height: 100%;
    position: relative;
}

.top-shadow::before {
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
    color: white;
    border: none;
    padding: 0.4rem;
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