const indexColumns = [
    {
        title: '序号',
        slot: 'number'
    }, {
        title: '科室',
        key: 'department'
    }, {
        title: '医生',
        key: 'doctor'
    }, {
        title: '患者',
        key: 'patient'
    }, {
        title: '处方/单据号',
        key: 'docNo'
    }, {
        title: '类型',
        key: 'drugType'
    }, {
        title: '急慢性病',
        key: 'chronic'
    }, {
        title: '就诊日期',
        key: 'date',
        sortable: true,
        width:170
    }, {
        title: '就诊科室',
        key: 'room'
    }, {
        title: '等级',
        slot: 'degree',
        sortable: true
    }, {
        title: '处理进度',
        key: 'progerss'
    }
]
const indexData = [
    {
        number: 1,
        department: 18,
        doctor: 'alice',
        patient: 'alice',
        docNo: 'DX1000002',
        drugType: '中成药',
        chronic: '慢性病',
        date: '2016-10-03 13:20:20',
        room: '内科',
        degree: '0',
        progerss: '已通知'
    },
]
const indexColumns2 = [
    {
        title: '序号',
        key: 'number'
    }, {
        title: '患者ID',
        key: 'patientId'
    }, {
        title: '处方号',
        key: 'docNo'
    }, {
        title: '诊断',
        key: 'diagnosis'
    }, {
        title: '就诊科室',
        key: 'room'
    }, {
        title: '执行科室',
        key: 'realRoom'
    }, {
        title: '医生',
        key: 'doctor'
    }, {
        title: '就诊日期',
        key: 'date',
        width:170
    }
]
const indexData2 = [
    {
        number: 1,
        patientId: '222011',
        docNo: 'DX1000002',
        diagnosis: '无痛治疗',
        room: '内科',
        realRoom: '内科',
        doctor: 'alice',
        date: '2016-10-03 13:20:20'
    },
]
export {indexColumns, indexData, indexColumns2, indexData2}
