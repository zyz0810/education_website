<template>
  <div :id="name"
       class="brokenline"></div>
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
    xAxisData () {
      return this.echartData.map(item => item.dayTimeStr);
    },
    yAxisData () {
      return [];
    },
    seriesData () {
      return this.echartData.map(item => item.payPrice).map(String);
    }
  },
  data () {
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
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.xAxisData
      },
      yAxis: {
        type: "value",
        data: this.yAxisData
      },
      series: [
        {
          name: "支付金额",
          type: "line",
          stack: "总量",
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
    setData () {
      this.charts.setOption({
        series: {
          data: this.seriesData
        },
        yAxis: {
          data: []
        },
        xAxis: {
          data: this.xAxisData
        }
      });
    },
    drawLine (id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        series: this.series,
        yAxis: this.yAxis,
        xAxis: this.xAxis,
        toolbox: this.toolbox,
        grid: this.grid,
        legend: this.legend,
        tooltip: this.tooltip
      });
    }
  },
  //调用
  mounted () {
    this.$nextTick(function () {
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
.brokenline {
  height: 100%;
}
</style>