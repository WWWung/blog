<template lang="html">
  <transition name='dialogTransition'>
    <div id="dialog-layer" v-show='showDialog' :style="'top:' + t + 'px'">
        <div id="dialog" :style="'width:' + width + 'px; height: ' + height + 'px; line-height: ' + height + 'px ' ">
          {{msg}}
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      t: 0
    }
  },
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
  },
  watch: {
    showDialog (val) {
      if (val) {
        this.t = document.documentElement.scrollTop
      }
    }
  }
}
</script>

<style lang="css" scoped>
#dialog-layer {
  position: absolute;
  height: 100vh;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
#dialog {
  box-sizing: border-box;
  color: #535758;
  background: rgba(162, 219, 236, 0.8);
  border: 1px solid #fff;
  border-radius: 8px;
  text-align: center;
  user-select: none;
}
.dialogTransition-enter-active, .dialogTransition-leave-active {
  transition: opacity .4s;
}
.dialogTransition-enter, .dialogTransition-leave-to {
  opacity: 0;
}
</style>
