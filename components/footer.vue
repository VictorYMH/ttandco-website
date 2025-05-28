<template>
    <div class="footer-container">
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-column">
                    <div class="header-title">TT&CO. 官方小程序</div>
                    <div class="mini-program-code-container">
                        <img src="@/public/mini_program_code.png" alt="Mini Program Code" class="mini-program-code">
                    </div>
                    <div class="subscribe-message">关注TT&CO.</div>
                </div>

                <div class="footer-column">
                    <div class="header-title">关于TT&CO.</div>
                    <div class="footer-links">
                        <router-link to="/about-us" class="footer-link">关于我们</router-link>
                        <a href="https://taobao.com" target="_blank" class="footer-link">淘宝店铺</a>
                        <a href="https://tmall.com" target="_blank" class="footer-link">天猫旗舰店</a>
                    </div>
                </div>

                <div class="footer-column">
                    <div class="header-title">联系我们</div>
                    <div class="footer-links">
                        <router-link to="/customer-service" class="footer-link">官方咨询</router-link>
                        <a href="mailto:ttandcochina@gmail.com" class="footer-link">Email: ttandcochina@gmail.com</a>
                    </div>
                </div>

                <div class="footer-column">
                    <img src="@/public/white_logo.png" alt="Mini Program Code" class="logo">
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            showScrollToTop: false
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style scoped>
.footer-container {
    position: relative;
}

.footer {
    background-color: #000;
    color: #fff;
    text-align: left;
}

.footer-content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem 0;
    gap: 2.4rem;
}

.header-title {
    font-weight: bold;
    margin: 0 0 0.6rem;
}

.footer-column .subscribe-message {
    font-weight: bold;
    text-align: center;
}

.footer-links,
.footer-social {
    flex-wrap: wrap;
    display: flex;
}

.footer-link {
    color: #fff;
    text-decoration: none;
    width: 100%;
    font-size: .8rem;
    line-height: 1.4rem;
}

.footer-column .mini-program-code-container {
    max-width: 10rem;
    margin: 1rem auto;
}

.footer-column .logo {
    max-width: 18rem;
    margin: 3rem 0;
}

.footer-link:hover,
.social-link:hover {
    text-decoration: underline;
}

@media (max-width: 576px) {
    .footer-container {
        display: none;
    }
}
</style>