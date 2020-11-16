<template>
  <div class="home">
    <!-- 柱状图 -->
    <div>
      <el-card>
        <v-chart :options="barOptions"></v-chart>
      </el-card>
    </div>
    <!-- 折线图 -->
    <div>
      <el-card>
        <v-chart :options="lineOptions"></v-chart>
      </el-card>
    </div>
    <!-- 饼状图 -->
    <div>
      <el-card>
        <v-chart :options="pieOptions"></v-chart>
      </el-card>
    </div>
  </div>
</template>

<script>
// 导入vue-echarts
import vEcharts from "vue-echarts";

// 按需导入绘制对应图表的工具包
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";

// 导入提示工具包
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";

export default {
  name: "home",

  data() {
    return {
      // 销售业绩
      dataList: [],
      xData: [],
      yData: [],
      yPieData:[],
      // 柱状图的配置对象
      barOptions: {
        title: {
          text: "月度销售业绩柱状图"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          type: "category"
        },
        yAxis: { type: "value" },
        series: [
          {
            name: "销量",
            type: "bar" // 指定图表的形状
          }
        ]
      },
      lineOptions: {
        title: {
          text: "月度销售业绩折线图"
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            areaStyle: {}
          }
        ]
      },
      // 饼状图
      pieOptions: {
          title: {
          text: "月度销售业绩饼状图"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          top:40,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "月销量",
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
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    async getData() {
      const res = await this.$axios.get("/api/charts");
      if (res.code == 200) {
        this.dataList = res.list;
        // console.log(this.dataList);
        this.dataList.forEach(item => {
          this.xData.push(item.month + "月");
          this.yData.push(item.total);
          this.yPieData.push({
            value:item.total,
            name:item.month+'月'
          });
        });
        // 更新this.barOptions  柱状图
        this.barOptions = Object.assign(this.barOptions, {
          xAxis: { data: this.xData },
          series: { data: this.yData }
        });

        // 更新this.lineOptions  折线图
        this.lineOptions = Object.assign(this.lineOptions, {
          xAxis: { data: this.xData },
          series: { data: this.yData }
        });

        // 更新this.pieOptions  饼状图
        this.pieOptions = Object.assign(this.pieOptions, {
          legend: { data: this.xData },
          series: { data: this.yPieData }
        });
      }
    }
  }
};
</script>
<style scoped>
.echarts {
  width: 100% !important;
  height: 400px !important;
}
</style>
