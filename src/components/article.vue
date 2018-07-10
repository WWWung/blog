<template lang="html">
  <div id="artical">
    <div id="blog-title">
      {{blog.title}}
    </div>
    <div id="blog-time">
      {{getTime(blog.time)}}
    </div>
    <div id="blog-content" v-html='blog.content'></div>
    <div class="blog-btns">
      <a href="javascript:;" @click='toPrevBlog'>{{getPrevBlog}}</a>
      <a href="javascript:;" @click='toNextBlog'>{{getNextBlog}}</a>
    </div>
    <div id="comment-wrap">
      <div class="no-comment" v-if='!blog.comments.length'>
        这篇文章暂时还没有评论，来写下第一个评论吧！
      </div>
      <div id="comment-list">
        <ul id="comments">
          <li v-for='(item, index) in blog.comments' :key='item.id'>
            <div class="comment-info clearfix">
              <img :src='item.imgUrl' alt="" class="comment-portrait" @click='toSelfPage(index)'>
              <a class="comment-auther" href="javascript:;" @click='toSelfPage(index)'>
                {{item.username}}
              </a>
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
          <a href="javascript:;" @click='visitorComment'>游客评论</a>
          <span>
            注:请确保已登录，未登录直接评论则视为游客模式评论！
          </span>
        </div>
      </div>
    </div>
    <Dialog :dialog='dialog'></Dialog>
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
        comments: [],
        prevId: null,
        prevTitle: null,
        nextId: null,
        nextTitle: null,
        commentNumber: 0
      },
      comment: {
        userId: null,
        blogId: null,
        content: '',
        time: null,
        username: null,
        imgUrl: null
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
      const id = this.$route.params.id
      this.$http.get(url + id).then((d) => {
        this.blog = d.data
        this.$nextTick(() => {
          // this.Prism.prism()
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    getTime (t) {
      const time = new Date(t)
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()
    },
    toSelfPage (index) {
      const name = this.blog.comments[index].username
      if (name !== '游客') {
        this.$router.push({path: '/self/' + name})
      }
    },
    userComment () {
      if (!this.$store.state.isLogin) {
        this.visitorComment()
        return false
      }
      if (!this.comment.content) {
        this.dialog.msg = '请输入评论内容'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      this.comment.userId = this.$store.state.user.id
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
    visitorComment () {
      if (!this.comment.content) {
        this.dialog.msg = '请输入评论内容'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
        return false
      }
      this.comment.userId = 11111
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
    },
    toNextBlog () {
      if (this.blog.nextId) {
        this.$router.push({path: '/content/' + this.blog.nextId})
      }
    },
    toPrevBlog () {
      if (this.blog.prevId) {
        this.$router.push({path: '/content/' + this.blog.prevId})
      }
    }
  },
  computed: {
    getNextBlog () {
      return this.blog.nextTitle ? '下一篇:' + this.blog.nextTitle : '暂时没有下一篇'
    },
    getPrevBlog () {
      return this.blog.prevTitle ? '上一篇:' + this.blog.prevTitle : '这是第一篇博客'
    }
  },
  watch: {
    '$route' () {
      this.renderCommentList()
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
.no-comment {
  margin-top: 40px;
  margin-left: 20px;
  font-size: 14px;
}
.blog-btns {
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}
.blog-btns a {
  padding: 0 15px;
  line-height: 40px;
  font-size: 15px;
  color: #556677;
}
.blog-btns a:hover {
  color: #436f98;
  text-decoration: underline;
}
#blog-content {
  line-height: 24px;
  /* color: #37677e; */
  margin-top: 10px;
  min-height: 300px;
  padding: 20px;
}
#blog-time {
  line-height: 16px;
  font-size: 12px;
  margin-top: 10px;
  width: 130px;
  margin-left: 60px;
}
#comment-wrap {
  /* margin-top: 20px; */
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
  padding: 20px 25px 10px;
}
.comment-portrait {
  float: left;
  width: 40px;
  height: 40px;
  cursor: pointer;
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
.comment-auther:hover {
  text-decoration: underline;
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
