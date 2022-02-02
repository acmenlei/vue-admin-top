
<template>
  <el-card id="board">
    <el-form inline :model="filterConditions">
      <el-form-item label="留言内容">
        <el-input v-model="filterConditions.ll_content" placeholder="使用留言内容查询文章"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button icon="el-icon-search" type="primary" @click="queryCommentReplyList">查询</el-button>
          <el-button icon="el-icon-refresh-left" type="success" @click="resetSearch">重置</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table v-if="tableData.length" :data="tableData" border fit lazy laod style="width: 100%">
      <el-table-column align="center" prop="ll_id" label="编号" width="120"></el-table-column>
      <el-table-column align="center" prop="ll_username" label="用户名" width="150"></el-table-column>
      <el-table-column align="center" prop="ll_nick_name" label="昵称" width="150"></el-table-column>
      <el-table-column align="center" prop="ll_avatar" label="封面" width="120">
        <template slot-scope="{ row }">
          <view-image :src="row.ll_avatar" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ll_content" label="留言内容" width="350"></el-table-column>
      <el-table-column align="center" prop="ll_createdTime" label="发表时间" width="150">
        <template slot-scope="{ row }">{{ row.ll_createdTime | filterDateFormat }}</template>
      </el-table-column>
      <el-table-column align="center" prop="ll_updatedTime" label="最后编辑时间" width="150">
        <template slot-scope="{ row }">{{ row.ll_updatedTime | filterDateFormat }}</template>
      </el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="190">
        <template slot-scope="{ row }">
          <el-button-group>
            <el-button
              v-permission="'deleteCommentBoardReplyItem'"
              icon="el-icon-delete"
              type="danger"
              @click="deleteComment(row.ll_id, row.ll_level, row.ll_username)"
            >删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 没有文章的时候显示该条空提示 -->
    <el-empty v-else :description="COMMENT_EMPTY"></el-empty>

    <el-pagination
      class="my-page"
      @current-change="handleCurrentChange"
      :current-page="filterConditions.pageNum"
      :page-size="filterConditions.pageSize"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import { deleteCommentById } from "@/api/comment";
import { COMMENT_EMPTY } from "@/common/tips";
import { errorMessage, successMessage } from "@/common/message";
import { OPERATOR_OK } from "@/common/tips";
import viewImage from "@/components/viewImage";
import { queryCommentReplyById } from "../../api/comment";

export default {
  name: 'board',
  components: { viewImage },
  data() {
    return {
      filterConditions: {
        // 模糊查询条件
        pageNum: 1,
        pageSize: 10,
        ll_content: null,
      },
      total: 100, // 留言总数
      tableData: [],
      COMMENT_EMPTY,
    };
  },
  computed: {
    pId() {
      return this.$route.query.id
    },
    pUsername() {
      return this.$route.query.username
    },
  },
  activated() {
    this.queryCommentReplyList();
  },
  methods: {
    async queryCommentReplyList() {
      const params = Object.assign(this.filterConditions, { ll_pid: this.pId, ll_p_username: this.pUsername })
      const { data, total } = await queryCommentReplyById(params)
      this.tableData = data
      this.total = total
    },
    handleCurrentChange(pageNum) {
      this.filterConditions.pageNum = pageNum
      this.queryCommentReplyList()
    },
    resetSearch() {
      this.filterConditions = {
        // 模糊查询条件
        pageNum: 1,
        pageSize: 10,
        ll_content: null,
      }
      this.queryCommentReplyList()
    },
    async deleteComment(ll_id, ll_level, ll_username) {
      const { count, msg } = await deleteCommentById({ ll_id, ll_level, ll_username })
      if (count) {
        successMessage(OPERATOR_OK)
      } else {
        errorMessage(msg)
      }
      this.queryCommentReplyList(this.filterConditions)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>