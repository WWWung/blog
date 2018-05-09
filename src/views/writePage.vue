<template lang="html">
  <div id="write-page">
    <Head-view></Head-view>
    <Write-view></Write-view>
  </div>
</template>

<script>
import Head from '../components/head'
import Write from '../components/write'
export default {
  components: {
    'Head-view': Head,
    'Write-view': Write
  }
}
</script>

<style lang="css" scoped>
</style>
