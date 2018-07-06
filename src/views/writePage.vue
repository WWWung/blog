<template lang="html" >
  <div id="write-page">
    <Head-view></Head-view>
    <Details  :showDetails='showDetails' :details='article'>
            </Details>
    <h2 class="write-title">
      {{article.title}}
    </h2>
    <Editor :editorContent='editorContent'></Editor>
    <div id="submit-article" @click='submitArticle'>
      <a href="#">提交</a>
    </div>
    <Dialog :dialog='dialog'></Dialog>
  </div>
</template>

<script>
/*
*@  逻辑:
*@    1.如果嵌套路由为new,则代表是新建博客，不需要从服务端提取数据
*@    2.如果嵌套路由为合法id，则代表是编辑已有博客，通过这个id从服务端提取博客的信息
*@    3.当编辑博客的时候，把博客的信息存到data里的arcile对象上，然后按照父组件 ==> 子组件的方式把博客信息分别传到detail组件和editor组件
*/

import Head from '../components/head'
import Editor from '../components/editor'
import Details from '../components/article_details'
import Dialog from '../components/dialog'

const url = 'http://127.0.0.8:3000/submitArticle'
const editUrl = 'http://127.0.0.8:3000/edit?id='
export default {
  components: {
    'Head-view': Head,
    'Editor': Editor,
    Details,
    Dialog
  },
  data () {
    return {
      article: {
        title: '',
        time: '',
        userId: 1,
        type: 1,
        content: '',
        mold: 0,
        up: 0,
        textContent: null
      },
      dialog: {
        width: 600,
        height: 300,
        msg: '正在上传...',
        show: false
      },
      showDetails: true,
      editorContent: {
        htmlContent: '',
        textContent: ''
      }
    }
  },
  methods: {
    submitArticle () {
      if (!this.editorContent.htmlContent) {
        this.dialog = {
          width: 300,
          height: 100,
          msg: '请输入博客内容',
          show: true
        }
        this.letDialogClear(this, 1000)
      } else {
        this.dialog = {
          width: 300,
          height: 100,
          msg: '正在上传博客...',
          show: true
        }
        this.article.time = (new Date()).getTime()
        this.article.content = this.editorContent.htmlContent
        this.article.textContent = this.editorContent.textContent
        // 把数据转换成JSON格式，否则浏览器会先发送options请求，等服务器成功响应成功之后再发送post，原因在于跨域，具体机制不明白...待学习
        if (this.$route.params.id !== 'new') {
          //  如果id存在且不等于new 则给artilce添加id属性
          this.article.id = this.$route.params.id
        }
        this.$http.post(url, JSON.stringify(this.article)).then((d) => {
          this.dialog.msg = '博客上传成功'
          this.letDialogClear(this, 1000, () => {
            this.$router.push({path: '/'})
          })
        }).catch((err) => {
          this.dialog.msg = '博客上传失败'
          this.letDialogClear(this, 1000)
          console.log(err)
        })
      }
    },
    // 获取子组件里博客的标题类型...的详细信息
    getDetails (detail) {
      Object.assign(this.article, detail)
    },
    // 在特定时间后关掉弹窗，并执行函数fun
    letDialogClear (_this, time, fun) {
      let timer = setTimeout(() => {
        _this.dialog.show = false
        clearTimeout(timer)
        if (typeof fun === 'function') {
          fun()
        }
      }, time)
    },
    getChangedBlog () {
      if (this.$route.params.id === 'new') {
        return false
      }
      this.$http.get(editUrl + this.$route.params.id).then((d) => {
        this.article.title = d.data.title
        this.article.content = d.data.content
        this.article.type = d.data.type
        this.article.mold = d.data.mold
        this.article.up = d.data.up
      })
    }
  },
  created () {
    this.getChangedBlog()
  }
}
</script>

<style lang="css" scoped>
#write-page {
  padding: 0 20px 10px;
  margin-top: 60px;
}
#submit-article {
  margin-top: 15px;
}
.write-title {
  line-height: 50px;
}
</style>
