<template lang="html">
  <Modal v-model="show" :closable="false" :mask-closable="false" fullscreen :footer-hide="true">
    <div class="full-header" solt="header">
      <Icon type="md-close" @click="cancel" />
    </div>
    <div>
      <Card :bordered="false">
        <p slot="title">
          基本信息 DX0001
        </p>
        <div class="">
          <Table :columns="indexColumns" :data="indexData">
            <template slot-scope="{ row, index }" slot="number">
              <strong v-if="row.degree==='1'">{{ index }} <Icon type="icon-warning" /></strong>
              <strong v-else-if="row.degree==='2'">{{ index }} <Icon type="icon-error" /></strong>
              <strong v-else>{{ index }} <Icon type="icon-ok" /></strong>
            </template>
            <template slot-scope="{ row }" slot="degree">
              <span v-if="row.degree==='1'">警告</span>
              <span v-else-if="row.degree==='2'">严重</span>
              <span v-else>正常</span>
            </template>
          </Table>
        </div>
        <Row class="card-row">
          <i-col span="12">
            <Card :bordered="false" class="card-white">
              <p slot="title">
                患者信息
              </p>
              <Row class="" type="flex" justify="space-between">
                <i-col span="8">
                  <img class="img" src="../images/photo1.png" alt="">
                </i-col>
                <i-col span="15">
                  <div class="info-line">
                    <span>就诊卡号</span>
                    <em>10000023294032859364</em>
                  </div>
                  <Row class="">
                    <i-col span="12">
                      <div class="info-line">
                        <span>姓名</span>
                        <em>名字</em>
                      </div>
                      <div class="info-line">
                        <span>性别</span>
                        <em>男</em>
                      </div>
                      <div class="info-line">
                        <span>年龄</span>
                        <em>30</em>
                      </div>
                    </i-col>
                    <i-col span="12">
                      <div class="info-line">
                        <span>身高</span>
                        <em>180cm</em>
                      </div>
                      <div class="info-line">
                        <span>体重</span>
                        <em>180cm</em>
                      </div>
                    </i-col>
                  </Row>
                  <div class="info-line">
                    <span>身份证号</span>
                    <em>10000023294032859364</em>
                  </div>
                </i-col>
              </Row>
            </Card>
          </i-col>
          <i-col span="12">
              <Card :bordered="false" class="card-white">
                <p slot="title">
                  医生信息
                </p>
                <Row class="" type="flex" justify="space-between">
                  <i-col span="8">
                    <img class="img" src="../images/photo2.png" alt="">
                  </i-col>
                  <i-col span="15">
                    <div class="info-line">
                    </div>
                    <Row class="">
                      <i-col span="12">
                        <div class="info-line">
                          <span>姓名</span>
                          <em>名字</em>
                        </div>
                        <div class="info-line">
                          <span>性别</span>
                          <em>男</em>
                        </div>
                        <div class="info-line">
                          <span>年龄</span>
                          <em>30</em>
                        </div>
                      </i-col>
                      <i-col span="12">
                        <div class="info-line">
                          <span>所在科室</span>
                          <em>内科</em>
                        </div>
                      </i-col>
                    </Row>
                    <Row class="">
                      <i-col span="12">
                        <div class="info-line">
                          <span>个人电话</span>
                          <em>18513364xx9</em>
                        </div>
                      </i-col>
                      <i-col span="12">
                        <div class="info-line">
                          <span>科室电话</span>
                          <em>021-22334xx5</em>
                        </div>
                      </i-col>
                    </Row>
                  </i-col>
                </Row>
              </Card>
          </i-col>
        </Row>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          处方信息<span>共2条记录</span>
        </p>
        <Table :columns="indexColumns2" :data="indexData2">
        </Table>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          处方显示信息<span>共8条记录</span>
        </p>
        <Table class="nesting-table" :columns="infoTableColumns" :data="infoTableData">
          <template slot-scope="{ row }" slot="state">
            <span v-if="row.state==='1'">严重</span>
            <span v-else>一般</span>
          </template>
        </Table>
      </Card>
      <Card :bordered="false">
        <p slot="title">
          详情录入
          <span>共3条记录</span>
        </p>
        <div class="model-box">
          <Select v-model="chooseModel" style="width:200px" placeholder="选择处理模版">
              <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input v-model="textModel" class="model-input" />
          <Button type="primary" @click="saveModelText">保存</Button>
        </div>
        <ul class="model-list">
          <li v-for="item in modelTextList" :key="item.index">
            <p>
              <span class="name">{{item.name}}</span>
              <span>{{item.type}}</span>
              <span>{{item.date}}</span>
            </p>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </Card>
    </div>
  </Modal>
</template>

<script>
import {
  mapState
} from 'vuex';
import {
  indexColumns,
  indexData,
  indexColumns2,
  indexData2,
} from '../data/indexInfo-table';
import {
  infoTableColumns,
  infoTableData
} from '../data/index-info-table';
import IndexInfoTable from '../components/IndexInfoTable';
import urlPath from '../actions/api.js'; 
export default {
  name: 'indexInfo',
  data() {
    return {
      indexColumns,
      indexData,
      indexColumns2,
      indexData2,
      infoTableColumns: [{
        type: 'expand',
        width: 1,
        render: (h, params) => {
          return h(IndexInfoTable, {
            props: {
              info: params.row.info
            }
          })
        }
      }, ...infoTableColumns],
      infoTableData,
      chooseModel: '',
      textModel: '',
      modelList: [{
        value: '模版1',
        label: '模版1'
      }],
      modelTextList: [{
        name: '张晓静',
        type: '审核员',
        date: '2019-04-27 18:57:29',
        content: '医生认为该病人处于急诊状态，需要立刻注射xxx药物，以确保及时抢救。'
      }, {
        name: '张晓静',
        type: '审核员',
        date: '2019-04-27 15:57:29',
        content: '医生反馈由于病人皮肤疾病导致无法注射，故只能口服xxx药物。'
      }, {
        name: '系统创建',
        date: '2019-04-27 12:57:29',
        content: '自动生成工单。'
      }]
    }
  },
  computed: {
    ...mapState({
      show: state => state.indexInfo
    })
  },
  methods: {
    ok() {
      // this.$Message.info('Clicked ok');
      this.$store.commit('closeIndexInfo')
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
      this.$store.commit('closeIndexInfo')
    },
    saveModelText() {
      this.modelTextList.unshift({
        name: '张晓静',
        type: '审核员',
        date: '2019-04-27 15:57:29',
        content: this.textModel
      })
    }
  }
}
</script>

<style lang="less">
.model-input {
    width: 400px!important;
    margin-left: 50px;
    margin-right: 50px;
    input {
        width: 100%!important;
    }
}
.model-box {
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
}
.model-list {
    padding-top: 30px;
    li {
        padding-bottom: 20px;
        list-style: none;
    }
    span {
        padding-right: 10px;
        color: #999;
        &.name {
            color: #1ABCB0;
        }
    }
}
.info-line {
    margin-bottom: 20px;
    min-height: 45px;
    @media (max-width:1400px) {
        margin-bottom: 5px;
    }
    span {
        color: #999;
        display: block;
    }
    em {
        font-style: normal;
        color: #3B4563;
    }
}
</style>
