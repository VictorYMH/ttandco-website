<template>
    <div class="all-categories-container">
        <div class="category" v-for="(category, index) in categories" :key="index">
            <slot :item="category"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "AllCategories",
    props: {
        categories: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.all-categories-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem; 
}

.category {
    padding: 0;
    flex: 1 1 calc(33.33% - 1rem);
}
</style>