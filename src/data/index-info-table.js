const infoTableColumns = [{
  title: '序号',
  slot: 'number',
  width: 60
},{
  title: '药品诊疗名称',
  key: 'PNAME'
},{
  title: '规格',
  key:'DSPEC'
},{
  title: '数量',
  key:'NUM',
  width: 60
  // align: 'center'
},{
  title: '给药方式',
  key:'DRUG_WAY'
},{
  title: '频率',
  key:'FREQUENCY'
},{
  title: '单次计量',
  key:'DC_MEASURE',
  // align: 'center'
},{
  title: '单次计量单位',
  key:'DC_MEASUREMENT',
  // align: 'center'
},{
  title: '用药天数',
  key:'DAY',
  // align: 'center'
},{
  title: '违规内容',
  key:'CONTENT',
  sortable: true,
  tooltip: true,
},{
  title: '正确规则',
  key:'CORRECT_RULES',
  sortable: true,
  tooltip: true,
},{
  title: '违规状态',
  key:'CLASS'
}]
const infoTableData = [{
  no:1,
  name:'三精双黄连口服液',
  specify: '0.2mg/支',
  state: '0',
  info:'违规说明：该药只能口服，不能注射使用。',
  _expanded: true
},{
  no:2,
  name:'三精双黄连口服液',
  specify: '0.2mg/支',
  state: '1',
  info:'违规说明：该药只能口服，不能注射使用。',
  _expanded: true
},{
  no:3,
  name:'三精双黄连口服液',
  specify: '0.2mg/支',
  state: '0',
  info:'违规说明：该药只能口服，不能注射使用。',
  _expanded: true
}]
export {
  infoTableColumns,
  infoTableData
}
