<template lang="html">
  <div id="wrap">
    <Head-view></Head-view>
    <Home-content></Home-content>
    <!-- <Aside></Aside> -->
  </div>
</template>

<script>
import Head from '../components/head.vue'
import homeContent from '../components/home'
import Aside from '../components/aside'
export default {
  components: {
    'Head-view': Head,
    'Home-content': homeContent,
    Aside
  }
}
</script>

<style lang="css">
</style>
