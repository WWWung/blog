<template lang="html">
  <div id="sunshine">
    <canvas id="rain-canvas" ref='canvas' :width="w" :height="h"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      h: document.documentElement.clientHeight,
      w: document.documentElement.offsetWidth,
      canvas: null,
      ctx: null,
      //  数组项为一道日光
      shineList: [],
      //  窗口宽度/100为计算单位
      unit: this.w / 100,
      x: 0,
      y: 0,
      //  初始阳光偏转角度
      lightRadius: (-20 - (5 * Math.random())) * Math.PI / 180,
      show: this.begin
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.unit = this.w / 100

    this.init(92, 5)
  },
  methods: {
    //  太阳
    createSun (x, y, r1, r2) {
      let color = this.ctx.createRadialGradient(x, y, r1, x, y, r2)
      color.addColorStop(0, 'rgba(240, 240, 240, 1)')
      color.addColorStop(0.4, 'rgba(240, 240, 240, 0.8)')
      color.addColorStop(1, 'rgba(186, 226, 246, 0)')
      const sun = {
        color,
        x,
        y,
        r: r2
      }
      return sun
    },
    //  日光
    createShine (x, y) {
      const lights = this.light(x)

      //  底边的中点和高为渐变色终点
      const y1 = lights.point3[1]
      let color = this.ctx.createLinearGradient(x, y, x, y1)
      color.addColorStop(0, 'rgba(240, 240, 240, 0.4)')
      color.addColorStop(0.3, 'rgba(240, 240, 240, 0.3)')
      color.addColorStop(1, 'rgba(240, 240, 240, 0)')
      const shine = {
        color,
        lights
      }
      this.shineList.push(shine)
    },
    //  渲染到画布
    render (sun) {
      this.ctx.clearRect(0, 0, this.w, this.h)
      this.ctx.fillStyle = sun.color
      this.ctx.beginPath()
      this.ctx.arc(sun.x, sun.y, sun.r, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.save()

      this.createShine(sun.x, sun.y)
      this.createShine(sun.x, sun.y)
      this.createShine(sun.x, sun.y)
      this.createShine(sun.x, sun.y)
      this.createShine(sun.x, sun.y)
      for (let i = 0; i < this.shineList.length; i++) {
        this.ctx.fillStyle = this.shineList[i].color
        this.ctx.translate(sun.x, sun.y)
        const radius = this.lightRadius + i * ((18 + Math.random() * 6) * Math.PI / 180)
        this.ctx.rotate(radius)
        this.ctx.beginPath()
        this.ctx.moveTo(this.shineList[i].lights.point1[0], this.shineList[i].lights.point1[1])
        this.ctx.lineTo(this.shineList[i].lights.point2[0], this.shineList[i].lights.point2[1])
        this.ctx.lineTo(this.shineList[i].lights.point3[0], this.shineList[i].lights.point3[1])
        this.ctx.lineTo(this.shineList[i].lights.point4[0], this.shineList[i].lights.point4[1])
        this.ctx.fill()
        this.ctx.translate(-sun.x, -sun.y)
        this.ctx.restore()
      }
    },
    //  传入一个坐标点，以这个坐标点为上边中点，随机画一个梯形(作为日光的路径)
    light (x) {
      const topDistance = 20 + Math.round(Math.random() * 10)
      //  上边的两个顶点
      const point1 = [-topDistance, 0]
      const point2 = [topDistance, 0]
      //  梯形上面两个角(弧度制)
      const angle1 = Math.round(Math.random() * 10) * Math.PI / 180
      const angle2 = Math.round(Math.random() * 10) * Math.PI / 180
      //  梯形的高
      const h = Math.random() * x / 2 + x / 4
      //  底边左右两个顶点距离圆心的水平距离
      const bottomDistance1 = topDistance + Math.tan(angle1) * h
      const bottomDistance2 = topDistance + Math.tan(angle2) * h
      const point4 = [-bottomDistance1, h]
      const point3 = [bottomDistance2, h]
      return {
        point1,
        point2,
        point3,
        point4
      }
    },
    init (x, y) {
      const sun = this.createSun(x * this.unit, y * this.unit, 5 * this.unit, 20 * this.unit)
      this.render(sun)
    }
  }
}
</script>

<style lang="css">
#sunshine {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(-90deg,#a9dbef,#6cb6e4);
  z-index: -100;
}
#rain-canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
