<template>
    <div class="carousel">
        <div class="carousel-container" :style="{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }">
            <div :class="['carousel-item', { 'top-shadow': topShadow }]" v-for="(item, index) in itemsWithClones"
                :key="index" :style="{ flex: `0 0 ${100 / visibleItems}%` }">
                <slot :item="item"></slot>
            </div>
        </div>
        <button v-if="enableSeeLargeButton" class="see-large-button" @click="openModal(currentIndex)">
            放大图片
        </button>
        <button class="carousel-button prev" @click="prevSlide" :style="{ backgroundColor: navButtonBackground }">
            <picture>
                <source srcset="/icons/left_arrow_sm.png" media="(max-width: 576px)" />
                <img src="/icons/left_arrow.png" alt="Previous" />
            </picture>
        </button>
        <button class="carousel-button next" :style="{ backgroundColor: navButtonBackground }" @click="nextSlide">
            <picture>
                <source srcset="/icons/right_arrow_sm.png" media="(max-width: 576px)" />
                <img src="/icons/right_arrow.png" alt="Previous" />
            </picture>
        </button>

        <Modal v-model="isModalOpen">
            <div class="modal-content" @click.stop>
                <img :src="selectedImage" alt="Large View" />
            </div>
        </Modal>
    </div>
</template>

<script>
import Modal from './modal.vue';
export default {
    name: "Carousel",
    components: { Modal },
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
        enableSeeLargeButton: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentIndex: 0,
            isModalOpen: false,
            selectedImage: null,
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
        openModal(currentIndex) {
            this.selectedImage = this.items[currentIndex-1].image_url;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedImage = null;
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

.see-large-button {
    position: absolute;
    bottom: 10%;
    right: 10%;
    color: #717171;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 0.8rem;
    background: transparent;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
}

.modal-content img {
    max-width: 100%;
    max-height: 100%;
}

</style>