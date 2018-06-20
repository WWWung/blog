<template lang="html">
  <header id="app-head">
    <div v-if='isLogin' class="clearfix">
      <div id="user-img-wrap">
        <img :src="user.imageUrl" alt="个人头像" id='user-img'/>
      </div>
      <div id="user-info-wrap">
        <div id="user-name">
          <h1>{{user.name}}</h1>
        </div>
        <div id="user-introduce">
          {{user.description}}
        </div>
      </div>
      <div id="login-out-wrap">
        <router-link :to="toMsgPage" name='WritePage' tag='a' class="msg-tip">
          私信列表
          <span v-if='showUnreadMsgTip'>{{handleUnreadMsgCount}}</span>
        </router-link>
        <a href="javascript:;" id="about-self" @click='clickToSelf'>个人中心</a>
        <a href="javascript:;" id="login-out" @click='loginOut'>退出登录</a>
        <router-link to="/write/new" name='WritePage' tag='a'>
          写博客
        </router-link>
      </div>
    </div>
    <div v-else id="login-tip-wrap">
      <span>您还未登录，请</span>
      <a href="javascript:;" @click='clickToLogin'>登录</a>
    </div>
    <div id="search-wrap">
      <input type="text" name="" value="" id="search-box">
      <a href="javascript:;" id="search-keyword">搜索</a>
    </div>
  </header>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
const loginOutUrl = 'http://127.0.0.8:3000/loginOut'
const msgUrl = 'http://127.0.0.8:3000/unreadmsg?receiveId='
const msgListUrl = 'http://127.0.0.8:3000/messagelist?id='
export default {
  data () {
    return {
      unreadMsgCount: 0
    }
  },
  methods: {
    ...mapMutations(['setLoginState', 'clearUserInfo']),
    clickToLogin () {
      this.$router.push({path: '/login'})
    },
    clickToSelf () {
      this.$router.push({path: '/self/' + this.user.name})
    },
    loginOut () {
      this.$http.get(loginOutUrl).then((d) => {
        this.setLoginState(false)
        this.clearUserInfo()
      }).catch((err) => {
        console.log(err)
      })
    }
    // getMessageList () {
    //   this.$http.get(msgListUrl + this.user.id).then(d => {
    //     console.log(d)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  },
  computed: {
    ...mapState(['isLogin', 'user']),
    canWrite () {
      return this.user.power === '0'
    },
    toMsgPage () {
      return '/message/' + this.user.name
    },
    //  处理未读消息，如果没有未读消息，显示为空，如果未读消息大于99条，还是显示99，否则正常显示
    handleUnreadMsgCount () {
      return this.unreadMsgCount === 0 ? '' : this.unreadMsgCount >= 99 ? 99 : this.unreadMsgCount
    },
    //  如果没有未读消息，则不显示未读消息提示
    showUnreadMsgTip () {
      return this.unreadMsgCount !== 0
    }
  },
  created () {
    if (this.$store.state.isLogin) {
      const url = msgUrl + this.user.id
      this.$http.get(url).then(d => {
        this.unreadMsgCount = d.data.length
      })
    }
  }
}
</script>

<style lang="css">
  #app-head {
    width: 1000px;
    /* height: 135px; */
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: 30px 30px 30px 30px;
    position: relative;
    box-sizing: border-box;
  }

  #search-wrap {
    position: absolute;
    bottom: 40px;
    right: 20px;
  }

  #search-box {
    width: 200px;
    height: 20px;
    border-radius: 6px;
    border: 1px solid #bebebe;
    margin: 0 10px;
  }

  #search-keyword {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
  }

  .msg-tip {
    position: relative;
  }

  .msg-tip span {
    position: absolute;
    width: 16px;
    height: 16px;
    left: -18px;
    top: 1px;
    border-radius: 50%;
    background: red;
    color: #fff;
    line-height: 16px;
    text-align: center;
  }

  #login-out-wrap {
    position: absolute;
    top: 18px;
    right: 10px;
    padding-right: 30px;
  }

  #login-out-wrap a {
    font-size: 14px;
  }

  #login-out {
    font-size: 14px;
    color: #989898;
  }

  #about-self {
    font-size: 14px;
    color: #5a5a5a;
  }

  #login-tip-wrap {
    text-align: left;
    line-height: 36px;
    font-size: 14px;
    text-indent: 20px;
  }

  #login-tip-wrap a:hover, #search-keyword:hover, .to-write a:hover {
    color: #54cbed;
    text-decoration: underline;
  }

  #user-img-wrap {
    margin-left: 20px;
  }

  #user-img , #user-img-wrap {
    float: left;
    width: 135px;
    height: 135px;
  }

  #user-img {
    display: block;
    border-radius: 50%;
  }

  #user-info-wrap {
    float: left;
    margin-left: 30px;
    padding-top: 18px;
  }

  #user-name , #user-introduce {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    margin: 5px;
    max-width: 200px;
  }

  #user-name h1 {
    font-size: 32px;
    line-height: 42px;
  }

  #user-introduce {
    font-size: 14px;
    line-height: 18px;
    color: #646464;
  }

  .to-write a{
    font-size: 15px;
    line-height: 30px;
  }
  .to-write {
    text-align: left;
  }
</style>
