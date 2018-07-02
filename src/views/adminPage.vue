<template lang="html">
 <div class="admin-wrap">
   <div class="admin-menu">
     <ul class="function-list">
       <li>
         a
       </li>
     </ul>
   </div>
   <div class="admin-content">

   </div>
 </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.admin-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* background: red; */
  z-index: 100000;
}
.admin-menu {
  float: left;
  width: 10%;
  height: 100%;
  background: rgba(48, 65, 86, 1);
}
.admin-content {
  float: left;
  width: 90%;
  height: 100%;
  background: #fff;
}
</style>
