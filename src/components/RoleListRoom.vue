<template lang="html">
  <li>
    <Icon type="md-create" />
    <Icon type="ios-close" />
    <div>
      <em>{{roleRoom.name}}</em>
      <span>{{roleRoom.degree}}</span>
      <i>{{roleRoom.time}}</i>
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
