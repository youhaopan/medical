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
          <RoleContentRoom :price-list='priceList' :degree-list='degreeList' @selectPriceId='Price = arguments[0]' @selectDegreeId='degree = arguments[0]' @checkedList='checkedList = arguments[0]' v-show="roconstypeData===1" />
          <RoleContentLevel :price-list='priceList' :degree-list='degreeList' v-show="roconstypeData===2" />
          <RoleContentSex :price-list='priceList' :degree-list='degreeList' v-show="roconstypeData===3" />
          <RoleContentAge :price-list='priceList' :degree-list='degreeList' v-show="roconstypeData===4" />
          <div class="ivu-modal-footer">
            <Button size="large" class="btn-cancel" @click="$emit('cancel')">取消</Button>
            <Button size="large" type="default" class="btn-submit" @click="$emit('save',Price,degree,checkedList)">保存编辑</Button>
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
      dataTreeRole: [],
      tipEdit: '',
      tipTitle: '',
      Price: '',
      degree: '',
      checkedList: [],
      roconstypeData: this.roleType,
      roconstypeTitle: this.roleTitle,
      priceList: [],
      degreeList: [],
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
                                if(dataRets.D.RULECATALOG[t].NAME ==='科室规则') sanji.edit = 1
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
