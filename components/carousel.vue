<template>
    <div class="carousel">
        <div 
            class="carousel-container" 
            ref="carouselContainer"
            :style="containerStyle"
            @transitionend="handleTransitionEnd"
        >
            <div 
                :class="['carousel-item', { 'top-shadow': topShadow }]" 
                v-for="(item, index) in displayItems"
                :key="`carousel-item-${index}`" 
                :style="{ flex: `0 0 ${100 / visibleItems}%` }"
            >
                <slot :item="item" :index="normalizeDisplayIndex(index)"></slot>
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
            isTransitioning: false,
            transitionEnabled: true,
        };
    },
    computed: {
        displayItems() {
            // Create the display array with enough items for smooth scrolling
            if (!this.items.length) return [];
            
            // We need items before and after for smooth scrolling
            return [
                ...this.items.slice(-this.visibleItems),  // Last N items at the beginning
                ...this.items,                            // Original items in the middle
                ...this.items.slice(0, this.visibleItems) // First N items at the end
            ];
        },
        containerStyle() {
            return {
                transform: `translateX(-${(this.currentIndex + this.visibleItems) * (100 / this.visibleItems)}%)`,
                transition: this.transitionEnabled ? 'transform 0.5s ease-in-out' : 'none'
            };
        },
        actualIndex() {
            // Convert currentIndex to the actual index in the original items array
            return this.normalizeIndex(this.currentIndex);
        }
    },
    methods: {
        normalizeIndex(index) {
            const length = this.items.length;
            return ((index % length) + length) % length;
        },
        normalizeDisplayIndex(index) {
            // Convert display index to the original items array index
            if (index < this.visibleItems) {
                // It's a prefix clone, map to the end of the original array
                return this.items.length - this.visibleItems + index;
            } else if (index >= this.visibleItems + this.items.length) {
                // It's a suffix clone, map to the beginning of the original array
                return index - this.items.length - this.visibleItems;
            } else {
                // It's from the original array
                return index - this.visibleItems;
            }
        },
        nextSlide() {
            if (this.isTransitioning) return;
            this.isTransitioning = true;
            this.currentIndex++;
        },
        prevSlide() {
            if (this.isTransitioning) return;
            this.isTransitioning = true;
            this.currentIndex--;
        },
        handleTransitionEnd() {
            this.isTransitioning = false;
            
            // If we've moved beyond the original items (into the cloned area)
            if (this.currentIndex >= this.items.length) {
                // Jump to the beginning without animation
                this.transitionEnabled = false;
                this.currentIndex = 0;
                // Force reflow before re-enabling transitions
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.transitionEnabled = true;
                    }, 5);
                });
            } else if (this.currentIndex < 0) {
                // Jump to the end without animation
                this.transitionEnabled = false;
                this.currentIndex = this.items.length - 1;
                // Force reflow before re-enabling transitions
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.transitionEnabled = true;
                    }, 5);
                });
            }
        },
        openModal(index) {
            const actualIndex = this.normalizeIndex(index);
            this.selectedImage = this.items[actualIndex].image_url;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.selectedImage = null;
        }
    },
    mounted() {
        // Set initial position to first real item
        this.currentIndex = 0;
    }
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