<template lang="html">
  <li>
    <Icon type="md-create" />
    <Icon type="ios-close" />
    <div>
      <em>{{roleRoom.CREATEUSERNAME}}</em>
      <span>审核人</span>
      <i>{{roleRoom.CREATEDATE}}</i>
    </div>
    <p>
      {{roleRoom.info}}
    </p>
  </li>
</template>

<script>
export default {
  name: 'roomList',
  props: {
    roleRoom: Object
  }
}
</script>

<style lang="css" scoped>
</style>
