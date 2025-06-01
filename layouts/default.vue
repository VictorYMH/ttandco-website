<template>
    <div class="default-layout" :style="cssVars">
        <Header class="default-layout-header" @toggle-mobile-nav="toggleMobileNav" @header-mounted="onHeaderMounted"
            ref="header" />
        <div class="content-wrapper">
            <slot />
        </div>
        <!-- Mobile Navigation Menu -->
        <LeftNav class="left-nav" :class="{ 'mobile-nav-open': isMobileNavOpen }" :title="'TT&CO.产品分类'"
            :categories="categories" />
        <!-- Mobile overlay -->
        <div v-if="isMobileNavOpen" class="mobile-overlay" @click="closeMobileNav"></div>
        <Footer class="default-layout-footer" />
        <ScrollToTop />
        <!-- Popup Component -->
        <Popup :desktop-image="popupDesktopImage" :mobile-image="popupMobileImage" :image-alt="popupImageAlt"
            :auto-show="true" :show-delay="2000" :show-once="true" @popup-shown="onPopupShown"
            @popup-closed="onPopupClosed" />
    </div>
</template>

<script>
import Header from '~/components/header.vue';
import Footer from '~/components/footer.vue';
import ScrollToTop from '~/components/scroll-to-top.vue';
import LeftNav from '~/components/left-nav.vue';
import Popup from '~/components/popup.vue';
import { useHeaderHeight } from '~/composables/useHeaderHeight';
export default {
    name: "DefaultLayout",
    components: {
        Header,
        Footer,
        LeftNav,
        ScrollToTop,
        Popup
    },
    data() {
        return {
            isMobileNavOpen: false,
            categories: [
                { name: "Category 1", collapsed: true, subItems: ["Sub-item 1", "Sub-item 2"] },
                { name: "Category 2", collapsed: true, subItems: ["Sub-item A", "Sub-item B"] },
            ],
            // Popup configuration
            popupDesktopImage: '/global_offer/desktop.jpg',
            popupMobileImage: '/global_offer/mobile.png',
            popupImageAlt: 'TT&CO Special Offer'
        };
    },
    setup() {
        const { headerHeight, updateHeaderHeight, getHeaderHeightCSSVar } = useHeaderHeight()

        return {
            headerHeight,
            updateHeaderHeight,
            getHeaderHeightCSSVar
        }
    },
    computed: {
        cssVars() {
            return this.getHeaderHeightCSSVar();
        }
    },
    methods: {
        toggleMobileNav() {
            this.isMobileNavOpen = !this.isMobileNavOpen;
        },
        closeMobileNav() {
            this.isMobileNavOpen = false;
        },
        navigateToAndClose(route) {
            this.$router.push(route);
            this.closeMobileNav();
        },
        onHeaderMounted(headerElement) {
            // Header component already handles the height update
            // This is just for any additional layout-specific logic if needed
        },
        // Popup event handlers
        onPopupShown() {
            console.log('Popup shown');
        },
        onPopupClosed() {
            console.log('Popup closed');
        }
    },
    mounted() {
        // Close mobile nav when clicking outside or on route change
        this.$router.afterEach(() => {
            this.isMobileNavOpen = false;
        });

        // Header component handles its own height updates
        // No need for duplicate logic here
    }
}
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

.mobile-overlay,
.left-nav {
    display: none;
}

@media screen and (max-width: 576px) {
    .left-nav {
        position: fixed;
        top: var(--header-height, 80px);
        left: -100%;
        height: calc(100vh - var(--header-height, 80px));
        width: 60%;
        max-width: 300px;
        z-index: 1000;
        background: #f1f1f1;
        transition: left 0.3s ease-in-out;
        overflow-y: auto;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        display: block;
    }

    .left-nav.mobile-nav-open {
        left: 0;
        height: 100%;
    }

    .mobile-overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        animation: fadeIn 0.3s ease-in-out forwards;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
}
</style>