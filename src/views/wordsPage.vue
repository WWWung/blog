<template lang="html">
  <div class="words-wrap">
    <Head-view></Head-view>
    <div class="words-head">
      <h1 class="words-title">
        留言板
      </h1>
    </div>
    <div class="words-box">
      <ul class="words-list">
        <li v-for='item in data.wordlist' :key='item.id'>
          <div class="word-author clearfix">
            <div class="word-avatar">
              <img :src="item.imageUrl" alt="">
            </div>
            <div class="word-author-name">
              <a href="javascript:;">
                {{item.name}}
              </a>
            </div>
          </div>
          <div class="word-content" v-html='joinContent(item)'></div>
          <div class="word-tip">
            <time>
              {{handleTime(item.time)}}
            </time>
            <a :href="'#leaveMsgInputBox'" @click='replyWord(item)'>回复</a>
            <a href="javascript:;" v-show='hasReply(item.reply)' @click='openReplyBox(item)'>查看对话</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="words-page-num">
      <ol class="words-page-num-list">
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
    <div class="leave-msg">
      <div class="leave-msg-input-box" id='leaveMsgInputBox'>
        <div class="reply-word clearfix" v-if='!!replyinfo.name'>
          <div class="reply-info">
            回复
            <span class="reply-name">{{replyinfo.name}}</span>
            :
          </div>
          <a href="javascript:;" class="cancle-reply" @click='cancleReply'>取消回复</a>
        </div>
        <textarea name="leave-msg"
                  class="leave-msg-input"
                  v-model='content'
                  spellcheck="false"
                  autocapitalize="off"
                  autocomplete="off"
                  autocorrect="off"
                  ref='wordsInput'
                  v-focus='focusStatus'></textarea>
      </div>
      <div class="leave-msg-btn">
        <span>
          注:请确保已登录，未登录直接评论则视为游客模式留言！
        </span>
        <a href="javascript:;" @click='leaveWord'>发表留言</a>
      </div>
    </div>
    <Dialog :dialog='dialog'></Dialog>
  </div>
</template>

<script>
import Head from '../components/head.vue'
import Dialog from '../components/dialog'
export default {
  components: {
    'Head-view': Head,
    Dialog
  },
  data () {
    return {
      data: {
        wordlist: [],
        pageCount: 20,
        total: 0
      },
      replyinfo: {
        id: null,
        name: ''
      },
      content: '',
      dialog: {
        width: 300,
        height: 100,
        msg: '正在上传...',
        show: false
      },
      focusStatus: false,
      page: {
        pagelist: [],
        currentPage: 1
      },
      replyInfo: {
        id: 0,
        userId: 0,
        reply: 0
      },
      showReplyBox: false
    }
  },
  computed: {
    moreThenFive () {
      return this.total / this.pageCount > 5
    }
  },
  methods: {
    openReplyBox ({id, userId, reply}) {
      this.replyInfo.id = id
      this.replyInfo.userId = userId
      this.replyInfo.reply = reply
      this.showReplyBox = true
    },
    toFirstPage () {
      this.$router.push({path: '/words?page=1'})
    },
    toFinalPage () {
      const p = Math.ceil(this.total / this.pageCount)
      this.$router.push({path: '/words?page=' + p})
    },
    getWordList () {
      const url = 'http://127.0.0.8:3000/getwords?page=' + this.page.currentPage + '&pageCount=' + this.data.pageCount
      this.$http.get(url).then(d => {
        this.data.wordlist = d.data.data
        this.data.total = d.data.total
        this.page.pagelist = this.getPageArr()
      })
    },
    leaveWord () {
      if (!this.content) {
        this.letDialogClear(this, 1000, '请输入内容')
        return false
      }
      const url = 'http://127.0.0.8:3000/leaveword'
      const words = {
        content: this.content,
        time: Date.now(),
        userId: this.$store.state.isLogin ? this.$store.state.user.id : 0,
        reply: this.replyinfo.id
      }
      this.$http.post(url, JSON.stringify(words)).then(d => {
        this.cancleReply()
        this.getWordList()
        this.content = ''
      }).catch(err => {
        console.log(err)
        this.cancleReply()
      })
    },
    handleContent (content) {
      return content.replace(/</ig, '&lt').replace(/>/ig, '&gt').replace(/\n/ig, '</p><p class="reply-real-content">')
    },
    joinContent ({content, targetName, replyContent}) {
      let rsl = '<p class="reply-real-content">' + this.handleContent(content) + '</p>'
      if (replyContent !== null) {
        const name = '<p class="reply-title">回复 <span class="reply-name">' + targetName + '</span> :</p>'
        const reply = '<p class="quote-reply">' + replyContent + '</p>'
        rsl = name + reply + rsl
      }
      return rsl
    },
    handleTime (time) {
      const date = new Date(time)
      const y = date.getFullYear()
      const m = date.getMonth()
      const d = date.getDate()
      return y + '年' + (m + 1) + '月' + d + '日' + ' ' + date.getHours() + ':' + date.getMinutes()
    },
    letDialogClear (_this, time, msg, fun) {
      _this.dialog.msg = msg
      _this.dialog.show = true
      let timer = setTimeout(() => {
        _this.dialog.show = false
        clearTimeout(timer)
        typeof fun === 'function' && fun()
      }, time)
    },
    replyWord ({id, name}) {
      if (!this.$store.state.isLogin) {
        this.letDialogClear(this, 1000, '只有登录状态才能回复他人留言')
        return false
      }
      this.focusStatus = true
      this.replyinfo.id = id
      this.replyinfo.name = name
    },
    cancleReply () {
      this.replyinfo.id = null
      this.replyinfo.name = ''
    },
    hasReply (reply) {
      return reply !== null
    },
    turnPage (page) {
      this.$router.push({path: '/words?page=' + page})
      this.page.currentPage = this.$route.query.page
      this.getWordList()
    },
    getPageArr () {
      const page = Math.ceil(this.data.total / this.data.pageCount)
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
    }
  },
  created () {
    this.page.currentPage = this.$route.query.page || 1
    this.getWordList()
  },
  directives: {
    focus: {
      update: (el, {value}) => {
        if (value) {
          el.focus()
        }
      }
    }
  }
}
</script>

<style lang="css">
.words-wrap {
  margin-top: 60px;
}
.words-box {
  padding: 10px;
}
.words-list li {
  border-bottom: 1px dashed gray;
}
.word-avatar {
  float: left;
  width: 50px;
  height: 50px;
  /* border-radius: 50%; */
  overflow: hidden;
}
.word-avatar img {
  width: 100%;
  height: 100%;
}
.word-author-name {
  float: left;
  margin-left: 20px;
  margin-top: 15px;
}
.word-author-name a {
  font-size: 14px;
  line-height: 20px;
  color: #26709A;
}
.word-author-name a:hover, .word-tip a:hover {
  text-decoration: underline;
}
.word-content {
  padding: 10px 70px;
  font-size: 13px;
  line-height: 20px;
  color: #444;
}
.word-tip {
  margin: 20px 0 10px 70px;
}
.word-tip time {
  font-size: 12px;
  color: #9b9b9b;
  margin-right: 30px;
}
.word-tip a {
  color: #26709A;
  font-size: 12px;
  margin: 0 5px;
}
.words-page-num-list {
  display: flex;
  justify-content: center;
}
.words-page-num-list li {
  margin: 0 15px;
}
.words-page-num-list li a {
  font-size: 12px;
  line-height: 20px;
}
.words-page-num-list .page-active a {
  color: #f0882b;
}
.leave-msg-input {
  width: 600px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 20px 0 0 10px;
  padding: 5px;
  font-size: 14px;
  line-height: 22px;
}
.leave-msg-btn {
  display: flex;
  justify-content: flex-end;
  width: 610px;
  margin-left: 10px;
}
.leave-msg-btn a {
  background-color: #0084ff;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  padding: 0 30px;
  display: block;
  margin: 10px;
  width: 76px;
  text-align: center;
  border-radius: 4px;
}
.leave-msg-btn span {
  font-size: 12px;
  color: #d2d2d2;
  line-height: 36px;
}
.reply-word {
  padding-left: 10px;
}
.reply-info {
  float: left;
  font-size: 14px;
  line-height: 22px;
}
.reply-name {
  color: #26709A;
}
.cancle-reply {
  float: left;
  margin-left: 400px;
  font-size: 14px;
  line-height: 22px;
}
.reply-real-content {
  text-indent: 10px;
}
.quote-reply {
  background-color: #bbb;
}
</style>
