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
            <i-form :model="formData" inline>
                <ul class="pop-list">
                    <li>
                    <label>药品通用名</label>
                    <Input  v-model="formData.NAME" disabled />
                    </li>
                    <li>
                    <label >药品商品名</label>
                    <Input  v-model="formData.NAME" disabled />
                    </li>
                    <li>
                    <label >国药准字</label>
                    <Input v-model="formData.SPELLCODE" disabled />
                    </li>
                    <li>
                    <label >药品厂家</label>
                    <Input  v-model="formData.MANUFACTURES" disabled />
                    </li>
                    <li>
                    <label >药品编号</label>
                    <Input v-model="formData.ID" disabled />
                    </li>
                    <li>
                    <label >药品类型</label>
                    <Input v-model="formData.TYPENAME" disabled />
                    </li>
                    <!-- <li>
                    <label>类型</label>
                    <Select v-model="type" style="width:200px">
                        <Option v-for="item in ageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    </li> -->
                </ul>
            </i-form>
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
              <Input v-model="formData.PACKAGING" disabled />
            </li>
            <li>
              <label >单位</label>
              <Input v-model="formData.UNITS" disabled />
            </li>
             <li>
                <label >单价</label>
                <Input v-model="formData.PRICE" disabled />
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
      <!-- <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template> -->
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
    <Button size="large" type="default" class="btn-submit" @click="save">保存修改</Button>
  </div>
  <RuleDrugInfoRoom :role-type='roleType' :role-title="roleTitle" v-show="openEditData" @cancel="cancelNest" 
  @ksSave="saveNest1" @setYyData="setYyData" @setSexData="setSexData" @setAgeData="setAgeData"/>
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
        formData: {},
        rulenature: [],
        ypId: '',
      openEditData: false,
      roleType: 1,
      roleTitle: '',
      age: '',yname:'', pname:'', zname:'', cname:'', yid:'', type:'',spec:'',units:'',price:'',
      ageList: [{
        value: '0',
        label: '保密'
      }],
      roconstypeId: '',
      yyroconstypeId: '',
      sexroconstypeId: '',
      ageroconstypeId: '',
      // 科室//////////////////////////////
      roomColumns: [{
        title: '来源',
        key: 'number'
      }, {
        title: '适应科室',
        key: 'name'
      }, {
        title: '违规等级',
        key: 'degree'
      }, {
        title: '费别',
        key: 'price'
      }, {
        title: '操作',
        slot: 'edit'
      }],
      roomData: [],
      // 医院等级规则//////////////////////////////
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
        title: '费别',
        key: 'price'
      },{
        title: '操作',
        slot: 'edit'
      }],
      degreeData: [],
      // 性别规则///////////////////////
      sexColumns: [{
        title: '来源',
        key: 'number'
      },
    //    {
    //     title: '诊断1',
    //     key: 'con1'
    //   }, {
    //     title: '诊断2',
    //     key: 'con2'
    //   }, 
      {
        title: '性别规则',
        key: 'data'
      }, {
        title: '违规等级',
        slot: 'degree'
      }, {
        title: '费别',
        key: 'price'
      },{
        title: '操作',
        slot: 'edit'
      }],
      sexData: [],
      // sexData: [{
      //   number: '系统',
      //   name: 'alice',
      //   con1: '',
      //   con2: '',
      //   sex: '仅限男',
      //   degree: '2',
      //   edit: '编辑'
      // }],
      ////////////// 年龄规则//////////////
      ageColumns: [{
        title: '来源',
        key: 'number'
      },
    //    {
    //     title: '诊断1',
    //     key: 'con1'
    //   }, {
    //     title: '诊断2',
    //     key: 'con2'
    //   },
       {
        title: '年龄规则',
        key: 'age'
      }, {
        title: '违规等级',
        slot: 'degree'
      }, {
        title: '费别',
        key: 'price'
      },{
        title: '操作',
        slot: 'edit'
      }],
      ageData: []
    //   ageData: [{
    //     number: '系统',
    //     name: 'alice',
    //     con1: '',
    //     con2: '',
    //     age: '5 - 7 岁',
    //     degree: '2',
    //     edit: '编辑'
    //   }, {
    //     number: '系统',
    //     name: 'alice',
    //     con1: '',
    //     con2: '',
    //     age: '> 大于15岁',
    //     degree: '2',
    //     edit: '编辑'
    //   }, {
    //     number: '系统',
    //     name: 'alice',
    //     con1: '',
    //     con2: '',
    //     age: '< 小于3岁',
    //     degree: '2',
    //     edit: '编辑'
    //   }],
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
    // 保存科室信息
    saveNest1(obj,rocoId) {
        this.roomData.push(obj);
        console.log(this.roomData)
    },
    // 保存医院等级规则
    setYyData(obj,rocoId){
        this.degreeData.push(obj)
        console.log(this.degreeData)
    },
    // 保存性别规则
    setSexData(obj,rocoId){
        this.sexData.push(obj)
        console.log(this.sexData)
    },
    // 保存年龄规则
    setAgeData(obj,rocoId){
        this.ageData.push(obj)
        console.log(this.ageData)
    },
    parentHandleclick(row){
      console.log(row)
        this.ypId = row.ID
        console.log(this.ypId)
        let _this = this;
        let desk = {'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'),DRUG: row.ID,};
        $.ajax({ // 查询药品
            type:'post',
            url: urlPath.getIndexTable+'/api/DrugRuleDeploy/QueryDrugRule',
            data: desk,
            success:function(dataRets){
                _this.formData = dataRets.D.DRUG[0];
                _this.rulenature = dataRets.D.RULENATURE[3];
                _this.zhangshi(dataRets.D.RULECATALOG, dataRets.D.NATURECONTENT)
            }
        })
    },
    zhangshi(ksList, dataList){
        console.log(ksList, dataList);
        let ksDataList = []
        let yyDataList = []
        let sexDataList = []
        let ageDataList = []
        let data = []
        let name = []


        
            // data = dataList[j].DATA.split(',')
            // name = dataList[j].NAME.split(',')

        for(let i = 0; i < ksList.length;i++){
            for(let j = 0; j < dataList.length;j++){
                // console.log(data, name)
                if(ksList[i].ID === dataList[j].RULE && ksList[i].NAME === '科室规则'){
                    ksDataList.push(dataList[j])
                } else if(ksList[i].ID === dataList[j].RULE && ksList[i].NAME === '医院等级规则'){
                    yyDataList.push(dataList[j])
                } else if(ksList[i].ID === dataList[j].RULE && ksList[i].NAME === '性别规则'){
                    sexDataList.push(dataList[j])
                }else if(ksList[i].ID === dataList[j].RULE && ksList[i].NAME === '年龄规则'){
                    ageDataList.push(dataList[j])
                }
            }
        }
        
        for(let i = 0; i < ksDataList.length; i++){
            ksDataList[i].DATA = ksDataList[i].DATA.split(',')
            ksDataList[i].NAME = ksDataList[i].NAME.split(',')
        }

        for(let i = 0; i < ksDataList.length; i++) {
            let obj = {
                    number: '系统',
                    RULE: '',
                    name: [],
                    nameId: [],
                    DESKS: '',  // 科室
                    apply : '', // 医院等级
                    sex: '', // 性别
                    sex: '', // 性别
                    DATASTART: '', // 开始年龄
                    DATAEND: '', // 结束年龄
                    FeiBie: '',
                    WEIGUI: '',
                    degree: '',
                    degreeCode: '',
                    price: '',
                    priceCode: '',
                    edit: '编辑'
                }
            for(let j = 0; j < ksDataList[i].NAME.length; j++) {
                if(ksDataList[i].NAME[j] === "限制的科室" ){
                    obj.name.push(ksDataList[i].NAME[j])
                    obj.nameId.push(ksDataList[i].DATA[j])
                }
                if(ksDataList[i].NAME[j] === "费别" ){
                    obj.FeiBie = ksDataList[i].DATA[j]
                }
                if(ksDataList[i].NAME[j] === "违规等级" ){
                    obj.WEIGUI = ksDataList[i].DATA[j]
                }
            }
            obj.name = obj.name.join(',')
            console.log(obj)
            this.roomData.push(obj)
        }


        console.log(ksDataList)
        // console.log(yyDataList)
        // console.log(sexDataList)
        // console.log(ageDataList)
        // ksDataList.forEach(function(item){

        // })

    },
    save(){
        let _this = this;
        let dataArr = [];
        let idArr = [];
        this.roomData.forEach(function(item){
            item.DRUG = _this.ypId;
            idArr = item.nameId.split(',')
                dataArr.push(item);
        })
        console.log(this.roomData)
        console.log(this.degreeData)
        console.log(this.sexData)
        console.log(this.ageData)
        this.degreeData.forEach(function(item){
            item.DRUG = _this.ypId;
            dataArr.push(item)
        })
        this.sexData.forEach(function(item){
            item.DRUG = _this.ypId;
            dataArr.push(item)
        })
        this.ageData.forEach(function(item){
            item.DRUG = _this.ypId;
            dataArr.push(item)
        })
        console.log(dataArr)
        let desk = {
            'ID':localStorage.getItem('UID'),
            'RANDOMCODE':localStorage.getItem('RANDOMCODE'),
            DRUGRULE: dataArr
        };
        $.ajax({ // 查询药品
            type:'post',
            url: urlPath.getIndexTable+'/api/DrugRuleDeploy/AddDrugRule',
            data: desk,
            success:function(dataRets){
                if(dataRets.Y === 100){
                    _this.$Message.success(dataRets.M);
                    _this.$emit('save')
                }
            }
        })
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
