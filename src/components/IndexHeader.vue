<template lang="html">
<Row class="header-index">
  <i-col span="12">
    <img src="../images/logo1.png" width="60" alt="">
    <img src="../images/logo2.png" width="250" alt="">
  </i-col>
  <i-col span="12" class="user-info">
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
  }
}
</script>

<style lang="less" scoped>
.header-index {
    color: #9DB1BC;
    text-align: left;
    @media (max-width: 1500px) {
        height: 60px;
        line-height: 60px;
    }
    .user-info {
        .ivu-dropdown {
            margin-left: 0;
        }
    }
}
</style>
