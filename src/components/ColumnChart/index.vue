<template>
  <div :id="name"
       class="myChart"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "",
  props: {
    name: {
      required: true,
      default: "",
      type: [String, Number],
    },
    echartData: {
      required: false,
      default: () => {
        return [];
      },
      type: [Array, Object],
    },
  },
  data () {
    return {
      // echarts 初始值
      charts: "",
      title: {
        text: '',
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#999',
          fontWeight: 'normal',
          fontSize: 16
        }
      },
      grid: {
        left: '2%',
        right: '10',
        bottom: '1%',
        containLabel: true
      },
      legend: {
        top: "2%", //图例的位置
        icon: "circle", //图例的形状
        right: '2%',
        // x: 'right',     //图例在右侧
        orient: "horizontal", //图例 vertical纵向排布  horizontal为横向排布
        textStyle: {//图例字体的颜色
          color: "#666",
        },
        data: ["目标金额", "成交金额"],
      },
      color: ["#1890ff", "#32CD32"],
      xAxis: {
        boundaryGap: true,
        type: "category",
        axisLabel: {//底部文字倾斜
          interval: 0,
          rotate: 25
        },
        data: [],
      },
      yAxis: [{ type: "value" }],
      series: [
        {
          name: "目标金额",
          type: "bar",
          barWidth: 20,
          barGap: 0,
          data: [],
        },
        {
          name: "成交金额",
          barWidth: 20,
          type: "bar",
          barGap: 0,
          data: [],
        },
      ],
    };
  },
  watch: {
    echartData () {
      this.drawLine(this.name);
      this.setData();
    },
  },
  methods: {
    setData () {
      this.charts.setOption({
        title: {
          text: this.echartData.name.length == 0 ? '暂无数据' : '',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#999',
            fontWeight: 'normal',
            fontSize: 16
          }
        },
        grid: {
          left: '2%',
          right: '10',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            var res = "<div><p><span>" + "</span></p></div>";
            res += "<p>" + "</p>";
            res += "<p>" + this.echartData.name[params[0].dataIndex] + "</p>";
            res +=
              "<p>" +
              '<span style="display: inline-block;width: 10px;height: 10px;background: #1890ff;border-radius: 50%; margin:0px 6px 0px 0px;">' +
              "</span > " +
              "目标金额：" +
              this.echartData.target[params[0].dataIndex] +
              "</p>";
            res +=
              "<p>" +
              '<span style="display: inline-block;width: 10px;height: 10px;background: #32CD32;border-radius: 50%; margin:0px 6px 0px 0px;">' +
              "</span > " +
              "成交金额：" +
              this.echartData.conut[params[0].dataIndex] +
              "</p>";
            return res;
          },
        },
        legend: this.legend,
        color: this.color,
        xAxis: {
          boundaryGap: true,
          type: "category",
          data: this.echartData.name,
          axisLabel: {//底部文字倾斜
            interval: 0,
            rotate: 25
          },
        },
        yAxis: this.yAxis,
        series: [
          {
            name: "目标金额",
            type: "bar",
            barWidth: 20,
            barGap: 0,
            data: this.echartData.target,
          },
          {
            name: "成交金额",
            barWidth: 20,
            type: "bar",
            barGap: 0,
            data: this.echartData.conut,
          },
        ],
      });
    },
    drawLine (id) {
      // 基于准备好的dom，初始化echarts实例
      this.charts = echarts.init(document.getElementById(id));
      // 绘制图表
      this.charts.setOption({
        grid: {
          left: '2%',
          right: '10',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            var res = "<div><p><span>" + "</span></p></div>";
            res += "<p>" + "</p>";
            res += "<p>" + this.xAxis.data[params[0].dataIndex] + "</p>";
            res +=
              "<p>" +
              '<span style="display: inline-block;width: 10px;height: 10px;background: #1890ff;border-radius: 50%; margin:0px 6px 0px 0px;">' +
              "</span > " +
              "目标金额：" +
              this.series[0].data[params[0].dataIndex] +
              "</p>";
            res +=
              "<p>" +
              '<span style="display: inline-block;width: 10px;height: 10px;background: #32CD32;border-radius: 50%; margin:0px 6px 0px 0px;">' +
              "</span > " +
              "成交金额：" +
              this.series[1].data[params[0].dataIndex] +
              "</p>";
            return res;
          },
        },
        legend: this.legend,
        color: this.color,
        xAxis: {
          boundaryGap: true,
          type: "category",
          data: this.echartData.name,
          axisLabel: {    //底部文字倾斜
            interval: 0,
            rotate: 25
          },
        },
        yAxis: this.yAxis,
        series: [
          {
            name: "目标金额",
            type: "bar",
            barWidth: 20,
            barGap: 0,
            data: this.echartData.target,
          },
          {
            name: "成交金额",
            barWidth: 20,
            type: "bar",
            barGap: 0,
            data: this.echartData.conut,
          },
        ],
      });
    },
  },
  //调用
  mounted () {
    this.$nextTick(function () {
      this.drawLine(this.name);
      // 图表自适应
      let _this = this
      window.onresize = function () {
        _this.charts.resize();
      };
    });
  },
};
</script>
<style scoped lang='scss'>
/deep/.myChart {
  div {
    &:first-child {
      width: 100% !important;
      canvas {
        width: 100% !important;
      }
    }
    &:nth-child(2) {
      line-height: 0.8em !important;
      padding: 0px 8px !important;
    }
  }
}
</style>
