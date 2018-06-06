<template lang="html">
  <div id="date-menu-wrap" ref='list'>
    <ul id='date-menu' class="clearfix">
      <li v-for='item in articalMenu' :key='item.index' @click='deliveryMsg(item)'>
        <h2 class="item-title">
          {{item.title}}
        </h2>
        <div class="clearfix">
          <p class="easy-content">
            省略的博客内容省略的博客内容省略的博客内容省略的博客内容省略的博客内容省略的博客内容省略的博客内容省略的略的博客内容省略的博客内容省略的博客内容省略的博客内容省略的博客内容省略的博客内容省略的博客内容......
          </p>
        </div>
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

export default {
  data () {
    return {
      articalMenu: [],
      url: 'http://127.0.0.8:3000/support?start=',
      dataSwitch: true,
      start: 0,
      end: 5,
      count: 3
    }
  },
  created () {
    this.articalMenu.splice(0, this.articalMenu.length - 1)
    this.getData()
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const offsetHeight = document.body.offsetHeight
      if (offsetHeight - clientHeight - scrollTop < 30 && this.dataSwitch) {
        this.dataSwitch = false
        this.getData()
      }
    })
  },
  methods: {
    deliveryMsg (blog) {
      this.$router.push({path: '/content/' + blog.id})
    },
    // 此处因为要传参数所以不适合用计算属性
    timeFormater (t) {
      const time = new Date(t)
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
    },
    getData () {
      const url = this.url + this.start + '&end=' + this.end
      this.$http.get(url).then((d) => {
        this.articalMenu = this.articalMenu.concat(d.data)
        this.start += d.data.length
        this.end = this.start + this.count
        if (d.data.length === this.count) {
          this.dataSwitch = true
        }
      }).catch((e) => {
        console.log(e)
        this.dataSwitch = true
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
    overflow: hidden;
    text-overflow: ellipsis;
    width: 930px;
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
