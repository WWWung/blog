<template lang="html">
  <div id="msg-wrap">
    <div id="msg-box">
      <ul class="msg-list">
        <li class="clearfix">
          <div class="msg-avatar-box">
            <img :src="'../../../static/imgs/portrait.png'" alt="" class="msg-avatar">
          </div>
          <div class="msg-main">
            <h3 class="msg-author">wwwung</h3>
            <p class="msg-content">这是我发送的私信这是我发送的私信这是我发送的私信这是我发送的私信这是我发送的私信这是我发送的私信这是我发送的私信这是我发送的私信</p>
          </div>
          <div class="msg-time">
            <span>5天前</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        length: 0,
        list: []
      }
    }
  },
  methods: {
    getMessageList () {
      this.$http.get(msgListUrl + this.user.id).then(d => {
        console.log(d)
      }).catch(err => {
        console.log(err)
      })
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
}
.msg-list li::before {
  position: absolute;
  height: 2px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: orange;
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
</style>
