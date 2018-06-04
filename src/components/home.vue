<template lang="html">
  <div id="date-menu-wrap" ref='list'>
    <ul id='date-menu' class="clearfix">
      <li v-for='item in articalMenu' :key='item.index' @click='deliveryMsg(item)'>
        <h2 class="item-title">
          {{item.title}}
        </h2>
        <p class="easy-content">
          省略的博客内容
        </p>
        <div class="item-date">
          <time>
            {{timeFormater(item.time)}}
          </time>
          <i class='support-icon'></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
let count = 5
let start = 0
let end = start + count

export default {
  data () {
    return {
      articalMenu: [],
      url: 'http://127.0.0.8:3000/support?start=',
      dataSwitch: true
    }
  },
  mounted () {
    this.getData(this)
    const _this = this
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const offsetHeight = document.body.offsetHeight
      if (offsetHeight - clientHeight - scrollTop < 30 && _this.dataSwitch) {
        _this.dataSwitch = false
        _this.getData(_this)
      }
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
    },
    getData (_this) {
      const url = _this.url + start + '&end=' + end
      _this.$http.get(url).then((d) => {
        console.log(url)
        _this.articalMenu = _this.articalMenu.concat(d.data)
        start += d.data.length
        end = start + 3
        _this.dataSwitch = true
      }).catch((e) => {
        console.log(e)
        _this.dataSwitch = true
      })
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
    width: 1000px;
    margin: 0 auto;
  }
  #date-menu-wrap {
    padding-top: 50px;
  }
  #date-menu li {
    height: 220px;
    border-radius: 6px;
    margin: 20px;
    box-sizing: border-box;
    box-shadow: 1px 1px 1px 0 rgba(31, 35, 46, 0.25);
    padding: 15px;
    transition: all .2s ease;
  }
  #date-menu li:hover {
    box-shadow: 15px 15px 45px -10px rgba(10, 16, 34, 0.3);
    transform: translate(0, -2px);
  }
  #date-menu li h2 {
    font-style: 32px;
    line-height: 34px;
  }
  .easy-content {
    font-size: 15px;
    line-height: 24px;
    height: 130px;
  }
  .item-date time{
    font-size: 12px;
    line-height: 24px;
    display: inline-block;
  }
  .support-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('../../static/imgs/support.png') no-repeat center center;
    background-size: 100%, 100%;
    vertical-align: middle;
    margin-left: 20px;
  }
</style>
