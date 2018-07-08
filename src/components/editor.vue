<template lang="html">
  <div class="editor-wrap">
    <div id="show-wrap" v-html='editorContent.htmlContent'>
    </div>
    <Editor :init='init' v-model='editorContent.htmlContent' @input='returnHtml'></Editor>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'

// 引入功能 粘贴、插入链接、插入图片（插入图片还需要做特殊的处理--传方法，待续...）
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
// import 'tinymce/plugins/codesample/Prism/prism.js'

export default {
  components: {
    Editor
  },
  data () {
    return {
      init: {
        width: 958,
        language_url: '/static/tinymce/zh_CN.js',
        skin_url: '/static/tinymce/skins/lightgray',
        language: 'zh_CN',
        plugins: 'link lists image table colorpicker textcolor wordcount contextmenu codesample', //  wordcount,
        // 工具栏
        toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image | removeformat | codesample',
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
        // 最上层工具栏
        menubar: 'edit, format, insert',
        content_style: `
          img {  max-width: 100%; display: block; height: auto; }
        `,
        //  上传图片
        images_upload_handler: (blobInfo, success, failure) => {
          // let formData = new FormData()
          // formData.set('upload_file', blobInfo.blob())
          // this.
          if (blobInfo.blob().size > 3148576) {
            failure('文件体积过大')
          }
          // if (self.accept.indexOf(blobInfo.blob().type) <= 0) {
          //   failure('文件格式错误')
          // }
          let formData = new FormData()
          formData.append('image', blobInfo.blob(), blobInfo.filename())
          this.$http.post('http://127.0.0.8:3000/portrait', formData).then((d) => {
            success('http://127.0.0.8:3000/imgs/' + d.data)
          }).catch((err) => {
            console.log(err)
            failure('上传失败')
            // console.log()
          })
        }
      }
    }
  },
  props: {
    editorContent: {
      type: Object,
      default () {
        return {
          htmlContent: '',
          textContent: ''
        }
      }
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    returnHtml () {
      //  获取纯文本内容
      // console.log(tinymce.editors[0].getContent({format: 'text'}))
      if (tinymce.editors[0]) {
        this.editorContent.textContent = tinymce.editors[0].getContent({format: 'text'}).substring(0, 200) + '......'
      }
    }
  }
}
</script>

<style lang="css">
#show-wrap {
  padding: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
}
</style>
