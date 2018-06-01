<template>
  <div id="app" @mousemove='mouseMove'>
    <div id="page">
      <router-view/>
      <Aside :show='asideShow' @showRain='stopRain'></Aside>
    </div>
    <Rain ref='rain'
          :mosPos='mosPos'
          v-if='startRain'>
          </Rain>
  </div>
</template>

<script>
import Aside from './components/aside'
import Rain from './components/rain'
export default {
  name: 'App',
  data () {
    return {
      asideShow: false,
      mosPos: [0, 0],
      startRain: false
    }
  },
  components: {
    Aside,
    Rain
  },
  methods: {
    mouseMove (e) {
      const x = e.pageX
      const y = e.pageY
      this.mosPos = [x, y]
      if (x <= 200) {
        this.asideShow = true
      } else {
        this.asideShow = false
      }
    },
    stopRain (toggled) {
      this.startRain = toggled
    }
  }
}
</script>

<style>
body {
  background-color: #f6f6f6;
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
}
#page {
  width: 1000px;
  margin: 20px auto;
  background-color: #fff;
  padding: 50px 30px;
}
</style>
