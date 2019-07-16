<template lang="html">
    <div class="page">
      <Position :bread="[{name:'智能审核', path: '/page/drug'}, {name:'审核配置', now: true, path: ''}]" />
      <Row class="box">
        <Card :bordered="false">
            <p slot="title">审核配置</p>
            <Table :columns="auditColumns" :data="auditData">
              <template slot-scope="{ row }" slot="state">
                <i-switch true-value="START" false-value='NOSTART' :value="row.state" @on-change = 'change(row)' />
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
//   auditData
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
        auditData: []
        }
    },
    methods:{
        change(row){
            // console.log(row)
            let _this = this;
            let DAT = {
                'ID':localStorage.getItem('UID'),
                'RANDOMCODE':localStorage.getItem('RANDOMCODE'),
                'TID': row.TID,
                STATE: row.state
            };
            $.ajax({ // 加载费别
                type: 'post',
                url: urlPath.getIndexTable+'/API//DrugRuleDeploy/UpRuleProperties',
                data: DAT,
                success: function(dataRets){
                    if(dataRets.Y === 100){
                        _this.$Message.success(dataRets.M);
                    }
                }
            });
        },
        getData(){
            let _this = this;
            let DAT = {'ID':localStorage.getItem('UID'), 'RANDOMCODE':localStorage.getItem('RANDOMCODE')};
            $.ajax({ // 加载费别
                type: 'post',
                url: urlPath.getIndexTable+'/API/DrugRuleDeploy/QueryRuleProperties',
                data: DAT,
                success: function(dataRets){
                    if(dataRets.Y === 100){
                        let arr = [];
                        let children = [];
                        let dataList = [];
                        dataRets.D.RuleProperties.forEach(function(item) {
                            if(item.UP === 'YP'){
                                let obj = {
                                    UP: item.UP,
                                    children: [],
                                    disable: false,
                                    expand: true,
                                    id: item.ID,
                                    nodeKey: 0,
                                    title: item.NAME
                                }
                                arr.push(obj)
                            }
                        });
                        for(let i = 0; i<dataRets.D.RuleProperties.length;i++){
                            for(let j =0; j<arr.length;j++){
                                if(dataRets.D.RuleProperties[i].UP === arr[j].id){
                                    let erji = {
                                        UP: dataRets.D.RuleProperties[i].UP,
                                        children: [],
                                        disable: false,
                                        expand: true,
                                        id: dataRets.D.RuleProperties[i].ID,
                                        nodeKey: 1,
                                        title: dataRets.D.RuleProperties[i].NAME
                                    }
                                    arr[j].children.push(erji)
                                }
                            }
                        }
                        for(let k = 0; k<arr.length;k++){
                            for(let f = 0; f<arr[k].children.length; f++){
                                for(let t = 0; t<dataRets.D.RuleProperties.length;t++){
                                    if(dataRets.D.RuleProperties[t].UP === arr[k].children[f].id){
                                        let sanji = {
                                            level1: arr[k].title,
                                            level2: arr[k].children[f].title,
                                            level3: dataRets.D.RuleProperties[t].NAME,
                                            id: dataRets.D.RuleProperties[t].ID,
                                            title: dataRets.D.RuleProperties[t].NAME,
                                            NNAME: dataRets.D.RuleProperties[t].NNAME,
                                            START: dataRets.D.RuleProperties[t].START,
                                            NID: dataRets.D.RuleProperties[t].NID,
                                            TID: dataRets.D.RuleProperties[t].TID,
                                            UPDATA: dataRets.D.RuleProperties[t].UPDATA,
                                        }
                                        arr[k].children[f].children.push(sanji);
                                        dataList.push(sanji)
                                    }
                                }
                            }
                        }
                        console.log(dataList)
                        for(let i = 0; i < dataList.length; i++){
                            if(dataList[i].NID !== null){
                                dataList[i].NID = dataList[i].NID.split(',');
                                dataList[i].NNAME = dataList[i].NNAME.split(',');
                                dataList[i].START = dataList[i].START.split(',');
                                dataList[i].TID = dataList[i].TID.split(',');
                                dataList[i].UPDATA = dataList[i].UPDATA.split(',');
                            }
                        }
                        let lisssss = [];
                        for(let i = 0; i < dataList.length; i++){
                            if(dataList[i].NID !== null){
                                for(let j = 0; j < dataList[i].NNAME.length; j++){
                                    let siji = {
                                        level1: dataList[i].level1,
                                        level2: dataList[i].level2,
                                        level3: dataList[i].level3,
                                        level4: dataList[i].NNAME[j],
                                        id: dataList[i].id,
                                        // title: dataRets.D.RuleProperties[t].NAME,
                                        // NNAME: dataRets.D.RuleProperties[t].NNAME,
                                        state: dataList[i].START[j],
                                        NID: dataList[i].NID[j],
                                        TID: dataList[i].TID[j],
                                        editTime: dataList[i].UPDATA[j],
                                    }
                                    lisssss.push(siji)
                                }
                            }
                        }
                        _this.auditData = lisssss
                        console.log(_this.auditData)
                    }
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
