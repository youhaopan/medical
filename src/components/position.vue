<template lang="html">
  <Row class="header-position">
    <i-col span="12">
      <Breadcrumb separator=">">
        <BreadcrumbItem v-for="(item, index) in bread" :key="index" :to="item.path">{{item.name}}</BreadcrumbItem>
      </Breadcrumb>
    </i-col>
    <i-col span="12" class="user-info">
      <span class="user-name">用户名 <i id="uname"></i></span>
      <div class="demo-avatar">
          <img src="../images/pic_user.png" />
      </div>
      <Dropdown placement="bottom-end">
        <a href="javascript:void(0)">
             <Icon type="ios-arrow-down" color="#fff"></Icon>
        </a>
        <Dropdown-menu slot="list">
          <Dropdown-item>个人资料</Dropdown-item>
          <Dropdown-item>修改设置</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </i-col>
  </Row>
</template>

<script>
export default {
  name: 'position',
  props: {
    bread: Array
  },
  data() {
    return {
      userImg: '../images/pic_user.png',
      uname:''
          }
  },
  mounted() {
          document.getElementById("uname").innerHTML = localStorage.getItem('UNAME') ;
             },
}
</script>

<style lang="less" scoped>
.header-position {
    height: 70px;
    line-height: 70px;
    color: #9DB1BC;
    text-align: left;
    // @media (max-width: 1500px) {
    //     height: 100px;
    //     line-height: 100px;
    // }
}
</style>
