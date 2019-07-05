<template>
<div class="inline-box">
  <Button type="primary" shape="circle" @click="filterShow = true">
    <span>筛选设置</span>
    <Icon type="icon-pop" />
  </Button>
  <Modal v-model="filterShow" title="筛选设置" width="90%">
    <div class="">
      <Row>
        <i-col span="12">
          <Card class="card-tree-date" :bordered="false">
            <p slot="title">
              <Icon type="icon-tree"></Icon>统计图表
            </p>
            <Input slot="extra" prefix="ios-search" placeholder="查询科室" />
            <Tree :treeData="dataTree" tree-color="tree-blue">科室</Tree>
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
                <DatePicker class="date-time-input" type="datetimerange" placeholder="选择时间段"></DatePicker>
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
        <RadioGroup type="button" v-model="stateChoose" class="state-choose">
          <Radio label="正常"></Radio>
          <Radio label="一般"></Radio>
          <Radio class="error" label="严重"></Radio>
          <Radio class="warning" label="警告"></Radio>
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
import {
  dataTree
} from '../data/data-tree.js';
import Tree from '../components/Tree';
import urlPath from '../actions/api.js';

export default {
  data() {
    return {
      filterShow: false,
      dataTree,
      stateChoose: ''
    }
  },
  components: {
    Tree
  },
  methods: {
    ok() {
      // this.$Message.info('Clicked ok');
      this.filterShow = false
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
      this.filterShow = false
    }
  }
}
</script>
<style lang="less">
</style>
