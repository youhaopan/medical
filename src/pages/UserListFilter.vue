<template>
<div class="inline-box">
  <Button type="primary" shape="circle" @click="filterShow = true">
    <span>筛选设置</span>
    <Icon type="icon-pop" />
  </Button>
  <Modal v-model="filterShow" title="筛选设置" width="90%">
    <div class="">
      <Card :bordered="false">
        <p slot="title">
          <Icon custom="icon-basic"></Icon>查询基本信息
        </p>
        <Row class="list-line">
          <i-col span="6">
            <label for="">姓名</label>
          </i-col>
          <i-col span="6">
            <label for="">电话</label>
          </i-col>
          <i-col span="6">
            <label for="">性别</label>
          </i-col>
        </Row>
        <Row class="list-line">
          <i-col span="6">
            <i-input />
          </i-col>
          <i-col span="6">
            <i-input />
          </i-col>
          <i-col span="6">
            <RadioGroup type="button" v-model="sexChoose" class="state-choose">
              <Radio class="error" label="男" />
              <Radio label="女" />
            </RadioGroup>
          </i-col>
        </Row>
      </Card>
      <Row>
        <i-col span="12">
          <Card class="card-tree-date" :bordered="false">
            <p slot="title">
              <Icon type="icon-tree"></Icon>筛选科室
            </p>
            <Input slot="extra" prefix="ios-search" v-model="dname" @on-blur="seldesk" placeholder="查询科室" />
            <Tree :treeData="dataTree1" tree-color="tree-blue" @getTreeCheckedList="getRoomCheckedList">科室</Tree>
          </Card>
        </i-col>
        <i-col span="12">
          <Card class="card-tree-date" :bordered="false">
            <p slot="title">
              <Icon type="icon-date"></Icon>筛选职称
            </p>
            <Input slot="extra" prefix="ios-search" v-model="zname" @on-blur="seltitle" placeholder="查询职称" />
            <Tree :treeData="dataTree" tree-color="tree-purple" @getTreeCheckedList="getTreeCheckedList">职称</Tree>
          </Card>
        </i-col>
      </Row>
    </div>
    <div slot="footer">
      <Button size="large" class="btn-cancel" @click="cancel">取消</Button>
      <Button size="large" type="default" class="btn-submit" @click="ok">提交筛选</Button>
    </div>
  </Modal>
</div>
</template>
<script>
import {
  dataTree
} from '../data/data-tree.js';
import Tree from '../components/Tree';
import urlPath from '../actions/api.js';

import {
  userColumns
} from '../data/user-table';
export default {
  name: 'UserListFilter',
  data() {
    return {
      filterShow: false,
      dataTree,
      sexChoose: '',
      roomCheckedList: [],
      treeCheckedList: [],
      dataTree1:[],dname:'',zname:''
    }
  },
  components: {
    Tree
  }, created() {
        this.getList();
        this.getDeskList();
           },
  methods: {
    seltitle(){
      let that=this;
      $.ajax({ // 加载职称 树
         type:'post',
         url:urlPath.getIndexTable+'/api/UserManager/QueryZTreeList',
         data:{'':this.zname},
         success:function(dataRet){
           //console.log(dataRet.D.childrens)
            that.dataTree=dataRet.D.childrens;
           }
         })
    },
    seldesk(){
      let that=this;
      // $.ajax({ // 加载科室 树
      //   type:'post',
      //   url:urlPath.getIndexTable+'/api/UserManager/QueryDeskZTreeList',
      //   data:{'':this.dname},
      //     success:function(dataRet){
      // //      console.log(dataRet.D.childrens)
      //        that.dataTree1=dataRet.D.childrens;
      //       }
      //     })
      // 已改数据结构
        let desk={'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'),NUM: -1,};
         $.ajax({ // 加载科室 树
           type:'post',
           url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
           data:desk,
             success:function(dataRets){
                 console.log(dataRets.D.listDesk);
                 let arr = [];
                 let children = [];
                 dataRets.D.listDesk.forEach(function(item, index) {
                     if(item.UP === ''){
                        let obj = {
                            UP: "",
                            children: [],
                            disable: false,
                            expand: true,
                            id: item.DESKID,
                            nodeKey: 0,
                            title: item.NAME
                         }
                         arr.push(obj)
                     }else{
                         children.push(item)
                     }
                 });
                 for(let i = 0; i<children.length; i++){
                     for(let j = 0; j<arr.length; j++){
                         if(children[i].UP === arr[j].id){
                             let objData = {
                                UP: children[i].UP,
                                children: null,
                                disable: false,
                                expand: true,
                                id: children[i].DESKID,
                                nodeKey: 1,
                                title: children[i].NAME
                             }
                             arr[j].children.push(objData)
                         }
                    }
                 }
                    that.dataTree1=arr;
                 }
             })
    },
    ok() {
      // this.$Message.info('Clicked ok');
      this.filterShow = false;

      let rarray=this.roomCheckedList;
      let desk="'"+rarray[0].id+"'";
       let rarray1=this.treeCheckedList;
        let title="'"+rarray1[0].id+"'";
      for (let i = 1; i < rarray.length; i++) {
desk+=",'"+rarray[i].id+"'";
      }
      for (let i = 1; i < rarray1.length; i++) {
  title+=",'"+rarray1[i].id+"'";
        }
       let user={Name:this.Name, Phone:this.Phone,'SEXCODE':this.sexChoose,'DEPARTMENT':desk,'TITLE': title};
       let that =this;
        $.ajax({  //按条件查询用户
         type:'post',
         url:urlPath.getIndexTable+'/api/UserManager/QuerySystemUser',
         data:user,
         success:function(dataRet){
          if (dataRet.M=="您的该项操作已经成功执行！")
          {
           that.$emit('func',dataRet.D.listUser)
          }
         else {
           alert("查询失败")
         }
       }
     })
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
      this.filterShow = false
    },
    getRoomCheckedList(data) {
      this.roomCheckedList = data
    },
    getTreeCheckedList(data) {
      this.treeCheckedList = data
    }  , //获取树的数据
      getList()
      {
         let that=this;
         $.ajax({ // 加载职称 树
            type:'post',
            url:urlPath.getIndexTable+'/api/UserManager/QueryZTreeList',
            data:{},
            success:function(dataRet){
              //console.log(dataRet.D.childrens)
               that.dataTree=dataRet.D.childrens;
              }
            })
          }
           ,
          getDeskList(){
              let that=this;
              // $.ajax({ // 加载科室 树
              //   type:'post',
              //   url:urlPath.getIndexTable+'/api/UserManager/QueryDeskZTreeList',
              //   data:{},
              //     success:function(dataRet){
              // //      console.log(dataRet.D.childrens)
              //        that.dataTree1=dataRet.D.childrens;
              //       }
              //     })
              // 已改数据结构
        let desk={'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'),NUM: -1,};
         $.ajax({ // 加载科室 树
           type:'post',
           url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
           data:desk,
             success:function(dataRets){
                 console.log(dataRets.D.listDesk);
                 let arr = [];
                 let children = [];
                 dataRets.D.listDesk.forEach(function(item, index) {
                     if(item.UP === ''){
                        let obj = {
                            UP: "",
                            children: [],
                            disable: false,
                            expand: true,
                            id: item.DESKID,
                            nodeKey: 0,
                            title: item.NAME
                         }
                         arr.push(obj)
                     }else{
                         children.push(item)
                     }
                 });
                 for(let i = 0; i<children.length; i++){
                     for(let j = 0; j<arr.length; j++){
                         if(children[i].UP === arr[j].id){
                             let objData = {
                                UP: children[i].UP,
                                children: null,
                                disable: false,
                                expand: true,
                                id: children[i].DESKID,
                                nodeKey: 1,
                                title: children[i].NAME
                             }
                             arr[j].children.push(objData)
                         }
                    }
                 }
                    that.dataTree1=arr;
                 }
             })
                 }
  }
}
</script>
<style lang="less">
</style>
