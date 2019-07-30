const indexColumns = [
    {
        title: '序号',
        slot: 'number'
    }, {
        title: '科室',
        key: 'CUREDESKNAME'
    }, {
        title: '处方/单据号',
        key: 'CODE',
        sortable: true,
        tooltip: true,
        // width:170
    },{
        title: '医生',
        key: 'DOCTORNAME'
    }, {
        title: '患者',
        key: 'PATIENTNAME'
    }, {
        title: '类型',
        key: 'TYPENAME',
        sortable: true,
        tooltip: true,
    }, 
    // {
    //     title: '急慢性病',
    //     key: 'BILLSTYPENAME'
    // }, 
    {
        title: '就诊日期',
        key: 'CREATEDATE',
        sortable: true,
        tooltip: true,
        // width:170
    }, {
        title: '就诊科室',
        key: 'CUREDESKNAME'
    }, {
        title: '等级',
        // slot: 'degree',
        // sortable: true
        key: 'BILLSCLASSNAME'
    }, {
        title: '处理进度',
        key: 'DEALDOCTOR'
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
        // key: 'number'
        slot: 'number',
        width: '60px'
    }, {
        title: '患者ID',
        key: 'PATIENT'
    }, {
        title: '处方号',
        key: 'CODE',
        sortable: true,
        tooltip: true,
    }, {
        title: '诊断',
        key: 'TYPENAME',
        sortable: true,
        tooltip: true
    }, {
        title: '就诊科室',
        key: 'CUREDESKNAME'
    }, {
        title: '执行科室',
        key: 'DESKNAME'
    }, {
        title: '医生',
        key: 'DOCTORNAME',
    }, {
        title: '就诊日期',
        key: 'CREATEDATE',
        width:200
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
