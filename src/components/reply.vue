<template lang="html">
  <div id="reply-wrap">
    <div id="reply">
      <header class="reply-head">
        <h1 class="reply-detail-title">查看对话</h1>
      </header>
      <div class="reply-main">
        <ul class="reply-list">
          <li v-for="item in data.replylist" :key='item.id'>
            <div class="reply-detail-author clearfix">
              <div class="reply-avatar">
                <img :src="item.imageUrl" alt="">
              </div>
              <div class="reply-detail-name">
                {{item.authorName}}
              </div>
            </div>
            <div class="reply-content" v-html='handleContent(item.content)'></div>
            <div class="reply-detail-time">
              <time>
                {{handleTime(item.time)}}
              </time>
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    replyAuthorId: {
      type: Number,
      default: 0
    },
    userId: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      page: {
        pagelist: [],
        currentPage: 1
      },
      data: {
        replylist: [],
        pageCount: 20,
        total: 0
      }
    }
  },
  computed: {
    moreThenFive () {
      return this.total / this.pageCount > 5
    }
  },
  created () {
    this.getReplyList()
  },
  watch: {
    'this.page.currentPage' () {
      this.getReplyList()
    }
  },
  methods: {
    toFirstPage () {
      this.page.currentPage = 1
    },
    toFinalPage () {
      this.page.currentPage = Math.ceil(this.data.total / this.data.pageCount)
    },
    turnPage (item) {
      this.page.currentPage = item
    },
    getReplyList () {
      const url = 'http://127.0.0.8:3000/readreply?authorId=' + this.replyAuthorId + '&userId=' + this.userId + '&id=' + this.id + '&page=' + this.page.currentPage + '&pageCount=' + this.data.pageCount
      this.$http.get(url).then(d => {
        console.log(d)
        this.data.replylist = d.data.data
        this.data.total = d.data.total
        this.page.pagelist = this.getPageArr()
      }).catch(err => {
        console.log(err)
      })
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
    },
    handleTime (time) {
      const date = new Date(time)
      const y = date.getFullYear()
      const m = date.getMonth()
      const d = date.getDate()
      return y + '年' + (m + 1) + '月' + d + '日' + ' ' + date.getHours() + ':' + date.getMinutes()
    },
    handleContent (content) {
      return content.replace(/</ig, '&lt').replace(/>/ig, '&gt').replace(/\n/ig, '<br/>')
    }
  }
}
</script>

<style lang="css">
#reply-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#reply {
  width: 500px;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 10px 40px rgba(26,26,26,.2);
  z-index: 20;
  background: #fff;
}
.reply-list li {
  padding: 0 14px;
  border-bottom: 1px dashed #ddd;
  margin-top: 16px;
}
.reply-head {
  border-bottom: 1px dashed #ddd;
}
.reply-detail-title {
  font-size: 16px;
  line-height: 48px;
  text-indent: 20px;
}
.reply-avatar {
  width: 25px;
  height: 25px;
  border-radius: 3px;
  overflow: hidden;
  float: left;
}
.reply-avatar img {
  width: 100%;
  height: 100%;
}
.reply-detail-name {
  float: left;
  font-size: 14px;
  margin-left: 10px;
  line-height: 25px;
}
.reply-content {
  font-size: 14px;
  line-height: 25px;
}
.reply-detail-time {
  font-size: 12px;
  line-height: 25px;
  color: #8590a6;
}
</style>
