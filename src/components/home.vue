<template lang="html">
  <div id="date-menu-wrap">
    <ul id='date-menu'>
      <li v-for='item in articalMenu' :key='item.index' @click='deliveryMsg(item.content)'>
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
import Msg from '../store/msg'
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
    },
    deliveryMsg (msg) {
      Msg.$emit('content', msg)
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
    width: 240px;
    height: 240px;
    border-radius: 6px;
    background-color: #d18c4b;
    margin: 10px;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
