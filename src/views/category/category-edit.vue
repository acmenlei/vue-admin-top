<template>
  <el-card class="publish">
    <el-form
      ref="form-category"
      :rules="rules"
      :model="categoryData"
      label-width="90px"
    >
      <el-form-item label="类别名称" prop="ll_category_name">
        <el-input
          placeholder="输入名称..."
          v-model="categoryData.ll_category_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="类别Code" prop="ll_category_val">
        <el-input
          placeholder="输入Code..."
          :disabled="categoryId != null"
          v-model="categoryData.ll_category_val"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="publish-category"
          type="primary"
          @click="publishCategory('form-category')"
        >
          {{ categoryId ? '更新类别' : '新增类别' }}
        </el-button>
        <el-button class="back" @click="$router.back()"> 返回 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { VALIDATE_ERROR, OPERATOR_OK, OPERATOR_ERROR } from "@/common/tips";
import { errorMessage, successMessage } from "@/common/message";
import { queryCategoryById, categoryOperator } from "@/api/category";

export default {
  name: "category-edit",
  data() {
    return {
      categoryData: {
         ll_category_name: null,
        ll_category_val: null,
      },
      rules: {
        ll_category_name: [
          { required: true, trigger: "blur", message: "请输入类别名称" },
        ],
         ll_category_val: [
          { required: true, trigger: "blur", message: "请输入类别Code" },
        ]
      },
    };
  },
  computed: {
    categoryId() {
      return this.$route.query.id;
    },
  },
  mounted() {
    if (this.categoryId != undefined) {
      // 1. 根据id获取对应的文章
      this.queryCategoryById();
    }
  },
  methods: {
    /* 根据ID获取单篇文章 */
    async queryCategoryById() {
      const { data } = await queryCategoryById({ ll_id: this.categoryId });
      this.categoryData = data;
    },
    /* 发布 */
    async publishCategory(form) {
      try {
        await this.$refs[form].validate();
      } catch {
        return errorMessage(VALIDATE_ERROR);
      }
      try {
        let category = Object.assign({}, this.categoryData);
        // 1. 判断是更新文章信息还是新增一篇文章
        let suffix = this.categoryId != null ? "update" : "publish";
        // 2. 发送请求
        let { code } = await categoryOperator(category, suffix);
        if (code == 200) {
          this.$router.replace({ path: "/category/list" });
          successMessage(OPERATOR_OK);
        }
      } catch {
        errorMessage(OPERATOR_ERROR);
      }
    },
  },
};
</script>