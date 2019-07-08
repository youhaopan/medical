<template lang="html">
    <div class="page">
      <position :bread="[{name:'系统设置', path: '/setting'}, {name:'角色管理', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">角色管理<span id="count">共400条记录</span></p>
            <p slot="extra">
              <Input prefix="ios-search" v-model="jName"  @on-blur="seldata" placeholder="查询角色名..." style="width: auto" />
              <BtnColor btn-title="新建角色"    btn-icon="icon-add-room" @open="openPop"  />
              <!-- <newuser /> -->
            </p>
            <div class="">
              <Scroll :on-reach-bottom="handleReachBottom">
              <Table :columns="userColumns"   :data="userData">
                <template slot-scope="{ row, index }" slot="ID">
                  <strong  :id="index + 1">{{ index+1 }} </strong>
                </template>
                <template slot-scope="{ row }" slot="sex">
                  <span v-if="row.SEXCODE==='MAN'">男</span>
                  <span v-else>女</span>
                </template>
                <template slot-scope="{ row }" slot="type">
                  <i-switch true-value="1" false-value='0' :value="row.type" />
                </template>
                <template slot="edit"  slot-scope="{ row }">
                    <span  @click="editrole(row)">编辑<Icon custom="icon-edit"/></span>
                </template>
              </Table>
              </Scroll>
            </div>
            <div class="table-bottom">
              <div class="">
                自动加载<i-switch size="large" />
              </div>
              <div class="">
                <Button type="default" class="btn-table-bot">加载更多</Button>
              </div>
              <div class="search-box">
                转到第 <Input search v-model='value' @on-blur='positioning' enter-button="GO" /> 条
              </div>
            </div>
        </Card>
      </Row>

      <NewRole :pois="pois" :ifupd="ifupd" v-show='showPop' @cancel="cancel" @save="save"></NewRole>
    </div>
</template>
<script>
import Position from '../components/position';
import NewRole from './SettingRoleNew';
import BtnColor from '../components/BtnColor';
import SettingRoomPop from './SettingRoomPop';
import {  userColumns,userData} from '../data/role-table';
import urlPath from '../actions/api.js';
export default {
  name: 'user',
  components: {
    position: Position,
    NewRole,
    BtnColor,
  },
   data() {
      return {
        showPop:false,
        userColumns,
        userData,
        value: '',
        jName:'',num:1,
         pois:{ id: 1,title: 'My'  },
         ifupd:'true'
      }
    } ,
   created(){
        this.getRoleList();
      },
  methods:{
    positioning(){
            window.location.hash = "#" + this.value;
        },
    handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                      this.getRoleList();
                         resolve();
                    },500);
                });
            },
   seldata(){
        let   role={'NAME':this.jName,'NUM':this.num};
        let that=this;
       $.ajax({ // 查询角色信息
           type:'post',
           url:urlPath.getIndexTable+'/api/RoleManager/QueryRole',
           data:role,
           success:function(dataRet){
             if (dataRet.Y==100) {
               if (dataRet.D.listRole==null) {
                   return ;
               }
               let ls=[];
               ls=that.userData;
             if(ls!=undefined ||ls!=null)
              {
                if (  dataRet.D.listRole.length>0) {
                      for( let i = 0; i < dataRet.D.listRole.length; i++ ){  //循环json数组对象的内容
                       let flag = true;  //建立标记，判断数据是否重复，true为不重复
                       for( let j = 0; j <  ls.length  ;j++){  //循环新数组的内容
                         if(ls[j].ID== dataRet.D.listRole[i].ID){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                           flag = false;
                         }
                       }
                       if(flag){ //判断是否重复
                         that.userData.push(dataRet.D.listRole[i]); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
                       }
                      }}
              }
              else {
                that.userData=dataRet.D.listRole;
               }
               that.num++;
                 document.getElementById("count").innerHTML = "共"+  that.userData.length+"条数据";

             }
                }
           })
  },
   openPop() { //新建
         this.showPop = true;
         this.ifupd='false';
        this.pois=null;
      },
      editrole(row){ //修改角色

          let that=this;
          let role={'UID':localStorage.getItem("UID"),'RANDOMCODE':localStorage.getItem("RANDOMCODE"),'ID':row.ID};
          $.ajax({ // 加载角色信息
            type:'post',
            url:urlPath.getIndexTable+'/api/RoleManager/QueryRole',
            data:role,
            success:function(dataRet){
              that.ifupd='true';
              that.pois=dataRet.D.listRole[0];
               console.log(that.pois);
               that.showPop= true;

              }
              })
      },
    getRoleList(){
         let that=this;
         let role={'UID':localStorage.getItem("UID"),'RANDOMCODE':localStorage.getItem("RANDOMCODE")};
         $.ajax({ // 加载角色信息
           type:'post',
           url:urlPath.getIndexTable+'/api/RoleManager/QueryRole',
           data:role,
             success:function(dataRet){
             that.userData=dataRet.D.listRole;
             document.getElementById("count").innerHTML = "共"+that.userData.length+"条数据";
                }
             })
           },
     cancel() {
          this.showPop = false
        },
       save() {
         this.showPop = false;
        },
  }
}
</script>
<style lang="css" scoped>
</style>
