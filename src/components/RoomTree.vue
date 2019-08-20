<template lang="html">
  <Row>
    <i-col span="12">
      <label>选择<slot></slot></label>
      <Input prefix="ios-search" placeholder="查询科室..." v-model="dname" @on-blur="seldesk" @keyup.enter.native='seldesk' style="width:160px" />
      <Tree :data="treeData1" @on-select-change="select"></Tree>
    </i-col>
    <i-col span="12">
      <label><slot></slot><Icon class="right-icon" type="ios-trash" @click="delAllChecked" /></label>
      <!-- <Tree class="ivu-tree-color" :data="dataTree"></Tree> -->
      <ul class="tree-check-list tree-pink">
        <li v-for="(item,index) in checkTreeList" :key="index">
          {{item.title}}
          <Icon class="a-icon" type="ios-close" @click="delChecked(index)" />
        </li>
      </ul>
    </i-col>
  </Row>
</template>

<script>
import urlPath from '../actions/api.js';
export default {
  name: 'tree',
  props: {
    treeData: Array
  },
  data() {
    return {
      dname: '',
      checkedTreeID:'',
      checkedTree: '',
      checkTreeList: [],
      treeData1:[]
    }
  },
  created:function(){
      this.getDeskList();
        this.$emit('getTreeCheckedList', this.checkTreeList)
  },
  methods: {
    getDeskList(){ //查询树的 数据
        let that=this;
        // 已改数据结构
        let desk={'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'),NUM: -1,};
        $.ajax({ // 加载科室 树
            type:'post',
            url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
            data:desk,
            success:function(dataRets) {
                //  console.log(dataRets.D.listDesk);
                let arr = [];
                let children = [];
                let ksArr = [];
                dataRets.D.listDesk.forEach(function(item, index) {
                    if (item.UP === '' || item.UP === '0'){
                        let obj = {
                            UP: item.UP,
                            children: [],
                            disable: false,
                            expand: true,
                            id: item.CODE,
                            nodeKey: 0,
                            title: item.NAME
                        }
                        arr.push(obj)
                    } else {
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
                                id: children[i].CODE,
                                nodeKey: 1,
                                title: children[i].NAME
                            }
                            ksArr.push(objData)
                            arr[j].children.push(objData)
                        }
                    }
                }
                that.treeData1 = arr;
                localStorage.setItem('ks', JSON.stringify(dataRets.D.listDesk));
            }
        })
    },
    seldesk(){
      let that=this;
      
      let desk={
            'ID':localStorage.getItem('UID'),
            'RANDOMCODE':localStorage.getItem('RANDOMCODE'),
            NUM: -1,
            NAME: this.dname
        };
        console.log(desk)
         $.ajax({ // 加载科室 树
           type:'post',
           url:urlPath.getIndexTable+'/api/DeskManager/QueryDesk',
           data:desk,
             success:function(dataRets){
                let arr = [];
                let children = [];
                let ksArr = [];
                dataRets.D.listDesk.forEach(function(item, index) {
                    if (item.UP === '' || item.UP === '0'){
                        let obj = {
                            UP: item.UP,
                            children: [],
                            disable: false,
                            expand: true,
                            id: item.CODE,
                            nodeKey: 0,
                            title: item.NAME
                        }
                        arr.push(obj)
                    } else {
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
                                id: children[i].CODE,
                                nodeKey: 1,
                                title: children[i].NAME
                            }
                            ksArr.push(objData)
                            arr[j].children.push(objData)
                        }
                    }
                }
                that.treeData1 = arr;
                 }
             })
    },
    edit(){
      this.checkTreeList = JSON.parse(localStorage.getItem('ksList'));
    },
    delAllChecked() {
      this.checkTreeList = []
    },
    delChecked(index) {
      this.checkTreeList.splice(index, 1);
    },
    select(el) {
      if (el.length > 0) {
          this.checkedTreeID=el[0].id;
        this.checkedTree = el[0].title
      } else {
        let flag=true;
        for (var i = 0; i <this. checkTreeList.length; i++) {
        if ( this.checkTreeList[i].id==this.checkedTreeID) {
        flag=false; break;   }
      }
        // el[0].selected = !el[0].selected
        if (flag) {
          if (this.checkedTree !== '') {
            this.checkTreeList.push({
              title: this.checkedTree,
              id: this.checkedTreeID
            })
          }
        }

      }
    }
  },
   watch: {
      checkTreeList: function(val) {
        this.$emit('getTreeCheckedList', val)
      }
    }

}
</script>

<style lang="less" scoped>
.right-icon {
    float: right;
    padding: 2px;
    background-color: #dedede;
    border-radius: 4px;
    cursor: pointer;
}
</style>
