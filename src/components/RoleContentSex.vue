<template lang="html">
    <ul>
      <li>
        <label>性别选择</label>
        <RadioGroup type="button" v-model="form.sex" @on-change="selectSex" class="state-choose">
          <!-- class="error" -->
        <Radio label="男" value="男"/>
        <Radio label="女" value="女" />
        </RadioGroup>
      </li>
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
    </ul>
</template>

<script>
export default {
  name: "roleContentSex",
  props: {
    priceList: Array,
    degreeList: Array,
  },
  data() {
    return {
      price: '',
      degree: '',
      sexChoose: '',
      form: {
        FeiBie: '',
        WEIGUI: '',
        apply:'',
      }
    }
  },
  methods:{
    edit(){
         this.form = JSON.parse(localStorage.getItem('row'));
        //  this.$set(this.form, 'price' , form.FeiBie)
         console.log(this.form)
      },
      // 选择性别
    selectSex(val){
        console.log(val)
        this.$emit('selectSex', val)
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
    reset(){
        this.form.FeiBie = '';
        this.form.WEIGUI = '';
        this.form.sex = '';
    },
  }
}
</script>

<style lang="css" scoped>

</style>
