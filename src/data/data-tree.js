const dataTree = [
    {
        title: 'parent 1',
        expand: true,
        children: [
            {
                title: 'parent 1-1',
                expand: true,
                children: [
                    {
                        title: 'leaf 1-1-1'
                    }, {
                        title: 'leaf 1-1-2'
                    }
                ]
            }, {
                title: 'parent 1-2',
                expand: true,
                children: [
                    {
                        title: 'leaf 1-2-1'
                    }, {
                        title: 'leaf 1-2-1'
                    }
                ]
            }
        ]
    }
]
const dataTreeRole =[
  {
      title: '全部药品规则',
      expand: true,
      children: [
          {
              title: '医疗机构规则',
              expand: true,
              children: [
                  {
                      title: '科室规则',
                      edit: 1
                  }, {
                      title: '性别规则',
                      edit: 3
                  }, {
                      title: '年龄规则',
                      edit: 4
                  }, {
                      title: '医院等级规则',
                      edit: 2
                  }
              ]
          }, {
              title: '系统规则',
              expand: true,
              children: [
                  {
                      title: '处方单数规则'
                  }, {
                      title: '频次规则'
                  }, {
                      title: '用法规则'
                  }, {
                      title: '时间范围规则'
                  }
              ]
          }
      ]
  },{
    title: '其它规则',
    expand: true,
  }
]
export {dataTree, dataTreeRole}
