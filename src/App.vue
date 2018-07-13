<template>
  <div id="app" @mousemove='mouseMove'>
    <div id="page">
      <router-view/>
      <Aside :show='asideShow' @showRain='stopRain'></Aside>
    </div>
    <transition name='weather'>
      <Rain ref='rain'
            :mosPos='mosPos'
            v-if='startRain'>
            </Rain>
    </transition>
    <transition name='weather'>
      <Sunshine
            v-if='!startRain'
            ></Sunshine>
    </transition>
  </div>
</template>

<script>
import Aside from './components/aside'
import Rain from './components/rain'
import Sunshine from './components/sunshine'
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
    Rain,
    Sunshine
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
  },
  created () {
    console.log('进入app')
  },
  destroyed () {
    this.$socket.emit('loginout', {
      id: this.$socket.id
    })
  }
}
</script>

<style>
body {
  background-color: #f0f0f0;
  font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
}
#page {
  width: 1000px;
  margin: 20px auto;
  background-color: #fdfdfd;
  /* padding: 50px 30px; */
  border-radius: 4px;
  box-shadow: 10px
}
.weather-enter-active, .weather-leave-active {
  transition: opacity .7s;
}
.weather-enter, .weather-leave-to {
  opacity: 0;
}
</style>
