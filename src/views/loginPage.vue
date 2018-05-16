<template lang="html">
  <div>
    <Head-view></Head-view>
    <div id="login-wrap">
      <div class="login-row">
        <label for="account">账号</label>
        <input type="text" name="" value="" id='account' v-model='name'>
      </div>
      <div class="login-row">
        <label for="password">密码</label>
        <input type="password" name="" value="" id='password' v-model='psw'>
      </div>
      <div class="login-row">
        <a href="#" @click='loginIn'>登录</a>
        <a href="#">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../components/head'
const url = 'http://127.0.0.8:3000/loginIn?baseName=users'
export default {
  components: {
    'Head-view': Head
  },
  data () {
    return {
      name: '',
      psw: ''
    }
  },
  methods: {
    loginIn () {
      if (!this.name || !this.psw) {
        return
      }
      const data = JSON.stringify({
        name: this.name,
        psw: this.psw
      })
      this.$http.post(url, data).then((d) => {
        if (d.data.name) {
          this.$store.commit('getUserInfo', d.data)
          this.$store.commit('setLoginState', true)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">
#login-wrap {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.login-row {
  display: flex;
  justify-content: center;
}
</style>
