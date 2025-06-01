<template>
  <div class="about-us-container">
    <div class="about-us-title">
        <img src="/public/aboutus.png" alt="About Us" />
    </div>
    <div class="about-us-content">
        TT&CO.源自日本的一家头盔品牌，最初诞生于一个热爱改装的摩托车工作坊。我们痴迷于上世纪美国黄金年代的骑士文化，也曾亲手打造过无数充满个性的定制摩托车。
    </div>
    <div class="about-us-content">
        2015年，TT&CO.以全新姿态回归，正式成为专注于复古头盔设计与制造的专业品牌。我们秉承改装时代积累下来的美学品味与实战经验，致力于打造真正契合经典风格的骑士头盔。
    </div>
    <div class="about-us-content">
        我们的团队成员无一例外，都是重型机车的狂热骑士。从骑士的真实视角出发，我们敏锐地捕捉当下市场所缺乏的“美感”与“质感”，用热情与执念，将它们注入每一顶头盔中——每一款产品的开发、改良，我们都坚持亲力亲为，只为打造更理想的骑行装备。
    </div>
    <div class="about-us-content">
        TT&CO.的标志性工艺——手工皮革包边，通过传统缝制方式将真皮缝入盔体边缘，这种在现代已极为罕见的工艺，不仅赋予头盔独一无二的存在感，更展现出无与伦比的手工质感。
    </div>
    <div class="about-us-content">
        未来，我们将持续坚持将匠人精神与骑士文化融合，为热爱骑行的你，打造更富个性、更具灵魂的头盔。
    </div>
    <div class="about-us-content">
      TT&CO.让您的每一段旅程，更值得铭记。
    </div>
  </div>
  <RecentlyViewed />
</template>

<script setup>
import RecentlyViewed from '~/components/recently-viewed.vue';

definePageMeta({
  layout: 'left-nav-layout'
});

</script>

<style scoped>
.about-us-container {
  padding: 3.2rem 0;
}
.about-us-content {
  line-height: 1.8rem;
  margin: 1rem 0;
}
</style>