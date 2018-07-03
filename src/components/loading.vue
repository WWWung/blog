<template lang="html">
  <div class="loading-wrap">
    <div class="svg-box">
      <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
  		    <g fill="none" fill-rule="evenodd">
  		        <g transform="translate(1 1)" stroke-width="2">
  		            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
  		            <path d="M36 18c0-9.94-8.06-18-18-18">
  		                <animateTransform
  		                    attributeName="transform"
  		                    type="rotate"
  		                    from="0 18 18"
  		                    to="360 18 18"
  		                    dur="1s"
  		                    repeatCount="indefinite"/>
  		            </path>
  		        </g>
  		    </g>
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
