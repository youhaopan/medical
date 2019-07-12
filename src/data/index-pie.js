export default function(params) {
    // console.log(params);
    let logData = [];
    let loglalte = [];
    let logColor = { 'DEBUG':'#1A7FC3', 'INFO':'#49D0F5', 'WARN':'#FDDC01', 'ERROR':'#EE9B06', 'FATAL':'#EB4723'};
    // 数据格式处理
    if (params) {
        params.forEach(function(item, i) {
            // console.log(item, i)
            logData[i] = { value: item.NUM, name: item.BILLSCLASSNAME, itemStyle: { color: logColor[i] } };
            loglalte[i] = item.BILLSCLASSNAME;
        });
    }
    return {
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
            // data: params && Object.keys(params) || []
            data: loglalte
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
                data: logData
            }
        ]
    }
}
