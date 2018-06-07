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
            <input type="radio" name="" value=0 v-model='details.mode'>
            <label for="">学习</label>
            <input type="radio" name="" value=2 v-model='details.mode' >
            <label for="">日记</label>
            <input type="radio" name="" value=1 v-model='details.mode' >
            <label for="">随笔</label>
          </span>
        </div>
      </div>
      <div class="details-row">
        <div class="details-row-left">
          <span class="detail-name">文章分类</span>
        </div>
        <div class="details-row-right">
          <span class="checkbox-wrap">
            <input type="radio" name="" value=0 v-model='details.type'>
            <label for="">私人</label>
            <input type="radio" name="" value=2 v-model='details.type' >
            <label for="">好友</label>
            <input type="radio" name="" value=1 v-model='details.type' >
            <label for="">公开</label>
          </span>
        </div>
      </div>
      <div class="details-row">
        <div class="details-row-left">
          <span class="detail-name">是否置顶</span>
        </div>
        <div class="details-row-right">
          <span class="checkbox-wrap">
            <input type="radio" name="" value=1 v-model='article.up'>
            <label for="">是</label>
            <input type="radio" name="" value=0 v-model='article.up'>
            <label for="">否</label>
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
*@    1.用watch监控article的变化，如果article改变，则把article里面的属性赋值给details
*@    2.将编辑好的details信息通过@emit的方式按照子组件 ==> 父组件的方向通信
*@    3.不可以直接把dialog对象作为props属性接收父组件的信息，因为
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
      details: {
        type: this.article.type,
        up: this.article.up,
        title: this.article.title,
        mold: this.article.mold
      },
      isShow: this.showDetails
    }
  },
  props: {
    showDetails: {
      type: Boolean,
      default: false
    },
    article: {
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
      // 把数据传递给父组件
      this.$emit('submitClick', this.details)
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
  },
  watch: {
    //  article下面的title属性默认为空，如果发生变化则
    'article.title' () {
      this.details.type = this.article.type
      this.details.title = this.article.title
      this.details.up = this.article.up
      this.details.mold = this.article.mold
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
