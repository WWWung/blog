<template lang="html">
  <div id="date-menu-wrap">
    <ul id='date-menu'>
      <li v-for='item in articalMenu' :key='item.index' @click='clickTest'>
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
var url = 'https://www.easy-mock.com/mock/5ae432a63ed818654bc27f5e/blog/date'

export default {
  data () {
    return {
      articalMenu: []
    }
  },
  mounted () {
    this.$http.post(url).then((d) => {
      this.articalMenu = d.data.data
      console.log(d)
    })
  },
  methods: {
    clickTest () {
      console.log(this.articalMenu)
    }
  }
}
</script>

<style lang="css">
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  #date-menu {
    width: 1200px;
    margin: 0 auto;
    display: flex;
  }
  #date-menu li {
    width: 320px;
    height: 320px;
    border-radius: 6px;
    background-color: #d18c4b;
    margin: 10px;
  }
</style>
