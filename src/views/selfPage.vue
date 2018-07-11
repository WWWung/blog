<template lang="html">
  <div>
    <header class="register-head">
      <div class="head-portrait-wrap">
        <img :src="user.imageUrl" alt="个人头像" class="head-portrait">
        <a href="javascript:;" class="upload-portrait" @click="changePortrait" v-if='isOwner'>
          点击修改头像(请确定图片名字不包含中文且大小不超过3M)
        </a>
        <input type="file" name="portrait" value="" ref="portrait" accept="image/gif,image/jpeg,image/jpg,image/png" @change='changeFile($event)'>
      </div>
      <div class="head-welcome-msg">
        <a href="javascript:;" class="message-btn" v-if='!isOwner' @click='sendMsgBox'>
          私信TA
        </a>
        <span class="register-tip" v-else>
        不会公开您的私人信息
        </span>
      </div>
      <div class="return-page">
        <a href="javascript:;" @click='returnPrevPage'>返回上一页</a>
      </div>
    </header>
    <div class="self-main">
      <div class="register-row">
        <div for="rg-description" class="register-row-left">个人介绍</div>
        <div class="register-row-right " v-show='!infoList.description.show'>
          <input type="text" name="" value="" id="rg-description" class="text-input"  v-model='user.description'>
        </div>
        <div class="show-info" @mouseenter='showBtn("description")' @mouseleave='showBtn(false)' v-show='infoList.description.show'>
          <span>{{user.description}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.description.edit&&isOwner' @click='toggleEdit("description")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.description.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("description")'>取消</a>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-phone" class="register-row-left">电话</div>
        <div class="register-row-right " v-show='!infoList.phone.show'>
          <input type="text" name="" value="" id="rg-phone" class="text-input"  v-model='user.phone'>
        </div>
        <div class="show-info" @mouseenter='showBtn("phone")' @mouseleave='showBtn(false)' v-show='infoList.phone.show'>
          <span>{{user.phone}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.phone.edit&&isOwner' @click='toggleEdit("phone")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.phone.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("phone")'>取消</a>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-sex" class="register-row-left">性别</div>
        <div class="register-row-right" v-show='!infoList.sex.show'>
          <label for="rg-man">男</label>
          <input type="radio" name="" value=0 id="rg-man" v-model='user.sex'>
          <label for="rg-woman">女</label>
          <input type="radio" name="" value=1 id="rg-woman" v-model='user.sex'>
        </div>
        <div class="show-info" @mouseenter='showBtn("sex")' @mouseleave='showBtn(false)' v-show='infoList.sex.show'>
          <span>{{sexHandler(user.sex)}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.sex.edit&&isOwner' @click='toggleEdit("sex")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.sex.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("sex")'>取消</a>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-QQ" class="register-row-left">QQ</div>
        <div class="register-row-right " v-show='!infoList.qq.show'>
          <input type="text" name="" value="" id="rg-QQ" class="text-input"  v-model='user.qq'>
        </div>
        <div class="show-info" @mouseenter='showBtn("qq")' @mouseleave='showBtn(false)' v-show='infoList.qq.show'>
          <span>{{user.qq}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.qq.edit&&isOwner' @click='toggleEdit("qq")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.qq.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("qq")'>取消</a>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-email" class="register-row-left">邮箱</div>
        <div class="register-row-right " v-show='!infoList.email.show'>
          <input type="text" name="" value="" id="rg-email" class="text-input"  v-model='user.email'>
        </div>
        <div class="show-info" @mouseenter='showBtn("email")' @mouseleave='showBtn(false)' v-show='infoList.email.show'>
          <span>{{user.email}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.email.edit&&isOwner' @click='toggleEdit("email")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.email.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("email")'>取消</a>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-address" class="register-row-left">地址</div>
        <div class="register-row-right " v-show='!infoList.address.show'>
          <input type="text" name="" value="" id="rg-address" class="text-input"  v-model='user.address'>
        </div>
        <div class="show-info" @mouseenter='showBtn("address")' @mouseleave='showBtn(false)' v-show='infoList.address.show'>
          <span>{{user.address}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.address.edit&&isOwner' @click='toggleEdit("address")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.address.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("address")'>取消</a>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-birthday" class="register-row-left">生日</div>
        <div class="register-row-right " v-show='!infoList.birthday.show'>
          <input type="date" name="" value="" id="rg-birthday" class=""  v-model='user.birthday'>
        </div>
        <div class="show-info" @mouseenter='showBtn("birthday")' @mouseleave='showBtn(false)' v-show='infoList.birthday.show'>
          <span>{{dateHandler(user.birthday)}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.birthday.edit&&isOwner' @click='toggleEdit("birthday")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.birthday.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("birthday")'>取消</a>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-school" class="register-row-left">学校</div>
        <div class="register-row-right " v-show='!infoList.school.show'>
          <input type="text" name="" value="" id="rg-school" class="text-input"  v-model='user.school'>
        </div>
        <div class="show-info" @mouseenter='showBtn("school")' @mouseleave='showBtn(false)' v-show='infoList.school.show'>
          <span>{{user.school}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.school.edit&&isOwner' @click='toggleEdit("school")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.school.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("school")'>取消</a>
        </div>
      </div>
      <div class="register-row">
        <div for="rg-weibo" class="register-row-left">微博</div>
        <div class="register-row-right" v-show='!infoList.weibo.show'>
          <input type="text" name="" value="" id="rg-weibo" class="text-input"  v-model='user.weibo'>
        </div>
        <div class="show-info" @mouseenter='showBtn("weibo")' @mouseleave='showBtn(false)' v-show='infoList.weibo.show'>
          <span>{{user.weibo}}</span>
          <a href="javascript:;" class="edit-btn" v-show='infoList.weibo.edit&&isOwner' @click='toggleEdit("weibo")'>编辑</a>
        </div>
        <div class="edit-btns" v-show='!infoList.weibo.show'>
          <a href="javascript:;" class="updateInfo" @click='confirmUser'>保存</a>
          <a href="javascript:;" class='cancleEdit' @click='toggleEdit("weibo")'>取消</a>
        </div>
      </div>
    </div>
    <Dialog :dialog='dialog'></Dialog>
    <SendMsg
          v-if='sendMsgToggle'
          :userId='user.id'
          @sendMsgTip='sendMsgTip'>
          </SendMsg>
  </div>
</template>

<script>
import Dialog from '../components/dialog'
import SendMsg from '../components/sendMsg'
//  编辑个人信息请求地址
const url = 'http://127.0.0.8:3000/editInfo'
//  上传头像请求地址
const poUrl = 'http://127.0.0.8:3000/portrait'
//  获取头像请求地址
const imgUrl = 'http://127.0.0.8:3000/imgs/'
//  判断是否登录地址
const selfUrl = 'http://127.0.0.8:3000/self?name='

export default {
  components: {
    Dialog,
    SendMsg
  },
  data () {
    return {
      user: {
        id: null,
        sex: '',
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
      },
      //  给每一个属性一个开关
      infoList: {
        description: {
          show: true, //  show用来控制是显示文字框还是输入框
          edit: false //  edit用来控制是否显示后面的编辑按钮
        },
        phone: {
          show: true,
          edit: false
        },
        qq: {
          show: true,
          edit: false
        },
        email: {
          show: true,
          edit: false
        },
        address: {
          show: true,
          edit: false
        },
        birthday: {
          show: true,
          edit: false
        },
        school: {
          show: true,
          edit: false
        },
        weibo: {
          show: true,
          edit: false
        },
        sex: {
          show: true,
          edit: false
        }
      },
      //  查看的信息页面是否是当前登录账号
      isOwner: true,
      sendMsgToggle: false
    }
  },
  methods: {
    sendMsgBox () {
      this.sendMsgToggle = true
    },
    sendMsgTip (dialog) {
      this.sendMsgToggle = false
      this.dialog.msg = dialog.msg
      this.dialog.show = dialog.show
      this.letDialogClear(this, 1000)
    },
    toggleEdit (name) {
      this.infoList[name].show = !this.infoList[name].show
    },
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
      if (!file) {
        return false
      }
      if (file.size > 3148576) {
        alert('请选择小于3M的图片')
        return false
      }
      let formData = new FormData()
      formData.append('image', file)
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
    dateHandler (date) {
      if (typeof date === 'string') {
        return new Date(date).getTime()
      } else if (typeof date === 'number') {
        const time = new Date(date)
        return time.getFullYear() + '-' + this.add0(time.getMonth() + 1) + '-' + this.add0(time.getDate())
      }
      return null
    },
    add0 (num) {
      num = Number.parseInt(num)
      return num < 10 ? '0' + num : num
    },
    showBtn (name) {
      for (let key in this.infoList) {
        this.infoList[key].edit = false
      }
      if (name) {
        this.infoList[name].edit = true
      }
    },
    returnPrevPage () {
      this.$router.go(-1)
    },
    selfInfoInit () {
      const name = this.$route.params.name
      this.$http.get(selfUrl + name).then((d) => {
        delete d.data.sessionId
        delete d.data.pwd
        this.isOwner = this.$store.state.user.name === d.data.name
        Object.assign(this.user, d.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    sexHandler (sex) {
      if (sex === null) {
        return null
      } else if (typeof sex === 'number') {
        return sex === 0 ? '男' : '女'
      } else if (typeof sex === 'string') {
        return sex === '男' ? 0 : 1
      }
    }
  },
  created () {
    this.selfInfoInit()
  },
  watch: {
    '$route' () {
      this.selfInfoInit()
    }
  }
}
</script>

<style lang="css">
.edit-btns {
  float: left;
  display: flex;
  justify-content: flex-end;
  margin: 5px 30px 0;
}
.return-page {
  position: absolute;
  right: 100px;
  top: 30px;
}
.return-page a {
  font-size: 14px;
  color: #1a1a1a;
}
.self-main {
  padding: 0 30px;
  box-sizing: border-box;
}
.return-page a:hover {
  text-decoration: underline;
  color: #79dce8;
}
.updateInfo, .cancleEdit {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 20px;
}
.cancleEdit:hover {
  background-color: rgba(212, 212, 212, .8);
}
.updateInfo {
  background-color: rgba(0, 132, 235, .6);
  border-radius: 4px;
  color: #fff;
}
.cancleEdit {
  background-color: rgba(212, 212, 212, .6);
  border-radius: 4px;
  color: #8590a6;
}
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
.message-btn {
  display: inline-block;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  width: 70px;
  border-radius: 3px;
  border: 1px solid #c6c6c6;
}
.message-btn:hover {
  border-color: #db9a6a;
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
  margin-left: 30px;
}
.show-info {
  float: left;
  height: 50px;
  width: 600px;
  margin-left: 30px;
  line-height: 50px;
  font-size: 15px;
  color: #1a1a1a;
}
.edit-btn {
  display: inline-block;
  margin-left: 20px;
  padding: 0 10px;
  background-color: rgba(0, 132, 235, .6);
  border-radius: 4px;
  line-height: 30px;
  color: #fff;
}
.edit-btn:hover, .updateInfo:hover {
  background-color: rgba(0, 132, 235, .8);
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
  left: 50px;
  top: 30px;
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
  left: 240px;
  top: 60px;
}
.register-title {
  margin: 10px 0;
}
.register-tip {
  font-size: 12px;
  color: #8590a6;
}
</style>
