<template lang="html">
    <ul>
      <li>
        <label>费别</label>
        <Select v-model="price" style="width:200px">
          <Option v-for="item in priceList" :value="item.CODE" :key="item.CODE">{{ item.Type }}</Option>
        </Select>
      </li>
      <li>
        <label>适用年龄段</label>
        <div class="inline-line">
          <i-input v-model="age" type="number" :number="true" style="width: 90px">
            <span slot="append">岁</span>
          </i-input>
          <span>&nbsp;&nbsp; 到 &nbsp;&nbsp;</span>
          <i-input type="number" :number="true" style="width: 90px">
            <span slot="append">岁</span>
          </i-input>
        </div>
      </li>
      <li>
        <label>违规等级</label>
        <Select v-model="degree" style="width:200px">
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
      price: 'bj',
      degree: '0',
      age: ''
    }
  },
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
