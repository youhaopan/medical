<template lang="html">
  <Layout>
    <Sider width="340" class="sider-width">
      <Left />
    </Sider>
    <Content class="page">
      <router-view></router-view>
    </Content>
  </Layout>
</template>

<script>
import Left from '../components/Left';
import urlPath from '../actions/api.js';

export default {
  name: 'page',
  components: {
    Left
  }
}
</script>

<style lang="less" scoped>
@width: 280px!important;
.sider-width {
    @media (max-width:1500px) {
        width: @width;
        min-width: @width;
        max-width: @width;
        flex: 0 0 @width;
    }
}
</style>
