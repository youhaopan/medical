<template lang="html">
    <div class="page">
      <Position :bread="[{name:'智能审核', path: '/page/rule-drug'}, {name:'药品规则', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">药品规则<span id="count">共40条记录</span></p>
            <p slot="extra">
              <Input prefix="ios-search" v-model="pname" @on-blur="sel" placeholder="查询通用名/商品名/厂家..." style="width: auto" />
              <BtnColor btn-title="新建规则" btn-icon="icon-add-rule" @open="openPop"  />
            </p>
            <div class="">
          <Scroll :on-reach-bottom="handleReachBottom">
              <Table :columns="userColumns" :data="userData">
                <template slot-scope="{ row, index }" slot="ID">
                  <strong  >{{ index+1 }} </strong>
                </template>
                <template slot="edit">
                    <span @click="openPop">编辑<Icon custom="icon-edit"/></span>
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
                转到第 <Input search enter-button="GO" /> 条
              </div>
            </div>
        </Card>
      </Row>
      <RuleDrugInfo v-show="showPop" @cancel="cancel" @save="save" />
    </div>
</template>

<script>
import Position from '../components/position';
import BtnColor from '../components/BtnColor';
import RuleDrugInfo from './RuleDrugInfo';
import urlPath from '../actions/api.js';

import {
  userColumns,
  userData
} from '../data/rule-drug.js';
export default {
  name: 'user',
  components: {
    Position,
    BtnColor,
    RuleDrugInfo
  },
  data() {
    return {
      showPop: false,
      userColumns,
      userData,pname:'',num:1
    }
  },
  created(){
    this.getData();
  },
  methods: {
    handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                      this.getData();
                         resolve();
                    },500);
                });
            },
    sel(){
          if (this.pname.length==0) {
              this.getData();
          }else {
          let  drug={'NAME':this.pname};
            let that=this;
            $.ajax({ // 加载角色信息
              type:'post',
              url:urlPath.getIndexTable+'/api/DrugManager/QueryDrug',
              data:{'ID':localStorage.getItem("UID"),'RANDOMCODE':localStorage.getItem("RANDOMCODE"),"drug":drug},
              success:function(dataRet){
                if (dataRet.Y==100) {
                  let ls=[];
                  ls=that.userData;
                if(ls!=undefined)
                 {
                   if (  dataRet.D.DRUG.length>0) {
                         for( let i = 0; i < dataRet.D.DRUG.length; i++ ){  //循环json数组对象的内容
                           let flag = true;  //建立标记，判断数据是否重复，true为不重复
                           for( let j = 0; j <  ls.length  ;j++){  //循环新数组的内容
                             if(ls[j].USERID== dataRet.D.DRUG[i].USERID){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                               flag = false;
                             }
                           }
                           if(flag){ //判断是否重复
                             that.userData.push(dataRet.D.DRUG[i]); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
                           }
                         }}
                 }
                 else {
                   that.userData=dataRet.D.DRUG;
                  }
                  document.getElementById("count").innerHTML = "共"+that.userData.length+"条记录";
                    }
                }
                })
          }
  },
    getData(){
      let that=this;
      $.ajax({ // 加载角色信息
          type:'post',
          url:urlPath.getIndexTable+'/api/DrugManager/QueryDrug',
          data:{"ID":localStorage.getItem("UID"),"RANDOMCODE":localStorage.getItem("RANDOMCODE"),"drug":null},
            success:function(dataRet){
                if (dataRet.Y==100) {
                  that.userData=dataRet.D.DRUG;
                   document.getElementById("count").innerHTML = "共"+that.userData.length+"条记录";
                }
               }
            })
    },
    openPop() {
      this.showPop = true
    },
    cancel() {
      this.showPop = false
    },
    save() {
      this.showPop = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
