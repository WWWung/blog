<template lang="html">
  <div id="artical">
    <div id="blog-title">
      {{blog.title}}
    </div>
    <div id="blog-time">
      {{getTime(blog.time)}}
    </div>
    <div id="blog-content" v-html='blog.content'></div>
    <div id="comment-wrap">
      <div id="comment-list">
        <ul id="comments">
          <li v-for='item in blog.comments' :key='item.id'>
            <div class="comment-info clearfix">
              <img src="../../static/imgs/portrait.png" alt="" class="comment-portrait">
              <span class="comment-auther">
                {{item.username}}
              </span>
              <span class="comment-date">
                {{getTime(item.time)}}
              </span>
            </div>
            <p class="comment">
            {{item.content}}
            </p>
          </li>
        </ul>
      </div>
      <div id="input-wrap" class="clearfix">
        <div class="textarea-wrap">
          <textarea name="name" rows="8" cols="80" id="input-box" v-model='comment.content' placeholder="在这里写下你的评论..."></textarea>
        </div>
        <div class="submit-wrap">
          <a href="javascript:;" @click='userComment'>评论文章</a>
          <a href="javascript:;">游客评论</a>
          <span>
            注:请确保已登录，未登录直接评论则视为游客模式评论！
          </span>
        </div>
      </div>
    </div>
    <Dialog :width='dialog.width'
            :msg='dialog.msg'
            :height='dialog.height'
            :show-dialog='dialog.show'>
          </Dialog>
  </div>
</template>

<script>
import Dialog from './dialog'
const url = 'http://127.0.0.8:3000/article?id='
const commentUrl = 'http://127.0.0.8:3000/subComent'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      blog: {
        id: null,
        title: null,
        content: null,
        time: null,
        clickNumber: null,
        userId: null,
        type: null,
        up: null,
        support: null,
        star: null,
        comments: []
      },
      comment: {
        userId: null,
        blogId: null,
        content: '',
        time: null,
        username: null
      },
      dialog: {
        width: 300,
        height: 100,
        msg: '正在上传...',
        show: false
      }
    }
  },
  mounted () {
    this.renderCommentList()
  },
  methods: {
    renderCommentList () {
      const id = window.location.href.split('=')[1]
      this.$http.get(url + id).then((d) => {
        Object.assign(this.blog, d.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    getTime (t) {
      const time = new Date(t)
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()
    },
    userComment () {
      if (!this.comment.content) {
        this.dialog.msg = '请输入评论内容'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      console.log(this.comment.content)
      this.comment.userId = this.$store.state.isLogin ? this.$store.state.user.id : 0
      this.comment.username = this.$store.state.isLogin ? this.$store.state.user.name : '游客'
      this.comment.time = new Date().getTime()
      this.comment.blogId = this.blog.id
      const data = JSON.stringify(this.comment)
      this.$http.post(commentUrl, data).then((d) => {
        this.renderCommentList()
        this.comment.content = ''
      }).catch((err) => {
        console.log(err)
      })
    },
    letDialogClear (_this, time, fun) {
      let timer = setTimeout(() => {
        _this.dialog.show = false
        clearTimeout(timer)
        if (typeof fun === 'function') {
          fun()
        }
      }, time)
    }
  }
}
</script>

<style lang="css">
#blog-title {
  line-height: 56px;
  font-size: 32px;
  color: #888a8b;
  text-indent: 40px;
}
#blog-content {
  line-height: 24px;
  color: #37677e;
  margin-top: 10px;
  min-height: 300px;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}
#blog-time {
  line-height: 16px;
  font-size: 12px;
  margin-top: 10px;
  width: 130px;
  margin-left: 60px;
}
#comment-wrap {
  margin-top: 20px;
}
#input-box {
  resize: none;
  width: 800px;
  height: 200px;
  border: 2px solid #eee;
  display: block;
  padding: 10px;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 20px;
}
#comments li {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
.comment-portrait {
  float: left;
  width: 40px;
  height: 40px;
}
.comment-info {
  /* height: 24px; */
  line-height: 24px;
}
.comment-auther {
  float: left;
  font-size: 14px;
  color: #505fcf;
  margin-top: 8px;
  margin-left: 10px;
}
.comment-date {
  float: left;
  font-size: 12px;
  color: #5b5d6b;
  margin-left: 30px;
  margin-top: 8px;
}
.comment {
  padding: 20px;
  color: #1a1a1a;
  font-size: 15px;
  line-height: 19px;
}
#input-wrap {
  margin-top: 40px;
}
.textarea-wrap{
  float: left;
}
.submit-wrap {
  float: left;
  width: 176px;
}
.submit-wrap a {
  background-color: #0084ff;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  padding: 0 30px;
  display: block;
  margin: 10px auto;
  width: 76px;
  text-align: center;
  border-radius: 4px;
}
.submit-wrap span {
  display: block;
  padding: 20px;
  font-size: 12px;
  color: #d2d2d2;
}
</style>
