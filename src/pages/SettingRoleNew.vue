<template>
<!-- <div class="inline-box"> -->
  <!-- <Button type="primary" shape="circle" @click="popShow = true">
    <span>新建角色</span>
    <Icon custom="icon-add-user" />
  </Button> -->
  <Modal  class="pop-mod" :value="true" width="90%" title="角色设置"  :closable="false" :mask-closable="false" >
    <div class="">
        <Icon type="md-close" slot="close" class="modal-close" @click="$emit('cancel')" />
      <Row class="list-line">
        <i-col span="6">
          <label for="">角色名称</label>
        </i-col>
        <i-col span="6">
          <label for="">角色描述</label>
        </i-col>
      </Row>
      <Row class="list-line">
        <i-col span="6">
          <i-input v-model="rname" />
        </i-col>
        <i-col span="6">
          <i-input v-model="Remark" />
        </i-col>
        <i-col span="6">
         </i-col>
        <i-col span="6">
          <label>跨科室查看权限</label>
          <i-switch class="ml-form" :value="true" />
        </i-col>
      </Row>
      <Row class="wrapper-row">
        <i-col span="12">
          <Card class="card-tree-date" :bordered="false">
            <p slot="title">
              <Icon type="icon-tree"></Icon>人员信息
            </p>
            <Input slot="extra" prefix="ios-search" v-model="uname"  @on-blur="sel" placeholder="查询人员" />
            <Tree :treeData="dataDesk" @getTreeCheckedList="getTreeCheckedList">科室</Tree>
          </Card>
        </i-col>
        <i-col span="12">
          <Card class="card-tree-date" :bordered="false">
            <p slot="title">
              <Icon type="icon-settings"></Icon>界面操作权限
            </p>
            <Input slot="extra" prefix="ios-search" v-model="cname" @on-blur="selCzuo" placeholder="查询操作" />
            <Tree :treeData="formdata" @getTreeCheckedList="getTreeCheckedList1">操作</Tree>
          </Card>
        </i-col>
      </Row>
    </div>
    <div slot="footer">
      <Button size="large" class="btn-cancel" @click="cancel">删除角色</Button>
      <Button size="large" class="btn-stop" @click="cancel">停用角色</Button>
      <Button size="large" type="default" class="btn-submit" @click="ok">保存信息</Button>
    </div>
  </Modal>
<!-- </div> -->
</template>
<script>
import {
  dataTree
} from '../data/data-tree.js';
import Tree from '../components/Tree';
import urlPath from '../actions/api.js';
export default {
  data() {
    return {
      dataTree,
      dataDesk:[],formdata:[],
      treecheckedList:[],
      treecheckedList1:[],
      rname:'',uname:'',cname:'',Remark:'',

  } }, props: {
      pois:{ type:Object },
      ifupd:{type:String}},
   watch:{
      pois(val){
         if (this.ifupd=='true') {
        this.rname=val.NAME;
        this.Remark=val.DESC;
          }else {
            this.rname='';
            this.Remark='';  
        }
      }
    },components: {
      Tree
    },
  created(){
    this.getDeskList();
    this.getFormList();
  },
  mounted(){
  },
  methods: {
    sel(){ //查询人员
      if (this.uname=='' ||this.uname.length==0) {
        this.getDeskList() ;
        }
      else {
          let that=this;
           $.ajax({ //加载 人员 树
               type:'post',
               url:urlPath.getIndexTable+'/api/RoleManager/QueryUserList',
               data:  {"":this.uname},
               success:function(ret)
               {
                 that.dataDesk=ret.D.childrens;
               }
          })
    }
    },
    getTreeCheckedList(data){ //人员信息 树形数据结构
      this.treecheckedList=data;
      },
    getTreeCheckedList1(data){ //界面权限
    this.treecheckedList1=data;
  },
    ok() {//新增
        let userlist=[];
        let formlist=[];
      for (let i = 0; i <this. treecheckedList.length; i++) {
          let  obj={USERID:this.treecheckedList[i].id}
            userlist.push(obj);
        }
      for (let j = 0; j <this. treecheckedList1.length; j++) {
          let  ob={FORMID:this.treecheckedList1[j].id}
          formlist.push(ob);
        }

         let ROLE={'NAME':this.rname,'DESC':this.Remark}

          let that=this;
      $.ajax({ //加载界面权限 树
              type:'post',
              url:urlPath.getIndexTable+'/api/RoleManager/AddRoleUseJurisdictr',
              data: {ID:localStorage.getItem("UID"),RANDOMCODE:localStorage.getItem("RANDOMCODE"),ROLE:ROLE,LISTROLEUSER:userlist,LISTUSERMENU:formlist,LISTROLEMENU:formlist},
               success:function(ret)
              {
              if (ret.Y==100) {
                 that.$Message.info('新增成功');
               }
               else {
              that.$Message.info('新增失败');
                  }
             }
          })
      this.popShow = false ;
    },   getFormList(){
              let that=this;
              $.ajax({ //加载界面 树
                  type:'post',
                  url:urlPath.getIndexTable+'/api/RoleManager/QueryFormList',
                  data:{'postData':null},
                  success:function(ret)
                    {
                        that.formdata=ret.D.childrens;
                    }
                  })
                },
        selCzuo(){ //查询权限
              let that=this;
              $.ajax({ //加载 人员 树
                  type:'post',
                  url:urlPath.getIndexTable+'/api/RoleManager/QueryFormList',
                  data:{ "":this.cname },
                  success:function(ret)
                    {
                      that.formdata=ret.D.childrens;
                    }
                  })
                   },
     getDeskList(){
            let that=this;
            $.ajax({ //加载 人员 树
                type:'post',
                url:urlPath.getIndexTable+'/api/RoleManager/QueryUserList',
                data:{'Name':this.uname},
                success:function(ret)
                 {
                   that.dataDesk=ret.D.childrens;
                 }
                })
               },
    cancel() {
      // this.$Message.info('Clicked cancel');
      this.popShow = false;
    }
  }
}
</script>
<style lang="less">
</style>
