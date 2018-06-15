<template lang="html">
  <div class="loading-wrap">
    <div class="svg-box">
      <svg>
        <circle cx="50%" cy="50%" r="40" stroke="#cbd8e1" stroke-width="3" fill='none'/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* background-color: rgba(26, 26, 26, .65); */
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
