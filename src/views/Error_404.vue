<template>
  <div>
    <img :src="imgsrc">
    <h2>{{desc}}</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgsrc: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
        title: '404',
        desc: '抱歉，你访问的页面不存在',
      }
    },
  }
</script>

<style scoped>

</style>
