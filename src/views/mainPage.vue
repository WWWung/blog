<template lang="html">
  <div id="wrap">
    <Head-view></Head-view>
    <Home-content></Home-content>
  </div>
</template>

<script>
import Head from '../components/head.vue'
import homeContent from '../components/home'
export default {
  components: {
    'Head-view': Head,
    'Home-content': homeContent
  }
}
</script>

<style lang="css">
#wrap {
  width: 1400px;
  margin: 0 auto;
}
</style>
