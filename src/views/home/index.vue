<template>
  <el-card>
    <div id="home">
    <!-- 近30日浏览量和获赞量 --（柱状图）-->
    <ve-line :extend="lineChartExtend" :data="lineChartData" :settings="lineChartSettings"></ve-line>
    <!-- 文章分类 --（饼图） -->
    <ve-pie :data="pieChartData" :settings="pieChartSettings"></ve-pie>
    <!-- 近30日注册人数 --（人数统计） -->
    <ve-line :extend="lineChartExtend" :data="lineChartData2" :settings="lineChartSettings2"></ve-line>
    <!-- 近30日发布文章数量 --（折线图） -->
    <ve-histogram :extend="histogramChartExtend" :data="histogramChartData"></ve-histogram>
  </div>
  </el-card>
</template>

<script>
import vChartsData from "@/mock/v-charts-mock";
import { getCategoryGroup } from "@/api/home"

export default {
  name: "home",
  activated() {
    this.getCategoryGroup(); // 对文章分类进行分组
  },
  data() {
    return { // mock vcharts data
      lineChartExtend: vChartsData.lineChartExtend,
      pieChartSettings: vChartsData.pieChartSettings, 
      pieChartData: vChartsData.pieChartData,
      lineChartData: vChartsData.lineChartData,
      lineChartSettings: vChartsData.lineChartSettings,
      lineChartData2: vChartsData.lineChartData2,
      lineChartSettings2: vChartsData.lineChartSettings2,
      histogramChartData: vChartsData.histogramChartData,
      histogramChartExtend: vChartsData.histogramChartExtend
    };
  },
  methods: {
    async getCategoryGroup() {
      const { data } = await getCategoryGroup();
      this.pieChartData.rows = data;
    }
  }
};
</script>
<style scoped>
#home {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
