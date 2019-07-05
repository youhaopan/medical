<template lang="html">
  <Button type="primary" class="btn-color-bg" shape="circle" @click="$emit('open')">
    <span>{{btnTitle}}</span>
    <Icon :custom="btnIcon" />
  </Button>
</template>

<script>
export default {
  name: 'btnColor',
  props: {
    btnTitle: String,
    btnIcon: String
  }
}
</script>

<style lang="less" scoped>
div {
    .btn-color-bg {
        background: linear-gradient(70deg, #28B5F2, #7cd14e);
    }
}
</style>
