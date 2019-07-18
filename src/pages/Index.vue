<template lang="html" class='sss'>
    <Layout>
        <Sider v-show='show' collapsible :collapsed-width="42" v-model="isCollapsed" @on-collapse="goPage">
        <slot></slot>
        </Sider>
    <Layout>
      <Header>
        <IndexHeader />
      </Header>
      <Content>
        <div class="box">
          <IndexCharts ref="myCharts" />
        </div>
        <div class="box">
          <Card :bordered="false">
              <p slot="title">就诊信息<span id="count">共{{indexData.length}}条记录，筛选条件：全部</span></p>
              <p slot="extra" class="index-box-head">
                <Input prefix="ios-search"  v-model="yname" @on-blur="seldata"  placeholder="查询医生名..." />
                <FilterPop @dataForm='dataForm' />
                <Icon class="a-icon-loading"  @click="change" type="icon-loading" />
              </p>
              <div class="">
         <Scroll :on-reach-bottom="handleReachBottom">
                <Table :row-class-name="rowClassName" height="430" :columns="indexColumns" :data="indexData">
                  <template slot-scope="{ row, index }" slot="ID">
                    <strong v-if="row.BILLSCLASSNAME==='警告'">{{ index+1 }} <Icon type="icon-warning" /></strong>
                    <strong v-else-if="row.BILLSCLASSNAME==='严重'">{{ index+1 }} <Icon type="icon-error" /></strong>
                   <strong v-else-if="row.BILLSCLASSNAME==='正常'">{{ index+1 }} <Icon type="icon-ok" /></strong>
                    <strong v-else>{{ index+1 }} <Icon type="icon-ok" /></strong>
                  </template>
                  <template slot-scope="{ row }" slot="edit">
                      <span class="click-view" @click="showInfo(row.ID)">详情<Icon type="icon-info"/></span>
                  </template>
                </Table>
                </Scroll>
              </div>
              <div class="table-bottom">
                <div class="">
                  自动加载<i-switch size="large" v-model="switch1" />
                </div>
                <div class="">
                  <Button type="default" class="btn-table-bot" @click='load'>加载更多</Button>
                </div>
                <div class="search-box">
                  转到第 <Input search enter-button="GO" /> 条
                </div>
              </div>
          </Card>
        </div>
        <BackTop></BackTop>
        <IndexInfo ref='indexInfo' v-show="infoShow"/>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import {
  mapState
} from 'vuex';
import IndexHeader from '../components/IndexHeader';
import FilterPop from './IndexFilter';
import IndexInfo from './IndexInfo';
import IndexCharts from '../components/IndexCharts';
import {
  indexColumns,
//   indexData
} from '../data/index-table';
import urlPath from '../actions/api.js';

export default {
  name: 'index',
  components: {
    FilterPop,
    IndexInfo,
    IndexHeader,
    IndexCharts
  },
  data() {
    return {
        timer: null,
        switch1: false,
      isCollapsed: true,
      filterShow: false,
      indexColumns,
      indexData : [],
     yname:'',num:1,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      }
    }
  },
  computed: {
    ...mapState({
      infoShow: state => state.indexInfo
    })
  },
  created() {
      console.log(navigator.userAgent)
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
            //当前设备为移动端（H5）
            //do something
            console.log(1)
            this.show = false;
        } else {
            //当前设备为桌面显示器（PC）
            //do something
            console.log(2)
            this.show = true;
        }
    this.getData(); //加载页面 数据
   },
    watch:{
        switch1(){
            console.log(this.switch1)
            let _this = this;
            if(this.switch1){
                this.timer = setInterval(function(){
                    _this.getData()
                }, 10000)
            } else {
                clearInterval(this.timer)
            }
        }
    },
  methods: {
    dataForm(ks, date, stateChoose){
    // console.log(ks, date, stateChoose);
        this.$refs.myCharts.Charts(ks, date, stateChoose);
    },
    handleReachBottom () {
        return new Promise(resolve => {
                setTimeout(() => {
                    this.getData();
                    resolve();
                }, 100);
            });
            },
    change(){
        this.getData();  //重新加载数据
    },
    seldata(){
        let auditBills={'ID': localStorage.getItem('UID'),'RANDOMCODE': localStorage.getItem('RANDOMCODE'),'DOCTORNAME':this.yname};
        let that=this;
        $.ajax({ //
            type:'post',
            url: urlPath.getIndexTable+'/api/AuditBillManager/QueryAuditBill',
            data: auditBills,
            success: function(dataRet) {
                if (dataRet.Y==100) {
                    that.indexData=dataRet.D.AUDITBILL;
                    // document.getElementById("count").innerHTML ="共"+dataRet.D.AUDITBILL.length+"条记录，筛选条件：全部";
                }
                else {
                    that.$Message.error('获取数据失败！')
                }
            // console.log(dataRet.D.listUser.length)
            }
        })
    },
    rowClassName(rows) {
      if (rows.degree === '2') {
        return 'table-warning';
      }
      return '';
    },
    showInfo(id) {
        this.$refs.indexInfo.getData(id);
        this.$store.commit('showIndexInfo')
    },
    getData(){
        let auditBills={
            'ID': localStorage.getItem('UID'),
            'RANDOMCODE': localStorage.getItem('RANDOMCODE'), 
            'NUM':this.num
        };
        let that = this;
         $.ajax({ //
            type:'post',
            url:urlPath.getIndexTable+'/api/AuditBillManager/QueryAuditBill',
            data:auditBills,
            success:function(dataRet) {
                if (dataRet.Y==100) {
                    let ls=[];
                    ls=that.indexData;
                    if(ls!=undefined){
                        if (dataRet.D.AUDITBILL.length>0) {
                            for( let i = 0; i < dataRet.D.AUDITBILL.length; i++ ){  //循环json数组对象的内容
                                let flag = true;  //建立标记，判断数据是否重复，true为不重复
                                for( let j = 0; j <  ls.length  ;j++){  //循环新数组的内容
                                    if(ls[j].ID== dataRet.D.AUDITBILL[i].ID){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                                        flag = false;
                                    }
                                }
                                if(flag){ //判断是否重复
                                    that.indexData.push(dataRet.D.AUDITBILL[i]); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
                                }
                            }
                        }
                    } else {
                        that.indexData=dataRet.D.AUDITBILL;
                    }
                    that.num++;
                    // document.getElementById("count").innerHTML ="共"+dataRet.D.AUDITBILL.length+"条记录，筛选条件：全部";
                } else {
                    that.$Message.error('获取数据失败！')
                }
            }
        })
    },
    load(){
        this.num = this.num + 2;
        let auditBills={
            'ID': localStorage.getItem('UID'),
            'RANDOMCODE': localStorage.getItem('RANDOMCODE'), 
            'NUM':this.num
        };
        let that = this;
         $.ajax({ //
            type:'post',
            url:urlPath.getIndexTable+'/api/AuditBillManager/QueryAuditBill',
            data:auditBills,
            success:function(dataRet) {
                if (dataRet.Y==100) {
                    let ls=[];
                    ls=that.indexData;
                    if(ls!=undefined){
                        if (dataRet.D.AUDITBILL.length>0) {
                            for( let i = 0; i < dataRet.D.AUDITBILL.length; i++ ){  //循环json数组对象的内容
                                let flag = true;  //建立标记，判断数据是否重复，true为不重复
                                for( let j = 0; j <  ls.length  ;j++){  //循环新数组的内容
                                    if(ls[j].ID== dataRet.D.AUDITBILL[i].ID){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                                        flag = false;
                                    }
                                }
                                if(flag){ //判断是否重复
                                    that.indexData.push(dataRet.D.AUDITBILL[i]); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
                                }
                            }
                        }
                    } else {
                        that.indexData=dataRet.D.AUDITBILL;
                    }
                    // that.num++;
                    document.getElementById("count").innerHTML ="共"+dataRet.D.AUDITBILL.length+"条记录，筛选条件：全部";
                } else {
                    that.$Message.error('获取数据失败！')
                }
            }
        })
    },
    goPage() {
      this.$router.push('page/user')
    },
    fetchData(id) {
      //请求
      const that = this;
      $.ajax({
          url: urlPath.getIndexTable,
          type: 'GET',
          dataType: 'json',
          data: {
            id: id
          }
        })
        .done(function(response) {
          console.log("success", response.M);
          if (response.Y === 100) {
            that.indexData = response.D
          }
        })
        .fail(function(error) {
          console.log("error");
          that.$Message.error('获取数据失败！' + error)
        });
    }
  }
}
</script>

<style lang="less">
.box {
    margin-bottom: 40px;
    text-align: left;
    @media (max-width: 1500px) {
        margin-bottom: 30px;
    }
}
.table-bottom {
    display: flex;
    padding: 30px 100px;
    align-items: center;
    justify-content: space-around;
    .ivu-switch {
        margin-left: 10px;
        height: 28px;
        width: 70px;
        &:after {
            width: 24px;
            height: 24px;
            border-radius: 24px;
        }
        @media (max-width: 1500px) {
            height: 22px;
            width: 55px;
            &:after {
                width: 18px;
                height: 18px;
                border-radius: 18px;
            }
        }
        &.ivu-switch-large.ivu-switch-checked:after {
            left: 42px;
            @media (max-width: 1500px) {
                left: 34px;
            }
        }
    }
}
.search-box {
    line-height: 34px;
    @media (max-width: 1500px) {
        line-height: 30px;
    }
    .ivu-input-group {
        width: 88px;
        height: 34px;
        display: inline-table;
        vertical-align: top;
        @media (max-width: 1500px) {
            height: 30px;
        }
        .ivu-input {
            height: 100%;
            line-height: 32px;
        }
        .ivu-input-search {
            width: 30px;
            padding: 0 !important;
        }
    }
}
.a-icon-loading {
    margin-left: 50px;
    @media (max-width:1500px) {
        margin-left: 20px;
    }
}
</style>
