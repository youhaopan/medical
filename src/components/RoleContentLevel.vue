<template lang="html">
    <ul>
      <li>
        <label>费别</label>
        <Select v-model="form.FeiBie" style="width:200px" @on-change='selectPriceId' :label-in-value='true'>
          <Option v-for="item in priceList" :value="item.CODE" :key="item.CODE">{{ item.Type }}</Option>
        </Select>
      </li>
      <li>
        <label>违规等级</label>
        <Select v-model="form.WEIGUI" style="width:200px" @on-change='selectDegreeId' :label-in-value='true'>
          <Option v-for="item in degreeList" :value="item.CODE" :key="item.CODE">{{ item.Type }}</Option>
        </Select>
      </li>
      <li>
        <label>适用于</label>
        <Select v-model="form.apply" style="width:200px" @on-change='selectLevel' :label-in-value='true'>
          <Option v-for="item in levelList" :value="item.CODE" :key="item.CODE">{{ item.Type }}</Option>
        </Select>
      </li>
    </ul>
</template>

<script>
export default {
  name: "roleContentLevel",
  props: {
    priceList: Array,
    degreeList: Array,
    levelList: Array,
  },
  data() {
    return {
      price: '',
      degree: '',
      level: '',
      form: {
        FeiBie: '',
        WEIGUI: '',
        apply:'',
      }
      // levelList: [{
      //   label: '三级甲等',
      //   value: 'ca'
      // }],
    }
  },
  methods: {
    edit(){
         this.form = JSON.parse(localStorage.getItem('row'));
        //  this.$set(this.form, 'price' , form.FeiBie)
         console.log(this.form)
      },
    // 选择费别
    selectPriceId(val){
        console.log(val)
        this.$emit('selectPriceId', val)
    //   console.log(this.priceId)
    },
    // 选择违规等级
    selectDegreeId(val){
        console.log(val)
        this.$emit('selectDegreeId', val)
    //   console.log(this.degreeId)
    },
    // 选择医院等级类型
    selectLevel(val){
      console.log(val)
        this.$emit('selectLevel', val)
    },
    reset(){
        this.form.FeiBie = '';
        this.form.WEIGUI = '';
        this.form.apply = '';
    },
    cancel() {

    },
    save() {

    }
  },
}
</script>

<style lang="css" scoped>

</style>
