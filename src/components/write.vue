<template lang="html">
  <div id="write" class="clearfix ">
    <div id="write-aside">
      <div id="function-menu">
        <span :class="type === 1?'active':''" @click='clickToChooseFontStyle(1)'>加粗</span>
        <span :class="type === 2?'active':''" @click='clickToChooseFontStyle(2)'>斜体</span>
        <span :class="type === 3?'active':''" @click='clickToChooseFontStyle(3)'>下划线</span>
        <span>分段</span>
      </div>
      <textarea id="blog-write-box" name="name" ref='writeContent' v-model='write'></textarea>
    </div>
    <div id="show-aside">
        {{write}}
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
      paras: []
    }
  },
  methods: {
    clickToChooseFontStyle (num) {
      if( this.type === num ){
        this.type = 0
      }else{
        this.type = num
      }
    },
    setFontStyle () {
      let className = '';
      if( this.type === 0 ){
        return ;
      }else if( this.type === 1 ){
        className = 'crude'
      }else if( this.type === 2 ){
        className = 'skew'
      }else if( this.type === 3 ){
        className = 'underline'
      }


    },
    changeTextarea (e) {
      console.log(e)
    }
  },
  computed: {
    handleWriteContent () {

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
  background-color: red;
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
