var data = [0, 5, 10, 20];
var yMax = 25;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

export default {
    title: {
        top:15,
        text: '排行榜-科室',
        textStyle:{
          color:'#3B4563',
          lineHeight: 20,
        },
        subtext: '日期：2019/07/08 - 2019/10/13',
        subtextStyle:{
          color:'#9DB1BC'
        }
    },
    xAxis: {
        type: 'value',
        data: ['0', '5', '10', '15', '20', '25']
    },
    yAxis: {
        type: 'category',
        data: ['5 心内科', '4 中医科', '3 内科', '2 儿科', '1 急诊科']
    },
    grid: {
      left: 90,
      top: 90
    },
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },{
             type: 'bar',
             itemStyle: {
                normal: {
                    color: '#1ABCB0'
                    // color: new echarts.graphic.LinearGradient(
                    //     0, 0, 1, 0,
                    //     [
                    //         {offset: 0, color: '#1ABCB0'},
                    //         {offset: 1, color: '#78E680'}
                    //     ]
                    // )
                }
            },
        data: data
    }]
}
