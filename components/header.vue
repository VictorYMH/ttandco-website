<template>
    <header ref="header" class="header">
        <div class="side-menu">
            <img class="side-menu-icon" src="@/public/icons/side-menu.png" alt="side-menu" @click="toggleMobileNav"></div>
        <div class="logo" @click="navigateTo('/')">
            <img src="@/public/logo.png" alt="Logo">
        </div>
        <nav class="nav">
            <ul class="item-container">
                <li class="nav-item" v-for="item in navItems" :key="item.label" @click="navigateTo(item.route)"
                    :class="{ selected: isSelected(item.route) }">
                    <div class="item-title">{{ item.label }}</div>
                    <div v-if="item.subNav" class="sub-nav">
                        <div v-for="(column, columnIndex) in item.subNav" :key="columnIndex" class="sub-nav-column">
                            <ul>
                                <li v-for="subItem in column" :key="subItem.label"
                                    @click.stop="navigateTo(subItem.route)">
                                    {{ subItem.label }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="icon-container">
                <li class="icon-item" @click="navigateTo('/store')">
                    <div class="mini-program icon"></div>
                </li>
                <li class="icon-item" @click="navigateTo('/store')">
                    <div class="taoabao icon"></div>
                </li>
                <li class="icon-item" @click="navigateTo('/store')">
                    <div class="wechat-tk icon"></div>
                </li>
                <li class="icon-item" @click="navigateTo('/store')">
                    <div class="rednote icon"></div>
                </li>
            </ul>
        </nav>
    </header>
    <div class="header-placeholder" :style="{ height: headerHeight }"></div>
</template>

<script>
import { useHeaderHeight } from '~/composables/useHeaderHeight';

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
                    ], [
                        { label: '子类别1', route: '/categories/sub1' },
                        { label: '子类别2', route: '/categories/sub2' },
                    ]]
                },
                { label: '“ONLY-ONE Series”', route: '/only-one-series' },
                { label: '防伪查询', route: '/sn-lookup' },
                { label: '店铺信息', route: '/store' },
            ]
        };
    },
    setup() {
        const { headerHeight, updateHeaderHeight } = useHeaderHeight()
        
        return {
            headerHeight,
            updateHeaderHeight
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        handleHeaderHeightUpdate() {
            const header = this.$refs.header;
            if (header) {
                this.updateHeaderHeight(header);
                // Emit the header element so layouts can also use it
                this.$emit('header-mounted', header);
            }
        },
        isSelected(route) {
            return this.$route.path === route;
        },
        toggleMobileNav() {
            this.$emit('toggle-mobile-nav');
        }
    },
    mounted() {
        this.handleHeaderHeightUpdate();
        window.addEventListener('resize', this.handleHeaderHeightUpdate);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleHeaderHeightUpdate);
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
    z-index: 1000;
    position: fixed;
    top: 0;
    width: 100%;
    transition: position 0.3s, box-shadow 0.3s;
}

.header-placeholder {
    display: block;
}

.side-menu {
    display: none;
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
    background-size: 1.4rem 1.4rem;
    /* Resize the image to fit the div */
    background-repeat: no-repeat;
    /* Prevent tiling */
    background-position: center;
    /* Center the image */
}

.nav .icon-container .icon-item .wechat-tk {
    background-image: url('/icons/wechat_tk_grey.png');
}

.nav .icon-container .icon-item .rednote {
    background-image: url('/icons/rednote_grey.png');
}

.nav .icon-container .icon-item .taoabao {
    background-image: url('/icons/taobao_grey.png');
}

.nav .icon-container .icon-item .mini-program {
    background-image: url('/icons/mini_program_grey.png');
}

.nav .icon-container .icon-item .wechat-tk:hover {
    background-image: url('/icons/wechat_tk_orig.png');
}

.nav .icon-container .icon-item .rednote:hover {
    background-image: url('/icons/rednote_orig.png');
}

.nav .icon-container .icon-item .taoabao:hover {
    background-image: url('/icons/taobao_orig.png');
}

.nav .icon-container .icon-item .mini-program:hover {
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

.nav .nav-item.selected .item-title,
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

@media (max-width: 576px) {
    .header {
        align-items: flex-end;
        padding: 1rem 0;
        justify-content: space-between;
    }
    .side-menu {
        display: block;
        flex: 1 1 30%;
        max-width: 30%;
    }

    .side-menu .side-menu-icon {
        width: 1rem;
        cursor: pointer;
        padding: 0 0 0 1rem;
    }

    .logo {
        width: 36%;
        margin: 0 auto; /* Centers the second column horizontally */
    }
    .nav{
        flex: 1 1 30%;
        max-width: 30%;
    }
    .nav .item-container {
        display: none;
    }

    
    .nav .icon-container {
        gap: 0.2rem;
        margin: 0 0;
        width: 30%;
    }

    .nav .icon-container .icon-item {
        width: unset;
    }

    .nav .icon-container .icon-item .icon {
        width: 1.4rem;
        height: 1.4rem;
        background-size: cover;
    }
    
    .nav .icon-container .icon-item .wechat-tk {
        background-image: url('/icons/wechat_tk_sq.png');
    }

    .nav .icon-container .icon-item .rednote {
        background-image: url('/icons/rednote_sq.png');
    }

    .nav .icon-container .icon-item .taoabao {
        background-image: url('/icons/taobao_sq.png');
    }

    .nav .icon-container .icon-item .mini-program {
        background-image: url('/icons/mini_program_sq.png');
    }
}
</style>