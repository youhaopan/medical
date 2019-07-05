<template lang="html">
  <Card class="card-role-list" :bordered="false">
    <p slot="title">
      <Icon type="icon-tree"></Icon>已添加的规则
    </p>
    <ul class="role-list">
      <RoleListRoom v-for="(item, index) in roleAddedList" :key="index" :role-room="item" />
    </ul>
  </Card>
</template>

<script>
import RoleListRoom from '../components/RoleListRoom';
export default {
  name: 'roleadded',
  props: {
    roleAddedList: Array
  },
  components: {
    RoleListRoom
  }
}
</script>

<style lang="css" scoped>
</style>
