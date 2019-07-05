<template lang="html">
    <ul>
      <li>
        <label>费别</label>
        <Select v-model="price" style="width:200px">
          <Option v-for="item in priceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </li>
      <li>
        <label>适用于</label>
        <Select v-model="level" style="width:200px">
          <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </li>
      <li>
        <label>违规等级</label>
        <Select v-model="degree" style="width:200px">
          <Option v-for="item in degreeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
  },
  data() {
    return {
      price: 'bj',
      degree: '0',
      level: 'ca',
      levelList: [{
        label: '三级甲等',
        value: 'ca'
      }],
    }
  },
  methods: {
    cancel() {

    },
    save() {

    }
  },
}
</script>

<style lang="css" scoped>

</style>
