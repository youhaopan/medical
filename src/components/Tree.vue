<template lang="html">
  <Row>
    <i-col span="12">
      <h3>可选<slot></slot></h3>
      <Tree :data="treeData" @on-select-change="select"></Tree>
    </i-col>
    <i-col span="12">
      <h3>已选<slot></slot><Icon class="right-icon" type="ios-trash" @click="delAllChecked" /></h3>
      <!-- <Tree class="ivu-tree-color" :data="dataTree"></Tree> -->
      <ul :class="['tree-check-list',treeColor,'room-set-tree-check-list']">
        <li v-for="(item,index) in checkTreeList" :key="item.id">
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
    treeData: Array,
    treeColor: String
  },
  data() {
    return {
      checkedTreeID:'',
      checkedTree: '',
      checkTreeList: []
    }
  },
  created:function(){
    this.$emit('getTreeCheckedList', this.checkTreeList)
  },
  methods: {
    addList(list){
        this.checkTreeList = list
        // console.log(this.checkTreeList,'列表')
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
        // el[0].selected = !el[0].selected
        if (this.checkedTree !== '') {
          if (this.checkedTreeID!='0') {
            let flag=true;
            for (var i = 0; i <this. checkTreeList.length; i++) {
            if ( this.checkTreeList[i].id==this.checkedTreeID) {
            flag=false; break;   }
          } //不可重复
           if (flag) {
               this.checkTreeList.push({
            title: this.checkedTree,
            id: this.checkedTreeID
          })  }  }
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
