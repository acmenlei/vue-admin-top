<template>
  <el-card>
    <!-- 模糊查询 -->
    <!-- 过滤查询 -->
    <el-form inline :model="filterConditions">
      <el-form-item label="标题">
        <el-input v-model="filterConditions.ll_title" placeholder="使用文章标题查询文章"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="filterConditions.ll_category"
          placeholder="文章分类"
        >
          <el-option
            v-for="category in categoryList"
            :key="category.ll_id"
            :label="category.ll_category_name"
            :value="category.ll_category_val"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button icon="el-icon-search" type="primary" @click="queryArticleList">查询</el-button>
          <el-button icon="el-icon-refresh-left" type="success" @click="resetSearch">重置</el-button>
          <el-button icon="el-icon-circle-plus-outline" type="danger" @click="$router.push('/article/edit')">发表文章</el-button>
        </el-button-group>
      </el-form-item>
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
      <template slot-scope="{ row }">
          <el-link :type="TAG_COLORS[Math.floor(Math.random()*6)]">{{ row.ll_category | filterCategory(categoryList) }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ll_tags" label="标签" width="200">
        <template slot-scope="{ row }">
          <el-tag
            class="my-tag"
            v-for="(tag, index) in row.ll_tags"
            :type="TAG_COLORS[index]"
            :key="index"
            >{{ tag | filterTag(tagList) }}</el-tag
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

      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template slot-scope="{ row }">
          <el-button-group>
            <el-button icon="el-icon-edit" @click="editArticle(row.ll_id)" type="success"
              >编辑</el-button
            >
            <el-button icon="el-icon-delete" type="danger" @click="deleteArticle(row.ll_id)"
              >删除</el-button
            >
          </el-button-group>
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
import { ARTICLE_EMPTY, OPERATOR_OK } from "@/common/tips";
import { queryArticleList, deleteArticleById } from "@/api/article";
import { formatTags } from "@/filters/format";
import ArticleConfig from "@/mixins/article";
import { successMessage } from "@/common/message";

export default {
  name: "article-list",
  mixins: [ArticleConfig],
  data() {
    return {
      filterConditions: {
        // 模糊查询条件
        pageNum: 1,
        pageSize: 10,
        ll_title: null,
        ll_category: null,
      },
      total: 100, // 文章总数
      tableData: ArticleListMock,
      ARTICLE_EMPTY,
    };
  },
  inject: ["TAG_COLORS"], // 接收标签颜色
  activated() {
    this.queryArticleList();
  },
  methods: {
    /* 获取文章信息 */
    async queryArticleList() {
      const { data, total } = await queryArticleList(this.filterConditions);
      this.tableData = formatTags(data); // 格式化tags
      this.total = total;
    },
    /* 重置查询条件 */
    resetSearch() {
      this.filterConditions = {
        pageNum: 1,
        pageSize: 10,
        ll_title: null,
        ll_category: null,
      };
      this.queryArticleList();
    },
    /* 分页处理 */
    handleCurrentChange(pageNum) {
      this.filterConditions.pageNum = pageNum;
      this.queryArticleList();
    },
    /* 编辑 */
    editArticle(id) {
      this.$router.push({ path: "/article/edit", query: { id } });
    },
    /* 根据ID删除对应文章 */
    async deleteArticle(id) {
      try {
        await this.$confirm("确定要删除吗？", "提示");
        await deleteArticleById({ ll_id: id });
        this.queryArticleList(); // 重新拉取数据
        successMessage(OPERATOR_OK); // 操作成功
      } catch {
        null;
      }
    },
  },
};
</script>