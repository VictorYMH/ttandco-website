<template>
    <div class="left-nav-layout">
        <Header class="left-nav-layout-header"/>
        <div class="content-wrapper">
            <LeftNav :title="'TT&CO.产品分类'" :categories="categories" />
            <div class="content">
                <slot/>
            </div>
        </div>
        <Footer class="left-nav-layout-footer"/>
        <ScrollToTop/>
    </div>
</template>


<script>
import Header from '~/components/header.vue';
import Footer from '~/components/footer.vue';
import LeftNav from '~/components/left-nav.vue';
import ScrollToTop from '~/components/scroll-to-top.vue';
export default {
  name: "LeftNavLayout",
  components: {
    LeftNav,
    Header,
    Footer
 },
  data() {
    return {
      categories: [
        { name: "Category 1", collapsed: true, subItems: ["Sub-item 1", "Sub-item 2"] },
        { name: "Category 2", collapsed: true, subItems: ["Sub-item A", "Sub-item B"] },
      ]
    };
    }
}
</script>
<style scoped>
.left-nav-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.left-nav-layout-header {
    flex-shrink: 0;
}

.left-nav-layout-footer {
    flex-shrink: 0;
}

.content-wrapper {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    background: white;
}
.content {
    max-width: 50rem;
}
</style>