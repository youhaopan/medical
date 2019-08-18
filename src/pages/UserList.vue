<template lang="html">
    <div class="page">
      <position :bread="[{name:'用户管理', path: '/user'}, {name:'用户列表', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">用户列表<span id='count'>共{{total}}条记录</span></p>
            <p slot="extra">
              <Input prefix="ios-search" v-model="sName"  @on-blur="seldata" @keyup.enter.native="seldata"  placeholder="查询用户名..."   style="width: auto" />
              <FilterPop @func="getSelData" />
              <BtnColor btn-title="新建人员" btn-icon="icon-add-user" @open="openPop"  />
            </p>
            <div>
         <!-- <Scroll :on-reach-bottom="handleReachBottom"> -->
              <Table id="user"   :columns="userColumns"   :data="userData">
                <template slot-scope="{ row, index }" slot="ID">
                  <strong :id="index + 1">{{ index+1 }} </strong>
                </template>
                <template slot-scope="{ row }"  slot="SEXCODE">
                  <span v-if="row.SEXCODE==='MAN'">男</span>
                  <span v-else>女</span>
                </template>
                <template slot-scope="{ row }" slot="STARTTYPE">
                  <i-switch    true-value="START" false-value='NOTSTART' @on-change="change($event,row)" :value="row.STARTTYPE" />
                </template>
                <template slot="edit" slot-scope="{ row }">
                    <span  @click="editUser(row)">编辑<Icon custom="icon-edit"/></span>
                </template>
              </Table>
        <!-- </Scroll> -->
            </div>
            <div class="table-bottom">
              <div class="">
                <!-- 自动加载<i-switch v-model="auto" size="large" /> -->
              </div>
              <div class="">
                    <template>
                        <Page :total="total" show-elevator :page-size='pageSize' :current='current' @on-change='onPageSize' />
                    </template>
                <!-- <Button  type="default" class="btn-table-bot" @click='load'>加载更多</Button> -->
              </div>
              <div class="search-box">
                <!-- 转到第 <Input search v-model='value' @on-blur='positioning' enter-button="GO" /> 条 -->
              </div>
            </div>
        </Card>
      </Row>
      <NewUser :pois="pois" :ifupd="ifupd"  v-show="showPop" @cancel="cancel" @save="save" />
    </div>
</template>
<script>
import Position from '../components/position';
import BtnColor from '../components/BtnColor';
import FilterPop from './UserListFilter';
import NewUser from './UserListNew';
 import {
  userColumns,userData
} from '../data/user-table'
import urlPath from '../actions/api.js';
export default {
    name: 'user',
    components: {
        position: Position,
        FilterPop,
        NewUser,
        BtnColor
    },
    data() {
        return {
            total: 0,
            pageSize: 10,
            current: 1,
            zwId: null,
            ksCode: null,
            sexChoose: '',
            showPop: false,
            userColumns,
            userData,
            value: '',
            sName:'',myval:0,
            auto:false,num:1,
            pois:{id: 1,title: 'My'},  ifupd:'true'  
        }
    },
    created(){
        this.getData();
    },
    mounted(){},
    watch:{
        auto:function(val){
            let that=this;
            if (val==true) {
                that.myval= setInterval(function(){
                that.getData();
                },2000);
            } else {
                clearInterval(that.myval );
                // that.myWorker=null;
            }
        }
    },
    methods: {
        onPageSize(current){
            this.current = current;
            this.getData();
            console.log(current)
        },
        positioning(){
            window.location.hash = "#" + this.value;
        },
        handleReachBottom () {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.getData();
                        resolve();
                },500);
            });
        },
        editUser(row){  //修改页面
            this.showPop= true;
            let user = {
                'ID': localStorage.getItem('UID'),
                RANDOMCODE: localStorage.getItem('RANDOMCODE'),
                'USERID':row.USERID,
                CurrentPage: 1,
                PageSize: 1
            }
            let that = this;
            $.ajax({ //
                type:'post',
                url:urlPath.getIndexTable+'/api/UserManager/QuerySystemUser',
                data:user,
                success:function(dataRet) {
                    if (dataRet.Y==100) {
                        that.pois= dataRet.D.listUser[0];
                        that.ifupd='true';
                    }
                }
            })
        },
        seldata(){//查询
            this.sexChoose = '';
            this.ksCode = null
            this.zwId = null
            let user = {
                ID: localStorage.getItem('UID'),
                RANDOMCODE: localStorage.getItem('RANDOMCODE'),
                'NAME':this.sName,
                CurrentPage: 1,
                PageSize: this.pageSize
            }
            let that = this;
            $.ajax({
                type: 'post',
                url: urlPath.getIndexTable+'/api/UserManager/QuerySystemUser',
                data: user,
                success:function(dataRet){
                    if (dataRet.Y==100) {
                        that.userData = dataRet.D.listUser;
                        that.total = dataRet.D.Count;
                    }
                }
            })
        },
        getSelData(data, Count, ks, zw, sex){ //加载页面数据
            this.userData = data;
            this.total = Count;

            this.sexChoose = sex;
            this.ksCode = ks
            this.zwId = zw
            
            // document.getElementById("count").innerHTML = "共"+data.length+"条数据";
        },
        change($event,row){  //启用禁用 改变
            this.$Message.info('开关状态：' + $event);
            let state= $event;
            var user={"STARTTYPE":state,"USERID":row.USERID };
            $.ajax({ // 修改启用 禁用
                type:'post',
                url:urlPath.getIndexTable+'/api/UserManager/UpdateSystemUser',
                data:user,
                success:function(){}
            })
        },
        openPop() {
            this.showPop = true
            this.pois=null;
            this.ifupd='false';
        },
        cancel() {
            this.showPop = false
        },
        save(data) {
            this.showPop = false;
        },
        getData(){
            let user = {
                ID: localStorage.getItem('UID'),
                RANDOMCODE: localStorage.getItem('RANDOMCODE'),
                CurrentPage: this.current,
                PageSize: this.pageSize,
                'NAME':this.sName,
                'SEXCODE':this.sexChoose,
                'DEPARTMENT': this.ksCode,
                'TITLE': this.zwId,
            };
            let that=this;
            $.ajax({ //
                type:'post',
                url:urlPath.getIndexTable+'/api/UserManager/QuerySystemUser',
                data:user,
                success:function(dataRet){
                    if (dataRet.Y==100) {
                        that.userData = dataRet.D.listUser;
                        that.total = dataRet.D.Count;
                    }   
                }
            })
        }
    }
}
</script>

<style lang="css" scoped>
</style>
