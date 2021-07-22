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
          v-model="filterConditions.category"
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
    <el-table
      v-if="tableData.length"
      :data="tableData"
      border
      fit
      lazy
      laod
      style="width: 100%"
    >
      <el-table-column align="center" prop="ll_title" label="标题" width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_introduce"
        label="简介"
        width="300"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_category"
        label="类型"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" prop="ll_tags" label="标签" width="200">
        <template slot-scope="{ row }">
          <el-tag
            class="my-tag"
            v-for="(tag, index) in row.ll_tags"
            :type="TAG_COLORS[index]"
            :key="index"
            >{{ tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_likedCounts"
        label="获赞"
        width="100"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_visitedCounts"
        label="访问量"
        width="100"
      >
      </el-table-column>
      <el-table-column align="center" prop="ll_cover" label="封面" width="200">
        <template slot-scope="{ row }">
          <img height="100" :src="row.ll_cover" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_createdTime"
        label="发表时间"
        width="120"
      >
        <template slot-scope="{ row }">
          {{ row.ll_createdTime | filterDateFormat }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_updatedTime"
        label="最后编辑时间"
        width="120"
      >
        <template slot-scope="{ row }">
          {{ row.ll_updatedTime | filterDateFormat }}
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="{ row }">
          <el-button @click="editArticle(row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteArticle(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 没有文章的时候显示该条空提示 -->
    <el-empty v-else :description="ARTICLE_EMPTY"></el-empty>

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
import { ARTICLE_EMPTY } from "@/common/tips";
import { getArticleList } from "@/api/article";
import { formatTags } from "@/filters/format"

export default {
  name: "article-list",
  data() {
    return {
      filterConditions: {
        // 模糊查询条件
        pageNum: 1,
        pageSize: 10,
        title: null,
        category: null,
      },
      total: 100, // 文章总数
      tableData: ArticleListMock,
      ARTICLE_EMPTY,
    };
  },
  inject: ["TAG_COLORS"], // 接收标签颜色
  mounted() {
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
      const { data, total } = await getArticleList(this.filterConditions);
      this.tableData = formatTags(data); // 格式化tags
      this.total = total;
    },
    filterSearch() {
      this.getArticleList();
    },
    resetSearch() {
      this.filterConditions = {
        pageNum: 1,
        pageSize: 10,
        title: null,
        category: null,
      };
    },
    handleCurrentChange() {},
    editArticle(id) {
      this.$router.push({ path: "/article/edit", query: { id } });
    },
    deleteArticle() {},
  },
};
</script>