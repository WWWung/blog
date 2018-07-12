<template lang="html">
  <div class="follow-wrap">
    <Head-view></Head-view>
    <div class="follow-box">
      <ul class="follow-list">
        <li>
          <span class="follow-blog-title">
            文章标题
          </span>
          <a href="javascript:;">
            取消收藏
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Head from '../components/head'
export default {
  components: {
    'Head-view': Head
  },
  created () {
    this.getFollowlist()
  },
  methods: {
    getFollowlist () {
      const url = 'http://127.0.0.8:3000/followlist?userId=' + this.$store.state.user.id + '&page=1&pageCount=20'
      this.$http.get(url).then(d => {
        console.log(d.data)
      })
    }
  }
}
</script>

<style lang="css">
</style>
