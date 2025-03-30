<template>
  <div class="left-nav">
    <div class="top-fixed-container">
      <div class="logo-container">
        <img src="@/public/logo.png" alt="Logo" class="logo" />
     </div>
     <div class="recommend-category">
      <a href="/categories" class="recommend-category-link">新品推荐</a>
     </div>
      <div class="search-container">
        <input type="text" placeholder="Search..." class="search-input" />
        <div class="search-button-container">
          <button class="search-button" aria-label="Search">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="background-color: black;">
              <circle cx="10" cy="10" r="7" stroke="white" stroke-width="2" fill="none" />
              <line x1="14" y1="14" x2="20" y2="20" stroke="white" stroke-width="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <h2>{{ title }}</h2>
    </div>
    <ul class="nav-list">
      <li v-for="(category, index) in categories" :key="index" class="nav-item">
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeftNav",
  props: {
    title: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.left-nav {
  background-color: #fff;
  padding: 1.6rem;
  width: fit-content;
}

.top-fixed-container .logo-container .logo{
  max-width: 14rem;
}
.recommend-category {
  padding: .8rem 1rem;
  display: flex;
  justify-content: center;
}

.recommend-category .recommend-category-link {
  background: black;
  color: white;
  padding: 0.4rem 1.8rem;
  font-size: .8rem;
  font-weight: bold;
  border-radius: 0.4rem;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.search-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

.search-input {
    line-height: 1.8rem;
}



.nav-header {}

.nav-header h2 {}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  cursor: pointer;
}

.nav-item:hover {}
</style>