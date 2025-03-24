<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-links">
                <router-link to="/aboutus" class="footer-link">About Us</router-link>
                <router-link to="/contact" class="footer-link">Contact</router-link>
            </div>
            <div class="footer-social">
                <a href="https://facebook.com" target="_blank" class="social-link">Facebook</a>
                <a href="https://twitter.com" target="_blank" class="social-link">Twitter</a>
                <a href="https://instagram.com" target="_blank" class="social-link">Instagram</a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style scoped>
.footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    text-align: center;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-links, .footer-social {
    margin: 10px 0;
}

.footer-link, .social-link {
    color: #fff;
    margin: 0 10px;
    text-decoration: none;
}

.footer-link:hover, .social-link:hover {
    text-decoration: underline;
}

@media (min-width: 768px) {
    .footer-content {
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>