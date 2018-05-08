<template lang="html">
  <div id="blog" >
    <Head-view></Head-view>
    <Artical-view></Artical-view>
  </div>
</template>

<script>
import Head from '../components/head'
import Artical from '../components/artical'
export default {
  components: {
    'Head-view': Head,
    'Artical-view': Artical
  }
}
</script>

<style lang="css">

</style>
