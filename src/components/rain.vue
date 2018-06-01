<template lang="html">
  <div id="back" ref='back'>
    <canvas id="canvas" ref='canvas' :width="w" :height="h"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    mosPos: {
      type: Array
    }
  },
  data () {
    return {
      lineList: [], //  储存雨滴
      dropList: [], //  储存雨水发生碰撞后的水滴
      g: 0.5, //        重力加速度
      radius: 0, //     雨滴飘的角度
      speed: 0, //      雨滴的速度
      lineNum: 0, //    雨滴的数量
      canvas: null, //   保存canvas DOM对象
      w: document.body.clientWidth,
      h: document.body.clientHeight
    }
  },
  methods: {
    getColor (r, g, b, a) {
      return a ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    //  创造一滴雨
    createLine () {
      const line = {
        speed: 25 + Math.round(Math.random() * 10),
        die: false,
        color: this.getColor(Math.round(Math.random() * 40 + 140), Math.round(Math.random() * 35 + 140), Math.round(Math.random() * 35 + 140)),
        h: 25 + Math.round(Math.random() * 20),
        posy: -200,
        posx: this.w * Math.random() * 2 - 0.5 * this.w
      }
      this.lineList.push(line)
    },
    //  创造一个水滴
    createDrop (x, y) {
      const drop = {
        die: false,
        posx: x,
        posy: y,
        radius: 1 + Math.random() * 1.5, //  水滴的半径
        speedx: (Math.random() - 0.5) * 8,
        speedy: Math.random() * (-6) - 3
      }
      return drop
    },
    //  一次碰撞产生的若干（小于是个）水滴
    madeDrop (x, y) {
      const maxDrop = Math.floor(Math.random() * 5 + 5)
      for (let i = 0; i < maxDrop; i++) {
        this.dropList.push(this.createDrop(x, y))
      }
    },
    rainStart () {
      this.createLine()
      this.createLine()
      this.createLine()
      this.speed += (this.radius - this.speed) / 50
      this.dropList.forEach(drop => {
        drop.speedx += this.speed / 2
        drop.speedy += this.g
        drop.posx += drop.speedx
        drop.posy += drop.speedy
        if (drop.posy >= this.canvas.offsetHeight) {
          drop.die = true
        }
      })

      //  遍历剔除每一个该被销毁的雨滴
      for (let i = this.dropList.length - 1; i >= 0; i--) {
        if (this.dropList[i].die) {
          this.dropList.splice(i, 1)
        }
      }

      const deadLine = this.h - Math.floor(Math.random() * this.h / 6)

      this.lineList.forEach(line => {
        //  雨水离鼠标的距离
        let dis = Math.sqrt(Math.pow((line.posx + this.speed * line.h) - this.mosPos[0], 2) + Math.pow((line.posy + line.h) - this.mosPos[1], 2))
        //  如果雨水离鼠标的距离小于30且鼠标移动过，销毁雨水并创造碰撞雨滴
        if (dis < 30 && this.mosPos !== 0) {
          this.madeDrop(line.posx + this.speed * line.h, line.posy + line.h)
          line.die = true
        }
        //  如果雨水过了分界线一定几率(2/5)销毁雨水并创造碰撞雨滴
        if (line.posy + line.h > deadLine) {
          if (Math.random() > 0.6) {
            this.madeDrop(line.posx + this.speed * line.h, line.posy + line.h)
            line.die = true
          }
        }
        //  如果雨水的位置过了界面高度销毁雨滴，否则雨水正常飘落
        if (line.posy > this.h) {
          line.die = true
        } else {
          line.posy += line.speed
          line.posx += line.speed * this.speed
        }
      })
      //  遍历剔除每一个该被销毁的雨水
      for (let i = this.lineList.length - 1; i >= 0; i--) {
        if (this.lineList[i].die) {
          this.lineList.splice(i, 1)
        }
      }
      setTimeout(this.render(), 0)
      const _this = this
      window.requestAnimationFrame(_this.rainStart)
    },
    render () {
      const ctx = this.canvas.getContext('2d')
      ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight)
      this.lineList.forEach(line => {
        ctx.beginPath()
        ctx.strokeStyle = line.color
        ctx.lineWidth = 1
        ctx.moveTo(line.posx, line.posy)
        ctx.lineTo(line.posx + this.speed * line.h, line.posy + line.h)
        ctx.stroke()
      })
      ctx.lineWidth = 1
      ctx.strokeStyle = '#fff'
      this.dropList.forEach(drop => {
        ctx.beginPath()
        ctx.arc(drop.posx, drop.posy, drop.radius, Math.random() * Math.PI * 2, Math.PI)
        ctx.stroke()
      })
    }
  },
  watch: {
    mosPos () {
      const pw = this.$refs.back.offsetWidth
      this.radius = (this.mosPos[0] - pw / 2) / (pw / 2)
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas
    const _this = this
    window.requestAnimationFrame(_this.rainStart)
  }
}
</script>

<style lang="css">
#back {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #424344;
  z-index: -100;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
