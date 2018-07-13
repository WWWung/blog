<template lang="html">
  <div class="follow-wrap">
    <Head-view></Head-view>
    <header class="follow-head">
      <h1 class="follow-title">
        收藏列表
      </h1>
    </header>
    <div class="follow-box">
      <ul class="follow-list">
        <li v-for='item in data.data' :key='item.id'>
          <div class="follow-blog-title">
            <a href="javascript:;" @click='toBlogPage(item.blogId)'>
              {{item.title}}
            </a>
          </div>
          <div class="follow-blog-func">
            <a href="javascript:;" @click='cancleFollow(item.blogId)'>
              取消收藏
            </a>
            <span>
              {{getNumber(item.clickNumber)}}人浏览
            </span>
            <span>
              {{getNumber(item.commentNumber)}}人回复
            </span>
          </div>
        </li>
      </ul>
      <div class="follow-page-num">
        <ol class="follow-page-num-list">
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
import Head from '../components/head'
export default {
  components: {
    'Head-view': Head
  },
  data () {
    return {
      data: {
        total: 0,
        pageCount: 20,
        page: 1,
        data: []
      },
      page: {
        pagelist: [],
        currentPage: Number.parseInt(this.$route.query.page) || 1
      }
    }
  },
  created () {
    this.getFollowlist()
  },
  methods: {
    getFollowlist () {
      const url = 'http://127.0.0.8:3000/followlist?userId=' + this.$store.state.user.id + '&page=' + this.page.currentPage + '&pageCount=' + this.data.pageCount
      this.$http.get(url).then(d => {
        this.data = d.data
        this.page.pagelist = this.getPageArr()
      })
    },
    cancleFollow (blogId) {
      const url = 'http://127.0.0.8:3000/unfollow?blogId=' + blogId + '&userId=' + this.$store.state.user.id
      this.$http.post(url).then(d => {
        this.getFollowlist()
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
    turnPage (page) {
      this.$router.push({path: '/follow?page=' + page})
      this.page.currentPage = page
    },
    getPageActive (page) {
      return Number.parseInt(page) === Number.parseInt(this.page.currentPage)
    },
    toFirstPage () {
      this.page.currentPage = 1
      this.$router.push({path: '/follow?page=1'})
    },
    toFinalPage () {
      const p = Math.ceil(this.data.total / this.data.pageCount)
      this.page.currentPage = p
      this.$router.push({path: '/follow?page=' + p})
    },
    getNumber (num) {
      return num || 0
    },
    toBlogPage (blogId) {
      this.$router.push({path: '/content/' + blogId})
    }
  },
  computed: {
    moreThenFive () {
      return this.data.total / this.data.pageCount > 5
    }
  },
  watch: {
    '$route' () {
      this.page.currentPage = Number.parseInt(this.$route.query.page)
      this.getFollowlist()
    }
  }
}
</script>

<style lang="css">
.follow-wrap {
  margin-top: 60px;
  padding: 0 20px;
}
.follow-head {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.follow-title {
  font-size: 26px;
  line-height: 60px;
}
.follow-list {
  /* padding-bottom: 10px; */
}
.follow-list li {
  border-bottom: 1px dotted #eee;
  padding: 10px 0;
}
.follow-blog-title a {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  max-width: 100%;
}
.follow-blog-func {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.follow-blog-func a {
  color: #999;
}
.follow-blog-func a:hover, .follow-blog-title a:hover {
  text-decoration: underline;
}
.follow-blog-func span {
  margin-left: 20px;
}
.follow-page-num-list {
  display: flex;
  justify-content: center;
}
.follow-page-num-list li {
  margin: 0 15px;
}
.follow-page-num-list li a {
  font-size: 14px;
  line-height: 46px;
  font-weight: 600;
}
.follow-page-num-list .page-active a {
  color: #f0882b;
}
</style>
