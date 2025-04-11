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
        <input
          type="text"
          placeholder="Search..."
          class="search-input"
          v-model="searchQuery"
        />
        <div class="search-button-container">
          <input
            class="search-button"
            type="submit"
            aria-label="Search"
            @click="handleSearch"
          />
          <svg
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            style="background-color: black;"
            @click="handleSearch"
          >
            <circle cx="10" cy="10" r="7" stroke="white" stroke-width="2" fill="none" />
            <line x1="14" y1="14" x2="20" y2="20" stroke="white" stroke-width="2" />
          </svg>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="nav-header">
      {{ title }}
    </div>
    <ul class="nav-list">
      <li
        v-for="(category, index) in categories"
        :key="index"
        class="nav-item"
      >
        <div
          @click="toggleCollapse(index)"
          class="nav-item-header"
          :class="{ expanded: !category.collapsed }"
        >
          {{ category.name }}
          <span class="collapse-icon">
            {{ category.collapsed ? '+' : '-' }}
          </span>
        </div>
        <ul v-if="!category.collapsed" class="sub-list">
          <li
            v-for="(subItem, subIndex) in category.subItems"
            :key="subIndex"
            class="sub-item"
          >
           - {{ subItem }}
          </li>
        </ul>
      </li>
    </ul>
    
    <div class="divider"></div>

    <div class="nav-header">
      官方媒体
    </div>
    <ul class="media-list">
      <li v-for="(media, index) in medias" :key="index" class="media-item">
        <div class="media-item-container">
          <img :src="media.icon" alt="Media Icon" class="media-icon" />
          <a :href="media.url" target="_blank" class="media-link">{{ media.name }}</a>
        </div>
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
  data() {
    return {
      searchQuery: "",
      medias: [ 
        {
          name: "微信小程序",
          url: "https://twitter.com/yourprofile",
          icon: "favicon.ico",
        },
        {
          name: "淘宝店铺",
          url: "https://instagram.com/yourprofile",
          icon: "favicon.ico",

        },
        {
          name: "视频号",
          url: "https://facebook.com/yourprofile",
          icon: "favicon.ico",

        },
        {
          name: "小红书",
          url: "https://youtube.com/yourprofile",
          icon: "favicon.ico",
        }
      ]
    };
  },
  methods: {
    handleSearch() {
      console.log("Search triggered with query:", this.searchQuery);
      // Add your search logic here
    },
    toggleCollapse(index) {
      this.categories[index].collapsed = !this.categories[index].collapsed;
    },
  },
};
</script>

<style scoped>
.left-nav {
  background-color: #fff;
  padding: 1.6rem;
  width: fit-content;
}

.top-fixed-container .logo-container .logo {
  max-width: 14rem;
}

.recommend-category {
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: center;
}

.recommend-category .recommend-category-link {
  background: black;
  color: white;
  padding: 0.4rem 1.8rem;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 0.4rem;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 0 1.6rem;
}

.search-button {
  display: none; /* Hide the native input */
}

.search-button-container {
  display: flex;
  align-items: center;
}

.search-icon {
  cursor: pointer; /* Make the SVG clickable */
  height: 2.2rem;
  width: 2.2rem;
}

.search-input {
  line-height: 1.8rem;
}

.divider {
  height: 2px;
  background: black;
  margin: 0.2rem 0;
}

.nav-header {
  font-size: 1.1rem;
  text-align: center;
  padding: 0;
  line-height: 2.2rem;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font-weight: 600;
}

.nav-list,
.media-list {
  list-style: none;
  margin: 0;
  padding: 1rem 0 1rem;
}

.nav-item,
.media-item {
  cursor: pointer;
  color: grey;
}

.media-item {
  padding: .3rem 1rem;
}

.nav-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: .3rem 1rem;

}

.nav-item-header.expanded {
  background-color: black;
  color: white;
}

.collapse-icon {
  font-weight: bold;
}

.nav-item .sub-list {
  list-style: none;
  padding: 0.4rem 1rem;
  background-color: #dedede;
  border-bottom: 1px solid black;
}

.sub-item {
  color: #393939;
  padding: 0.2rem 0;
}

.media-item-container {
  display: flex;
  align-items: center;
}

.media-icon {
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;
  border: 3px solid #c3c3c3;
  margin: 0 1rem 0 0;
}

</style>