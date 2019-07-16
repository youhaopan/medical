<template lang="html">
    <div class="page">
      <Position :bread="[{name:'智能审核', path: '/page/drug'}, {name:'审核配置', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">审核配置</p>
            <Table :columns="auditColumns" :data="auditData">
              <template slot-scope="{ row }" slot="state">
                <i-switch true-value="1" false-value='0' :value="row.state" />
              </template>
              <template slot-scope="{ row }" slot="oneLine">
                <div v-if="row.oneLine==='head'" class="headRow">
                  <div class="head"></div>
                  <div class="line"></div>
                </div>
                <div v-else-if="row.oneLine==='line'" class="emptyRow">
                  <div class="line"></div>
                </div>
                <div v-else-if="row.oneLine==='foot'" class="footRow">
                  <div class="line"></div>
                  <div class="foot"></div>
                </div>
              </template>
              <template slot-scope="{ row }" slot="twoLine">
                <div v-if="row.twoLine==='head'" class="headRow">
                  <div class="head"></div>
                  <div class="line"></div>
                </div>
                <div v-else-if="row.twoLine==='line'" class="emptyRow">
                  <div class="line"></div>
                </div>
                <div v-else-if="row.twoLine==='foot'" class="footRow">
                  <div class="line"></div>
                  <div class="foot"></div>
                </div>
              </template>
            </Table>
        </Card>
      </Row>
    </div>
</template>

<script>
import Position from '../components/position';
import {
  auditColumns,
  auditData
} from '../data/audit-table.js';
import urlPath from '../actions/api.js';

export default {
    name: 'user',
    components: {
        Position
    },
    data() {
        return {
        auditColumns,
        auditData
        }
    },
    methods:{
        getData(){
            let _this = this;
            let DAT = {'ID':localStorage.getItem('UID'), 'RANDOMCODE':localStorage.getItem('RANDOMCODE')};
            $.ajax({ // 加载费别
                type: 'post',
                url: urlPath.getIndexTable+'/API/DrugRuleDeploy/QueryRuleProperties',
                data: DAT,
                success: function(dataRets){

                }
            });
        }
    },
    created(){
        this.getData()
    }
}
</script>

<style lang="less" scoped>
.headRow {
    height: 45px;
    margin-top: 25px;
    @media (max-width:1700px) and (min-width: 1501px) {
        height: 45px;
    }
    @media (max-width:1500px) {
        height: 25px;
    }
    .head {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        border: 2px solid #D9DBDD;
    }
    .line {
        display: table;
        height: 35px;
        border: 1px solid #D9DBDD;
        margin-left: 4px;
        @media (max-width:1700px) and (min-width: 1501px) {
            height: 35px;
        }
        @media (max-width:1500px) {
            height: 15px;
        }
    }
}
.emptyRow {
    .line {
        display: table;
        height: 70px;
        border: 1px solid #D9DBDD;
        margin-left: 4px;
        @media (max-width:1700px) and (min-width: 1501px) {
            height: 70px;
        }
        @media (max-width:1500px) {
            height: 50px;
        }
    }
}
.footRow {
    height: 45px;
    margin-bottom: 25px;
    @media (max-width:1700px) and (min-width: 1501px) {
        height: 45px;
    }
    @media (max-width:1500px) {
        height: 25px;
    }
    .foot {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        border: 2px solid #D9DBDD;
    }
    .line {
        display: table;
        height: 35px;
        border: 1px solid #D9DBDD;
        margin-left: 4px;
        @media (max-width:1700px) and (min-width: 1501px) {
            height: 35px;
        }
        @media (max-width:1500px) {
            height: 15px;
        }
    }
}
</style>
