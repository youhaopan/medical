<template lang="html">
    <div class="page">
      <Position :bread="[{name:'智能审核', path: '/page/rule-drug'}, {name:'药品规则', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">药品规则<span id="count">共{{total}}条记录</span></p>
            <p slot="extra">
              <Input prefix="ios-search" v-model="pname" @on-blur="sel" @keyup.enter.native="sel" placeholder="查询通用名/商品名/厂家..." style="width: auto" />
              <!-- <BtnColor btn-title="新建规则" btn-icon="icon-add-rule" @open="openPop('add')"  /> -->
            </p>
            <div class="">
          <!-- <Scroll :on-reach-bottom="handleReachBottom"> -->
              <Table :columns="userColumns" :data="userData" highlight-row @on-current-change='selectYp'>
                <template slot-scope="{ row, index }" slot="ID">
                  <strong  >{{ index+1 }} </strong>
                </template>
                <template slot="edit" slot-scope="{ row, index }">
                    <span @click="openPop('edit', row)">编辑<Icon custom="icon-edit"/></span>
                </template>
              </Table>
           <!-- </Scroll> -->
            </div>
            <div class="table-bottom">
              <div class="">
                <!-- 自动加载<i-switch size="large" /> -->
              </div>
              <!-- <div class="">
                <Button type="default" class="btn-table-bot" @click='load'>加载更多</Button>
              </div> -->
              <template>
                    <Page :total="total" show-elevator :page-size='pageSize' :current='current' @on-change='onPageSize' />
                </template>
              <div class="search-box">
                <!-- 转到第 <Input search enter-button="GO" /> 条 -->
              </div>
            </div>
        </Card>
      </Row>
      <RuleDrugInfo ref="mychild" v-show="showPop" @cancel="cancel" @save="save" />
    </div>
</template>

<script>
import Position from '../components/position';
import BtnColor from '../components/BtnColor';
import RuleDrugInfo from './RuleDrugInfo';
import urlPath from '../actions/api.js';

import {
  userColumns,
//   userData
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
        userData:[],
        pname:'',
        num:1,
        currentRow: {},
        total: 0,
        pageSize: 10,
        current: 1
    }
  },
    created(){
        this.getData();
    },
    methods: {
        onPageSize(current){
            this.current = current;
            this.getData();
            console.log(current)
        },
    handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.getData();
                        resolve();
                    },500);
                });
            },
    sel(){
        if (this.pname.length === 0) {
            this.getData();
        } else {
            // let  drug={'NAME':this.pname};
            let  data = {
                'ID':localStorage.getItem("UID"),
                'RANDOMCODE':localStorage.getItem("RANDOMCODE"),
                CurrentPage: this.current,
                PageSize: this.pageSize,
                drug: {'NAME':this.pname}
            };
            let that=this;
            $.ajax({ // 加载药品信息
                type: 'post',
                url: urlPath.getIndexTable+'/api/DrugManager/QueryDrug',
                data: data,
                success: function(dataRet){
                    if (dataRet.Y==100) {
                        that.userData=dataRet.D.DRUG;
                        that.total = dataRet.D.Count;
                    }
                    // if (dataRet.Y==100) {
                    //     let ls=[];
                    //     ls=that.userData;
                    //     if(ls!=undefined){
                    //         if (  dataRet.D.DRUG.length>0) {
                    //             for( let i = 0; i < dataRet.D.DRUG.length; i++ ){  //循环json数组对象的内容
                    //                 let flag = true;  //建立标记，判断数据是否重复，true为不重复
                    //                 for( let j = 0; j <  ls.length  ;j++){  //循环新数组的内容
                    //                     if(ls[j].USERID== dataRet.D.DRUG[i].USERID){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                    //                         flag = false;
                    //                     }
                    //                 }
                    //                 if(flag){ //判断是否重复
                    //                     that.userData.push(dataRet.D.DRUG[i]); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
                    //                 }
                    //             }
                    //         }
                    //     } else {
                    //         that.userData=dataRet.D.DRUG;
                    // }
                    // document.getElementById("count").innerHTML = "共"+that.userData.length+"条记录";
                    // }
            }
        })
    }
  },
  load(){
    this.num = this.num + 2;
          let  drug={'NAME':this.pname};
            let that=this;
            $.ajax({ // 加载药品信息
              type:'post',
              url:urlPath.getIndexTable+'/api/DrugManager/QueryDrug',
              data:{'ID':localStorage.getItem("UID"),'RANDOMCODE':localStorage.getItem("RANDOMCODE"),"drug":drug, NUM:this.num},
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
          
  },
    getData(){
        let that=this;
        let data = {
                "ID":localStorage.getItem("UID"),
                "RANDOMCODE":localStorage.getItem("RANDOMCODE"),
                "drug": {'NAME':this.pname},
                CurrentPage: this.current,
                PageSize: this.pageSize
        }
        $.ajax({ // 加载药品信息
            type: 'post',
            url: urlPath.getIndexTable+'/api/DrugManager/QueryDrug',
            data: data,
            success: function(dataRet){
                if (dataRet.Y==100) {
                    that.userData=dataRet.D.DRUG;
                    that.total = dataRet.D.Count;
                    // document.getElementById("count").innerHTML = "共"+that.userData.length+"条记录";
                }
            }
        })
    },
    openPop(type, row) {
        if(type === 'add'){
            console.log(this.currentRow)
            if(Object.keys(this.currentRow) == 0){
                // this.$Message.warning('请选择药品');
                return
            }
        } else{
            this.currentRow = row
        }
        this.showPop = true
        console.log(this.currentRow)
        this.$refs.mychild.parentHandleclick(this.currentRow);
        
    },
    cancel() {
      this.showPop = false
    },
    save() {
      this.showPop = false
    },
    selectYp(currentRow){
        this.currentRow = currentRow;
        console.log(this.currentRow)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
