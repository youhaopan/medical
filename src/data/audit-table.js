const auditColumns = [{
  title: ' ',
  width: 30,
  slot: 'oneLine'
  //第一列时间轴
}, {
  title: '一级类目',
  key: 'level1',
}, {
  title: ' ',
  width: 30,
  slot: 'twoLine'
  //第二列时间轴
}, {
  title: '二级类目',
  key: 'level2',
}, {
  title: '三级类目',
  key: 'level3'
}, {
  title: '四级类目',
  key: 'level4'
},{
  title: '启用状态',
  slot: 'state'
}, {
  title: '修改日期',
  key: 'editTime'
}];
const auditData = [{
  level1: '科室规则',
  level2: '夸科室用药',
  level3: '三级类目1',
  state: '1',
  editTime: '2019/05/08 12:03',
  oneLine: 'head',
  twoLine: 'head'
}, {
  level1: '',
  level2: '',
  level3: '三级类目1',
  state: '0',
  editTime: '2019/05/08 12:03',
  oneLine: 'line',
  twoLine: 'foot'
}, {
  level1: '',
  level2: '夸科室用药',
  level3: '三级类目1',
  state: '1',
  editTime: '2019/05/08 12:03',
  oneLine: 'line',
  twoLine: 'head'
}, {
  level1: '',
  level2: '',
  level3: '三级类目1',
  state: '1',
  editTime: '2019/05/08 12:03',
  oneLine: 'foot',
  twoLine: 'foot'
}, {
  level1: '一级类目',
  level2: '二级类目',
  level3: '三级类目1',
  state: '1',
  editTime: '2019/05/08 12:03',
  oneLine: 'head',
  twoLine: 'head'
}, {
  level1: '',
  level2: '',
  level3: '三级类目1',
  state: '1',
  editTime: '2019/05/08 12:03',
  oneLine: 'foot',
  twoLine: 'foot'
}]
export {
  auditColumns,
  auditData
}
