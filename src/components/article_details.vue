<template lang="html">
  <div id="page-mask" v-show='isShow'>
    <div id="details-wrap">
      <div class="details-row">
        <div class="details-row-left">
          <span class="detail-name">文章标题</span>
        </div>
        <div class="details-row-right">
          <input type="text" class="detail-input" placeholder="请输入" v-model='details.title'>
        </div>
      </div>
      <div class="details-row">
        <div class="details-row-left">
          <span class="detail-name">阅读权限</span>
        </div>
        <div class="details-row-right">
          <span class="checkbox-wrap">
            <input type="radio" name="mold1" value=0 v-model='details.mold'>
            <label for="mold1">学习</label>
            <input type="radio" name="mold2" value=2 v-model='details.mold' >
            <label for="mold2">日记</label>
            <input type="radio" name="mold3" value=1 v-model='details.mold' >
            <label for="mold3">随笔</label>
          </span>
        </div>
      </div>
      <div class="details-row">
        <div class="details-row-left">
          <span class="detail-name">文章分类</span>
        </div>
        <div class="details-row-right">
          <span class="checkbox-wrap">
            <input type="radio" name="type1" value=0 v-model='details.type'>
            <label for="type1">私人</label>
            <input type="radio" name="type2" value=2 v-model='details.type' >
            <label for="type2">好友</label>
            <input type="radio" name="type3" value=1 v-model='details.type' >
            <label for="type3">公开</label>
          </span>
        </div>
      </div>
      <div class="details-row">
        <div class="details-row-left">
          <span class="detail-name">是否置顶</span>
        </div>
        <div class="details-row-right">
          <span class="checkbox-wrap">
            <input type="radio" name="up1" value=1 v-model='details.up'>
            <label for="up1">是</label>
            <input type="radio" name="up2" value=0 v-model='details.up'>
            <label for="up2">否</label>
          </span>
        </div>
      </div>
      <div class="details-row">
        <a href="javascript:;" class="detail-name" @click='submitClick'>确定</a>
        <a href="javascript:;" class="detail-name">返回</a>
      </div>
    </div>
    <Dialog :dialog='dialog'></Dialog>
  </div>
</template>

<script>
/*
*@  逻辑:
*@    1.从父组件获取details信息(如果是新建博客，里面的信息为空，如果是编辑博客，则会根据id从服务端获取已有的博客信息)
*@  疑问:
*@    2.vue是单向数据流，从父组件传来放在props中的数据，如果是数组或者对象以外的格式，在子组件内直接修改vue会提示warn：不建议直接修改这个数据，因为一旦父组件重新渲染，这个数据也会重新改变
*@      但是，如果这个数据格式是数组或者对象，在子组件里更改这个数据，父组件里相应的数据也会更改，不需要用@emit去实现子组件 ===> 父组件方向的通信。
*@      (通过数组或者对象可以打到双向数据流的效果？这样做的副作用是什么？待续...)
*/

import Dialog from './dialog'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      dialog: {
        width: 300,
        height: 100,
        msg: '正在上传...',
        show: false
      },
      isShow: true
    }
  },
  props: {
    showDetails: {
      type: Boolean,
      default: false
    },
    details: {
      type: Object,
      default () {
        return {
          type: 1,
          up: 0,
          title: '',
          mold: 0
        }
      }
    }
  },
  methods: {
    submitClick () {
      // 把数据传递给父组件 (存疑)
      if (!this.details.title) {
        this.dialog.msg = '请输入文章标题'
        this.dialog.show = true
        const _this = this
        let timer = setTimeout(() => {
          _this.dialog.show = false
          clearTimeout(timer)
        }, 1000)
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style lang="css">
#page-mask {
  top: 0px;
  bottom: 0px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
#details-wrap {
  width: 600px;
  height: 400px;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 12px;
  background: #eee;
  padding: 60px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  font-size: 15px;
}
.detail-input {
  height: 28px;
  line-height: 28px;
  font-size: 15px;
  padding-left: 10px;
  border-radius: 3px;
}
.details-row {
  display: flex;
  justify-content: space-around;
  line-height: 28px;
}
.details-row-left {
  text-align: center;
}
.details-row-right {
  text-align: center;
}
.details-row-left {
  width: 160px;
}
.details-row-right {
  width: 320px;
}
</style>
