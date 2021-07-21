<template>
  <el-card>
    <!-- 模糊查询 -->
    <el-form inline :model="filterConditions" label-width="40px">
      <el-form-item label="标题"
        ><el-input
          placeholder="输入标题查询"
          v-model="filterConditions.title"
        ></el-input
      ></el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="filterConditions.categroy"
          placeholder="选择分类查询"
        >
          <el-option label="note" value="note"></el-option>
          <el-option label="technical" value="technical"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        ><el-button type="primary" @click="filterSearch"
          >查询</el-button
        ></el-form-item
      >
      <el-form-item
        ><el-button type="default" @click="resetSearch"
          >重置</el-button
        ></el-form-item
      >
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="tableData" border fit lazy laod style="width: 100%">
      <el-table-column align="center" prop="title" label="标题" width="150">
      </el-table-column>
      <el-table-column align="center" prop="introduce" label="简介" width="300">
      </el-table-column>
      <el-table-column align="center" prop="category" label="类型" width="120">
      </el-table-column>
      <el-table-column align="center" prop="tags" label="标签" width="200">
        <template slot-scope="{ row }">
          <el-tag class="my-tag" v-for="(tag, index) in row.tags" :type="TAG_COLORS[index]" :key="index">{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="likedCounts"
        label="获赞"
        width="100"
      >
      </el-table-column>
      <el-table-column align="center" prop="visitedCounts" label="访问量" width="100">
      </el-table-column>
      <el-table-column align="center" prop="cover" label="封面" width="200">
        <template slot-scope="{ row }">
          <img height="100" :src="row.cover" alt="">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="publishTime"
        label="发表时间"
        width="120"
      >
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="{ row }">
          <el-button @click="editArticle(row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteArticle(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="my-page"
      @current-change="handleCurrentChange"
      :current-page="filterConditions.pageNum"
      :page-size="filterConditions.pageSize"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import ArticleListMock from "@/mock/article-list-mock";
// import { getArticleList } from "@/api/article"

export default {
  name: "article-list",
  data() {
    return {
      filterConditions: { // 模糊查询条件
        pageNum: 1,
        pageSize: 10,
        title: null,
        categroy: null,
      },
      total: 100, // 文章总数
      tableData: ArticleListMock,
    };
  },
  inject: ['TAG_COLORS'], // 接收标签颜色
  methods: {
    async getArticleList() {
      // const { list, total } = await getArticleList(this.filterConditions);
      // this.tableData = list;
      // this.total = total;
    },
    filterSearch() {
      this.getArticleList()
    },
    resetSearch() {
      this.filterConditions = {
        pageNum: 1,
        pageSize: 10,
        title: null,
        categroy: null,
      }
    },
    handleCurrentChange() {},
    editArticle(id) {
      this.$router.push({ path: "/article/edit", query: { id } })
    },
    deleteArticle() {}
  },
};
</script>