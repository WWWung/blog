<template lang="html">
  <div id="chat-wrap">
    <div id="chat-box">
      <div id="friend-name">
        <strong>{{friendInfo.name}}</strong>
      </div>
      <div id="history-chat">
        <div class="history-box" ref='historyBox' @scroll='wheel'>
          <div :class="hasMoreChat ? ' load-chat-active' : ''" class="load-more-chat" @click='loadMoreMsg'>
            <span v-if='!onLoading'>{{hasMoreChatTip}}</span>
            <img src="../assets/imgs/oval.svg" alt="" v-else>
          </div>
          <div class="chat-item clearfix" v-for='item in data.chatList' :key='item.id'>
            <div class="chat-time">
              <time>{{handleTime(item.time)}}</time>
            </div>
            <div :class="item.type === 0 ? 'chat-main send-msg' : 'chat-main receive-msg'">
              <div class="chat-avatar">
                <img :src="getImg(item.type)" alt="">
              </div>
              <div class="chat-content">
                <i class="sending-icon">
                  <img src="../assets/imgs/spinning-circles.svg" alt="" v-if='onSending'>
                </i>
                <p v-html='handleContent(item.content)'></p>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll-wrap">
          <span class="chat-scroll" :style='{height: scrollBox.height, bottom: scrollBox.bottom}' @mousedown='scroll' v-if='showScroll'></span>
        </div>
      </div>
      <div id="send-box">
        <div id="chat-function">
          <a href="javascript:;">表情</a>
          <a href="javascript:;">图片</a>
        </div>
        <div id="chat-input-box">
          <textarea name="content" id='send-chat' v-model='content' placeholder="在这里输入内容"></textarea>
        </div>
        <div id="send-btn">
          <a href="javascript:;" class="cancle-chat" @click='closeChatBox'>关闭</a>
          <a href="javascript:;" class="send-chat" @click='sendChat'>发送</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  io发射事件命名：
//    chat with friend (from server to target): 从服务端发送聊天的信息到接收信息的客户端
//    chat with friend (from server to author): 从服务端发送聊天的信息到发送信息的客户端
//    chat with friend (from client)： 从客户端发送聊天信息到服务端
//    login:  客户端连入

const url = 'http://127.0.0.8:3000/chat?userId='
// const msgUrl = 'http://127.0.0.8:3000/message'
export default {
  props: {
    friendInfo: {
      type: Object,
      default () {
        return {
          id: null,
          imageUrl: null,
          name: null
        }
      }
    }
  },
  data () {
    return {
      scrollBox: {
        height: 0,
        bottom: '4px'
      },
      chatBox: {
        height: 0,
        bottom: 0
      },
      data: {
        chatList: [], //  聊天记录
        start: 0, //  聊天记录的起始
        count: 0, //  本次获取聊天记录的数量
        total: 0 //  数据库里储存的聊天记录总量
      },
      content: '',
      onLoading: false, //  是否正在加载数据
      onSending: false //  是否正在发送消息
    }
  },
  computed: {
    showScroll () {
      return this.chatBox.height > 0
    },
    hasMoreChat () {
      return this.data.total > this.data.start + this.data.count
    },
    hasMoreChatTip () {
      return this.hasMoreChat ? '滚动加载更多消息' : '没有更多消息了'
    }
  },
  created () {
    this.getChatList(0)
    this.$socket.on('chat with friend (from server to target)', data => {
      this.data.chatList.push(data)
      this.data.start++
      this.data.total++
      this.$nextTick(() => {
        this.initScroll()
      })
    })
    this.$socket.on('chat with friend (from server to author)', data => {
      this.data.chatList.push(data)
      this.data.start++
      this.data.total++
      this.$nextTick(() => {
        this.initScroll()
        this.content = ''
      })
    })
  },
  destroyed () {
    this.$socket.off('chat with friend (from server to target)')
    this.$socket.off('chat with friend (from server to author)')
  },
  methods: {
    sendChat () {
      if (!this.content) {
        return false
      }
      if (!this.$store.state.isLogin || this.friendInfo.id === null) {
        return false
      }
      const msg = {
        content: this.content,
        time: Date.now(),
        status: 0,
        userId: this.$store.state.user.id,
        friendId: this.friendInfo.id
      }
      // this.$http.post(msgUrl, JSON.stringify(msg)).then(() => {
      //   console.log('发送成功')
      // }).catch(err => {
      //   console.log(err)
      //   console.log('发送失败')
      // })
      this.$socket.emit('chat with friend (from client)', msg)
    },
    scroll (ev) {
      //  记录鼠标点下去的时候的鼠标位置已经滚动条位置以及
      const y = ev.pageY
      const b = Number.parseInt(this.scrollBox.bottom)
      //  记录表鼠标点下去时候的真实滚动条位置
      const top = this.$refs.historyBox.scrollTop
      document.onmousemove = e => {
        e.preventDefault()
        //  dis为鼠标移动的距离,也是模拟滚动条应该移动的距离
        const dis = y - e.pageY
        //  h为滚动条应该移动的距离
        const h = this.chatBox.height * dis / (446 - Number.parseInt(this.scrollBox.height))
        this.$refs.historyBox.scrollTop = top - h
        this.scrollBox.bottom = (b + dis <= 2 ? 2 : b + dis >= 448 - Number.parseInt(this.scrollBox.height) ? 448 - Number.parseInt(this.scrollBox.height) : b + dis) + 'px'
      }
      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    wheel (ev) {
      if (this.chatBox.height <= 0) {
        return false
      }
      const top = this.$refs.historyBox.scrollTop
      this.scrollBox.bottom = (this.chatBox.height - top) / this.chatBox.height * (448 - Number.parseInt(this.scrollBox.height)) + 'px'
    },
    getChatList (start) {
      //  如果没有登录或者从父组件传来的friendid不存在，则无法请求
      if (!this.$store.state.isLogin || this.friendInfo.id === null) {
        return false
      }
      //  每次只请求五条消息记录
      this.onLoading = true
      const count = 5
      const chatUrl = url + this.$store.state.user.id + '&friendId=' + this.friendInfo.id + '&start=' + start + '&count=' + count
      this.$http.get(chatUrl).then(d => {
        console.log(d)
        this.data.chatList = this.data.chatList.concat(d.data.data)
        this.data.total = d.data.total[0].total
        this.data.count = d.data.count
        this.data.start = d.data.start
        this.data.chatList.sort((a, b) => a.time - b.time)
        this.$nextTick(() => {
          this.initScroll(!start)
          this.onLoading = false
        })
      }).catch(err => {
        console.log(err)
      })
    },
    initScroll (init) {
      this.chatBox.height = this.$refs.historyBox.scrollHeight - 450
      this.scrollBox.height = Math.round(442 * 450 / this.$refs.historyBox.scrollHeight) + 'px'
      this.$refs.historyBox.scrollTop = this.chatBox.height * (1 - Number.parseInt(this.scrollBox.bottom) / (442 - Number.parseInt(this.scrollBox.height)))
    },
    handleTime (time) {
      const now = new Date()
      const date = new Date(time)
      const y = date.getFullYear()
      const m = date.getMonth()
      const d = date.getDate()
      //  如果消息时间和现在时间的年月日一样 则消息格式为 20:00
      // 如果年一样，月或者日不一样，则消息格式为 6月20日 20:00
      //  如果年不一样 则消息格式为 2018年6月20日 20:00
      if (now.getFullYear() === y && now.getMonth() === m && now.getDate() === d) {
        return date.getHours() + ':' + date.getMinutes()
      } else if (now.getFullYear() === y && (now.getMonth() !== m || now.getDate() !== d)) {
        return (m + 1) + '月' + d + '日' + ' ' + date.getHours() + ':' + date.getMinutes()
      } else {
        return y + '年' + (m + 1) + '月' + d + '日' + ' ' + date.getHours() + ':' + date.getMinutes()
      }
    },
    handleContent (content) {
      //  处理<>字符，避免被恶意插入标签,把\n用br替换
      return content.replace(/</ig, '&lt').replace(/>/ig, '&gt').replace(/\n/ig, '<br/>')
    },
    getImg (type) {
      if (type === 0) {
        return this.$store.state.user.imageUrl
      } else if (type === 1) {
        return this.friendInfo.imageUrl
      }
    },
    closeChatBox () {
      this.$emit('showChatBox', false)
    },
    loadMoreMsg () {
      if (this.hasMoreChat) {
        this.getChatList(this.data.start + this.data.count)
      }
    }
  }
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
  position: relative;
  border-bottom: 1px solid #efefef;
  overflow: hidden;
}
#friend-name {
  font-size: 18px;
  line-height: 49px;
  border-bottom: 1px solid #efefef;
  text-align: center;
}
.history-box {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  /* width: 560px; */
  padding: 0px 20px 20px;
  height: 450px;
  overflow-y: scroll;
  margin-right: -17px;
  box-sizing: border-box;

}
.chat-scroll {
  position: absolute;
  width: 6px;
  background-color: #a3a5a6;
  /* height: 300px; */
  border-radius: 4px;
  right: 3px;
  bottom: 0;
}
.chat-item {
  margin-bottom: 20px;
}
.chat-avatar {
  /* float: left; */
}
.chat-main {
  width: 100%;
}
.scroll-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 6px;
}
.receive-msg .chat-avatar {
  float: left;
}
.receive-msg .chat-content {
  float: left;
  background-color: #fff;
  border: 1px solid #efefef;
}
.send-msg .chat-avatar {
  float: right;
}
.send-msg .chat-content {
  float: right;
  background-color: #ffd7b6;
}
.sending-icon {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 5px;
  left: -30px;
}
.receive-msg .sending-icon {
  display: none;
}
.sending-icon img {
  width: 100%;
  height: 100%;
}
.send-msg .chat-content::after {
  position: absolute;
  top: 8px;
  right: -5px;
  width: 7px;
  height: 8px;
  background: url('../../static/imgs/send.png') no-repeat;
  content: '';
}
.receive-msg .chat-content::after {
  position: absolute;
  top: 8px;
  left: -7px;
  width: 7px;
  height: 8px;
  background: url('../../static/imgs/receive.png') no-repeat;
  content: '';
}
.chat-avatar img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: 0;
}
.chat-content {
  max-width: 350px;
  margin: 4px 14px 0;
  box-sizing: border-box;
  padding: 3px 10px;
  color: #3c3c3c;
  border-radius: 10px;
  min-width: 10px;
  line-height: 22px;
  min-height: 22px;
  position: relative;
  font-size: 14px;
}
.chat-time {
  text-align: center;
  font-size: 12px;
  color: #d0d0d0;
  line-height: 28px;
}
#send-chat {
  display: block;
  height: 100px;
  width: 100%;
  margin: 0 auto;
  background: #fafafa;
  font-size: 13px;
  line-height: 20px;
  box-sizing: border-box;
  padding: 5px;
  color: #515260;
}
#chat-function a {
  font-size: 13px;
  line-height: 28px;
}
#send-btn {
  display: flex;
  justify-content: flex-end;
}
#send-btn a {
  margin-right: 20px;
  font-size: 13px;
}
.load-more-chat {
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  color: #8e8e8e;
}
.load-more-chat img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
.load-chat-active {
  color: #f70;
  cursor: pointer;
}
.load-chat-active:hover {
  text-decoration: underline;
}
</style>
