<template lang="html">
    <div class="page">
      <Position :bread="[{name:'智能知识库', path: '/page/drug'}, {name:'药品知识库', now: true, path: ''}]" />
    </div>
</template>

<script>
import Position from '../components/position';
import urlPath from '../actions/api.js';

export default {
  name: 'user',
  components: {
    Position
  }
}
</script>

<style lang="css" scoped>
</style>
