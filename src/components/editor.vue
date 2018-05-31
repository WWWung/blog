<template lang="html">
  <div class="">
    <div id="show-wrap" v-html='editorHtml'>
    </div>
    <Editor :init='init' v-model='editorHtml'></Editor>
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

export default {
  components: {
    Editor
  },
  data () {
    return {
      editorHtml: '',
      init: {
        language_url: '/static/tinymce/zh_CN.js',
        skin_url: '/static/tinymce/skins/lightgray',
        language: 'zh_CN',
        plugins: 'link lists image table colorpicker textcolor wordcount contextmenu', //  wordcount,
        // 工具栏
        toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image | removeformat',
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
        // 最上层工具栏
        menubar: 'edit, format, insert',
        //  上传图片
        image_upload_handler: (blobInfo, success, failuer) => {
          let formData = new FormData()
          formData.set('upload_file', blobInfo.blob())
          // this.
        }
      }
    }
  },
  mounted () {
    tinymce.init({})
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
