<template>
  <div class="container">
    <img src="/main-logo.png" class="logo" />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
  overflow: hidden;
}

.logo {
  max-width: 100%;
  max-height: 100%;
}
</style>