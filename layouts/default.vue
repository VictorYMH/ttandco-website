<template>
    <div class="default-layout">
        <Header class="default-layout-header"/>
        <div class="content-wrapper">
            <slot/>
        </div>
        <Footer class="default-layout-footer"/>
        <ScrollToTop/>
    </div>
</template>


<script>
import Header from '~/components/header.vue';
import Footer from '~/components/footer.vue';
import ScrollToTop from '~/components/scroll-to-top.vue';
</script>
<style scoped>
.default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: white;
}

.default-layout-header {
    flex-shrink: 0;
}

.default-layout-footer {
    flex-shrink: 0;
}

.content-wrapper {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
</style>