<template lang="html" >
  <div id="write-page">
    <Head-view></Head-view>
    <Details @submitClick='getDetails'
              :showDetails='showDetails'>
            </Details>
    <h2 class="write-title">
      {{article.title}}
    </h2>
    <Editor @returnHtml='getHtml'></Editor>
    <div id="submit-article" @click='submitArticle'>
      <a href="#">提交</a>
    </div>
    <Dialog :dialog='dialog'></Dialog>
  </div>
</template>

<script>
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
        mode: 0
      },
      dialog: {
        width: 600,
        height: 300,
        msg: '正在上传...',
        show: false
      },
      showDetails: true
    }
  },
  methods: {
    getHtml (editorContent) {
      this.article.content = editorContent.htmlContent
      this.article.textContent = editorContent.textContent
    },
    submitArticle () {
      if (!this.editorHtml) {
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
        this.article.content = this.editorHtml
        // 把数据转换成JSON格式，否则浏览器会先发送options请求，等服务器成功响应成功之后再发送post，原因在于跨域，具体机制不明白...待学习
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
      console.log(this.$route.params.id)
      if (this.$route.params.id === 'new') {
        return false
      }
      this.$http.get(editUrl + this.$route.params.id).then((d) => {
        console.log(d.data)
        this.article.title = d.data.title
        this.article.content = d.data.content
        this.article.type = d.data.type
        this.article.mode = d.data.mode
      })
    }
  },
  created () {
    this.getChangedBlog()
  }
}
</script>

<style lang="css" scoped>
#submit-article {
  margin-top: 15px;
}
.write-title {
  line-height: 50px;
}
</style>
