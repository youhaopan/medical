<template lang="html">
  <Card :bordered="false">
      <p slot="title">统计图表</p>
      <!-- <FilterPop @dataForm='dataForm' /> -->
      <!-- <i-switch size="large" slot="extra" v-model="switch1" @on-change="change" /> -->
      <div v-show="switch1" class="index-chart-box">
        <div class="">
          <v-chart :options="setpie" :autoresize="true"/>
        </div>
        <div class="">
          <div class="">
            <v-chart :options="setline" :autoresize="true"/>
          </div>
        </div>
        <div class="">
          <div class="echart-bar-box">
            <Dropdown class="drop-chart">
                <a href="javascript:void(0)">
                    科室问题排名<Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="(item,index) in roomProblemList" :key="index">{{item.label}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <v-chart :options="setbar" :autoresize="true"/>
          </div>
        </div>
      </div>
  </Card>
</template>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import pie from '../data/index-pie';
import line from '../data/index-line';
import bar from '../data/index-bar';
import urlPath from '../actions/api.js';
// import FilterPop from './IndexFilter';
export default {
    name: 'IndexCharts',
    data() {
        return {
            switch1: true,
            setpie: pie(),
            setbar: bar(),
            setline: line(),
            bar,
            roomProblemList: [{
                label: '科室'
            }]
        }
    },  
    components:{
        // FilterPop
    },
    created() {
      //进入页面以后获取table数据
      // this.fetchData('0')
        // this.getData(); //加载页面 数据
        // this.getData2(); //加载页面 数据
        this.getDataArr();
     },
    methods: {
        change(status) {
            this.switch1 = status
        },
        dataForm(ks, date, stateChoose){
        // console.log(ks, date, stateChoose);
            this.$refs.myCharts.Charts(ks, date, stateChoose);
        },
        getDataArr(){
            let _this = this;
            let desk={
                'ID':localStorage.getItem('UID'),
                'RANDOMCODE':localStorage.getItem('RANDOMCODE'),
                // 'desks': null,
                'StartTime': null,
                'EndTime': null,
                'State': null,
            };
            $.ajax({ //加载
                    type:'post',
                    url:urlPath.getIndexTable+'/api/AuditBillManager/QueryAuditChart',
                    data: desk,
                    success:function(dataRet){
                        if (dataRet.Y==100) {
                            // _this.pie.series[0].data=dataRet.D.data;
                            _this.setbar = bar(dataRet.D.AUDITBILL3);
                            _this.setpie = pie(dataRet.D.AUDITBILL1);
                            _this.setline = line(dataRet.D.AUDITBILL2);
                            }
                        else {
                            _this.$Message.error('获取数据失败！');
                        }
                    }
                })
        },
    Charts(ks, date, stateChoose){
        console.log(ks, date, stateChoose)
        let _this = this;
        let desk={
            'ID':localStorage.getItem('UID'),
            'RANDOMCODE':localStorage.getItem('RANDOMCODE'),
            'desks': ks,
            'StartTime': date[0],
            'EndTime': date[1],
            'State': stateChoose,
        };
        $.ajax({ //加载
                type:'post',
                url:urlPath.getIndexTable+'/api/AuditBillManager/QueryAuditChart',
                data: desk,
                success:function(dataRet){
                    if (dataRet.Y==100) {
                        // _this.pie.series[0].data=dataRet.D.data;
                        _this.setpie = pie(dataRet.D.AUDITBILL1);
                        _this.setline = line(dataRet.D.AUDITBILL2);
                        _this.setbar = bar(dataRet.D.AUDITBILL3);
                        }
                    else {
                        _this.$Message.error('获取数据失败！');
                    }
                }
            })
    },
    getData(){
        let that=this;
            $.ajax({ //加载
                type:'post',
                url:urlPath.getIndexTable+'/api/AuditBillManager/QueryAuditB',
                data:{},
                success:function(dataRet){
                //console.log(dataRet.D.data);
                if (dataRet.Y==100) {
                    that.pie.series[0].data=dataRet.D.data;
                    }
                else {
                    that.$Message.error('获取数据失败！');
                }
                //  that.userData.push(dataRet.D.listUser);
                // console.log(dataRet.D.listUser.length)
                }
            })
        },
    getData2(){
        let that=this;
        $.ajax({ //加载
                type:'post',
            url:urlPath.getIndexTable+'/api/AuditBillManager/QueryAuditLine',
            data:{},
            success:function(dataRet){
                if (dataRet.Y==100) {
                //  console.log(dataRet.D.ser);
                that.line.series=dataRet.D.ser;
                }
                else {
                that.$Message.error('获取数据失败！')
                }
                //  that.userData.push(dataRet.D.listUser);
                // console.log(dataRet.D.listUser.length)
            }
            })

    }
  }
}
</script>

<style lang="less" scoped>
.index-chart-box {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: nowrap;
    & > div {
        & > p {
            font-size: 20px;
            color: #3B4563;
            padding: 10px 30px 0;
            line-height: 2;
        }
        max-width: 536px;
        width: 32%;
        height: 321px;
        background-color: #fff;
        box-shadow: 0 0 20px rgba(0,0,0,0.05);
        border-radius: 10px;
    }
}
.echart-bar-box {
    position: relative;
    .drop-chart {
        position: absolute;
        right: 20px;
        top: 45px;
        z-index: 1000;
        a {
            color: #9DB1BC;
        }
    }
}
</style>
