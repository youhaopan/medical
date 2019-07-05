const indexColumns = [
    {
        title: '序号',
        slot: 'ID'
    }, {
        title: '科室',
        key: 'DESKNAME'
    }, {
        title: '医生',
        key: 'DOCTORNAME'
    }, {
        title: '患者',
        key: 'PATIENTNAME'
    }, {
        title: '处方/单据号',
        key: 'CODE'
    },  {
        title: '急慢性病',
        key: 'BILLSTYPENAME'
    }, {
        title: '就诊日期',
        key: 'CREATEDATE',
        sortable: true,
        width:200
    }, {
        title: '就诊科室',
        key: 'CUREDESKNAME'
    }, {
        title: '等级',
        key: 'BILLSCLASSNAME',
     }, {
        title: '处理进度',
        key: 'DEALDOCTOR'
    }, {
        title: '操作',
        slot: 'edit'
    }
]
const indexData = [
    // {
    //     ID: 1,
    //     DESKNAME: 18,
    //     DOCTORNAME: 'alice',
    //     PATIENTNAME: 'alice',
    //     CODE: 'DX1000002',
    //      BILLSTYPENAME: '慢性病',
    //     CREATEDATE: '2016-10-03 13:20:20',
    //     CUREDESKNAME: '内科',
    //     BILLSCLASSNAME: '0',
    //     DEALSYSTEM: '已通知',
    //     edit: '详情'
    // }, {
    //     number: 1,
    //     department: 18,
    //     doctor: 'alice',
    //     patient: 'alice',
    //     docNo: 'DX1000002',
    //     drugType: '中成药',
    //     chronic: '慢性病',
    //     date: '2016-10-03 13:20:20',
    //     room: '内科',
    //     degree: '1',
    //     progerss: '已通知',
    //     edit: '详情'
    // }, {
    //     number: 1,
    //     department: 18,
    //     doctor: 'alice',
    //     patient: 'alice',
    //     docNo: 'DX1000002',
    //     drugType: '中成药',
    //     chronic: '慢性病',
    //     date: '2016-10-03 13:20:20',
    //     room: '内科',
    //     degree: '2',
    //     progerss: '已通知',
    //     edit: '详情'
    // }, {
    //     number: 1,
    //     department: 18,
    //     doctor: 'alice',
    //     patient: 'alice',
    //     docNo: 'DX1000002',
    //     drugType: '中成药',
    //     chronic: '慢性病',
    //     date: '2016-10-03 13:20:20',
    //     room: '内科',
    //     degree: '0',
    //     progerss: '已通知',
    //     edit: '详情'
    // }, {
    //     number: 1,
    //     department: 18,
    //     doctor: 'alice',
    //     patient: 'alice',
    //     docNo: 'DX1000002',
    //     drugType: '中成药',
    //     chronic: '慢性病',
    //     date: '2016-10-03 13:20:20',
    //     room: '内科',
    //     degree: '0',
    //     progerss: '已通知',
    //     edit: '详情'
    // }, {
    //     number: 1,
    //     department: 18,
    //     doctor: 'alice',
    //     patient: 'alice',
    //     docNo: 'DX1000002',
    //     drugType: '中成药',
    //     chronic: '慢性病',
    //     date: '2016-10-03 13:20:20',
    //     room: '内科',
    //     degree: '0',
    //     progerss: '已通知',
    //     edit: '详情'
    // }
]
export {indexColumns, indexData}
