<template lang="html">
  <div id="dialog-layer" v-show='showDialog'>
    <div id="dialog" :style="'width:' + width + 'px; height: ' + height + 'px; line-height: ' + height + 'px ' ">
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 60
    },
    msg: {
      type: String,
      default: '这里是弹窗内容'
    },
    showDialog: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="css" scoped>
#dialog-layer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #eee;
  z-index: 1000;
  opacity: .2;
  display: flex;
  justify-content: center;
  align-items: center;
}
#dialog {
  box-sizing: border-box;
  color: gold;
  background: green;
  border: 1px solid #000;
  border-radius: 8px;
  text-align: center;
}
</style>
