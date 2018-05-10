<template lang="html">
  <div id="write" class="clearfix ">
    <div id="write-aside">
      <div id="function-menu">
        <span :class="type === 1?'active':''" @click='clickToChooseFontStyle(1)'>加粗</span>
        <span :class="type === 2?'active':''" @click='clickToChooseFontStyle(2)'>斜体</span>
        <span :class="type === 3?'active':''" @click='clickToChooseFontStyle(3)'>下划线</span>
        <span>分段</span>
      </div>
      <textarea id="blog-write-box" name="name" ref='writeContent' v-model='write' @input='changeTextarea' @keydown='deleteValue($event)'></textarea>
    </div>
    <div id="show-aside" v-html='handleWriteContent' ref='showDom'>
    </div>
    <div id="title-aside">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      write: '',
      type: 0,
      paras: [],
      showContent: '',
      contentLength: 0,
      htmlLength: 0
    }
  },
  methods: {
    clickToChooseFontStyle (num) {
      if (this.type === num) {
        this.type = 0
      } else {
        this.type = num
      }
      // 储存点击样式时候左侧输入框的输入内容字符串长度
      this.contentLength = this.write.length
      // 储存点击样式时候右侧展示框html字符串长度
      this.htmlLength = this.$refs.showDom.innerHTML.length
    },
    setFontStyle () {
      let className = ''
      if (this.type === 0) {
        return false
      } else if (this.type === 1) {
        className = 'font-weight: bold'
      } else if (this.type === 2) {
        className = 'font-style: italic'
      } else if (this.type === 3) {
        className = 'text-decoration: underline'
      }
      return className
    },
    changeTextarea () {
      this.showContent = this.write
    },
    deleteValue (ev) {
      if (ev.keyCode === 8) {
        console.log('a')
        // ev.preventDefault()
      }
    }
  },
  computed: {
    handleWriteContent () {
      if (this.contentLength === 0) {
        return this.write
      }
      let inner = this.$refs.showDom.innerHTML
      let htmlStr = ''
      let tmpStr = inner.substring(0, this.htmlLength)
      let endStr = this.write.substring(this.contentLength)
      htmlStr = tmpStr + '<span style="' + this.setFontStyle() + '">' + endStr + '</span>'
      return htmlStr
    }
  }
}
</script>

<style lang="css" scoped>
#write-aside {
  float: left;
  width: 280px;
  min-height: 100px;
  background-color: #eee;
  margin-right: 20px;
}
#blog-write-box {
  display: block;
  min-height: 100px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}
#show-aside {
  float: left;
  width: 600px;
  min-height: 100px;
  /* background-color: red; */
  border: 1px solid black;
  box-sizing: border-box;
}
#title-aside {
  float: left;
  width: 100px;
  min-height: 100px;
  background-color: yellow;
}
#function-menu {
  display: flex;
  justify-content: space-around;
}
#function-menu span {
}

.crude {
  font-weight: bold;
}
.skew {
  font-style: italic;
}
.underline {
  text-decoration: underline;
}
.active {
  color: orangered;
}
</style>
