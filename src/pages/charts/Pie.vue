<template>
  <div class="pie">
    <el-card>
      <!-- <h1>饼状图</h1> -->
      <v-chart :options="options"></v-chart>
    </el-card>
  </div>
</template>

<script>
import vEcharts from "vue-echarts";
// 导入饼状图的工具包
import "echarts/lib/chart/pie";
// 鼠标悬浮提示工具
import "echarts/lib/component/tooltip";

export default {
  name: "pie",

  data() {
    return {
      options: {
        title: {
          text: "这是饼状图"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          top: 50,
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      }
    };
  },
  components: {
    "v-chart": vEcharts
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.echarts{
  width: 100%!important;
  height:400px!important;
  /* border: 1px solid red; */
}
</style>
