export default {
    title : {
        text: '严重等级数量占比',
        textStyle:{
          color:'#3B4563',
          lineHeight: 50,
        }
    },
    tooltip : {
      trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    grid: {
      bottom: 40,
      top: 90
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      data: ['严重','警告','正常']
    },
    series : [
        {
            name: '就诊人员',
            type: 'pie',
            radius: ['20%', '35%'],
            center: ['50%', '53%'],
            label: {
                normal: {
                    formatter: '{b} : {c}, {d}%',
                    show: true,
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data:[ {value:12, name:'严重',itemStyle:{color:'#E10098'}},
                {value:5, name:'警告',itemStyle:{color:'#F16856'}},
                {value:12, name:'正常',itemStyle:{color:'#1ABCB0'}}]
        }
    ]
}
