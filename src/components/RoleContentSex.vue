<template lang="html">
    <ul>
      <li>
        <label>费别</label>
        <Select v-model="price" style="width:200px">
          <Option v-for="item in priceList" :value="item.CODE" :key="item.CODE">{{ item.Type }}</Option>
        </Select>
      </li>
      <li>
        <label>性别选择</label>
        <RadioGroup type="button" v-model="sexChoose" class="state-choose">
        <Radio class="error" label="男" />
        <Radio label="女" />
        </RadioGroup>
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
  name: "roleContentSex",
  props: {
    priceList: Array,
    degreeList: Array,
  },
  data() {
    return {
      price: 'bj',
      degree: '0',
      sexChoose: ''
    }
  }
}
</script>

<style lang="css" scoped>

</style>
