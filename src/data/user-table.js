const userColumns = [
    {
          title: '序号',
          slot: 'ID'
      }, {
        title: '姓名',
        key: 'NAME'

    }, {
        title: '账号',
        key: 'ACCOUNTS'
    }, {
        title: '性别',
        slot: 'SEXCODE'
    },{
        title: '科室',
        key: 'DEPARTMENTNAME',
        minWidth: 100
    },{
        title: '职称',
        key: 'TITLENAME',  minWidth: 50
    }, {
        title: '职务',
        key: 'DUTYNAME'
    }, {
        title: '启用',
        slot: 'STARTTYPE'
    }, {
        title: '操作',
        slot: 'edit'
    }
]
 export {userColumns}
