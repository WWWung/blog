<template lang="html">
  <header id="app-head">
    帐号信息
  </header>
</template>

<script>
export default {
  data(){
    return {
      user: {
        name: '',
        introduce: '',
        image: ''
      }
    }
  }
}
</script>

<style lang="css">
  #app-head {
    width: 1400px;
    height: 135px;
    text-align: center;
  }
</style>
