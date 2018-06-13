<template lang="html">
  <div id="send-layer">
    <div id="send-wrap">
      <h3 id="send-wrap-title">发送私信</h3>
      <div id="send-wrap-input-box">
        <div id="msg-record">
          <a href="javascript:;">对话记录</a>
        </div>
        <textarea name="sendMsg" id="send-wrap-input" v-model='content'></textarea>
      </div>
      <div class="failed-msg">
        {{failedMsg}}
      </div>
      <div id="send-btns">
        <a href="javascript:;" id='send-msg-btn' @click='sendSecretMessage'>发送</a>
        <a href="javascript:;" id='cancle-send-msg' @click='cancelSendMsg'>取消</a>
      </div>
    </div>
  </div>
</template>

<script>
const url = 'http://127.0.0.8:3000/message'
export default {
  data () {
    return {
      content: '',
      failedMsg: ''
    }
  },
  props: {
    userId: {
      type: Number,
      default: null
    }
  },
  methods: {
    cancelSendMsg () {
      const dialog = {
        show: false
      }
      this.failedMsg = ''
      this.$emit('sendMsgTip', dialog)
    },
    sendSecretMessage () {
      this.failedMsg = ''
      if (this.userId === this.$store.state.user.id) {
        this.failedMsg = '请勿给自己发送私信'
        return false
      }
      if (typeof this.userId !== 'number' || typeof this.$store.state.user.id !== 'number') {
        this.failedMsg = '发送者id或者接收者id错误'
        return false
      }
      if (!this.content) {
        this.failedMsg = '请输入私信内容'
        return false
      }
      const message = {
        sendId: this.$store.state.user.id,
        receiveId: this.userId,
        content: this.content,
        time: Date.now(),
        status: 0
      }
      this.$http.post(url, JSON.stringify(message)).then(() => {
        const dialog = {
          width: 300,
          height: 100,
          msg: '私信发送成功',
          show: true
        }
        this.failedMsg = ''
        this.$emit('sendMsgTip', dialog)
      }).catch(err => {
        const dialog = {
          width: 300,
          height: 100,
          msg: '私信发送失败',
          show: true
        }
        this.failedMsg = ''
        this.$emit('sendMsgTip', dialog)
        console.log(err)
      })
    }
  }
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
  height: 420px;
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
.failed-msg {
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #eb1d1d;
  font-size: 12px;
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
