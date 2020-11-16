<template>
  <el-card>
      <div class="bar">
      <div id="bar"></div>
  </div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {

  data(){
    return {
        option : {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }

    }
  },
  components: {},
  created(){},
  mounted(){
    var myChart = echarts.init(document.getElementById('bar'));
    myChart.setOption(this.option);

  },
  methods: {}
}
</script>
<style scoped>
#bar{
width: 500px;
/* 高度必须设置，否则图标不显示 */
height: 400px;
/* border: 1px solid red; */
}
</style>
