<template lang="html">
  <header id="app-head">
    <div v-show='!isLogin' id="login-tip-wrap">
      <span>您还未登录，请</span>
      <a href="#" @click='clickToLogin'>登录</a>
    </div>
    <div v-show='isLogin'>
      <div id="user-img-wrap">
        <img :src="user.image" alt="" id='user-img'/>
      </div>
      <div id="user-info-wrap">
        <div id="user-name">
          {{user.name}}
        </div>
        <div id="user-introduce">
          {{user.introduce}}
        </div>
      </div>
    </div>
    <div id="search-wrap">
      <input type="text" name="" value="" id="search-box">
      <a href="#">搜索</a>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: '',
        description: '',
        imageUrl: ''
      },
      isLogin: false
    }
  },
  mounted () {
    this.user.name = this.$store.state.user.name
    this.user.description = this.$store.state.user.description
    this.user.imageUrl = this.$store.state.user.imageUrl
    this.isLogin = this.$store.state.isLogin
  },
  methods: {
    clickToLogin () {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style lang="css">
  #app-head {
    width: 1000px;
    height: 135px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  #login-tip-wrap {
    text-align: left;
    line-height: 36px;
    font-size: 14px;
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
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    margin: 5px;
    max-width: 200px;
  }

  #search-wrap {
    float: right;
    margin-top: 20px;
  }
</style>
