<template lang="html">
  <div class="">
    <transition name='aside'>
      <div id="page-aside" v-show='show'>
        <div id="blogger-info">
          <div class="">
            <a href="http://localhost:8080/#/self?name=wwwung" class="blogger-portrait">
              <img :src="'../../../static/imgs/w.png'" alt="">
            </a>
          </div>
          <div class="blogger-name">
            王建的博客
          </div>
          <div class="blogger-tag">
            分享我所学到的知识。
          </div>
        </div>
        <ul id='page-aside-list'>
          <li>
            <a href="http://localhost:8080/#/">首页</a>
          </li>
          <li>
            <a href="javascript:;">日志</a>
          </li>
          <li v-show='power'>
            <a href="http://localhost:8080/#/write">写博客</a>
          </li>
          <li>
            <a href="javascript:;">留言板</a>
          </li>
          <li>
            <a href="javascript:;" @click='stopRain'>{{getRainHtml}}</a>
          </li>
        </ul>
        <div id="about-links">
          相关链接
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      power: false,
      showRain: false
    }
  },
  methods: {
    stopRain () {
      this.showRain = !this.showRain
      this.$emit('showRain', this.showRain)
    }
  },
  watch: {
    '$store.state.user' () {
      this.power = this.$store.state.user.power === '0'
    }
  },
  mounted () {
    this.power = this.$store.state.user.power === '0'
    console.log(this.$store.state.user)
  },
  computed: {
    getRainHtml () {
      return this.showRain ? '雨停' : '下雨'
    }
  }
}
</script>

<style lang="css">
#blogger-info {
  height: 35vh;
}
#page-aside-list {
  height: 50vh;
}
#page-aside-list li {
  height: 5vh;
  text-align: center;
}
#page-aside-list li a:hover {
  color: #6290a3;
  text-decoration: underline;
}
#about-links {
  height: 15vh;
}
#page-aside {
  position: fixed;
  width: 200px;
  background: #d9d9d9;
  left: 0;
  top: 0;
  height: 100vh;
}
.blogger-portrait {
  display: block;
  width: 120px;
  height: 120px;
  margin: 20px auto;
  border-radius: 50%;
  overflow: hidden;

}
.blogger-portrait img {
  width: 100%;
  height: 100%;
}
.blogger-name, .blogger-tag {
  text-align: center;
  line-height: 24px;
}
.blogger-name {
  font-weight: 600;
  font-size: 16px;
}
.blogger-tag {
  font-size: 14px;
}
.aside-enter, .aside-leave-to {
  width: 0;
  /* opacity: 0; */
  transform: translateX(-200px);
}
.aside-enter-active, .aside-leave-active {
  transition: all .3s ease;
}
</style>
