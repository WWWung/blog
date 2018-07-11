<template lang="html">
  <div id="date-menu-wrap" ref='list' @scroll='scrollLoad'>
    <ul id='date-menu' class="clearfix">
      <li v-for='item in articalMenu' :key='item.index' @click='deliveryMsg(item)'>
        <h2 class="item-title">
          {{item.title}}
        </h2>
        <div class="clearfix blog-content">
          <p class='easy-img' v-if='item.thumbnail'>
            <img :src="item.thumbnail.src" :alt="item.thumbnail.alt">
          </p>
          <p class="easy-content">
            {{item.textContent}}
          </p>
        </div>
        <div class="item-date">
          <time>
            {{timeFormater(item.time)}}
          </time>
          <span>
            <img src="../assets/imgs/read.svg" alt="" class="svg-icon-home">
            {{item.clickNumber}}
          </span>
          <span>
            <img src="../assets/imgs/comment.svg" alt="" class="svg-icon-home">
            {{getCommentNumber(item.commentNumber)}}
          </span>
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
      url: 'http://127.0.0.8:3000/blogs?mold=',
      dataSwitch: true,
      start: 0,
      end: 5,
      count: 5
    }
  },
  created () {
    this.articalMenu.splice(0, this.articalMenu.length - 1)
    this.getData()
    window.addEventListener('scroll', this.scrollLoad)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollLoad)
  },
  methods: {
    scrollLoad () {
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const offsetHeight = document.body.offsetHeight
      if (offsetHeight - clientHeight - scrollTop < 30 && this.dataSwitch) {
        this.dataSwitch = false
        this.getData()
      }
    },
    deliveryMsg (blog) {
      this.$router.push({path: '/content/' + blog.id})
    },
    timeFormater (t) {
      const time = new Date(t)
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
    },
    getData () {
      const mold = this.$route.params.type === 'essay' ? 2 : this.$route.params.type === 'thought' ? 1 : 0
      const url = this.url + mold + '&start=' + this.start + '&end=' + this.count
      this.$http.get(url).then((d) => {
        this.articalMenu = this.articalMenu.concat(d.data)
        this.start += d.data.length
        if (d.data.length === this.count) {
          this.dataSwitch = true
        }
      }).catch((e) => {
        console.log(e)
        this.dataSwitch = true
      })
    },
    getCommentNumber (val) {
      return val === null ? 0 : val
    }
  },
  watch: {
    '$route' () {
      this.articalMenu = []
      this.start = 0
      this.getData()
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
  .svg-icon-home {
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-top: 1px;
  }
  #date-menu {
    width: 1000px;
    margin: 0 auto;
  }
  #date-menu-wrap {
    padding-top: 50px;
    margin-top: 60px;
  }
  #date-menu li {
    height: 220px;
    border-radius: 6px;
    margin: 20px;
    box-sizing: border-box;
    box-shadow: 1px 1px 1px 0 rgba(31, 35, 46, 0.25);
    padding: 15px;
    transition: all .2s ease;
    cursor: pointer;
  }
  #date-menu li:hover {
    box-shadow: 15px 15px 45px -10px rgba(10, 16, 34, 0.3);
    transform: translate(0, -2px);
  }
  #date-menu li h2 {
    font-style: 32px;
    line-height: 34px;
  }
  .blog-content {
    display: flex;
  }
  .easy-img {
    height: 130px;
    width: 300px;
    overflow: hidden;
    position: relative;
  }
  .easy-img img {
    max-width: 300px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }
  .easy-content {
    font-size: 15px;
    line-height: 24px;
    height: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-date span {
    margin-left: 20px;
  }
  .item-date {
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
