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
      <BtnColor class="ivu-btn-title" btn-title="新建规则" btn-icon="icon-add-rule" @open="openEditRoom(1,'科室规则','add')" />
    </p>
    <div class="">
      <Row>
        <i-col span="12">
            <i-form :model="formData" inline>
                <ul class="pop-list">
                    <li>
                    <label>药品通用名</label>
                    <Input id="input" v-model="formData.NAME" disabled />
                    </li>
                    <li>
                    
                    <!-- <li>
                    <label >国药准字</label>
                    <Input v-model="formData.SPELLCODE" disabled />
                    </li> -->
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
        <!-- <i-col span="12">
          <div class="modal-img-box">
            <img src="../images/pic_drug.png" class="modal-pic-box" />
            <p><span>更换药品照片</span></p>
          </div>
        </i-col>
      </Row>
      <Row> -->
        <i-col span="12">
          <ul class="pop-list">
              <li>
              <label >药品商品名</label>
                <Input  v-model="formData.NAME" disabled />
                </li>
            <li>
              <label >规格</label>
              <Input v-model="formData.SPEC" disabled />
            </li>
            <li>
              <label >单位</label>
              <Input v-model="formData.UNITS" disabled />
            </li>
             <li>
                <label >单价</label>
                <Input v-model="formData.PRICE" disabled />
              </li>
            <!-- <li>
              <label>最小剂量</label>
              <Input />
            </li>
            <li>
              <label>最小剂量单位</label>
              <Input />
            </li> -->
          </ul>
        </i-col>
      </Row>
    </div>
  </Card>
  <Card :bordered="false" v-if="zsKs.length > 0">
    <p slot="title">
      科室规则
    </p>
    <Table :columns="roomColumns" :data="zsKs">
      <!-- <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template> -->
      <template slot="edit" slot-scope="{ row }">
        <!-- <span @click="openEditRoom(1,'科室规则', 'edit', row)">编辑 -->
        <span @click="deleteRid(row)">删除
          <Icon custom="icon-delete" /></span>
      </template>
    </Table>
  </Card>
  <Card :bordered="false" v-if="zsYy.length > 0">
    <p slot="title">
      医院等级规则
    </p>
    <Table :columns="degreeColumns" :data="zsYy">
      <!-- <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template> -->
      <template slot="edit" slot-scope="{ row }">
        <!-- <span @click="openEditRoom(2,'医院等级规则', 'edit', row)">编辑
          <Icon custom="icon-edit" /></span> -->
          <span @click="deleteRid(row)">删除
          <Icon custom="icon-delete" /></span>
      </template>
    </Table>
  </Card>
  <Card :bordered="false" v-if="zsSex.length > 0">
    <p slot="title">
      适用性别
    </p>
    <Table :columns="sexColumns" :data="zsSex">
      <!-- <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template> -->
      <template slot="edit" slot-scope="{ row }">
        <!-- <span @click="openEditRoom(3,'性别规则', 'edit', row)">编辑
          <Icon custom="icon-edit" /></span> -->
          <span @click="deleteRid(row)">删除
          <Icon custom="icon-delete" /></span>
      </template>
    </Table>
  </Card>
  <Card :bordered="false" v-if="zsAge.length > 0">
    <p slot="title">
      适用年龄
    </p>
    <Table :columns="ageColumns" :data="zsAge">
      <!-- <template slot-scope="{ row }" slot="degree">
        <span v-if="row.degree==='1'">警告</span>
        <span class="error" v-else-if="row.degree==='2'">严重</span>
        <span v-else>正常</span>
      </template> -->
      <template slot="edit" slot-scope="{ row }">
        <!-- <span @click="openEditRoom(4,'年龄规则', 'edit', row)">编辑
          <Icon custom="icon-edit" /></span> -->
          <span @click="deleteRid(row)">删除
          <Icon custom="icon-delete" /></span>
      </template>
    </Table>
  </Card>
  <div slot="footer">
    <Button size="large" class="btn-cancel" @click="$emit('cancel')">返回</Button>
    <!-- <Button size="large" type="default" class="btn-submit" @click="save">保存修改</Button> -->
  </div>
  <RuleDrugInfoRoom ref="myAdd" :role-type='roleType' :role-title="roleTitle" v-show="openEditData" @cancel="cancelNest" 
  @ksSave="saveNest1" @setYyData="setYyData" @setSexData="setSexData" @setAgeData="setAgeData"
  @editKs='editKs' @editYy='editYy' @editSex='editSex' @editAge='editAge'/>
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
      ks: [],
      fb: [],
      wg: [],
      yy: [],
      zsKs: [],
      zsYy: [],
      zsSex: [],
      zsAge: [],
      rowData: {},
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
      },
       {
        title: '操作',
        slot: 'edit'
      }
      ],
      roomData: [],
      // 医院等级规则//////////////////////////////
      degreeColumns: [{
        title: '来源',
        key: 'number'
      }, {
        title: '医院等级规则',
        key: 'applyName'
      }, {
        title: '违规等级',
        key: 'degree'
      }, {
        title: '费别',
        key: 'price'
      },
      {
        title: '操作',
        slot: 'edit'
      }
      ],
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
        key: 'degree'
      }, {
        title: '费别',
        key: 'price'
      },
      {
        title: '操作',
        slot: 'edit'
      }
      ],
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
        key: 'degree'
      }, {
        title: '费别',
        key: 'price'
      },
      {
        title: '操作',
        slot: 'edit'
      }
      ],
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
    deleteRid(row){
        console.log(row.rid)
        let _this = this;
        let data = {
            'ID':localStorage.getItem('UID'),
            'RANDOMCODE':localStorage.getItem('RANDOMCODE'),
            DrugRule: row.rid
        }
        $.ajax({ // 查询药品
            type:'post',
            url: urlPath.getIndexTable+'/api/DrugRuleDeploy/DeleteDrugRule',
            data: data,
            success:function(dataRets){
                if (dataRets.Y === 100){
                    console.log(dataRets);
                    _this.$Message.success(dataRets.M);
                    _this.parentHandleclick(_this.rowData);
                }
            }
        })
    },
    openEditRoom(type, title, lei, row) {
        this.openEditData = true
        this.roleType = type;
        this.roleTitle = title;
        let nameList = []
        if(row){
            if(type === 1){
               nameList = row.name.split(',')
               let arr = []
               for(let i = 0; i < nameList.length; i++){
                   arr.push({
                       title: nameList[i],
                       id: row.nameId[i]
                    })
               }
               localStorage.setItem('ksList', JSON.stringify(arr));
            }
            localStorage.setItem('row', JSON.stringify(row));
            console.log(lei)
            // this.$refs.myAdd.edit(type, lei, row);
        }
        this.$refs.myAdd.edit(type, lei, row);
    },
    cancelNest() {
        this.openEditData = false
    },
    // 保存科室信息
    saveNest1(obj,rocoId) {
        this.roomData.push(obj);
        // this.zsKs.push(obj);
        this.save();
        console.log(this.roomData)
    },
    editKs(row){
        console.log(row)
        this.roomData.push(row);
    },
    // 保存医院等级规则
    setYyData(obj,rocoId){
        this.degreeData.push(obj)
        // this.zsYy.push(obj)
        this.save();
        console.log(this.degreeData)
    },
    editYy(row){
        this.degreeData.push(row)
        console.log(this.degreeData)
    },
    // 保存性别规则
    setSexData(obj,rocoId){
        this.sexData.push(obj)
        // this.zsSex.push(obj)
        this.save();
        console.log(this.sexData)
    },
    editSex(row){
        this.sexData.push(row)
    },
    // 保存年龄规则
    setAgeData(obj,rocoId){
        this.ageData.push(obj)
        // this.zsAge.push(obj)
        this.save();
        console.log(this.ageData)
    },
    editAge(row){
        this.ageData.push(row)
    },
    parentHandleclick(row){
        console.log(row)
        this.rowData = row
        this.ypId = row.HISCODE
        console.log(this.ypId)
        let _this = this;
        let desk = {
            'ID':localStorage.getItem('UID'),
            'RANDOMCODE':localStorage.getItem('RANDOMCODE'),
            DRUGRULE: [{
                DRUG: row.HISCODE
            }]
        };
        console.log(desk)
        $.ajax({ // 查询药品
            type:'post',
            url: urlPath.getIndexTable+'/api/DrugRuleDeploy/QueryDrugRule',
            data: desk,
            success:function(dataRets){
                if (dataRets.Y === 100){
                    _this.formData = dataRets.D.DRUG[0];
                    _this.rulenature = dataRets.D.RULENATURE[3];
                    // console.log(dataRets.D)
                    _this.zhangshi(dataRets.D.RULECATALOG, dataRets.D.NATURECONTENT)
                    
                }
            }
        })
    },
    zhangshi(ksList, dataList){

        this.ks = JSON.parse(localStorage.getItem('ks'));
        this.fb = JSON.parse(localStorage.getItem('fb'));
        this.wg = JSON.parse(localStorage.getItem('wg'));
        this.yy = JSON.parse(localStorage.getItem('yy'));

        let ksDataList = []
        let ks = []
        let yyDataList = []
        let yy = []
        let sexDataList = []
        let sex = []
        let ageDataList = []
        let age = []
        let data = []
        let name = []
        console.log(dataList)
        console.log(ksList)

        for(let i = 0; i < ksList.length; i++){
            for(let j = 0; j < dataList.length; j++){
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
        console.log(ksDataList)
        console.log(yyDataList)
        console.log(sexDataList)
        console.log(ageDataList)
        ////  /////////////////////////////      科室列表处理
        for(let i = 0; i < ksDataList.length; i++){
            ksDataList[i].DATA = ksDataList[i].DATA.split(',')
            ksDataList[i].NAME = ksDataList[i].NAME.split(',')
            ksDataList[i].CREATEUSERNAME = ksDataList[i].CREATEUSERNAME.split(',')
            ksDataList[i].CREATEDATE = ksDataList[i].CREATEDATE.split(',')
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
                DATASTART: '', // 开始年龄
                DATAEND: '', // 结束年龄
                FeiBie: '',
                WEIGUI: '',
                degree: '',
                degreeCode: '',
                price: '',
                priceCode: '',
                edit: '编辑',
                CREATEUSERNAME: ksDataList[i].CREATEUSERNAME[0],
                CREATEDATE: ksDataList[i].CREATEDATE[0],
                rid: ksDataList[i].RID
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
            // obj.name = obj.name.join(',')
            // console.log(obj)
            ks.push(obj)
        }
        for(let i = 0; i < ks.length; i++){
            // 循环获取科室名字
            // console.log(ks[i].nameId)
            for(let j = 0; j < ks[i].nameId.length; j++){
                for(let k = 0; k < this.ks.length; k++){
                    if(ks[i].nameId[j] === this.ks[k].CODE){
                        ks[i].name[j] = this.ks[k].NAME
                    }
                }
            }
            // 循环获取费别名字
            for(let f = 0; f < this.fb.length; f++){
                if(ks[i].FeiBie === this.fb[f].CODE){
                    ks[i].price = this.fb[f].Type
                }
            }
            // 循环获取违规等级名字
            for(let w = 0; w < this.wg.length; w++){
                if(ks[i].WEIGUI === this.wg[w].CODE){
                    ks[i].degree = this.wg[w].Type
                }
            }
        }
        for(let i = 0; i < ks.length; i++){
            ks[i].name = ks[i].name.join(',')
        }
        this.zsKs = ks;
        console.log(ks)

        /////////////////////////////////////////// 医院等级列表处理
        for(let i = 0; i < yyDataList.length; i++){
            yyDataList[i].DATA = yyDataList[i].DATA.split(',')
            yyDataList[i].NAME = yyDataList[i].NAME.split(',')
            yyDataList[i].CREATEUSERNAME = yyDataList[i].CREATEUSERNAME.split(',')
            yyDataList[i].CREATEDATE = yyDataList[i].CREATEDATE.split(',')
        }
        for(let i = 0; i < yyDataList.length; i++) {
            let obj = {
                number: '系统',
                RULE: '',
                name: [],
                nameId: [],
                DESKS: '',  // 科室
                apply : '', // 医院等级
                applyName : '', // 医院等级
                sex: '', // 性别
                DATASTART: '', // 开始年龄
                DATAEND: '', // 结束年龄
                FeiBie: '',
                WEIGUI: '',
                degree: '',
                degreeCode: '',
                price: '',
                priceCode: '',
                edit: '编辑',
                CREATEUSERNAME: yyDataList[i].CREATEUSERNAME[0],
                CREATEDATE: yyDataList[i].CREATEDATE[0],
                rid: yyDataList[i].RID
            }
            for(let j = 0; j < yyDataList[i].NAME.length; j++) {
                if(yyDataList[i].NAME[j] === "允许的医院等级" ){
                    obj.apply = yyDataList[i].DATA[j]
                }
                if(yyDataList[i].NAME[j] === "费别" ){
                    obj.FeiBie = yyDataList[i].DATA[j]
                }
                if(yyDataList[i].NAME[j] === "违规等级" ){
                    obj.WEIGUI = yyDataList[i].DATA[j]
                }
            }
            // obj.name = obj.name.join(',')
            // console.log(obj)
            yy.push(obj)
        }
        for(let i = 0; i < yy.length; i++){
            // 循环获取科室名字
            for(let d = 0; d < this.yy.length; d++){
                if(yy[i].apply === this.yy[d].CODE){
                    yy[i].applyName = this.yy[d].Type
                }
            }
            // 循环获取费别名字
            for(let f = 0; f < this.fb.length; f++){
                if(yy[i].FeiBie === this.fb[f].CODE){
                    yy[i].price = this.fb[f].Type
                }
            }
            // 循环获取违规等级名字
            for(let w = 0; w < this.wg.length; w++){
                if(yy[i].WEIGUI === this.wg[w].CODE){
                    yy[i].degree = this.wg[w].Type
                }
            }
        }
        // console.log(yyDataList)
        // console.log(yy)
        this.zsYy = yy
        /////////////////////////////// 性别列表处理
        for(let i = 0; i < sexDataList.length; i++){
            sexDataList[i].DATA = sexDataList[i].DATA.split(',')
            sexDataList[i].NAME = sexDataList[i].NAME.split(',')
            sexDataList[i].CREATEUSERNAME = sexDataList[i].CREATEUSERNAME.split(',')
            sexDataList[i].CREATEDATE = sexDataList[i].CREATEDATE.split(',')
        }
        for(let i = 0; i < sexDataList.length; i++) {
            let obj = {
                number: '系统',
                RULE: '',
                name: [],
                nameId: [],
                DESKS: '',  // 科室
                apply : '', // 医院等级
                applyName : '', // 医院等级
                sex: '', // 性别
                data: '',
                DATASTART: '', // 开始年龄
                DATAEND: '', // 结束年龄
                FeiBie: '',
                WEIGUI: '',
                degree: '',
                degreeCode: '',
                price: '',
                priceCode: '',
                edit: '编辑',
                CREATEUSERNAME: sexDataList[i].CREATEUSERNAME[0],
                CREATEDATE: sexDataList[i].CREATEDATE[0],
                rid: sexDataList[i].RID
            }
            for(let j = 0; j < sexDataList[i].NAME.length; j++) {
                if(sexDataList[i].NAME[j] === "允许性别" ){
                    obj.sex = sexDataList[i].DATA[j]
                    obj.data = '仅限' + sexDataList[i].DATA[j]
                }
                if(sexDataList[i].NAME[j] === "费别" ){
                    obj.FeiBie = sexDataList[i].DATA[j]
                }
                if(sexDataList[i].NAME[j] === "违规等级" ){
                    obj.WEIGUI = sexDataList[i].DATA[j]
                }
            }
            // obj.name = obj.name.join(',')
            // console.log(obj)
            sex.push(obj)
            console.log(sex)
        }
        for(let i = 0; i < sex.length; i++){
            // 循环获取费别名字
            for(let f = 0; f < this.fb.length; f++){
                if(sex[i].FeiBie === this.fb[f].CODE){
                    sex[i].price = this.fb[f].Type
                }
            }
            // 循环获取违规等级名字
            for(let w = 0; w < this.wg.length; w++){
                if(sex[i].WEIGUI === this.wg[w].CODE){
                    sex[i].degree = this.wg[w].Type
                }
            }
        }
        this.zsSex = sex
        // console.log(sex)
        // console.log(sexDataList)
        //////////////////////////////// 年龄列表处理
        for(let i = 0; i < ageDataList.length; i++){
            ageDataList[i].DATA = ageDataList[i].DATA.split(',')
            ageDataList[i].NAME = ageDataList[i].NAME.split(',')
            ageDataList[i].DATAEND = ageDataList[i].DATAEND.split(',')[0]
            ageDataList[i].DATASTART = ageDataList[i].DATASTART.split(',')[0]
            ageDataList[i].CREATEUSERNAME = ageDataList[i].CREATEUSERNAME.split(',')[0]
            ageDataList[i].CREATEDATE = ageDataList[i].CREATEDATE.split(',')[0]
        }
        for(let i = 0; i < ageDataList.length; i++) {
            let obj = {
                number: '系统',
                RULE: '',
                name: [],
                nameId: [],
                DESKS: '',  // 科室
                apply : '', // 医院等级
                applyName : '', // 医院等级
                sex: '', // 性别
                DATASTART: ageDataList[i].DATASTART, // 开始年龄
                DATAEND: ageDataList[i].DATAEND, // 结束年龄
                age: ageDataList[i].DATASTART + ' - ' + ageDataList[i].DATAEND + '岁',
                FeiBie: '',
                WEIGUI: '',
                degree: '',
                degreeCode: '',
                price: '',
                priceCode: '',
                edit: '编辑',
                CREATEUSERNAME: ageDataList[i].CREATEUSERNAME,
                CREATEDATE: ageDataList[i].CREATEDATE,
                rid: ageDataList[i].RID
            }
            for(let j = 0; j < ageDataList[i].NAME.length; j++) {
                if(ageDataList[i].NAME[j] === "费别" ){
                    obj.FeiBie = ageDataList[i].DATA[j]
                }
                if(ageDataList[i].NAME[j] === "违规等级" ){
                    obj.WEIGUI = ageDataList[i].DATA[j]
                }
            }
            // obj.name = obj.name.join(',')
            // console.log(obj)
            age.push(obj)
        }
        for(let i = 0; i < age.length; i++){
                // 循环获取费别名字
                for(let f = 0; f < this.fb.length; f++){
                    if(age[i].FeiBie === this.fb[f].CODE){
                        age[i].price = this.fb[f].Type
                    }
                }
                // 循环获取违规等级名字
                for(let w = 0; w < this.wg.length; w++){
                    if(age[i].WEIGUI === this.wg[w].CODE){
                        age[i].degree = this.wg[w].Type
                    }
                }
            }
        this.zsAge = age;
        // console.log(age)
        this.$refs.myAdd.getRoomList(this.zsKs, this.zsYy,this.zsSex,this.zsAge);
    },
    save(){
        let _this = this;
        let dataArr = [];
        let idArr = [];
        this.roomData.forEach(function(item){
            item.DRUG = _this.ypId;
            // idArr = item.nameId.split(',')
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
                    _this.roomData = []
                    _this.degreeData = []
                    _this.sexData = []
                    _this.ageData = []
                    _this.$Message.success(dataRets.M);
                    _this.parentHandleclick(_this.rowData);
                    // _this.$emit('save')
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
