<template lang="html">
  <div id="chat-wrap">
    <div id="chat-box">
      <div id="friend-name">
        <strong>用户A用户</strong>
      </div>
      <div id="history-chat">
        <div class="chat-item clearfix">
          <div class="chat-avatar">
            <img src="http://127.0.0.8:3000/imgs/blog.png" alt="">
          </div>
          <div class="chat-content">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
#chat-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(193, 193, 193, .6);
  display: flex;
  justify-content: center;
  align-items: center;
}
#chat-box {
  width: 600px;
  height: 650px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px solid #efefef;
}
#history-chat {
  height: 450px;
  box-sizing: border-box;
  padding: 20px;
}
#friend-name {
  font-size: 18px;
  line-height: 50px;
  border-bottom: 1px solid #efefef;
  text-align: center;
}
.chat-avatar {
  float: left;
}
.chat-avatar img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
