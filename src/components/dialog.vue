<template lang="html">
  <transition name='dialogTransition'>
    <div id="dialog-layer" v-if='dialog.show' :style="'top:' + t + 'px'">
        <div id="dialog" :style="'width:' + dialog.width + 'px; height: ' + dialog.height + 'px; line-height: ' + dialog.height + 'px ' ">
          {{dialog.msg}}
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
    dialog: {
      type: Object,
      default () {
        return {
          width: 300,
          height: 60,
          msg: '正在加载',
          show: 'false'
        }
      }
    }
  },
  created () {
    console.log(this.dialog)
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
