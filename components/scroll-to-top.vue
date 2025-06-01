<template>
    <div class="scroll-to-top" @click="scrollToTop" v-show="showScrollToTop">
        <div class="scroll-to-top-icon">
            <img src="/icons/up_arrow.png" alt="Scroll to Top" />
        </div>
        <div>返回顶部</div>
    </div>
</template>

<script>
export default {
    name: 'ScrollToTop',
    data() {
        return {
            showScrollToTop: true
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        handleScroll() {
            this.showScrollToTop = window.scrollY > 200;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>

<style scoped>
.scroll-to-top {
    position: fixed;
    background-color: #2d2d2d;
    color: white;
    bottom: 0;
    right: 10%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    z-index: 11;
}

.scroll-to-top-icon {
    width: 16px;
}

@media screen and (max-width: 576px) {
    .scroll-to-top {
        font-size: .8rem;
    }
}
</style>