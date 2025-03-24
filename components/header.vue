<template>
    <header class="header">
        <div class="logo" @click="navigateTo('/')">
            <img src="@/public/logo.png" alt="Logo">
        </div>
        <nav class="nav">
            <ul>
                <li @click="navigateTo('/products')">Products</li>
                <li @click="navigateTo('/about')">About Us</li>
                <li @click="navigateTo('/brand')">Brand</li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'GeneralHeader',
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo img {
    height: 40px;
    cursor: pointer;
}

.nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav li {
    margin-left: 2rem;
    cursor: pointer;
    font-weight: bold;
}

@media (max-width: 768px) {
    .nav ul {
        flex-direction: column;
        align-items: center;
    }

    .nav li {
        margin: 0.5rem 0;
    }
}
</style>