<template>
<Modal class="pop-mod bg-modal" v-model="popShow" width="65%" title="基本设置" :closable="false" :mask-closable="false">
  <div slot="header">
  </div>
  <div solt="close" class="modal-close">
    <Icon type="md-close" @click="$emit('cancel')" />
  </div>
  <Card :bordered="false">
    <p slot="title">
      基本设置
    </p>
    <div class="">
      <Row>
        <i-col span="12">
          <ul class="pop-list">
            <li>
              <label>姓名</label>
              <Input  v-model="name"/>
            </li>
            <li>
              <label>性别</label>
              <div >
                <Select v-model="sex" style="width:180px">
                  <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </div>
            </li>
             <li>
                <label>身份证号码</label>
                    <Input  v-model="aid"/>
              </li>
            <li>
              <label>账号</label>
              <Input   v-model="uName"   />
            </li>
            <li>
              <label>密码</label>
              <Input v-model="pwd" type="password" />
            </li>
            <li>
              <label>邮箱</label>
              <Input v-model="email" />
            </li>
          </ul>
        </i-col>
        <i-col span="12">
          <div class="modal-img-box">
            <img src="../images/pic_user2.png" class="modal-pic-box"/>
            <p><span>更换头像</span></p>
          </div>
        </i-col>
      </Row>
      <Row>
        <i-col>
          <ul class="pop-list">
            <li>
              <label>用户编号</label>
              <Input  v-model="number"/>
          </li>
            <li>
              <label>个人简介</label>
              <Input  v-model="JianJie" />
          </li>
            <li>
              <p>科室 </p>
            </li>
            <li>
              <Select v-model="Desk" style="width:200px">
              <Option v-for="item in DeskList" :value="item.DESKID" :key="item.DESKID">{{ item.NAME }}</Option>
            </Select>
            </li>
            <li>
              <label>职称</label>
              <Select v-model="zc" style="width:200px">
        <Option v-for="item in zhicList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
            </li>
            <li>
              <label>职务</label>
              <Select v-model="zw" style="width:200px">
        <Option v-for="item in zhiwuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
            </li>
          </ul>
        </i-col>
      </Row>
    </div>
  </Card>
  <Card :bordered="false">
    <p slot="title">
      角色设置
    </p>
    <ul class="pop-list">
      <li>
        <label>角色</label>
        <Select v-model="role" style="width:180px">
          <Option v-for="item in roleList" :value="item.ID" :key="item.ID">{{ item.NAME }}</Option>
      </Select>
      </li>
    </ul>
  </Card>
  <div slot="footer">
    <Button size="large" class="btn-cancel" @click="$emit('cancel')">删除用户</Button>
    <Button size="large" class="btn-stop" @click="$emit('cancel')">停用账户</Button>
    <Button size="large" type="default" class="btn-submit" @click="ChangData">保存信息</Button>
  </div>
</Modal>
</template>
<script>
//@click="$emit('save')"
import urlPath from '../actions/api.js';

export default {
   data() {
    return {
      popShow: true,
      sex: '',
      name:'',
      Desk:'',
      pwd:'',
      JianJie:'',uName:'',email:'',
      number:'',
      zc:'', zw:'',aid:'',role:'',
      sexList: [{
        value: 'UNCERTAINTY',
        label: '保密'
      }, {
        value: 'MAN',
        label: '男'
      }, {
        value: 'WOMAN',
        label: '女'
      }],roleList:[{ID:'1','NAME':'角色'}],
      DeskList : [
         {   DESKID: '0', NAME: '保密'}
        ,{   DESKID: '1', NAME: '呵呵' }
      ] ,
        zhicList: [{
          value: '0',
          label: '保密'
        },{
          value: '8',
          label: '21645'
        }],
      zhiwuList : [{
        value: '0',
        label: '保密'
      },{
        value: '8',
        label: '21645'
      }]
    }
  },
props: {
  pois:{
    type:Object
  },
  ifupd:{type:String}
},
created() {
    this.getList();
    this.getList2();
    this.getList3();
    this.getRoleList();
        },
// mounted() {
//  console.log(this.pois);
//  },
 watch:{
   pois(val){
     console.log(val);
     if (this.ifupd=='true') {
       this.number=val.AIDENTITY;   this.role=  val.ROLEID
       this.name=val.NAME;       this.uName=val.ACCOUNTS;
       this.sex=val.SEX;       this.aid=val.AIDENTITY;
       this.email =val.MAIL;       this.JianJie=val.MAIL;
       this.number=val.NUMBER;       this.Desk=val.DEPARTMENT;
       this.zw =val.DUTY;       this.zc=val.TITLE;
     }
     else {
       this.number='';       this.name='';
       this.uName='';       this.sex='';
       this.aid='';       this.email ='';
       this.JianJie='';
       this.Desk='';       this.zw ='';
       this.zc='';       this.role=''
     }
   }
 },
  methods:{
ChangData(){
     let sex=this.sex; //获取性别
     let Id=localStorage.getItem('UID');
     let  rc= localStorage.getItem('RANDOMCODE')
      let user={'ID':Id,'RANDOMCODE':rc,"ACCOUNTS":this.uName,"PASSWORD":this.pwd,"NAME":this.name,'SEX':sex ,"MAIL":this.email,"REMARKS":this.JianJie,'DUTY':this.zw,
     "DEPARTMENT":this.Desk ,"TITLE":this.zc,"START":"START",'NUMBER':this.number,'AIDENTITY':this.aid,'ROLEID':this.role, 'USERID':'' }
      if (this.uName=="" || this.pwd=="" ||  this.Desk=="" || this.aid=="" || this.number=="") {
       this.$Message.info('请填写完整信息');
     return ;
     }
      let that=this;
     if (this.ifupd=="true") {
       user.USERID=this.pois.USERID;
          $.ajax({  //修改用户
                type:'post',
                url:urlPath.getIndexTable+'/api/UserManager/UpdateSystemUser',
                data:user,
                success:function(dataRet){
                 that.pois=null;
                 if (dataRet.Y==100)
                  {
                   that.$emit("save",dataRet.Y);
                 }
                 else {
                   that.$emit( "修改失败");
                       }
                    }
          })
        }else {
          user.USERID=null;
          $.ajax({  //添加用户
           type:'post',
           url:urlPath.getIndexTable+'/api/UserManager/AddSystemUser',
           data:user,
           success:function(dataRet){
            if (dataRet.Y==100)
             {
               alert("添加成功")
              that.$emit("save",dataRet.M);
            }else {
              that.$emit("添加失败");
                  }
               }
             })
}} ,
  getRoleList(){
          let that=this;
          let role={"UID":localStorage.getItem("UID")};
          $.ajax({ //加载角色信息
            type:'post',
            url:urlPath.getIndexTable+'/api/RoleManager/QueryRole',
            data:role,
             success:function(dataRet){
               if (dataRet.Y==100) {
                 console.log(dataRet.D.listRole);
                 that.roleList=dataRet.D.listRole;
               }
                }
              })},
    getList(){// 加载科室
      let that=this;
      $.ajax({
        type:'post',
        url:urlPath.getIndexTable+'/api/DeskManager/QueryDeskList',
        data:{},
          success:function(dataRet){
             that.DeskList=dataRet.D.listDesk;
            }
          })
         } ,
    getList2(){ // 加载职称
           let that=this;
           $.ajax({
                 type:'post',
                 url:urlPath.getIndexTable+'/api/UserManager/QueryZCList',
                 data:{},
                 success:function(dataRet){
                    that.zhicList=dataRet.D.listZC;
                   }
                 })} ,
    getList3(){// 加载职务
           let that=this;
           $.ajax({
               type:'post',
               url:urlPath.getIndexTable+'/api/UserManager/QueryZWList',
               data:{},
               success:function(dataRet){
                 that.zhiwuList=dataRet.D.listZW;
              }
               })
              }
}
}//export default

</script>
<style lang="less" scoped>

</style>
