<template lang="html">
  <div class="">
    <Layout>
        <Header>
          <Row class="header-index">
            <i-col span="12">
              <img src="../images/logo1.png" width="60" alt="">
              <img src="../images/logo2.png" width="250" alt="">
            </i-col>
          </Row>
        </Header>
        <Content>
          <div class="no-page">
            <p>404 页面不存在</p>
            <router-link :to="{ name: 'home' }">返回首页</router-link>
          </div>
        </Content>
    </Layout>
  </div>
</template>

<script>
import urlPath from '../actions/api.js';
export default {
  name: 'nopage'
}
</script>

<style lang="css" scoped>
.no-page{
  font-size: 20px;
  color: #ccc;
  line-height: 3;
}
</style>
