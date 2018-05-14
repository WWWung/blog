<template lang="html">
  <div id="date-menu-wrap">
    <ul id='date-menu'>
      <li v-for='item in articalMenu' :key='item.index' @click='deliveryMsg(item)'>
        <div class="item-title">
          {{item.title}}
        </div>
        <div class="item-date">
          {{timeFormater(item.time)}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const url = 'http://127.0.0.8:3000/?baseName=article'

export default {
  data () {
    return {
      articalMenu: []
    }
  },
  mounted () {
    this.$http.get(url).then((d) => {
      this.articalMenu = d.data
    }).catch((e) => {
      console.log(e)
    })
  },
  methods: {
    deliveryMsg (blog) {
      this.$store.commit('getBlogInfo', blog)
      this.$router.push({path: '/content?id=' + blog.id})
    },
    // 此处因为要传参数所以不适合用计算属性
    timeFormater (t) {
      const time = new Date(t)
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
