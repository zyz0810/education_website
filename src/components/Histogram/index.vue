<template>
  <div :id="name" class="histogram"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "",
  props: {
    name: {
      required: true,
      default: "",
      type: [String, Number]
    },
    echartData: {
      required: true,
      default: () => {
        return [];
      },
      type: [Array, Object]
    }
  },
  computed: {
    xAxisData() {
      return [];
    },
    yAxisData() {
      return this.echartData.map(item => item.deptName);
    },
    seriesData() {
      return this.echartData.map(item => item.payPrice).map(String);
    }
  },
  data() {
    return {
      charts: "",
      tooltip: {
        trigger: "axis"
      },
      grid: {
        left: "1%",
        right: "6%",
        bottom: "2%",
        containLabel: true
      },
      dataset: {
        source: [
          ["score", "amount", "product"],
          [0, 420000, "部门J"],
          [0, 390000, "部门I"],
          [0, 570000, "部门H"],
          [0, 850000, "部门G"],
          [0, 1030000, "部门F"],
          [0, 1190000, "部门E"],
          [0, 1420000, "部门D"],
          [0, 1520000, "部门C"],
          [0, 1660000, "部门B"],
          [0, 1700000, "部门A"]
        ]
      },
      xAxis: {
        type: "value",
        data: this.xAxisData
      },
      yAxis: {
        type: "category",
        data: this.yAxisData
      },
      series: [
        {
          type: "bar",
          encode: {
            // Map the "amount" column to X axis.
            x: "amount",
            // Map the "product" column to Y axis
            y: "product"
          },
          barWidth: 20,
          data: this.seriesData,
          itemStyle: {
            normal: {
              color: "#1890ff",
              borderColor: "#1890ff"
            }
          }
        }
      ]
    };
  },
  methods: {
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        yAxis: this.yAxis,
        xAxis: this.xAxis,
        visualMap: this.visualMap,
        grid: this.grid,
        series: this.series,
        tooltip: this.tooltip
      });
    },
    setData() {
      this.charts.setOption({
        series: {
          data: this.seriesData
        },
        yAxis: {
          data: this.yAxisData
        },
        xAxis: {
          data: this.xAxisData
        }
      });
    }
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawLine(this.name);
    });
  }
};
</script>
<style scoped lang='scss'>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.histogram {
  height: 100%;
}
</style>