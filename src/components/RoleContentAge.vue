<template lang="html">
    <ul>
      <li>
        <label>适用年龄段</label>
        <div class="inline-line">
          <i-input v-model="form.DATASTART" type="number" :number="true" style="width: 90px">
            <span slot="append">岁</span>
          </i-input>
          <span>&nbsp;&nbsp; 到 &nbsp;&nbsp;</span>
          <i-input v-model='form.DATAEND' type="number" :number="true" style="width: 90px">
            <span slot="append">岁</span>
          </i-input>
        </div>
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
  name: "roleContentAge",
  props: {
    priceList: Array,
    degreeList: Array
  },
  data() {
    return {
      price: '',
      degree: '',
      age: '',
      DATASTART: '',
      DATAEND: '',
      form: {
        FeiBie: '',
        WEIGUI: '',
        DATASTART:'',
        DATAEND:'',
      }
    }
  },
  watch: {
    DATASTART(){
      this.$emit('dataStart', this.DATASTART)
    },
    DATAEND(){
      this.$emit('dataEnd', this.DATAEND)
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
    reset(){
         this.form.FeiBie = '';
        this.form.WEIGUI = '';
        this.form.DATASTART = '';
        this.form.DATAEND = '';
    }
  }
}
</script>

<style lang="css" scoped>
 .ageName {
    position: absolute;
    left: 130px;
    top: 189px;
    z-index: 99;
  }
  .ageName-two {
     position: absolute;
     left: 240px;
     top: 189px;
     z-index: 99;
   }
</style>
