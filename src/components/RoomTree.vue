<template lang="html">
  <Row>
    <i-col span="12">
      <label>选择<slot></slot></label>
      <Input prefix="ios-search" placeholder="查询规则..." style="width:160px" />
      <Tree :data="treeData" @on-select-change="select"></Tree>
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
export default {
  name: 'tree',
  props: {
    treeData: Array
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
