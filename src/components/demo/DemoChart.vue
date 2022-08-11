<template>
  <v-chart class="chart" :option="option" autoresize />
  <!-- <v-chart class="chart" :option="option" autoResize :loading="true" /> -->
</template>
<script>
export default {
  name: "DemoChart",
  //数据配置
  data() {
    return {
      option: {
        //标题配置
        title: {
          text: "Stacked Line",
        },
        // 提示框配置
        tooltip: {
          trigger: "axis",
        },
        // 图例配置
        legend: {
          data: ["安检点1", "安检点2", "安检点3", "安检点4", "安检点5"],
          textStyle: {
            fontSize: 10,
          },
        },
        // 网格配置
        grid: {
          left: "3%",
          right: "4%",
          bottom: "30px",
          containLabel: true,
        },
        // x轴配置
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2021.1", "2021.3", "2021.5", "2021.7", "2021.9"],
        },
        // y轴配置
        yAxis: {
          type: "value",
        },
        //图表数据
        series: [
          {
            name: "安检点1",
            type: "line",
            stack: "Total",
            data: [120, 342, 101, 134, 340],
          },
          {
            name: "安检点2",
            type: "line",
            stack: "Total",
            data: [220, 182, 451, 904, 290],
          },
          {
            name: "安检点3",
            type: "line",
            stack: "Total",
            data: [150, 362, 501, 454, 190],
          },
          {
            name: "安检点4",
            type: "line",
            stack: "Total",
            data: [320, 532, 601, 334, 790],
          },
          {
            name: "安检点5",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 290],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
