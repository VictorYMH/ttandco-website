<template>
    <header ref="header" class="header">
        <div class="logo" @click="navigateTo('/')">
            <img src="@/public/logo.png" alt="Logo">
        </div>
        <nav class="nav">
            <ul class="item-container">
                <li class="nav-item" v-for="item in navItems" :key="item.label" @click="navigateTo(item.route)">
                    <div class="item-title">{{ item.label }}</div>
                    <div v-if="item.subNav" class="sub-nav">
                        <div v-for="(column, columnIndex) in item.subNav" :key="columnIndex" class="sub-nav-column">
                            <ul>
                                <li v-for="subItem in column" :key="subItem.label" @click.stop="navigateTo(subItem.route)">
                                    {{ subItem.label }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="icon-container">
                <li class="icon-item" @click="navigateTo('/store')"><div class="mini-program icon" src="/icons/mini_program_grey.png"></div></li>
                <li class="icon-item" @click="navigateTo('/store')"><div class="taoabao icon" src="/icons/taobao_grey.png"></div></li>
                <li class="icon-item" @click="navigateTo('/store')"><div class="wechat-tk icon" src="/icons/wechat_tk_grey.png"></div></li>
                <li class="icon-item" @click="navigateTo('/store')"><div class="rednote icon" src="/icons/rednote_grey.png"></div></li>
            </ul>
        </nav>
    </header>
    <div class="header-placeholder" :style="{ height: headerHeight }"></div>
</template>

<script>
export default {
    name: 'GeneralHeader',
    data() {
        return {
            navItems: [
                { label: '首页', route: '/' },
                { label: '关于我们', route: '/about-us' },
                {
                    label: '产品类别', route: '/categories', subNav: [[
                        { label: '子类别1', route: '/categories/sub1' },
                        { label: '子类别2', route: '/categories/sub2' },
                        { label: '子类别2', route: '/categories/sub2' },
                    ], [
                        { label: '子类别1', route: '/categories/sub1' },
                        { label: '子类别2', route: '/categories/sub2' },
                        { label: '子类别2', route: '/categories/sub2' },
                    ],[
                        { label: '子类别1', route: '/categories/sub1' },
                        { label: '子类别2', route: '/categories/sub2' },
                    ]]
                },
                { label: '“ONLY-ONE Series”', route: '/only-one-series' },
                { label: '防伪查询', route: '/sn-lookup' },
                { label: '店铺信息', route: '/store' },
            ],
            headerHeight: '184px' // Store the calculated height
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        updateHeaderHeight() {
            const header = this.$refs.header;
            if (header) {
                this.headerHeight = `${header.offsetHeight}px`;
            }
        }
    },
    mounted() {
        this.updateHeaderHeight();
        window.addEventListener('resize', this.updateHeaderHeight); // Recalculate on window resize
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateHeaderHeight);
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 1rem 0;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;
    transition: position 0.3s, box-shadow 0.3s;
}

.header-placeholder {
    display: block;
}


.logo {
    width: 100%;
    display: flex;
    justify-content: center;
}

.logo img {
    cursor: pointer;
}

.nav {
    display: flex;
    gap: 4rem;
}

.nav .item-container,
.nav .icon-container {
    display: flex;
    list-style: none;
    margin: 1rem 0 0;
    padding: 0;
}

.nav .icon-container {
    gap: 0.4rem;
    margin: 0.2rem 0 0;
}

.nav .icon-container .icon-item {
    width: 1.4rem;
}

.nav .icon-container .icon-item .icon {
    width: 100%;
    height: 100%;
    background-size: 1.4rem 1.4rem; /* Resize the image to fit the div */
    background-repeat: no-repeat; /* Prevent tiling */
    background-position: center; /* Center the image */
}

.nav .icon-container .icon-item .wechat-tk{
    background-image: url('/icons/wechat_tk_grey.png');
}

.nav .icon-container .icon-item .rednote{    
    background-image: url('/icons/rednote_grey.png');
}

.nav .icon-container .icon-item .taoabao{    
    background-image: url('/icons/taobao_grey.png');
}

.nav .icon-container .icon-item .mini-program{
    background-image: url('/icons/mini_program_grey.png');
}

.nav .icon-container .icon-item .wechat-tk:hover{
    background-image: url('/icons/wechat_tk_orig.png');
}

.nav .icon-container .icon-item .rednote:hover{    
    background-image: url('/icons/rednote_orig.png');
}

.nav .icon-container .icon-item .taoabao:hover{    
    background-image: url('/icons/taobao_orig.png');
}

.nav .icon-container .icon-item .mini-program:hover{
    background-image: url('/icons/mini_program_orig.png');
}

.nav .nav-item {
    cursor: pointer;
    font-weight: bold;
    position: relative;
    padding: 0 2rem 1px;
}

.nav .nav-item::after {
    content: '';
    position: absolute;
    right: 0;
    height: 40%;
    width: 1.5px;
    background-color: #313131;
    top: 10%;
}

.nav .nav-item:last-child::after {
    content: none;
}

.nav .nav-item .item-title {
    padding: 0 0 .6rem;
    border-bottom: 2px solid transparent;
    line-height: 1.2; 
}

.nav .nav-item:hover .item-title {
    border-bottom-color: #313131;
}

.nav .nav-item:hover .sub-nav {
    display: flex;
    justify-content: flex-start;
}

.sub-nav {
    display: none;
    position: fixed;
    left: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    list-style: none;
    margin: 0;
    z-index: 10;
    width: 100%;
    padding: 1.4rem 16rem;
}

.sub-nav::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: .6rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.18), transparent);
    pointer-events: none;
    z-index: 10;
}

.sub-nav li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    white-space: nowrap;
    list-style: none;
    font-weight: 400;
}

.sub-nav li:hover {
    font-weight: 500;
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