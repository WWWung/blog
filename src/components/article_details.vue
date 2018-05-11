<template lang="html">
  <div id="page-mask">
    <div id="details-wrap">
      <div class="details-row">
        <span class="detail-name">文章标题</span>
        <input type="text" class="detail-input" placeholder="请输入">
      </div>
      <div class="details-row">
        <span class="detail-name">文章类型</span>
        <input type="text" class="detail-input" placeholder="请输入">
      </div>
      <div class="details-row">
        <span class="detail-name">是否置顶</span>
        <input type="text" class="detail-input" placeholder="请输入">
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
#page-mask {
  top: 0px;
  bottom: 0px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
#details-wrap {
  width: 600px;
  height: 400px;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 12px;
  background: #eee;
  padding: 60px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.details-row {
  display: flex;
  justify-content: space-around;
}
</style>
