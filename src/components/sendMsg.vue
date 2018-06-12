<template lang="html">
  <div id="send-layer">
    <div id="send-wrap">
      <h3 id="send-wrap-title">发送私信</h3>
      <div id="send-wrap-input-box">
        <div id="msg-record">
          <a href="javascript:;">对话记录</a>
        </div>
        <textarea name="sendMsg" id="send-wrap-input"></textarea>
      </div>
      <div id="send-btns">
        <a href="javascript:;" id='send-msg-btn'>发送</a>
        <a href="javascript:;" id='cancle-send-msg'>取消</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
#send-layer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(26, 26, 26, .65);
  display: flex;
  justify-content: center;
  align-items: center;
}
#send-wrap {
  width: 400px;
  height: 430px;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0 30px;
}
#send-wrap-title {
  font-size: 24px;
  line-height: 32px;
  color: #1a1a1a;
  margin: 50px 0 25px 0;
  text-align: center;
  font-weight: 400;
}
#send-wrap-input {
  width: 100%;
  height: 130px;
  box-sizing: border-box;
  padding: 10px;
  line-height: 24px;
  font-size: 15px;
  border: 1px solid #ebebeb;
  margin-top: 20px;
}
#send-btns {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
#send-btns a {
  padding: 0 15px;
  border-radius: 4px;
  line-height: 30px;
  box-sizing: border-box;
}
#send-msg-btn {
  color: #fff;
  background-color: rgba(0, 132, 235, .6);
  margin-right: 40px;
}
#send-msg-btn:hover {
  background-color: rgb(0, 132, 235);
}
#cancle-send-msg {
  background-color: rgba(220, 220, 220, .3);
  color: #8590a6;
  border: 1px solid #8590a6;
}
#cancle-send-msg:hover {
  background-color: rgb(220, 220, 220);
}
#msg-record {
  text-align: right;
  padding-right: 10px;
}
#msg-record a {
  font-size: 14px;
  color: #428fb2;
  text-decoration: underline;
}
</style>
