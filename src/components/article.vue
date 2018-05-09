<template lang="html">
  <div id="artical">
    <div id="blog-title">
      {{blog.title}}
    </div>
    <div id="blog-content">
      {{blog.content}}
    </div>
    <div id="blog-time">
      {{blog.time}}
    </div>
    <div id="comment-wrap">
      <div id="comment-list">
        <ul id="comments">
          <li>
            <p class="comment">
              我是第一条评论
            </p>
            <div class="comment-info">
              <span class="comment-auther">
                我是第一个评论的作者
              </span>
              <span class="comment-date">
                2018-05-08 16:49
              </span>
            </div>
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
export default {
  data () {
    return {
      blog: {
        id: 2,
        title: '这是测试用的标题',
        content: '这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容这是测试用的内容',
        time: '2018-05-08'
      }
    }
  },
  mounted () {
    this.blog = this.$store.state.blogInfo
  }
}
</script>

<style lang="css">
#blog-title {
  line-height: 56px;
  font-size: 32px;
  color: #888a8b;
}
#blog-content {
  line-height: 24px;
  color: #37677e;
  margin-top: 10px;
}
#blog-time {
  line-height: 16px;
  font-size: 12px;
  margin-top: 30px;
  width: 130px;
  margin-left: 870px;
}
#comment-wrap {
  margin-top: 200px;
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
.comment-info {
  height: 24px;
  line-height: 24px;
}
.comment-auther {
  float: left;
  font-size: 14px;
  color: #505fcf;
}
.comment-date {
  float: right;
  font-size: 12px;
  color: #5b5d6b;
}
#input-wrap {
  margin-top: 40px;
}
</style>
