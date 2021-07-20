<template>
  <el-card>
    <!-- 模糊查询 -->
    <el-form inline :model="filterConditions" label-width="40px">
      <el-form-item label="标题"><el-input placeholder="输入标题查询" v-model="filterConditions.title"></el-input></el-form-item>
       <el-form-item label="分类">
        <el-select v-model="filterConditions.categroy" placeholder="选择分类查询">
          <el-option label="note" value="note"></el-option>
          <el-option label="technical" value="technical"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item><el-button type="primary" @click="filterSearch">查询</el-button></el-form-item>
      <el-form-item><el-button type="default" @click="resetSearch">重置</el-button></el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "article-list",
  data() {
    return {
      filterConditions: {
        title: null,
        categroy: null
      },
      
    }
  },
  methods: {
    async fetchArticleList() {},
    filterSearch() {},
    resetSearch() {}
  }
};
</script>