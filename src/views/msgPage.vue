<template lang="html">
  <div id="msg-wrap">
    <div class="msg-title">
      <h2 class="title-text">私信列表</h2>
      <a href="javascript:;" class="all-readed" @click='readAllMsg'>全部标记为已读</a>
    </div>
    <div id="msg-box">
      <ul class="msg-list" v-if='haveMsg'>
        <li class="" v-for='item in data' :key='item.id' @click='showChatBox($event, item)'>
          <div class="msg-avatar-box">
            <img :src="item.imageUrl" alt="" class="msg-avatar">
          </div>
          <div class="msg-main">
            <h3 class="msg-author">{{item.name}}</h3>
            <p class="msg-content">{{item.content}}</p>
          </div>
          <div class="msg-time">
            <span>{{getTimeDistance(item.time)}}</span>
          </div>
          <div class="unread-tip" v-if='isUnread(item.type, item.status)'>
            未读
          </div>
        </li>
      </ul>
      <div class="no-msg" v-else>
        您暂时没有私信消息哦!
      </div>
    </div>
    <Chatbox :friendInfo='friendInfo' v-if='isShow' @showChatBox='closeChatBox'></Chatbox>
  </div>
</template>

<script>
import Chatbox from '@/components/chatbox'
const msgListUrl = 'http://127.0.0.8:3000/messagelist?id='
export default {
  components: {
    Chatbox
  },
  data () {
    return {
      data: [],
      friendInfo: null,
      isShow: false
    }
  },
  created () {
    this.getMessageList()
  },
  methods: {
    getMessageList () {
      this.$http.get(msgListUrl + this.$store.state.user.id).then(d => {
        this.data = d.data
      }).catch(err => {
        console.log(err)
      })
    },
    closeChatBox (flag) {
      this.getMessageList()
      this.isShow = flag
    },
    getTimeDistance (time) {
      const now = Date.now()
      const dis = now - time
      if (dis / (24 * 60 * 60 * 60 * 1000) > 10) {
        return '十天前'
      }
      const date = new Date(time)
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
    },
    showChatBox (e, {friendId, imageUrl, name}) {
      this.friendInfo = {
        id: friendId,
        imageUrl,
        name
      }
      this.isShow = true
    },
    isUnread (type, status) {
      return type === 1 && status === 0
    },
    readAllMsg () {
      const url = 'http://127.0.0.8:3000/readAll?userId=' + this.$store.state.user.id
      this.$http.post(url).then(d => {
        this.getMessageList()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    haveMsg () {
      return !!this.data.length
    }
  }
}
</script>

<style lang="css">
.msg-avatar-box {
  float: left;
  margin-right: 20px;
}
#msg-box {
  padding: 20px;
}
.msg-list li {
  padding: 20px;
  border-bottom: 1px solid #777;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  height: 140px;
}
.msg-list li::after {
  position: absolute;
  height: 3px;
  left: 0;
  bottom: 0px;
  right: 0;
  background-color: #ff8900;
  content: '';
  transform: translateX(101%);
  transition: transform .2s
}
.msg-list li:hover::after {
  transform: translateX(0);
}
.msg-list li:hover {
  border-bottom: none;
}
.msg-list li:hover .unread-tip {
  height: 30px;
  width: 60px;
  background-color: inherit;
  box-sizing: border-box;
  border: 1px solid red;
  border-radius: 4px;
  color: #f70;
}
.msg-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.msg-author {
  font-size: 24px;
  line-height: 36px;
}
.msg-main {
  float: left;
  width: 740px;
  margin-top: 10px;
}
.msg-content {
  height: 24px;
  line-height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  font-size: 14px;
  color: #555;
}
.msg-time {
  float: right;
  font-size: 14px;
  color: #999;
}
.title-text {
  font-size: 22px;
  line-height: 48px;
  color: #222;
  /* margin-left: 20px; */
  /* text-align: center; */
}
.msg-title {
  padding-left: 20px;
}
.all-readed {
  font-size: 12px;
  color: #333;
  line-height: 24px;
}
.unread-tip {
  position: absolute;
  top: 20px;
  right: 20px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: red;
  color: rgba(255, 0, 0, 0);
  transition: width .2s ease;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
}
</style>
