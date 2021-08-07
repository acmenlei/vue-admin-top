<template>
  <el-card>
    <div id="home">
      <!-- 近30日浏览量和获赞量 --（柱状图）-->
      <ve-line
        :extend="lineChartExtend"
        :data="lineChartData"
        :settings="lineChartSettings"
      ></ve-line>
      <!-- 文章分类 --（饼图） -->
      <ve-pie :data="pieChartData" :settings="pieChartSettings"></ve-pie>
      <!-- 近30日注册人数 --（人数统计） -->
      <ve-line
        :extend="lineChartExtend"
        :data="lineChartData2"
        :settings="lineChartSettings2"
      ></ve-line>
      <!-- 近30日发布文章数量 --（折线图） -->
      <ve-histogram
        :extend="histogramChartExtend"
        :data="histogramChartData"
        :settings="histogramChartSettings"
      ></ve-histogram>
    </div>
  </el-card>
</template>

<script>
import vChartsData from "@/mock/v-charts-mock";
import { queryCategoryGroup, queryVisitedBythirtyDay } from "@/api/home";
import { filterCategory } from "@/filters"

export default {
  name: "home",
  activated() {
    this.queryCategoryGroup(); // 对文章分类进行分组
    this.queryVisitedBythirtyDay(); // 查询近30天的网站数据
  },
  data() {
    return {
      // mock vcharts data
      lineChartExtend: vChartsData.lineChartExtend,
      pieChartSettings: vChartsData.pieChartSettings,
      pieChartData: vChartsData.pieChartData,
      lineChartData: vChartsData.lineChartData,
      lineChartSettings: vChartsData.lineChartSettings,
      lineChartData2: vChartsData.lineChartData2,
      lineChartSettings2: vChartsData.lineChartSettings2,
      histogramChartData: vChartsData.histogramChartData,
      histogramChartExtend: vChartsData.histogramChartExtend,
      histogramChartSettings: vChartsData.histogramChartSettings,
    };
  },
  methods: {
    async queryCategoryGroup() {
      const { data } = await queryCategoryGroup();
      let length = data.length;
      for (let i = 0; i < length; i++) {
        data[i].ll_category = filterCategory(data[i].ll_category);
      }
      this.pieChartData.rows = data;
    },
    async queryVisitedBythirtyDay() {
      const { data } = await queryVisitedBythirtyDay({
        startTime: 0,
        endTime: 30,
      });
      const { DATA } = data;
      this.lineChartData.rows = DATA; // 访问量/登陆数量/点赞量 折线图
      const REGISTER_COUNT = [];
      const ARTICLE_PUBLISH_COUNT = [];
      let length = DATA.length;
      for (let i = 0; i < length; i++) {
        REGISTER_COUNT.push({
          dayTime: DATA[i].dayTime,
          registerCountBysite: DATA[i].registerCountBysite,
        });
        ARTICLE_PUBLISH_COUNT.push({
          dayTime: DATA[i].dayTime,
          articlePublishCountBysite: DATA[i].articlePublishCountBysite,
        });
      }
      this.lineChartData2.rows = REGISTER_COUNT; // 近30天网站的注册人数
      this.histogramChartData.rows = ARTICLE_PUBLISH_COUNT; // 近30天文章发布数量
    },
  },
};
</script>
<style scoped>
#home {
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
</style>
