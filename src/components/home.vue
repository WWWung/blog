<template lang="html">
  <div id="date-menu-wrap">
    <ul id='date-menu'>
      <li v-for='item in articalMenu' :key='item.index' @click='deliveryMsg(item)'>
        <div class="item-title">
          {{item.title}}
        </div>
        <div class="item-date">
          {{item.time}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
var url = 'http://127.0.0.8:3000/?baseName=article'

export default {
  data () {
    return {
      articalMenu: []
    }
  },
  mounted () {
    this.$http.get(url).then((d) => {
      this.articalMenu = d.data
      console.log(d)
    })
  },
  methods: {
    deliveryMsg (blog) {
      this.$store.commit('getBlogInfo', blog)
      console.log(this.$store)
      this.$router.push({path: '/content?id=' + blog.id})
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
  }
  #date-menu li {
    width: 240px;
    height: 240px;
    border-radius: 6px;
    background-color: #d18c4b;
    margin: 10px;
    box-sizing: border-box;
    padding: 30px;
    float: left;
  }
</style>
