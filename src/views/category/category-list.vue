<template>
  <el-card>
    <!-- 过滤查询 -->
    <el-form inline :model="filterConditions">
      <el-form-item label="类别 ID">
        <el-input v-model="filterConditions.ll_id" placeholder="使用ID查询分类"></el-input>
      </el-form-item>
      <el-form-item label="类别名称">
        <el-input v-model="filterConditions.ll_category_name" placeholder="使用类别名查询分类"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button icon="el-icon-search" type="primary" @click="queryCategoryList">查询</el-button>
          <el-button icon="el-icon-refresh-left" type="success" @click="resetCategoryList">重置</el-button>
          <el-button v-permission="'categoryEdit'" icon="el-icon-circle-plus-outline" type="danger" @click="$router.push('/category/edit')">新增分类</el-button>
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
      <el-table-column align="center" prop="ll_id" label="编号" width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_category_name"
        label="类别名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_category_val"
        label="类别Code"
      >
        <template slot-scope="{ row }">
          <el-tag :type="TAG_COLORS[Math.floor(Math.random() * 6)]">{{
            row.ll_category_val
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_createdTime"
        label="发表时间"
        width="150"
      >
        <template slot-scope="{ row }">
          {{ row.ll_createdTime | filterDateFormat }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_updatedTime"
        label="最后编辑时间"
         width="150"
      >
        <template slot-scope="{ row }">
          {{ row.ll_updatedTime | filterDateFormat }}
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template slot-scope="{ row }">
          <el-button-group>
            <el-button v-permission="'categoryEdit'" icon="el-icon-edit" @click="editCategory(row.ll_id)" type="success"
              >编辑</el-button
            >
            <el-button v-permission="'categoryDelete'" icon="el-icon-delete" type="danger" @click="deleteCategoryById(row.ll_id)"
              >删除</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 没有文章的时候显示该条空提示 -->
    <el-empty v-else :description="CATEGORY_EMPTY"></el-empty>

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
import { CATEGORY_EMPTY, OPERATOR_OK, OPERATOR_ERROR } from "@/common/tips";
import { queryCategoryList, deleteCategoryById } from "@/api/category";
import { successMessage, errorMessage } from "@/common/message";

export default {
  name: "category-list",
  data() {
    return {
      filterConditions: {
        // 模糊查询条件
        pageNum: 1,
        pageSize: 10,
        ll_id: null,
        ll_category_name: null
      },
      total: 100, // 文章总数
      tableData: [],
      CATEGORY_EMPTY,
    };
  },
  inject: ["TAG_COLORS"], // 接收标签颜色
  activated() {
    this.queryCategoryList();
  },
  methods: {
    /* 获取分类List */
    async queryCategoryList() {
      const { data, total } = await queryCategoryList(this.filterConditions);
      this.tableData = data;
      this.total = total;
    },
    /* 重置查询条件 */
    resetCategoryList() {
      this.filterConditions = {
        pageNum: 1,
        pageSize: 10,
        ll_id: null,
        ll_category_name: null
      };
      this.queryCategoryList();
    },
    /* 分页处理 */
    handleCurrentChange(pageNum) {
      this.filterConditions.pageNum = pageNum;
      this.queryCategoryList();
    },
    /* 编辑 */
    editCategory(id) {
      this.$router.push({ path: "/category/edit", query: { id } });
    },
    /* 根据ID删除对应文章 */
    async deleteCategoryById(id) {
      try {
        await this.$confirm("确定要删除吗？", "提示");
        await deleteCategoryById({ ll_id: id });
        this.queryCategoryList(); // 重新拉取数据
        successMessage(OPERATOR_OK); // 操作成功
      } catch {
        return errorMessage(OPERATOR_ERROR);
      }
    },
  },
};
</script>