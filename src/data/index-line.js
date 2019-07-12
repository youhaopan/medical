export default function(params) {
    let xData = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00'];
    let x = [8, 9, 10, 11, 12, 13, 14];
    let y = [];
    let ys = [0, 0, 0, 0, 0, 0, 0];

    let w = [];
    let ws = [0, 0, 0, 0, 0, 0, 0];
    
    // 数据格式处理
    if (params) {
        params.forEach(function(item, i) {
            if(item.BILLSCLASSNAME === '已处理'){
                y.push(item);
            } else {
                w.push(item);
            }
        });
        console.log(y)
        console.log(w)
        for(let i = 0; i < y.length; i++){
            console.log(y[i].CREATEDATE)
            if(y[i].CREATEDATE !== null){
                let date = y[i].CREATEDATE.substring(0, 2) * 1 + 1;
                // console.log(date * 1 + 1, x[i])
                for(let j = 0; j < x.length; j++){
                    if(date == x[j]){
                        ys[j] = ys[j] + 1;
                    } else if(date > 14){
                        ys[6] = ys[6] + 1;
                    }
                }
            }
        }
        console.log(w.length)
        for(let i = 0; i < w.length; i++){
            if(w[i].CREATEDATE !== null){
                let date = w[i].CREATEDATE.substring(0, 2) * 1 + 1;
                console.log(date)
                for(let j = 0; j < x.length; j++){
                    // console.log(j)
                    if(date == x[j]){
                        ws[j] = ws[j] + 1;
                    } else if(date > 14){
                        ws[6] = ws[6] + 1;
                    }
                }
            }
        }
    }
    ws[6] = ws[6] / x.length;
    ys[6] = ys[6] / x.length;
    console.log(ys, ws)

return {
    title: {
        text: '堆叠区域图',
        textStyle:{
            color:'#3B4563',
            lineHeight: 50,
        }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        bottom: 10,
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: 40,
        top: 90,
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : xData
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'已处理',
            type:'line',
            stack: '总量',
            smooth: true,
            areaStyle: {
                color: '#bd77e3'
            },
            lineStyle: {
                color:'white',
                opacity: 0.2
            },
            data: ys
        },
        {
            name:'未处理',
            type:'line',
            stack: '总量',
            smooth: true,
            areaStyle: {
                color: '#45bef4'
            },
            lineStyle: {
                color:'white',
                opacity: 0.2
            },
            data: ws
        }
    ]
    }
}
