<template>
<div class="inline-box">
  <Button type="primary" shape="circle" @click="filterShow = true">
    <span>筛选设置</span>
    <Icon type="icon-pop" />
  </Button>
  <Modal v-model="filterShow" title="筛选设置" width="90%" id="modal">
    <div class="">
      <Row>
        <i-col span="12">
          <Card class="card-tree-date" :bordered="false">
            <p slot="title">
              <Icon type="icon-tree"></Icon>统计图表
            </p>
            <Input slot="extra" v-model="dName" prefix="ios-search" @on-blur="selData" placeholder="查询科室" />
            <Tree :treeData="dataTree" tree-color="tree-blue" @getTreeCheckedList="getTreeData">科室</Tree>
          </Card>
        </i-col>
        <i-col span="12">
          <Card class="card-tree-date" :bordered="false">
            <p slot="title">
              <Icon type="icon-date"></Icon>筛选日期
            </p>
            <Row class="line-title">
              <i-col span="12">
                已选时间段
              </i-col>
              <i-col span="12">
                <Icon type="ios-del" />
              </i-col>
            </Row>
            <Row>
              <i-col span="2">
              </i-col>
              <i-col span="20">
                <DatePicker class="date-time-input" type="datetimerange" placeholder="选择时间段" @on-change='selectDate'></DatePicker>
              </i-col>
              <i-col span="2">
              </i-col>
            </Row>
          </Card>
        </i-col>
      </Row>
      <Card :bordered="false">
        <p slot="title">
          <Icon type="ios-alert"></Icon>筛选状态
        </p>
        <RadioGroup type="button" @on-change="selectSex" class="state-choose">
          <Radio label="正常" value='NORMAL'></Radio>
          <Radio label="一般" value='COMMON'></Radio>
          <Radio class="error" label="严重" value='SEVERTY'></Radio>
          <Radio class="warning" label="警告" value='WARING'></Radio>
        </RadioGroup>
      </Card>
    </div>
    <div slot="footer">
      <Button size="large" class="btn-cancel" @click="cancel">取消</Button>
      <Button size="large" type="default" class="btn-submit" @click="ok">提交筛选</Button>
    </div>
  </Modal>
</div>
</template>
<script>
// import {
//   dataTree
// } from '../data/data-tree.js';
import Tree from '../components/Tree';
import urlPath from '../actions/api.js';

export default {
  data() {
    return {
      filterShow: false,
    //   dataTree,
      stateChoose: '',
      dataTree: [],
      checkedList: [],
      date:[],
      dName: ''
    }
  },
  components: {
    Tree
  },
  created(){
      this.getDeskList();
  },
  methods: {
      selectDate(val){
          this.date = val;
          console.log(val)
      },
      selectSex(val){
          if(val === '正常') this.stateChoose = 'NORMAL'
          if(val === '一般') this.stateChoose = 'COMMON'
          if(val === '严重') this.stateChoose = 'SEVERTY'
          if(val === '警告') this.stateChoose = 'WARING'
          console.log(this.stateChoose)
      },
    ok() {
        // console.log(this.checkedList, this.date, this.stateChoose)
        this.$emit('dataForm', this.checkedList, this.date, this.stateChoose);
      // this.$Message.info('Clicked ok');
      this.filterShow = false
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
      this.filterShow = false
    },
    getTreeData(data){
        let arr = []
        data.forEach(function(item){
            arr.push(item.id)
        })
        this.checkedList = arr;
    },
    getDeskList(){
         let that=this;
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
                    that.dataTree=arr;
                 }
             })
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
                    that.dataTree=arr;
                 }
             })
      },
  }
}
</script>
<style lang="less">
#modal .ivu-modal{
    top: 15px;
    min-width: 1000px;
    @media (max-width:1500px) {
        top: 50px;
    }
}
</style>
