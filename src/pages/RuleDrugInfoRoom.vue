<template>
<Modal id="modal" class="pop-mod" :value="true" width="95%" title="编辑药品规则" :closable="false" :mask-closable="false" :footer-hide="true">
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
          <RoleContentRoom ref="ksChild" :price-list='priceList' :degree-list='degreeList' @selectPriceId='Price = arguments[0]' @selectDegreeId='degree = arguments[0]' @checkedList='checkedList = arguments[0]' v-show="roconstypeData===1" />
          <RoleContentLevel ref="yyChild" :price-list='priceList' :degree-list='degreeList' :level-list='levelList' @selectPriceId='yyPrice = arguments[0]' @selectDegreeId='yyDegree = arguments[0]' @selectLevel='yyLevel = arguments[0]' v-show="roconstypeData===2" />
          <RoleContentSex ref="sexChild" :price-list='priceList' :degree-list='degreeList' @selectPriceId='sexPrice = arguments[0]' @selectDegreeId='sexDegree = arguments[0]' @selectSex='sex = arguments[0]' v-show="roconstypeData===3" />
          <RoleContentAge  ref="ageChild" :price-list='priceList' :degree-list='degreeList' @selectPriceId='agePrice = arguments[0]' @selectDegreeId='ageDegree = arguments[0]' @dataStart='dataStart = arguments[0]' @dataEnd='dataEnd = arguments[0]' v-show="roconstypeData===4" />
          <div class="ivu-modal-footer">
            <Button size="large" class="btn-cancel" @click="$emit('cancel')">返回</Button>
            <Button size="large" v-if="show" type="default" class="btn-submit" @click="save">新增保存</Button>
            <Button size="large" v-if="!show" type="default" class="btn-submit" @click="editSave">编辑保存</Button>
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
// import { dataTreeRole } from '../data/data-tree.js';
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
        show: true,
      dataTreeRole: [],
      tipId: '',
      tipEdit: '',
      tipTitle: '',
      // 科室
      Price: {
          label: '',
          value: ''
      },
      degree: {
          label: '',
          value: ''
      },
      checkedList: [],
      formData:{},
      // 医院
      yyPrice: {
          label: '',
          value: ''
      },
      yyDegree: {
          label: '',
          value: ''
      },
      yyLevel: {
          label: '',
          value: ''
      },
      // 性别
      sexPrice: {
          label: '',
          value: ''
      },
      sexDegree: {
          label: '',
          value: ''
      },
      sex : '',
      // 年龄
      agePrice: {
          label: '',
          value: ''
      },
      ageDegree: {
          label: '',
          value: ''
      },
      dataStart: '',
      dataEnd: '',
// //////////////////////////////
      roconstypeData: this.roleType,
      roconstypeTitle: this.roleTitle,
      priceList: [],
      levelList: [],
      degreeList: [],
    //   roomList: [{
    //     name: '张晓静',
    //     degree: "审核员",
    //     time: '2019-04-27 18:57:29',
    //     info: '适用性别，系统，-，-，仅限男，严重。'
    //   }, {
    //     name: '张晓静',
    //     degree: "审核员",
    //     time: '2019-04-27 18:57:29',
    //     info: '医院等级规则，系统，适用于三级甲等以上，严重。'
    //   }, {
    //     name: '张晓静',
    //     degree: "审核员",
    //     time: '2019-04-27 18:57:29',
    //     info: '适用性别，系统，-，-，仅限男，严重。'
    //   }]
    roomList: []
    }
  },
  methods: {
      edit(type, lei, row){
          console.log(type)
          console.log(row)
          console.log(lei)
        if(lei === 'add'){
            this.show = true
        }
        if(lei === 'edit'){
            this.show = false;
            this.editRow = row
        }
        //   if(type === 1){
        //     this.$refs.ksChild.edit();
        //   } 
        //   if(type === 2){
        //     this.$refs.yyChild.edit();
        //   } 
        //   if(type === 3){
        //     this.$refs.sexChild.edit();
        //   } 
        //   if(type === 4){
        //     this.$refs.ageChild.edit();
        //   } 
      },
      editSave(){
            console.log(this.editRow)
            console.log(this.roconstypeId)
          if(this.roconstypeData ===1){
                if(this.Price.value !== '' && this.degree.value !== '' && this.checkedList.length > 0){
                    let arrName = [];
                    let arrId = [];
                    this.checkedList.forEach(function(item){
                        arrName.push(item.title)
                        arrId.push(item.id)
                    })
                    this.editRow.RULE = this.roconstypeId;
                    this.editRow.nameId = arrId;
                    this.editRow.name = arrName.join(',');
                    this.editRow.price = this.Price.label;
                    this.editRow.FeiBie = this.Price.value;
                    this.editRow.degree = this.degree.label;
                    this.editRow.WEIGUI = this.degree.value;
                    this.editRow.attr = ['3', '1', '11'];
                    this.$emit('editKs', this.editRow);
                    this.$Message.success('编辑成功');
                    console.log(this.editRow)
                    this.$refs.ksChild.reset();
                }else{
                    this.$Message.warning('请选择要添加的医院等级规则');
                }
          } else if(this.roconstypeData ===2){
                if(this.yyPrice.value !== '' && this.yyDegree.value !== '' && this.yyLevel.value !== ''){
                    this.editRow.RULE = this.roconstypeId;
                    this.editRow.nameId = this.yyLevel.value;
                    this.editRow.name = this.yyLevel.label;
                    this.editRow.apply = this.yyLevel.value;
                    this.editRow.applyName = this.yyLevel.label;
                    this.editRow.price = this.yyPrice.label;
                    this.editRow.FeiBie = this.yyPrice.value;
                    this.editRow.degree = this.yyDegree.label;
                    this.editRow.WEIGUI = this.yyDegree.value;
                    this.editRow.attr = ['1', '11', '7'];
                    this.$emit('editYy', this.editRow);
                    this.$Message.success('编辑成功');
                    this.$refs.yyChild.reset();
            }else{
                this.$Message.warning('请选择要添加的医院等级规则');
            }
          } else if(this.roconstypeData ===3){
                if(this.sexPrice.value !== '' && this.sexDegree.value !== '' && this.sex !== ''){
                    this.editRow.RULE = this.roconstypeId;
                    this.editRow.data = '仅限' + this.sex;
                    this.editRow.sex = this.sex;
                    this.editRow.price = this.sexPrice.label;
                    this.editRow.FeiBie = this.sexPrice.value;
                    this.editRow.degree = this.sexDegree.label;
                    this.editRow.WEIGUI = this.sexDegree.value;
                    this.editRow.attr = ['1', '11', '4'];
                    // console.log(sexData)
                    this.$emit('editSex', this.editRow);
                    this.$Message.success('编辑成功');
                    this.$refs.sexChild.reset();
                }else{
                    this.$Message.warning('请选择要添加的医院等级规则');
                }
          } else if(this.roconstypeData ===4){
                if(this.agePrice.value !== '' && this.ageDegree.value !== '' && this.dataStart !== '' && this.dataEnd !== ''){
                    this.editRow.RULE = this.roconstypeId;
                    this.editRow.age = this.dataStart + ' - ' + this.dataEnd + ' 岁';
                    this.editRow.DATASTART = this.dataStart;
                    this.editRow.DATAEND = this.dataEnd;
                    this.editRow.price = this.agePrice.label;
                    this.editRow.FeiBie = this.agePrice.value;
                    this.editRow.degree = this.ageDegree.label;
                    this.editRow.WEIGUI = this.ageDegree.value;
                    this.editRow.attr = ['1', '11', '5'];
                    // console.log(ageData)
                    this.$emit('editAge', this.editRow);
                    this.$Message.success('编辑成功');
                    this.$refs.ageChild.reset();
            }
          }
      },
      getRoomList(ks,yy,sex,age){
          let arr = []
          ks.forEach(function(item){
              item.info = '适用' + item.name + '，' + item.number + '，' + item.degree + '。'    
              arr.push(item)
          })
          yy.forEach(function(item){
              item.info = '医院等级规则' +  '，' + item.number + '，' + '适用于'+ item.applyName + '以上，' + item.degree + '。'
              arr.push(item)
          })
          sex.forEach(function(item){
               //     info: '适用性别，系统，-，-，仅限男，严重。'
              item.info = '适用性别，' + item.number + '，' + '仅限'+ item.sex + '，' + item.degree + '。'
              arr.push(item)
          })
          age.forEach(function(item){
              item.info = '适用年龄，' + item.number + '，' + item.DATASTART + '>' + item.DATAEND + '岁，' + item.degree + '。'
              arr.push(item)
          })
          this.roomList = arr;
          console.log(this.roomList)
      },
    save(){
        if(this.roconstypeData ===1){
            // 科室规则的保存
            if(this.Price.value !== '' && this.degree.value !== '' && this.checkedList.length > 0){
                let arrName = [];
                let arrId = [];
                this.checkedList.forEach(function(item){
                    arrName.push(item.title)
                    arrId.push(item.id)
                })
                let roomData = {
                    number: '系统',
                    RULE: this.roconstypeId,
                    name: arrName.join(','),
                    nameId: arrId.join(','),
                    DESKS: arrId,
                    attr: ['3', '1', '11'],
                    FeiBie: this.Price.value,
                    WEIGUI: this.degree.value,
                    degree: this.degree.label,
                    degreeCode: this.degree.value,
                    price: this.Price.label,
                    priceCode: this.Price.value,
                    edit: '编辑'
                }
                // console.log(roomData)
                this.$emit('ksSave', roomData, this.roconstypeId);
                // this.$Message.success('添加成功');
                this.$refs.ksChild.reset();
                // for (var key in roomData) { 
                //     if (this.formData[key] !== roomData[key]) { 
                //         console.log(this.formData[key], roomData[key])
                //         this.formData = roomData;
                //         this.$emit('ksSave', this.formData);
                //         console.log('赋值',this.formData);
                //         return
                //     }
                //     console.log(this.formData[key], roomData[key]);
                //     this.$Message.warning('这是一条普通的提醒');
                // }
            }else{
                this.$Message.warning('请选择要添加的科室规则');
            }
        }else if(this.roconstypeData ===2){
            // 医院等级规则的保存
            if(this.yyPrice.value !== '' && this.yyDegree.value !== '' && this.yyLevel.value !== ''){
                let yyData = {
                    number: '系统',
                    RULE: this.roconstypeId,
                    name: this.yyLevel.label,
                    nameId: this.yyLevel.value,
                    data: this.yyLevel.value,
                    attr: ['1', '11', '7'],
                    apply : this.yyLevel.value,
                    applyName: this.yyLevel.label,
                    FeiBie: this.yyPrice.value, 
                    WEIGUI: this.yyDegree.value,
                    degree: this.yyDegree.label,
                    degreeCode: this.yyDegree.value,
                    price: this.yyPrice.label,
                    priceCode: this.yyPrice.value,
                    edit: '编辑'
                }
                console.log(yyData)
                this.$emit('setYyData', yyData, this.roconstypeId);
                // this.$Message.success('添加成功');
                this.$refs.yyChild.reset();
            }else{
                this.$Message.warning('请选择要添加的医院等级规则');
            }
        }else if(this.roconstypeData ===3){
            // 性别规则的保存
            if(this.sexPrice.value !== '' && this.sexDegree.value !== '' && this.sex !== ''){
                let sexData = {
                    number: '系统',
                    RULE: this.roconstypeId,
                    // name: this.yyLevel.label,
                    // nameId: this.yyLevel.value,
                    data: '仅限' + this.sex,
                    attr: ['1', '11', '4'],
                    FeiBie: this.sexPrice.value,
                    WEIGUI: this.sexDegree.value,
                    sex: this.sex,
                    degree: this.sexDegree.label,
                    degreeCode: this.sexDegree.value,
                    price: this.sexPrice.label,
                    priceCode: this.sexPrice.value,
                    edit: '编辑'
                }
                // console.log(sexData)
                this.$emit('setSexData', sexData, this.roconstypeId);
                // this.$Message.success('添加成功');
                this.$refs.sexChild.reset();
            }else{
                this.$Message.warning('请选择要添加的医院等级规则');
            }
        }else if(this.roconstypeData ===4){
            // 年龄规则的保存
            console.log(this.dataStart)
            console.log(this.dataEnd)
            if(this.agePrice.value !== '' && this.ageDegree.value !== '' && this.dataStart !== '' && this.dataEnd !== ''){
                let ageData = {
                    number: '系统',
                    RULE: this.roconstypeId,
                    // name: this.yyLevel.label,
                    // nameId: this.yyLevel.value,
                    age: this.dataStart + ' - ' + this.dataEnd + ' 岁',
                    dataStart: this.dataStart,
                    dataEnd: this.dataEnd,
                    data: '',
                    attr: ['1', '11', '5'],
                    DATASTART: this.dataStart,
                    DATAEND: this.dataEnd,
                    FeiBie: this.agePrice.value,
                    WEIGUI: this.ageDegree.value,
                    degree: this.ageDegree.label,
                    degreeCode: this.ageDegree.value,
                    price: this.agePrice.label,
                    priceCode: this.agePrice.value,
                    edit: '编辑'
                }
                // console.log(ageData)
                this.$emit('setAgeData', ageData, this.roconstypeId);
                // this.$Message.success('添加成功');
                this.$refs.ageChild.reset();
            }else{
                this.$Message.warning('请选择要添加的年龄规则');
            }
        }
    },
    selectdata(data) {
        console.log(data)
      if (data.length > 0) {
        this.tipEdit = data[0].edit;
        this.tipTitle = data[0].title;
        this.tipId = data[0].id;
      } else {
        this.roconstypeId = this.tipId;
        this.roconstypeData = this.tipEdit;
        this.roconstypeTitle = this.tipTitle;
        console.log(this.roconstypeId)
      }
    },
    getPriceList(){
        let _this = this;
        let DAT={'ID':localStorage.getItem('UID'), 'RANDOMCODE':localStorage.getItem('RANDOMCODE'), 'DICTTYPE': '费别'};
        $.ajax({ // 加载费别
            type: 'post',
            url: urlPath.getIndexTable+'/API/BaseDataManager/QueryDict',
            data: DAT,
            success: function(dataRets){
                _this.priceList = dataRets.D.ListDict;
                localStorage.setItem('fb', JSON.stringify(_this.priceList));
            }
        });
        let DATA={'ID':localStorage.getItem('UID'), 'RANDOMCODE':localStorage.getItem('RANDOMCODE'), 'DICTTYPE': '医院等级类型'};
        $.ajax({ // 加载费别
            type: 'post',
            url: urlPath.getIndexTable+'/API/BaseDataManager/QueryDict',
            data: DATA,
            success: function(dataRets){
                _this.levelList = dataRets.D.ListDict;
                localStorage.setItem('yy', JSON.stringify(_this.levelList));
            }
        })
    },
    getDegreeList(){
        let _this = this;
        let desk={'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'),'DICTTYPE': '违规等级'};
        $.ajax({ // 加载违规等级
            type: 'post',
            url: urlPath.getIndexTable+'/api/BaseDataManager/QueryDict',
            data: desk,
            success: function(dataRets){
                _this.degreeList = dataRets.D.ListDict;
                localStorage.setItem('wg', JSON.stringify(_this.degreeList));
            }
        })
    },
    getDataTreeRole(){
        let _this = this;
        let desk = {'ID':localStorage.getItem('UID'),'RANDOMCODE':localStorage.getItem('RANDOMCODE'), 'RULECATALOG': [{ID: '-1'}]};
        $.ajax({ // 加载违规等级
            type: 'post',
            url: urlPath.getIndexTable+'/api/RuleCatalogManager/QueryRuleCatalog',
            data: desk,
            success: function(dataRets){
                let arr = [];
                let children = [];
                dataRets.D.RULECATALOG.forEach(function(item) {
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
                for(let i = 0; i<dataRets.D.RULECATALOG.length;i++){
                    for(let j =0; j<arr.length;j++){
                        if(dataRets.D.RULECATALOG[i].UP === arr[j].id){
                            let erji = {
                                UP: dataRets.D.RULECATALOG[i].UP,
                                children: [],
                                disable: false,
                                expand: true,
                                id: dataRets.D.RULECATALOG[i].ID,
                                nodeKey: 1,
                                title: dataRets.D.RULECATALOG[i].NAME
                            }
                            arr[j].children.push(erji)
                        }
                    }
                }
                for(let k = 0; k<arr.length;k++){
                    // console.log(arr[k].children.length)
                    for(let f = 0; f<arr[k].children.length; f++){
                        for(let t = 0; t<dataRets.D.RULECATALOG.length;t++){
                            if(dataRets.D.RULECATALOG[t].UP === arr[k].children[f].id){
                                let sanji = {
                                    UP: dataRets.D.RULECATALOG[t].UP,
                                    children: [],
                                    disable: false,
                                    expand: true,
                                    id: dataRets.D.RULECATALOG[t].ID,
                                    nodeKey: 2,
                                    title: dataRets.D.RULECATALOG[t].NAME
                                }
                                if(dataRets.D.RULECATALOG[t].NAME ==='科室规则') {
                                    sanji.edit = 1;
                                    _this.roconstypeId = dataRets.D.RULECATALOG[t].ID
                                } 
                                if(dataRets.D.RULECATALOG[t].NAME ==='医院等级规则') sanji.edit = 2
                                if(dataRets.D.RULECATALOG[t].NAME ==='性别规则') sanji.edit = 3
                                if(dataRets.D.RULECATALOG[t].NAME ==='年龄规则') sanji.edit = 4
                                arr[k].children[f].children.push(sanji)
                            }
                        }
                    }
                }
                // console.log(arr)
                _this.dataTreeRole = arr
            }
        })
    },
  },
  watch: {
    roleType() {
      this.roconstypeData = this.roleType;
    },
    roleTitle() {
      this.roconstypeTitle = this.roleTitle
    },
    Price(){
        console.log(this.Price)
    },
    degree(){
        console.log(this.degree)
    }
  },
  created(){
      this.getPriceList();
      this.getDegreeList();
      this.getDataTreeRole();
  }
}
</script>
<style lang="less">

</style>
