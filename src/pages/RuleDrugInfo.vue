<template>
<Modal class="pop-mod bg-modal" :value="true" width="65%" title="药品规则" :closable="false" :mask-closable="false">
  <div slot="header"></div>
  <div solt="close" class="modal-close">
    <Icon type="md-close" @click="$emit('cancel')" />
  </div>
  <Card :bordered="false" class="drug-title">
    <p slot="title">
      <Row>
        <i-col span="12">
          <em>药品信息</em>
          <span>
            <i>创建时间：2019/05/05 01:56:31</i>
            <i>最新修改：2019/05/05 01:56:31</i>
          </span>
        </i-col>
      </Row>
    </p>
    <p slot="extra">
      <span>启用规则</span>
      <i-switch :value="true" />
      <BtnColor class="ivu-btn-title" btn-title="新建规则" btn-icon="icon-add-rule" @open="openEditRoom(1,'科室规则')" />
    </p>
    <div class="">
      <Row>
        <i-col span="12">
          <ul class="pop-list">
            <li>
              <label>药品通用名</label>
              <Input  v-model="yname" />
            </li>
            <li>
              <label >药品商品名</label>
              <Input  v-model="pname" />
            </li>
            <li>
              <label >国药准字</label>
              <Input v-model="zname" />
            </li>
            <li>
              <label >药品厂家</label>
              <Input  v-model="cname" />
            </li>
            <li>
              <label >药品编号</label>
              <Input v-model="yid" />
            </li>
            <li>
              <label>类型</label>
              <Select v-model="type" style="width:200px">
                <Option v-for="item in ageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </li>
          </ul>
        </i-col>
        <i-col span="12">
          <div class="modal-img-box">
            <img src="../images/pic_drug.png" class="modal-pic-box" />
            <p><span>更换药品照片</span></p>
          </div>
        </i-col>
      </Row>
      <Row>
        <i-col>
          <ul class="pop-list">
            <li>
              <label >规格</label>
              <Input v-model="spec" />
            </li>
            <li>
              <label >单位</label>
              <Input v-model="units"/>
            </li>
             <li>
                <label >单价</label>
                <Input v-model="price"/>
              </li>
            <li>
              <label>最小剂量</label>
              <Input />
            </li>
            <li>
              <label>最小剂量单位</label>
              <Input />
            </li>
          </ul>
        </i-col>
      </Row>
    </div>
  </Card>
  <Card :bordered="false">
    <p slot="title">
      科室规则
    </p>
    <Table :columns="roomColumns" :data="roomData">
      <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template>
      <template slot="edit">
        <span @click="openEditRoom(1,'科室规则')">编辑
          <Icon custom="icon-edit" /></span>
      </template>
    </Table>
  </Card>
  <Card :bordered="false">
    <p slot="title">
      医院等级规则
    </p>
    <Table :columns="degreeColumns" :data="degreeData">
      <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template>
      <template slot="edit">
        <span @click="openEditRoom(2,'医院等级规则')">编辑
          <Icon custom="icon-edit" /></span>
      </template>
    </Table>
  </Card>
  <Card :bordered="false">
    <p slot="title">
      适用性别
    </p>
    <Table :columns="sexColumns" :data="sexData">
      <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template>
      <template slot="edit">
        <span @click="openEditRoom(3,'性别规则')">编辑
          <Icon custom="icon-edit" /></span>
      </template>
    </Table>
  </Card>
  <Card :bordered="false">
    <p slot="title">
      适用年龄
    </p>
    <Table :columns="ageColumns" :data="ageData">
      <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span class="error" v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template>
      <template slot="edit">
        <span @click="openEditRoom(4,'年龄规则')">编辑
          <Icon custom="icon-edit" /></span>
      </template>
    </Table>
  </Card>
  <div slot="footer">
    <Button size="large" class="btn-cancel" @click="$emit('cancel')">放弃</Button>
    <Button size="large" type="default" class="btn-submit" @click="$emit('save')">保存修改</Button>
  </div>
  <RuleDrugInfoRoom :role-type='roleType' :role-title="roleTitle" v-show="openEditData" @cancel="cancelNest" @save="saveNest" />
</Modal>
</template>

<script>
import BtnColor from '../components/BtnColor';
import RuleDrugInfoRoom from './RuleDrugInfoRoom';
import urlPath from '../actions/api.js';

export default {
  components: {
    BtnColor,
    RuleDrugInfoRoom
  },
  data() {
    return {
      openEditData: false,
      roleType: 1,
      roleTitle: '',
      age: '',yname:'', pname:'', zname:'', cname:'', yid:'', type:'',spec:'',units:'',price:'',
      ageList: [{
        value: '0',
        label: '保密'
      }],
      roomColumns: [{
        title: '来源',
        key: 'number'
      }, {
        title: '适应科室',
        key: 'name'
      }, {
        title: '违规等级',
        slot: 'degree'
      }, {
        title: '费别',
        key: 'price'
      }, {
        title: '操作',
        slot: 'edit'
      }],
      roomData: [{
        number: '系统',
        name: 'alice',
        degree: '1',
        price: '',
        edit: '编辑'
      }],
      degreeColumns: [{
        title: '来源',
        key: 'number'
      }, {
        title: '医院等级规则',
        key: 'name'
      }, {
        title: '违规等级',
        slot: 'degree'
      }, {
        title: '操作',
        slot: 'edit'
      }],
      degreeData: [{
        number: '系统',
        name: 'alice',
        degree: '2',
        edit: '编辑'
      }],
      sexColumns: [{
        title: '来源',
        key: 'number'
      }, {
        title: '诊断1',
        key: 'con1'
      }, {
        title: '诊断2',
        key: 'con2'
      }, {
        title: '性别规则',
        key: 'sex'
      }, {
        title: '违规等级',
        slot: 'degree'
      }, {
        title: '操作',
        slot: 'edit'
      }],
      sexData: [{
        number: '系统',
        name: 'alice',
        con1: '',
        con2: '',
        sex: '仅限男',
        degree: '2',
        edit: '编辑'
      }],
      ageColumns: [{
        title: '来源',
        key: 'number'
      }, {
        title: '诊断1',
        key: 'con1'
      }, {
        title: '诊断2',
        key: 'con2'
      }, {
        title: '年龄规则',
        key: 'age'
      }, {
        title: '违规等级',
        slot: 'degree'
      }, {
        title: '操作',
        slot: 'edit'
      }],
      ageData: [{
        number: '系统',
        name: 'alice',
        con1: '',
        con2: '',
        age: '5 - 7 岁',
        degree: '2',
        edit: '编辑'
      }, {
        number: '系统',
        name: 'alice',
        con1: '',
        con2: '',
        age: '> 大于15岁',
        degree: '2',
        edit: '编辑'
      }, {
        number: '系统',
        name: 'alice',
        con1: '',
        con2: '',
        age: '< 小于3岁',
        degree: '2',
        edit: '编辑'
      }],
    }
  },
  methods: {
    openEditRoom(type, title) {
      this.openEditData = true
      this.roleType = type;
      this.roleTitle = title;
    },
    cancelNest() {
      this.openEditData = false
    },
    saveNest() {
      this.openEditData = false
    }
  }
}
</script>
<style lang="less" scoped>
.drug-title {
    em {
        font-style: normal;
        vertical-align: top;
    }
    span {
        margin-left: 10px;
        display: inline-block;
        color: #9DB1BC;
        font-size: 16px;
        @media (max-width:1500px) and (min-width: 1401px) {
            font-size: 14px;
        }
        @media (max-width:1400px) {
            font-size: 12px;
        }
        i {
            font-style: normal;
            display: block;
            font-weight: normal;
            line-height: 1.3;
        }
    }
    .grug-title-r {
        text-align: right;
    }
    .ivu-btn-title {
        padding: 0 20px;
        margin-left: 20px;
    }
}
</style>
