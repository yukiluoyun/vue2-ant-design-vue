<template>
  <div id="app">
    <number-jump />

    <router-view />
  </div>
</template>

<script>
import numberJump from '@/components/NumbersDownBg'

export default {
  components: { numberJump }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body {
  background-color: none !important;
  overflow: hidden;
}
</style>
