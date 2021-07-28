<template>
  <div class="not-found">
    <h2>403</h2>
    <h3>Forbidden</h3>
    <div>
      <router-link :to="{ name: 'Home' }">Return to home page</router-link>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>