<template>
  <div class="line">
    <el-card>
      <!-- <h1>折线图</h1>   -->
      <v-chart :options="options"></v-chart>
    </el-card>
  </div>
</template>

<script>
import vEcharts from "vue-echarts";

import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import 'echarts/lib/component/toolbox'

export default {
  name: "line",

  data() {
    return {
      options: {
        title: {
          text: "折线图"
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
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
.echarts {
  width: 100% !important;
  height: 400px !important;
}
</style>
