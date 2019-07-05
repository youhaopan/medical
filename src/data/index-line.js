export default {
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
           data : ['8:00','9:00','10:00','11:00','12:00','13:00','14:00']
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
           data:[10, 20, 20, 25, 20, 23, 21]
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
           data:[5, 10, 11, 6, 3, 12, 20]
       }
   ]
}
