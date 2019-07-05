const userColumns = [
 {
        title: '序号',
        slot: 'ID' ,
        width:70
    },  {
        title: '角色名',
        key: 'NAME',
        width: 90
    }, {
        title: '角色描述',
        key: 'DESC'
    }, {
        title: '创建日期',
        key: 'CREATEDATE',
        width: 130
    }, {
        title: '最后更新日期',
        key: 'UPDATEDATE',
        width: 130
    }, {
        title: '操作',
        slot: 'edit',
        width: 100
    }
]
const userData = [
    {
        CODE: '01',
        NAME: '院长',
        DESC: '在领导下，根据党和国家的有关方针政策，主持医院工作',
        CREATEDATE: '2019/03/05 14:29',
        UPDATEDATE: '2019/03/06 14:29',
        edit: '详情'
    }, {
        CODE: '02',
        NAME: '医生',
        DESC: '负责门诊诊断，参加急诊抢救工作',
        CREATEDATE: '2019/03/05 14:29',
        UPDATEDATE: '2019/03/06 14:29',
        edit: '详情'
    }, {
        CODE: '0101',
        NAME: '医师',
        DESC: '开展门诊、巡诊、出诊、家庭病床、预防、保健、健康...',
        CREATEDATE: '2019/03/05 14:29',
        UPDATEDATE: '2019/03/06 14:29',
        edit: '详情'
    }, {
        CODE: '010102',
        NAME: '医保审核员',
        DESC: '负责办理医保病人住院以及特殊病种门诊和家庭病床治...',
        CREATEDATE: '2019/03/05 14:29',
        UPDATEDATE: '2019/03/06 14:29',
        edit: '详情'
    }, {
        CODE: '010102',
        NAME: '医保审核员',
        DESC: '负责办理医保病人住院以及特殊病种门诊和家庭病床治',
        CREATEDATE: '2019/03/05 14:29',
        UPDATEDATE: '2019/03/06 14:29',
        edit: '详情'
    }, {
        CODE: '010102',
        NAME: '医保审核员',
        DESC: '负责办理医保病人住院以及特殊病种门诊和家庭病床治',
        CREATEDATE: '2019/03/05 14:29',
        UPDATEDATE: '2019/03/06 14:29',
        edit: '详情'
    },
]
export {userColumns,userData}
