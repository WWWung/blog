<template lang="html">
  <div id="artical">
    <div class="blog-box">
      <div id="blog-title">
        {{blog.title}}
      </div>
      <div id="blog-time" class="clearfix">
        <time class="blog-info-time">
          {{getTime(blog.time)}}
        </time>
        <span class="blog-info-clickNumber">
          阅读数:
          {{blog.clickNumber}}
        </span>
        <a href="javascript:;" class="follow-blog" @click='followBlog'>
          <img src="../assets/imgs/tail-spin.svg" alt="" v-if='following'>
          {{followedTip}}
        </a>
      </div>
      <div id="blog-content" v-html='blog.content'></div>
    </div>
    <div class="blog-btns">
      <a href="javascript:;" @click='toPrevBlog'>{{getPrevBlog}}</a>
      <a href="javascript:;" @click='toNextBlog'>{{getNextBlog}}</a>
    </div>
    <div id="comment-wrap">
      <div class="no-comment" v-if='!commentslist.data.length'>
        这篇文章暂时还没有评论，来写下第一个评论吧！
      </div>
      <div id="comment-list">
        <ul id="comments">
          <li v-for='(item, index) in commentslist.data' :key='item.id'>
            <div class="comment-info clearfix">
              <img :src='item.imageUrl' alt="" class="comment-portrait" @click='toSelfPage(index)'>
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
        <div class="blog-page-num">
          <ol class="blog-page-num-list">
            <li>
              <a href="javascript:;" v-show='moreThenFive' @click='toFirstPage'>首页</a>
            </li>
            <li v-for='item in page.pagelist' :key='item' @click='turnPage(item)' :class="getPageActive(item) ? 'page-active' : ''">
              <a href="javascript:;">{{item}}</a>
            </li>
            <li>
              <a href="javascript:;" v-show='moreThenFive' @click='toFinalPage'>尾页</a>
            </li>
          </ol>
        </div>
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
        prevId: null,
        prevTitle: null,
        nextId: null,
        nextTitle: null,
        commentNumber: 0,
        followedUser: []
      },
      pageCount: 10,
      comment: {
        userId: null,
        blogId: null,
        content: '',
        time: null
      },
      dialog: {
        width: 300,
        height: 100,
        msg: '正在上传...',
        show: false
      },
      page: {
        currentPage: 1,
        pagelist: []
      },
      commentslist: {
        count: 0,
        data: []
      },
      //  是否正在执行收藏博客操作
      following: false
    }
  },
  created () {
    this.renderArticle()
    this.getBlogComments()
  },
  methods: {
    renderArticle () {
      const id = this.$route.params.id
      this.$http.get(url + id).then(d => {
        this.blog = d.data
        this.$nextTick(() => {
          this.Prism.highlightAll()
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    getBlogComments () {
      const url = 'http://127.0.0.8:3000/comments?page=' + this.page.currentPage + '&pageCount=' + this.pageCount + '&blogId=' + this.$route.params.id
      this.$http.get(url).then(d => {
        this.commentslist = d.data
        this.page.pagelist = this.getPageArr()
      })
    },
    getTime (t) {
      const time = new Date(t)
      return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time.getHours() + ':' + time.getMinutes()
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
        this.getBlogComments()
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
        this.getBlogComments()
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
    },
    turnPage (page) {
      this.page.currentPage = page
    },
    getPageArr () {
      const page = Math.ceil(this.commentslist.count / this.pageCount)
      let pageArr = []
      if (page <= 5) {
        for (let i = 1; i <= page; i++) {
          pageArr.push(i)
        }
      } else {
        if (this.page.currentPage > 3) {
          const max = Math.min(this.page.currentPage + 2, page)
          const min = max - 4
          for (let i = min; i <= max; i++) {
            pageArr.push(i)
          }
        } else {
          pageArr = [1, 2, 3, 4, 5]
        }
      }
      return pageArr
    },
    getPageActive (page) {
      return Number.parseInt(page) === Number.parseInt(this.page.currentPage)
    },
    toFirstPage () {
      this.page.currentPage = 1
    },
    toFinalPage () {
      const p = Math.ceil(this.total / this.pageCount)
      this.page.currentPage = p
    },
    followBlog () {
      if (!this.$store.state.isLogin) {
        return false
      }
      if (this.following) {
        return false
      }
      this.following = true
      const userId = this.$store.state.user.id
      const index = this.isFollowed()
      if (index < 0) {
        const url = 'http://127.0.0.8:3000/follow?blogId=' + this.blog.id + '&userId=' + userId
        this.$http.post(url).then(d => {
          this.following = false
          this.blog.followedUser.push({
            id: d.id,
            userId: userId,
            blogId: this.blogId
          })
        }).catch(err => {
          console.log(err)
          this.following = false
        })
      } else {
        const url = 'http://127.0.0.8:3000/unfollow?blogId=' + this.blog.id + '&userId=' + userId
        this.$http.post(url).then(d => {
          this.following = false
          this.blog.followedUser.splice(index, 1)
        }).catch(err => {
          console.log(err)
          this.following = false
        })
      }
    },
    isFollowed () {
      if (!this.$store.state.isLogin) {
        return -1
      }
      let flag = -1
      let userId = this.$store.state.user.id
      for (let i = 0; i < this.blog.followedUser.length; i++) {
        if (userId === this.blog.followedUser[i].userId) {
          flag = i
          break
        }
      }
      return flag
    }
  },
  computed: {
    getNextBlog () {
      return this.blog.nextTitle ? '下一篇:' + this.blog.nextTitle : '暂时没有下一篇'
    },
    getPrevBlog () {
      return this.blog.prevTitle ? '上一篇:' + this.blog.prevTitle : '这是第一篇博客'
    },
    moreThenFive () {
      return this.commentslist.countr / this.pageCount
    },
    followedTip () {
      return this.isFollowed() < 0 ? '收藏' : '已收藏'
    }
  },
  watch: {
    '$route' () {
      this.renderArticle()
    },
    'page.currentPage' () {
      this.getBlogComments()
    }
  }
}
</script>

<style lang="css">
#blog-title {
  line-height: 56px;
  font-size: 28px;
  color: #000;
  font-weight: bold;
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
  line-height: 50px;
  font-size: 12px;
  border-bottom: 1px solid #e3e3e3;
  color: #858585;
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
.blog-page-num-list {
  display: flex;
  justify-content: center;
}
.blog-page-num-list li {
  margin: 0 15px;
}
.blog-page-num-list li a {
  font-size: 14px;
  line-height: 26px;
  font-weight: 600;
}
.blog-page-num-list .page-active a {
  color: #f0882b;
}
.blog-box {
  padding: 0 20px;
}
.blog-info-time {
  float: left;
}
.blog-info-clickNumber {
  float: right;
  margin-right: 15px;
}
.follow-blog {
  float: right;
  width: 40px;
  position: relative;
  margin-right: 15px;
}
.follow-blog img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
}
</style>
