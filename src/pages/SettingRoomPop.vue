<template>
<Modal class="pop-mod" :value="true" width="90%" title="科室设置" :closable="false" :mask-closable="false">
  <div>
    <Icon type="md-close" slot="close" class="modal-close" @click="$emit('cancel')" />
    <Row>
      <i-col span="12">
        <Card class="card-tree-date room-set-card" :bordered="false">
          <p slot="title">
            <Icon type="icon-tree"></Icon>科室
          </p>
          <Input slot="extra" prefix="ios-search" v-model="dName" @on-blur="selData" placeholder="查询科室" />
          <Tree :treeData="dataDesk1" @getTreeCheckedList="getTreeData">科室</Tree>
        </Card>
      </i-col>
      <i-col span="12">
        <Card class="card-tree-date room-set-card" :bordered="false">
          <p slot="title">
            <Icon type="icon-date"></Icon>当前
          </p>
          <ul>
            <li>
              <label>科室名称</label>
              <Input v-model="departName" />
            </li>
            <li>
              <label>科室编号</label>
              <div>
                  <Input v-model="Code" />
              </div>
            </li>
            <li>
              <label>科室类型</label>
              <Select v-model="lx" style="width:200px">
        <Option v-for="item in leiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
            </li>
            <li>
              <label>科室简介</label>
              <Input v-model="desc" />
            </li>
          </ul>
        </Card>
      </i-col>
    </Row>
  </div>
  <div slot="footer">
    <Button size="large" class="btn-cancel" @click="$emit('cancel')">取消</Button>
    <Button size="large" type="default" class="btn-submit" @click="AddDesk">保存信息</Button>
  </div>
</Modal>
</template>
<script>
import {
  dataTree
} from '../data/data-tree.js';
import Tree from '../components/Tree';
import urlPath from '../actions/api.js';
export default {
  created(){
    this.getDeskList();
    this.getList();
  },
  data() {
    return {
      dataTree,
      departName: '',
      departDirector: '',
      nameList: [{
        label: '名字',
        value: '2048fjf'
      }],
      leiList:{},
      lx:'',Code:'',desc:'',dName:'',
      checkedList:[],dataDesk1:[]
    }
  },props: {
    pois:{ type:Object},
    ifupd:{type:String}
  },
  components: {
    Tree
  },
  watch:{
  pois(val){
       if (this.ifupd=='true') {
         this.departName=val.NAME;
         this.Code= val.CODE;
         this. lx= val.TYPE;
        this.desc =  val.DESC;
      }else {
          this.departName='';
          this.Code='';
          this. lx='';
          this.desc ='';
      }
  }
},
   methods:{
     getTreeData(data){
        this.checkedList=data;
        },
  selData(){ //查询树的 数据
    let that=this;

    // $.ajax({ // 加载科室 树
    //      type:'get',
    //      url:urlPath.getIndexTable+'/api/UserManager/QueryDeskZTreeList',
    //      data:{'':this.dname},
    //       success:function(dataRet){
    //         console.log(dataRet.D.childrens);
    //         that.dataDesk1=dataRet.D.childrens;
    //           }
    //       })
    // 已改数据结构
        let desk={
            'ID':localStorage.getItem('UID'),
            'RANDOMCODE':localStorage.getItem('RANDOMCODE'),
            NUM: -1,
            NAME: this.dName
        };
         $.ajax({ // 加载科室 树
           type:'post',
           url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
           data:desk,
             success:function(dataRets){
                //  console.log(dataRets.D.listDesk);
                 let arr = [];
                 let children = [];
                 dataRets.D.listDesk.forEach(function(item, index) {
                     if(item.UP === '' || item.UP==='0'){
                        let obj = {
                            UP: item.UP,
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
                    that.dataDesk1=arr;
                 }
             })
      },
       AddDesk(){
        // console.log(this.checkedList);
         let up="";
         if (this.checkedList.length==0) {
            up='';}else {
          up  =this.checkedList[0].id;
        }
        let desk={'DESKID':"", 'ID':localStorage.getItem("UID"),'CODE':this.Code,'NAME':this.departName,'DESC':this.desc,'TYPE':this.lx,'UP':up };
        let that=this;
         if (that.pois!=null) {
          desk.DESKID=this.pois.DESKID;
          $.ajax({
              type:'post',
              url:urlPath.getIndexTable+'/api/DeskManager/UpdateDesk',
              data:desk,
              success:function(dataRet){
                if(dataRet.Y==100)
                 {
                  alert("修改成功")
                  that.$emit("save",dataRet.M);
                } else {
                  that.$emit("save","修改失败");
                   }
                }
              })
        }else {
          desk.DESKID=null;
         $.ajax({
           type:'post',
           url:urlPath.getIndexTable+'/api/DeskManager/AddDesk',
           data:desk,
             success:function(dataRet){
               if (dataRet.Y==100)
                {
                 alert("添加成功")
                 that.$emit("save",dataRet.M);
               }else {
                 that.$emit("save","添加失败");
                  }
               }
             })  }
       },
     getList(){// 加载科室类型
        let that=this;
        $.ajax({
          type:'post',
          url:urlPath.getIndexTable+'/api/DeskManager/QueryDeskTypeList',
          data:{},
            success:function(dataRet){
               that.leiList=dataRet.D.listDesk;
              }
            })
          },
    getDeskList(){
         let that=this;
        
        //  $.ajax({ // 加载科室 树
        //    type:'post',
        //    url:urlPath.getIndexTable+'/api/UserManager/QueryDeskZTreeList',
        //    data:{},
        //      success:function(dataRet){
        //             console.log(dataRet.D.childrens);
        //             that.dataDesk1=dataRet.D.childrens;
        //          }
        //      })
        // 已改数据结构
        let desk={'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'),NUM: -1,};
         $.ajax({ // 加载科室 树
           type:'post',
           url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
           data:desk,
             success:function(dataRets){
                //  console.log(dataRets.D.listDesk);
                 let arr = [];
                 let children = [];
                 dataRets.D.listDesk.forEach(function(item, index) {
                     if(item.UP === '' || item.UP === '0'){
                        let obj = {
                            UP: item.UP,
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
                    that.dataDesk1=arr;
                 }
             })
    },

  }
}
</script>
<style lang="less">
</style>
