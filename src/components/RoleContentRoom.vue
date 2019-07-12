<template lang="html">
    <ul>
      <li>
        <label>费别</label>
        <Select v-model="price" style="width:200px" @on-change='selectPriceId' :label-in-value='true'>
            <Option v-for="item in priceList" :value="item.CODE" :key="item.CODE">{{ item.Type }}</Option>
        </Select>
      </li>
      <li>
        <label>违规等级</label>
        <Select v-model="degree" style="width:200px" @on-change='selectDegreeId' :label-in-value='true'>
            <Option v-for="item in degreeList" :value="item.CODE" :key="item.CODE">{{ item.Type }}</Option>
        </Select>
      </li>
      <li style="margin-top:10px">
        <tree-component ref="treeKs" :treeData="dataTree"  @getTreeCheckedList="getTreeData" >不允许的科室</tree-component>
      </li>
    </ul>
</template>

<script>
import {  dataTree,  dataTreeRole
} from '../data/data-tree.js';
import TreeComponent from '../components/RoomTree';
import urlPath from '../actions/api.js';
export default {
  name: "roleContentRoom",
  props: {
    priceList: Array,
    degreeList: Array,
  },
  data() {
    return {
      dataTree,
      dataTreeRole,
      price: '',
      degree: '',
      checkedList:[],
      feibie: ''
    }
  },
  created(){
    this.getDeskList();
  },
  components: {
    TreeComponent,
  },
  methods:{
    selectPriceId(val){
        console.log(val)
        this.$emit('selectPriceId', val)
    //   console.log(this.priceId)
    },
    selectDegreeId(val){
        console.log(val)
        this.$emit('selectDegreeId', val)
    //   console.log(this.degreeId)
    },
    reset(){
        this.price = '';
        this.degree = '';
        this.$refs.treeKs.delAllChecked();
    },
    getDeskList(){ //查询树的 数据
        let that=this;
        // $.ajax({ // 加载科室 树
        //   type:'post',
        //   url:urlPath.getIndexTable+'/api/UserManager/QueryDeskZTreeList',
        //   data:{'':this.dname},
        //     success:function(dataRet){
        //   that.dataTree=dataRet.D.childrens;
        //         }
        //     })
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
                 let ksArr = [];
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
                            ksArr.push(objData)
                            arr[j].children.push(objData)
                         }
                    }
                 }
                    that.dataTree=arr;
                    localStorage.setItem('ks', JSON.stringify(ksArr));
                 }
             })
        },
        getTreeData(data){
            this.checkedList=data;
            // console.log(this.checkedList)
            this.$emit('checkedList', this.checkedList);
        },
  }
}
</script>

<style lang="css" scoped>
</style>
