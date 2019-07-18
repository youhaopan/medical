<template lang="html">
    <div class="page">
      <position :bread="[{name:'系统管理', path: '/page/setting'}, {name:'科室管理', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">科室列表<span id="count">共40条记录</span></p>
            <p slot="extra">
              <Input prefix="ios-search"   @on-blur="seldata"  v-model="DName" placeholder="查询科室名..." style="width: auto" />
              <!-- <FilterPop /> -->
              <BtnColor btn-title="新建科室" btn-icon="icon-add-room" @open="openPop"  />
            </p>
            <div class="">
              <Scroll :on-reach-bottom="handleReachBottom">
              <Table :columns="userColumns" :data="userData">
                <template slot-scope="{ row, index }" slot="ID">
                  <strong :id="index + 1">{{ index + 1 }} </strong>
                </template>
                <template slot="edit"  slot-scope="{ row }">
                    <span @click="editRoom(row)">编辑<Icon custom="icon-edit"/></span>
                 </template>
              </Table>
            </Scroll>
            </div>
            <div class="table-bottom">
              <div class="">
                自动加载<i-switch size="large" />
              </div>
              <div class="">
                <Button type="default" class="btn-table-bot" @click='load'>加载更多</Button>
              </div>
              <div class="search-box">
                转到第 <Input search v-model='value' @on-blur='positioning' enter-button="GO"/> 条
              </div>
            </div>
        </Card>
      </Row>
      <SettingRoomPop  :pois="pois" :ifupd="ifupd" v-show="showPop" @cancel="cancel" @save="save" />
    </div>
</template>
<script>
import Position from '../components/position';
import FilterPop from './SettingRoomFilter';
import SettingRoomPop from './SettingRoomPop';
import BtnColor from '../components/BtnColor';
import {  userColumns,userData} from '../data/setting-room-table.js';
import urlPath from '../actions/api.js';
export default {
  name: 'user',
  components: {
    position: Position,
    FilterPop,
    SettingRoomPop,
    BtnColor,
  },
  data() {
    return {
      showPop: false,
      userColumns,
      userData,DName:'',num:1,
      pois:{id: 1,title: 'My'},
      ifupd:'true',
      value: ''
    }
  },
  watch: {
      value: function(){
          console.log(this.value)
      }
  },
  created() {
        this.getData();
    },
  methods: {
        positioning(){
            window.location.hash = "#" + this.value;
        },
        handleReachBottom () {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                this.getData();
                                resolve();
                            }, 100);
                        });
                    },
        openPop() {
            this.showPop = true;
            this.ifupd='false';
            this.pois=null;
        },
    editRoom(row) {
      this.showPop = true;
       let desk={'DESKID':row.DESKID,'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE')};
       let that=this;
     $.ajax({ //
          type:'post',
          url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
          data:desk,
          success:function(dataRet){
             that.pois=dataRet.D.listDesk[0];
            // console.log(that.pois);
                that.ifupd='true';
           }})
    },
    cancel() {
      this.showPop = false
    } ,
    seldata(){ //查询
       let desk={'NAME':this.DName};
        let that=this;
      $.ajax({ //
           type:'post',
           url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
           data:desk,
           success:function(dataRet){
             that.userData=dataRet.D.listDesk;
       document.getElementById("count").innerHTML ="共"+dataRet.D.listDesk.length+"条数据";
    }})
  },
    save() { //保存信息
      this.showPop = false;
    },
    load(){
      this.num = this.num + 2;
      let that=this;
      let desk={'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'),NUM:this.num,};
      $.ajax({
        type:'post',
        url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
        data:desk,
          success:function(dataRet){
            console.log(dataRet.D.listDesk);
            if (dataRet.Y==100) {
              if (dataRet.D.listDesk==null) {
                  return ;
              }
              let ls=[];
              ls=that.userData;
            if(ls!=undefined)
             {
               if (dataRet.D.listDesk.length>0) {
                     for( let i = 0; i < dataRet.D.listDesk.length; i++ ){  //循环json数组对象的内容
                       let flag = true;  //建立标记，判断数据是否重复，true为不重复
                       for( let j = 0; j <  ls.length  ;j++){  //循环新数组的内容
                         if(ls[j].DESKID== dataRet.D.listDesk[i].DESKID){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                           flag = false;
                         }
                       }
                       if(flag){ //判断是否重复
                         that.userData.push(dataRet.D.listDesk[i]); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
                       }
                     }}
             }
             else {
               that.userData=dataRet.D.listDesk;
              }
              // that.num++;
        document.getElementById("count").innerHTML ="共"+ that.userData.length+"条数据";
            }  }
          })
    },
    getData(){
      let that=this;
      let desk={'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'),NUM:this.num,};
      $.ajax({
        type:'post',
        url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
        data:desk,
          success:function(dataRet){
            console.log(dataRet.D.listDesk);
            if (dataRet.Y==100) {
              if (dataRet.D.listDesk==null) {
                  return ;
              }
              let ls=[];
              ls=that.userData;
            if(ls!=undefined)
             {
               if (dataRet.D.listDesk.length>0) {
                     for( let i = 0; i < dataRet.D.listDesk.length; i++ ){  //循环json数组对象的内容
                       let flag = true;  //建立标记，判断数据是否重复，true为不重复
                       for( let j = 0; j <  ls.length  ;j++){  //循环新数组的内容
                         if(ls[j].DESKID== dataRet.D.listDesk[i].DESKID){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                           flag = false;
                         }
                       }
                       if(flag){ //判断是否重复
                         that.userData.push(dataRet.D.listDesk[i]); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
                       }
                     }}
             }
             else {
               that.userData=dataRet.D.listDesk;
              }
              that.num++;
        document.getElementById("count").innerHTML ="共"+ that.userData.length+"条数据";
            }  }
          })
    }
  }
}
</script>
<style lang="css" scoped>
</style>
