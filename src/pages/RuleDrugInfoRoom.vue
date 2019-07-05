<template>
<Modal class="pop-mod" :value="true" width="95%" title="编辑药品规则" :closable="false" :mask-closable="false" :footer-hide="true">
  <div>
    <Icon type="md-close" slot="close" class="modal-close" @click="$emit('cancel')" />
    <Row>
      <i-col span="6">
        <Card class="card-role-list" :bordered="false">
          <p slot="title">
            <Icon type="icon-tree"></Icon>可添加的规则
          </p>
          <Input prefix="ios-search" placeholder="查询规则..." style="margin-bottom:10px;" />
          <Tree :data="dataTreeRole" @on-select-change="selectdata" ref="dataTreeRole"></Tree>
        </Card>
      </i-col>
      <i-col span="12">
        <Card class="card-role" :bordered="false">
          <p slot="title">
            <Icon type="icon-date"></Icon>正在编辑 - {{roconstypeTitle}}
          </p>
          <RoleContentRoom :price-list='priceList' :degree-list='degreeList' v-show="roconstypeData===1" />
          <RoleContentLevel :price-list='priceList' :degree-list='degreeList' v-show="roconstypeData===2" />
          <RoleContentSex :price-list='priceList' :degree-list='degreeList' v-show="roconstypeData===3" />
          <RoleContentAge :price-list='priceList' :degree-list='degreeList' v-show="roconstypeData===4" />
          <div class="ivu-modal-footer">
            <Button size="large" class="btn-cancel" @click="$emit('cancel')">取消</Button>
            <Button size="large" type="default" class="btn-submit" @click="$emit('save')">保存编辑</Button>
          </div>
        </Card>
      </i-col>
      <i-col span="6">
        <RoleAdded :role-added-list="roomList" />
      </i-col>
    </Row>
  </div>
</Modal>
</template>
<script>
import {
  dataTreeRole
} from '../data/data-tree.js';
import RoleAdded from '../components/RoleAdded';
import RoleContentRoom from '../components/RoleContentRoom';
import RoleContentLevel from '../components/RoleContentLevel';
import RoleContentAge from '../components/RoleContentAge';
import RoleContentSex from '../components/RoleContentSex';
import urlPath from '../actions/api.js';

export default {
  name: "RuleDrugInfoRoom",
  props: {
    roleType: Number,
    roleTitle: String
  },
  components: {
    RoleAdded,
    RoleContentRoom,
    RoleContentLevel,
    RoleContentAge,
    RoleContentSex
  },
  data() {
    return {
      dataTreeRole,
      tipEdit: '',
      tipTitle: '',
      roconstypeData: this.roleType,
      roconstypeTitle: this.roleTitle,
      priceList: [{
        label: '北京',
        value: 'bj'
      }],
      degreeList: [{
        label: '一般',
        value: '0'
      }],
      roomList: [{
        name: '张晓静',
        degree: "审核员",
        time: '2019-04-27 18:57:29',
        info: '适用性别，系统，-，-，仅限男，严重。'
      }, {
        name: '张晓静',
        degree: "审核员",
        time: '2019-04-27 18:57:29',
        info: '医院等级规则，系统，适用于三级甲等以上，严重。'
      }, {
        name: '张晓静',
        degree: "审核员",
        time: '2019-04-27 18:57:29',
        info: '适用性别，系统，-，-，仅限男，严重。'
      }]
    }
  },
  methods: {
    selectdata(data) {
      if (data.length > 0) {
        this.tipEdit = data[0].edit;
        this.tipTitle = data[0].title;
      } else {
        this.roconstypeData = this.tipEdit;
        this.roconstypeTitle = this.tipTitle;
      }
    }
  },
  watch: {
    roleType() {
      this.roconstypeData = this.roleType;
    },
    roleTitle() {
      this.roconstypeTitle = this.roleTitle
    }
  }
}
</script>
<style lang="less">

</style>
