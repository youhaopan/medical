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
  title: '单位',
  key:'DSPEC'
},{
  title: '数量',
  key:'DSPEC'
},{
  title: '给药方式',
  key:'DSPEC'
},{
  title: '频率',
  key:'DSPEC'
},{
  title: '单次计量',
  key:'DSPEC'
},{
  title: '单次计量单位',
  key:'DSPEC'
},{
  title: '用药天数',
  key:'DSPEC'
},{
  title: '违规内容',
  key:'DSPEC'
},{
  title: '正确规则',
  key:'DSPEC'
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
