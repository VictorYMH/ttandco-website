<template>
    <header class="header">
        <div class="logo" @click="navigateTo('/')">
            <img src="@/public/logo.png" alt="Logo">
        </div>
        <nav class="nav">
            <ul>
                <li @click="navigateTo('/')">首页</li>
                <li @click="navigateTo('/about-us')">关于我们</li>
                <li @click="navigateTo('/categories')">产品类别</li>
                <li @click="navigateTo('/only-one-series')">“ONLY-ONE Series”</li>
                <li @click="navigateTo('/sn-lookup')">防伪查询</li>
                <li @click="navigateTo('/store')">店铺信息</li>
                <!-- <li @click="navigateTo('/sn-lookup')">mini program</li>
                <li @click="navigateTo('/store')">店铺信息</li> -->
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
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
}

.logo {
    width: 100%;
    display: flex;
    justify-content: center;
}

.logo img {
    cursor: pointer;
}

.nav ul {
    display: flex;
    list-style: none;
    margin: 1rem 0 0;
    padding: 0;
}

.nav li {
    cursor: pointer;
    font-weight: bold;
    position: relative; /* Ensure proper positioning for pseudo-elements */
    border-right: 2px solid #3b3b3b; /* Add the vertical line */
    padding: 0 2rem; /* Add spacing between text and the line */
}

.nav li:last-child {
    border-right: none; /* Remove the line from the last item */
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