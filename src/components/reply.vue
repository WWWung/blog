<template lang="html">
  <div id="reply-wrap">
    <div id="reply">
      <header class="reply-head">
        <h1 class="reply-detail-title">查看对话</h1>
      </header>
      <div class="reply-main">
        <ul class="reply-list">
          <li>
            <div class="reply-detail-author clearfix">
              <div class="reply-avatar">
                <img src="../assets/imgs/portrait.png" alt="">
              </div>
              <div class="reply-detail-name">
                伞兵一号
              </div>
            </div>
            <div class="reply-content">
              这么说吧 常凯申以后的历史地位 上限宋高宗 下限石敬瑭 也就这样了
            </div>
            <div class="reply-detail-time">
              <time>
                2018-07-08 17:29
              </time>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
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
