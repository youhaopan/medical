<template lang="html">
<Row class="header-index">
  <!-- <i-col span="18"> -->
    <div class='user-logo' @click='showCharts'>
        <img src="../images/logo1.png" width="60" alt="">
        <img src="../images/logo2.png" width="250" alt="">
    </div>
  <!-- </i-col> -->
  <i-col class="user-info">
    <span class="user-name">用户名 <i>{{Name}}</i></span>
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
  name: 'indexheader',
  data(){
    return {
      Name: localStorage.getItem('UNAME')
    }
  },
  methods:{
      showCharts(){
          this.$emit('showCharts')
      }
  }
}
</script>

<style lang="less" scoped>
.header-index {
    min-width: 1000px;
    color: #9DB1BC;
    text-align: left;
    position: relative;
    height: 60px;
    @media (max-width: 1500px) {
        height: 60px;
        line-height: 60px;
    }
    .user-logo{
        position: absolute;
        left: 0;
    }
    .user-info {
        position: absolute;
        right: 0;
        @media (max-width: 1000px) {
            right: 30px;
        }
        // .ivu-dropdown {
        //     margin-left: 0;
        // }
    }
}
</style>
