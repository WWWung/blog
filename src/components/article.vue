<template lang="html">
  <div id="artical">
    <div id="blog-title">
      {{blog.title}}
    </div>
    <div id="blog-time">
      {{getTime}}
    </div>
    <div id="blog-content" v-html='blog.content'></div>
    <div id="comment-wrap">
      <div id="comment-list">
        <ul id="comments">
          <li>
            <div class="comment-info clearfix">
              <img src="../../static/imgs/portrait.png" alt="" class="comment-portrait">
              <span class="comment-auther">
                作者
              </span>
              <span class="comment-date">
                2018-05-08 16:49
              </span>
            </div>
            <p class="comment">
              我是第一条评论
            </p>
          </li>
        </ul>
      </div>
      <div id="input-wrap">
        <textarea name="name" rows="8" cols="80" id="input-box"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
const url = 'http://127.0.0.8:3000/article?id='
export default {
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
        star: null
      }
    }
  },
  mounted () {
    // this.blog = this.$store.state.blogInfo
    const id = window.location.href.split('=')[1]
    this.$http.get(url + id).then((d) => {
      console.log(d.data)
      Object.assign(this.blog, d.data)
    }).catch((err) => {
      console.log(err)
    })
  },
  computed: {
    getTime () {
      const time = new Date(this.blog.time)
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()
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
</style>
