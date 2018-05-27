<template lang="html">
  <div>
    <header class="register-head">
      <div class="head-portrait-wrap">
        <img :src="user.imageUrl" alt="个人头像" class="head-portrait">
        <a href="javascript:;" class="upload-portrait" @click="changePortrait">点击修改头像</a>
        <input type="file" name="portrait" value="" ref="portrait" accept="image/gif,image/jpeg,image/jpg,image/png" @change='changeFile($event)'>
      </div>
      <div class="head-welcome-msg">
        <h1 class="register-title">
          欢迎加入!
        </h1>
        <span class="register-tip">
        您填写的个人信息我们不会主动公开
        </span>
      </div>
    </header>
    <div class="self-main">
      <div class="register-row">
        <div for="rg-description" class="register-row-left">个人介绍</div>
        <div class="register-row-right ">
          <input type="text" name="" value="" id="rg-description" class="text-input"  v-model='user.description'>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-phone" class="register-row-left">电话</div>
        <div class="register-row-right ">
          <input type="text" name="" value="" id="rg-phone" class="text-input"  v-model='user.phone'>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-sex" class="register-row-left">性别</div>
        <div class="register-row-right">
          <label for="rg-man">男</label>
          <input type="radio" name="" value=0 id="rg-man" v-model='user.sex'>
          <label for="rg-woman">女</label>
          <input type="radio" name="" value=1 id="rg-woman" v-model='user.sex'>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-QQ" class="register-row-left">QQ</div>
        <div class="register-row-right ">
          <input type="text" name="" value="" id="rg-QQ" class="text-input"  v-model='user.qq'>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-email" class="register-row-left">邮箱</div>
        <div class="register-row-right ">
          <input type="text" name="" value="" id="rg-email" class="text-input"  v-model='user.email'>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-address" class="register-row-left">地址</div>
        <div class="register-row-right ">
          <input type="text" name="" value="" id="rg-address" class="text-input"  v-model='user.address'>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-birthday" class="register-row-left">生日</div>
        <div class="register-row-right ">
          <input type="date" name="" value="" id="rg-birthday" class=""  v-model='user.birthday'>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-school" class="register-row-left">学校</div>
        <div class="register-row-right ">
          <input type="text" name="" value="" id="rg-school" class="text-input"  v-model='user.school'>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-weibo" class="register-row-left">微博</div>
        <div class="register-row-right">
          <input type="text" name="" value="" id="rg-weibo" class="text-input"  v-model='user.weibo'>
        </div>
      </div>
      <div class="register-row">
        <a href="javascript:;" @click='confirmUser'>保存</a>
        <a href="javascript:;">取消</a>
      </div>
    </div>
    <Dialog :width='dialog.width'
            :msg='dialog.msg'
            :height='dialog.height'
            :show-dialog='dialog.show'>
          </Dialog>
  </div>
</template>

<script>
import Dialog from '../components/dialog'
//  注册请求地址
const url = 'http://127.0.0.8:3000/editInfo'
//  上传头像请求地址
const poUrl = 'http://127.0.0.8:3000/portrait'
//  获取头像请求地址
const imgUrl = 'http://127.0.0.8:3000/imgs/'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      user: {
        id: null,
        sex: 0,
        description: null,
        phone: null,
        qq: null,
        email: null,
        address: null,
        birthday: '1995-06-01',
        school: null,
        weibo: null,
        imageUrl: '../../static/imgs/portrait.png'
      },
      dialog: {
        width: 300,
        height: 100,
        msg: '正在上传...',
        show: false
      }
    }
  },
  methods: {
    confirmUser () {
      this.user.birthday = new Date(this.user.birthday).getTime()
      this.user.id = this.$store.state.user.id
      this.user.sex = Number.parseInt(this.user.sex)
      this.$http.post(url, JSON.stringify(this.user)).then(d => {
        this.dialog.msg = '信息修改成功'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
      }).catch(err => {
        console.log(err)
        this.dialog.msg = '信息修改失败'
        this.dialog.show = true
        this.letDialogClear(this, 1000)
      })
    },
    letDialogClear (_this, time, fun) {
      let timer = setTimeout(() => {
        _this.dialog.show = false
        clearTimeout(timer)
        if (typeof fun === 'function') {
          fun()
        }
      }, time)
    },
    changePortrait () {
      this.$refs.portrait.click()
    },
    changeFile (e) {
      const file = e.target.files[0]
      if (file.size > 3148576) {
        alert('请选择小于3M的图片')
        return false
      }
      let formData = new FormData()
      formData.append('portrait', file)
      this.$http.post(poUrl, formData).then((d) => {
        //  返回图片名称
        this.user.imageUrl = imgUrl + d.data
      }).catch((err) => {
        console.log(err)
      })
    },
    toLoginPage () {
      this.$router.push({path: '/login'})
    },
    dateToSec (date) {
      const time = new Date(date)
      return time.getFullYear() + '-' + this.add0(time.getMonth() + 1) + '-' + this.add0(time.getDate())
    },
    add0 (num) {
      num = Number.parseInt(num)
      return num < 10 ? '0' + num : num
    }
  },
  mounted () {
    Object.assign(this.user, this.$store.state.user)
    this.user.birthday = this.dateToSec(this.user.birthday)
  }
}
</script>

<style lang="css">
.head-login-tip {
  position: absolute;
  font-size: 14px;
  top: -35px;
  left: 30px;
  color: #c6c6c6;
}
.head-login-tip a:hover {
  color: #54cbed;
}
.register-row {
  margin: 20px;
  height: 50px;
  border-bottom: 1px solid #ebebeb;
  padding: 30px;
}
.register-row input {
  text-align: left;
  text-indent: 10px;
}
.text-input {
  width: 600px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #999;
  box-sizing: border-box;
}
.register-row-left {
  width: 80px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #444;
  float: left;
  line-height: 50px;
}
.register-row-right {
  width: 630px;
  float: left;
  margin-top: 10px;
  margin-left: 20px;
}
.must-fill {
  display: inline-block;
  padding-left: 10px;
  font-size: 20px;
  vertical-align: middle;
  font-weight: 600;
  color: #444
}
.register-head {
  height: 200px;
  position: relative;
}
.head-portrait-wrap {
  background-color: #eee;
  width: 168px;
  position: absolute;
  height: 168px;
  border-radius: 4px;
  overflow: hidden;
  left: 20px;
}
.head-portrait {
  width: 168px;
  height: 168px;
  display: block;
}
.upload-portrait {
  position: absolute;
  text-align: center;
  width: 168px;
  height: 168px;
  top: 0;
  left: 0;
  background-color: rgba(26, 26, 26, .4);
  line-height: 168px;
  color: #fff;
}
.head-welcome-msg {
  position: absolute;
  left: 230px;
  top: 20px;
}
.register-title {
  margin: 10px 0;
}
.register-tip {
  font-size: 12px;
  color: #8590a6;
}
</style>
