<template lang="html">
    <div class="page">
      <position :bread="[{name:'系统设置', path: '/setting'}, {name:'角色管理', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">角色管理<span id="count">共{{total}}条记录</span></p>
            <p slot="extra">
              <Input prefix="ios-search" v-model="jName"  @on-blur="seldata" @keyup.enter.native="seldata" placeholder="查询角色名..." style="width: auto" />
              <BtnColor btn-title="新建角色"    btn-icon="icon-add-room" @open="openPop"  />
              <!-- <newuser /> -->
            </p>
            <div class="">
              <!-- <Scroll :on-reach-bottom="handleReachBottom"> -->
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
              <!-- </Scroll> -->
            </div>
            <div class="table-bottom">
              <div class="">
                <!-- 自动加载<i-switch size="large" /> -->
              </div>
              <div class="">
                <!-- <Button type="default" class="btn-table-bot" @click='load'>加载更多</Button> -->
                    <template>
                        <Page :total="total" show-elevator :page-size='pageSize' :current='current' @on-change='onPageSize' />
                    </template>
              </div>
              <div class="search-box">
                <!-- 转到第 <Input search v-model='value' @on-blur='positioning' enter-button="GO" /> 条 -->
              </div>
            </div>
        </Card>
      </Row>

      <NewRole :pois="pois" :list='list' :ifupd="ifupd" v-show='showPop' @cancel="cancel" @save="save" @closa='closa'></NewRole>
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
            total: 0,
            pageSize: 10,
            current: 1,
            showPop:false,
            userColumns,
            userData,
            value: '',
            jName:'',num:1,
            pois:{ id: 1,title: 'My'  },
            ifupd:'true',
            list: []
        }
    },
    created(){
        this.getRoleList();
    },
    methods:{
        onPageSize(current){
            this.current = current;
            this.getRoleList();
            console.log(current)
        },
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
        let that = this;
        let role = {
            UID: localStorage.getItem('UID'),
            RANDOMCODE: localStorage.getItem('RANDOMCODE'),
            NAME: this.jName,
            CurrentPage: 1,
            PageSize: this.pageSize
        }
        $.ajax({ // 查询角色信息
            type:'post',
            url:urlPath.getIndexTable+'/api/RoleManager/QueryRole',
            data:role,
            success:function(dataRet){
                if (dataRet.Y==100) {
                    that.userData=dataRet.D.listRole;
                    that.total = dataRet.D.Count;
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
            url:urlPath.getIndexTable+'/api/RoleManager/QureryRoleContorl',
            data:role,
            success:function(dataRet){
                if(dataRet.Y === 100){
                    // that.ifupd='true';
                    // console.log('有数据')
                    that.list = dataRet.D.List;
                    // that.showPop= true;
                } else {
                    // console.log('无数据')
                    that.list = []
                }
            }
        })
        $.ajax({ // 加载角色信息
            type:'post',
            url:urlPath.getIndexTable+'/api/RoleManager/QueryRole',
            data:role,
            success:function(dataRet){
                if(dataRet.Y === 100){
                    that.ifupd='true';
                    that.pois=dataRet.D.listRole[0];
                    console.log(that.pois);
                    that.showPop= true;
                }
            }
        })
    },
    getRoleList(){
        let that=this;
        let role={
            'UID':localStorage.getItem("UID"),
            'RANDOMCODE':localStorage.getItem("RANDOMCODE"),
            CurrentPage: this.current,
            PageSize: this.pageSize,
            NAME: this.jName
        };
        $.ajax({ // 加载角色信息
            type:'post',
            url:urlPath.getIndexTable+'/api/RoleManager/QueryRole',
            data:role,
                success:function(dataRet){
                    if(dataRet.Y === 100){
                        that.userData=dataRet.D.listRole;
                        that.total = dataRet.D.Count;
                    }
            }
        })
    },
    closa(){
        this.getRoleList();
        this.showPop = false;
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
