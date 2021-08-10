<template>
  <el-card>
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
        prop="ll_tag_name"
        label="标签名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="ll_tag_val"
        label="标签Code"
        width="120"
      >
        <template slot-scope="{ row }">
          <el-tag :type="TAG_COLORS[Math.floor(Math.random() * 6)]">{{
            row.ll_tag_val
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
            <el-button icon="el-icon-edit" @click="editTag(row.ll_id)" type="success"
              >编辑</el-button
            >
            <el-button icon="el-icon-delete" type="danger" @click="deleteTagById(row.ll_id)"
              >删除</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 没有文章的时候显示该条空提示 -->
    <el-empty v-else :description="TAG_EMPTY"></el-empty>

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
import { TAG_EMPTY, OPERATOR_OK, OPERATOR_ERROR } from "@/common/tips";
import { queryTagList, deleteTagById } from "@/api/tag";
import { successMessage, errorMessage } from "@/common/message";

export default {
  name: "tag-list",
  data() {
    return {
      filterConditions: {
        // 模糊查询条件
        pageNum: 1,
        pageSize: 10,
      },
      total: 100, // 文章总数
      tableData: [],
      TAG_EMPTY,
    };
  },
  inject: ["TAG_COLORS"], // 接收标签颜色
  activated() {
    this.queryTagList();
  },
  methods: {
    /* 获取分类List */
    async queryTagList() {
      const { data, total } = await queryTagList(this.filterConditions);
      this.tableData = data;
      this.total = total;
    },
    /* 重置查询条件 */
    resetSearch() {
      this.filterConditions = {
        pageNum: 1,
        pageSize: 10,
      };
      this.queryTagList();
    },
    /* 分页处理 */
    handleCurrentChange(pageNum) {
      this.filterConditions.pageNum = pageNum;
      this.queryTagList();
    },
    /* 编辑 */
    editTag(id) {
      this.$router.push({ path: "/tag/edit", query: { id } });
    },
    /* 根据ID删除对应文章 */
    async deleteTagById(id) {
      try {
        await this.$confirm("确定要删除吗？", "提示");
        await deleteTagById({ ll_id: id });
        this.queryTagList(); // 重新拉取数据
        successMessage(OPERATOR_OK); // 操作成功
      } catch {
        return errorMessage(OPERATOR_ERROR);
      }
    },
  },
};
</script>