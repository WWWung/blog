<template lang="html">
  <div id="chat-wrap">
    <div id="chat-box">
      <div id="friend-name">
        <strong>用户A用户</strong>
      </div>
      <div id="history-chat">
        <div class="history-box" ref='historyBox' :style='{bottom: chatBox.bottom}'>
          <div class="chat-item clearfix">
            <div class="chat-time">
              <time>2018年6月18日</time>
            </div>
            <div class="chat-main receive-msg">
              <div class="chat-avatar">
                <img src="http://127.0.0.8:3000/imgs/blog.png" alt="">
              </div>
              <div class="chat-content">
                <p>
                  1
                  <br>
                  2
                  <br>
                  3
                </p>
              </div>
            </div>
          </div>
          <div class="chat-item clearfix">
            <div class="chat-time">
              <time>2018年6月18日</time>
            </div>
            <div class="chat-main send-msg">
              <div class="chat-avatar">
                <img src="http://127.0.0.8:3000/imgs/blog.png" alt="">
              </div>
              <div class="chat-content">
                <p>
                  1
                  <br>
                  2
                  <br>
                  3
                </p>
              </div>
            </div>
          </div>
          <div class="chat-item clearfix">
            <div class="chat-time">
              <time>2018年6月18日</time>
            </div>
            <div class="chat-main send-msg">
              <div class="chat-avatar">
                <img src="http://127.0.0.8:3000/imgs/blog.png" alt="">
              </div>
              <div class="chat-content">
                <p>
                  1
                </p>
              </div>
            </div>
          </div>
          <div class="chat-item clearfix">
            <div class="chat-time">
              <time>2018年6月18日</time>
            </div>
            <div class="chat-main send-msg">
              <div class="chat-avatar">
                <img src="http://127.0.0.8:3000/imgs/blog.png" alt="">
              </div>
              <div class="chat-content">
                <p>
                  1sssssssssssssddddd消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息
                </p>
              </div>
            </div>
          </div>
          <div class="chat-item clearfix">
            <div class="chat-time">
              <time>2018年6月18日</time>
            </div>
            <div class="chat-main receive-msg">
              <div class="chat-avatar">
                <img src="http://127.0.0.8:3000/imgs/blog.png" alt="">
              </div>
              <div class="chat-content">
                <p>
                    1sssssssssssssddddd消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息
                </p>
              </div>
            </div>
          </div>
          <div class="chat-item clearfix">
            <div class="chat-time">
              <time>2018年6月18日</time>
            </div>
            <div class="chat-main receive-msg">
              <div class="chat-avatar">
                <img src="http://127.0.0.8:3000/imgs/blog.png" alt="">
              </div>
              <div class="chat-content">
                <p>
                    1sssssssssssssddddd消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息
                </p>
              </div>
            </div>
          </div>
          <div class="chat-item clearfix">
            <div class="chat-time">
              <time>2018年6月18日</time>
            </div>
            <div class="chat-main receive-msg">
              <div class="chat-avatar">
                <img src="http://127.0.0.8:3000/imgs/blog.png" alt="">
              </div>
              <div class="chat-content">
                <p>
                    1sssssssssssssddddd消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息消息
                </p>
              </div>
            </div>
          </div>
        </div>
        <span class="chat-scroll" :style='{height: scrollBox.height, bottom: scrollBox.bottom}' @mousedown='scroll'></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollBox: {
        height: 0,
        bottom: '4px'
      },
      chatBox: {
        height: 0,
        bottom: 0
      }
    }
  },
  mounted () {
    this.chatBox.height = this.$refs.historyBox.offsetHeight - 450
    this.scrollBox.height = Math.round(442 * 442 / this.$refs.historyBox.offsetHeight) + 'px'
  },
  methods: {
    scroll (ev) {
      //  记录鼠标点下去的时候的鼠标位置已经滚动条位置以及
      const y = ev.pageY
      const b = Number.parseInt(this.scrollBox.bottom)
      const bB = Number.parseInt(this.chatBox.bottom)
      document.onmousemove = e => {
        e.preventDefault()
        //  dis为鼠标移动的距离
        const dis = y - e.pageY
        //  鼠标移动的距离+点击鼠标时候滚动条的位置即为滚动条现在的位置
        let h = b + dis
        const max = 446 - Number.parseInt(this.scrollBox.height)
        if (h <= 4) {
          h = 4
        } else if (h >= max) {
          h = max
        }
        this.scrollBox.bottom = h + 'px'
        //  聊天窗口应该移动的距离 / 聊天窗口的总长度 = 滚动条移动的距离 / 滚动条可移动的最大长度
        const bH = Math.round(this.chatBox.height * (h - b) / max)
        this.chatBox.bottom = bB - bH + 'px'
      }
      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
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
  line-height: 50px;
  border-bottom: 1px solid #efefef;
  text-align: center;
}
.history-box {
  position: absolute;
  bottom: 0;
  width: 560px;
  padding-top: 20px;
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
}
.chat-time {
  text-align: center;
  font-size: 12px;
  color: #d0d0d0;
  line-height: 28px;
}
</style>
