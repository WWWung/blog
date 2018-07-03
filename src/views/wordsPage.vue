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
        <li>
          <div class="word-author clearfix">
            <div class="word-avatar">
              <img src="http://127.0.0.8:3000/imgs/true.jpg" alt="">
            </div>
            <div class="word-author-name">
              <a href="javascript:;">
                留言的主人
              </a>
            </div>
          </div>
          <div class="word-content">
            <p>
              我是留言的内容
            </p>
          </div>
          <div class="word-tip">
            <time>
              2018-07-02 16:59
            </time>
            <a href="javascript:;">回复</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="words-page-num">
      <ol class="words-page-num-list">
        <li>
          <a href="javascript:;">首页</a>
        </li>
        <li>
          <a href="javascript:;">1</a>
        </li>
        <li>
          <a href="javascript:;">2</a>
        </li>
        <li>
          <a href="javascript:;">3</a>
        </li>
        <li>
          <a href="javascript:;">4</a>
        </li>
        <li>
          <a href="javascript:;">5</a>
        </li>
        <li>
          <a href="javascript:;">尾页</a>
        </li>
      </ol>
    </div>
    <div class="leave-msg">
      <div class="leave-msg-input-box">
        <textarea name="leave-msg" class="leave-msg-input"></textarea>
      </div>
      <div class="leave-msg-btn">
        <span>
          注:请确保已登录，未登录直接评论则视为游客模式评论！
        </span>
        <a href="javascript:;">发表留言</a>
        <a href="javascript:;">匿名留言</a>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../components/head.vue'
export default {
  components: {
    'Head-view': Head
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
  line-height: 22px;
}
</style>
