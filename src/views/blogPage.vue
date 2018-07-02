<template lang="html">
  <div id="blog" >
    <Head-view></Head-view>
    <Artical-view></Artical-view>
  </div>
</template>

<script>
import Head from '../components/head'
import Artical from '../components/article'
export default {
  components: {
    'Head-view': Head,
    'Artical-view': Artical
  }
}
</script>

<style lang="css">
#blog {
  margin-top: 60px;
}
</style>
