<template>
  <el-card class="publish">
    <el-form
      ref="form-tag"
      :rules="rules"
      :model="tagData"
      label-width="90px"
    >
      <el-form-item label="标签名称" prop="ll_tag_name">
        <el-input
          placeholder="输入名称..."
          v-model="tagData.ll_tag_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="标签Code" prop="ll_tag_val">
        <el-input
          placeholder="输入Code..."
          :disabled="tagId != null"
          v-model="tagData.ll_tag_val"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="publish-tag"
          type="primary"
          @click="publishTag('form-tag')"
        >
          {{ tagId ? '更新标签' : '新增标签' }}
        </el-button>
        <el-button class="back" @click="$router.back()"> 返回 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { VALIDATE_ERROR, OPERATOR_OK, OPERATOR_ERROR } from "@/common/tips";
import { errorMessage, successMessage } from "@/common/message";
import { queryTagById, tagOperator } from "@/api/tag";

export default {
  name: "tag-edit",
  data() {
    return {
      tagData: {
         ll_tag_name: null,
         ll_tag_val: null,
      },
      rules: {
         ll_tag_name: [
          { required: true, trigger: "blur", message: "请输入类别名称" },
        ],
         ll_tag_val: [
          { required: true, trigger: "blur", message: "请输入类别Code" },
        ]
      },
    };
  },
  computed: {
    tagId() {
      return this.$route.query.id;
    },
  },
  mounted() {
    if (this.tagId != undefined) {
      // 1. 根据id获取对应的文章
      this.queryTagById();
    }
  },
  methods: {
    /* 根据ID获取单篇文章 */
    async queryTagById() {
      const { data } = await queryTagById({ ll_id: this.tagId });
      this.tagData = data;
    },
    /* 发布 */
    async publishTag(form) {
      try {
        await this.$refs[form].validate();
      } catch {
        return errorMessage(VALIDATE_ERROR);
      }
      try {
        let tag = Object.assign({}, this.tagData);
        // 1. 判断是更新文章信息还是新增一篇文章
        let suffix = this.tagId != null ? "update" : "publish";
        // 2. 发送请求
        let { code } = await tagOperator(tag, suffix);
        if (code == 200) {
          this.$router.replace({ path: "/tag/list" });
          successMessage(OPERATOR_OK);
        }
      } catch(e) {
        errorMessage(OPERATOR_ERROR);
      }
    },
  },
};
</script>