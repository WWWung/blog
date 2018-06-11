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
        <a href="javascript:;" id="about-self" @click='clickToSelf'>个人中心</a>
        <a href="javascript:;" id="login-out" @click='loginOut'>退出登录</a>
        <div class="to-write">
          <router-link to="/write/new" name='WritePage' tag='a'>
            写博客
          </router-link>
        </div>
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
export default {
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
  },
  computed: {
    ...mapState(['isLogin', 'user']),
    canWrite () {
      return this.user.power === '0'
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
    padding-bottom: 20px;
    position: relative;
  }

  #search-wrap {
    position: absolute;
    bottom: 30px;
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

  #login-out-wrap {
    position: absolute;
    top: 10px;
    right: 10px;
    padding-right: 30px;
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

  #search-wrap {
    float: right;
    margin-top: 20px;
  }

  .to-write a{
    font-size: 15px;
    line-height: 30px;
  }
  .to-write {
    text-align: left;
  }
</style>
