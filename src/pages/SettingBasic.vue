<template lang="html">
    <div class="page">
      <Position :bread="[{name:'系统设置', path: '/page/setting'}, {name:'医院基本信息管理', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">医疗机构信息</p>
            <div >
              <label>医疗机构名称</label>
              <Input v-model="hospitalName"/>
              <label>医疗机构等级</label>
              <Select v-model="hospitalLevel" style="width:200px">
                <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <label>医疗机构性质</label>
              <Select v-model="hospitalPage" style="width:200px">
                <Option v-for="item in pageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <label>医疗机构类型</label>
              <Select v-model="hospitalType" style="width:200px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button size="large" type="default" class="btn-submit" @click="saveMessage">确定修改</Button>
            </div>
        </Card>
        <Card :bordered="false" class="sencond">
          <p slot="title">超级管理员密码修改</p>
          <div >
            <label>旧密码</label>
            <Input v-model="oldPsw"/>
            <label>新密码</label>
            <Input v-model="newPsw"/>
            <label>确认新密码</label>
            <Input v-model="verifyNewPsw"/>
            <Button size="large" type="default" class="btn-submit" @click="savePsw">确定修改</Button>
          </div>
        </Card>
        <Back-top></Back-top>
      </Row>
    </div>
</template>

<script>
import Position from '../components/position';
import urlPath from '../actions/api.js';

export default {
  name: 'user',
  components: {
    Position,
  },
  data() {
    return {
      levelList: [{
        "value": "1",
        "label": "一级甲等"
      }, {
        "value": "2",
        "label": "二级甲等"
      }],
      pageList: [{
        "value": "3",
        "label": "商用"
      }, {
        "value": "4",
        "label": "军用"
      }],
      typeList: [{
        "value": "5",
        "label": "高等"
      }, {
        "value": "6",
        "label": "中等"
      }],
      hospitalName: "",
      hospitalLevel: "",
      hospitalPage: "",
      hospitalType: "",
      oldPsw: "",
      newPsw: "",
      verifyNewPsw: "",
    }
  },
  methods: {
    saveMessage() {
      this.$Message.info('Clicked 1 ok');
    },
    savePsw() {
    if (this.newPsw==""||this.verifyNewPsw=="" ||this.oldPsw=="") {
        this.$Message.info('请输入完整信息，请确认');
        return ;
    }
      if (this.newPsw!=this.verifyNewPsw) {
        this.$Message.info('两次密码不一样，请确认 2 ok');
              return ;
      }
    let  ID=  localStorage.getItem('UID');
     let  RANDOMCODE= localStorage.getItem('RANDOMCODE')  //随机码
     let user={'ID':ID,'PASSWORD':this.oldPsw,'NEWPASSWORD':this.verifyNewPsw}
     let that=this;
             $.ajax({
              type:'post',
              url:urlPath.getIndexTable+'/api/UserManager/UpdateSystemUserPwd',
              data:user,
              success:function(reult){
                if (reult.M=="您的该项操作已经成功执行") {
                  that.$Message.info('密码修改成功');
                }else {
                  that.$Message.info('密码修改失败');

                }
              },error:function(){


              }

             })
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-card {
    width: 75%;
    margin-left: 13%;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: #eee;
}
button,
input,
label,
select {
    display: block;
}
label {
    margin: 21px 0 0 75px;
    font-family: "Microsoft YaHei","Bold";
}
.ivu-input-wrapper {
    margin: 16px 0 0 75px;
}
.ivu-select {
    margin: 16px 0 0 75px;
}
button {
    margin: 80px 0 30px 70%;
    background-color: #1ABCB0;
    color: #fff;
}
.sencond {
    margin-top: 45px;
}
.ivu-back-top {
    bottom: 40% !important;
}
</style>
