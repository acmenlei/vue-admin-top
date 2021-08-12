<template>
  <el-card class="publish">
    <el-form
      ref="form-article"
      :rules="rules"
      :model="articleData"
      label-width="50px"
    >
      <el-form-item label="标题" prop="ll_title">
        <el-input
          placeholder="输入标题"
          v-model="articleData.ll_title"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="ll_category">
        <el-select v-model="articleData.ll_category" placeholder="文章分类">
          <el-option
            v-for="category in categoryList"
            :key="category.ll_id"
            :label="category.ll_category_name"
            :value="category.ll_category_val"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="ll_tags">
        <!-- 后台拉取 -->
        <el-checkbox-group v-model="articleData.ll_tags">
          <el-checkbox
            v-for="tag in tagList"
            :key="tag.ll_id"
            :label="tag.ll_tag_val"
          >{{tag.ll_tag_name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="简介" prop="ll_introduce">
        <el-input
          placeholder="请输入简介..."
          type="textarea"
          rows="4"
          v-model="articleData.ll_introduce"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="ll_cover">
        <upload-image
          :cover="articleData.ll_cover"
          @success-upload="successUpload"
        />
      </el-form-item>
      <el-form-item label="内容" prop="ll_content">
        <mavon-editor
          @change="mavonEditor"
          class="mavon-editor-container"
          v-model="value"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="publish-article"
          type="primary"
          @click="publishArticle('form-article')"
        >
          {{ articleId ? '更新文章' : '发布文章' }}
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="back" @click="$router.back()"> 返回 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import "mavon-editor/dist/css/index.css"; // 富文本编辑器css
import { VALIDATE_ERROR, OPERATOR_OK, OPERATOR_ERROR } from "@/common/tips";
import { errorMessage, successMessage } from "@/common/message";
import UploadImage from "@/components/uploadImage";
import ArticleConfig from "@/mixins/article";
import { getArticleById, articleOperator } from "@/api/article";

export default {
  name: "article-edit",
  mixins: [ArticleConfig],
  components: { UploadImage },
  data() {
    return {
      value: "",
      articleData: {
        ll_title: null, // 标题
        ll_category: null, // 分类
        ll_cover: null, // 封面
        ll_tags: [], // 标签
        ll_introduce: null, // 简介
        ll_content: null,
        ll_content_html: null,
      },
      rules: {
        ll_title: [{ required: true, trigger: "blur", message: "请输入标题" }],
        ll_category: [
          { required: true, trigger: "blur", message: "请选择分类" },
        ],
        ll_cover: [{ required: true, trigger: "blur", message: "请选择封面" }],
        ll_tags: [
          {
            required: true,
            type: "array",
            trigger: "blur",
            message: "请选择标签",
          },
        ],
        ll_introduce: [
          { required: true, trigger: "blur", message: "请输入简介" },
        ],
        ll_content: [
          { required: true, trigger: "blur", message: "文章内容不能为空" },
        ],
      },
    };
  },
  computed: {
    articleId() {
      return this.$route.query.id;
    },
  },
  mounted() {
    if (this.articleId != undefined) {
      // 1. 根据id获取对应的文章
      this.getArticleById();
    }
  },
  methods: {
    /* 根据ID获取单篇文章 */
    async getArticleById() {
      const { data } = await getArticleById({ ll_id: this.articleId });
      data.ll_tags = data.ll_tags.split(",");
      this.articleData = data; // 格式化标签
      this.value = data.ll_content || ""; // 初始化markdown编辑的内容
    },
    /* 上传成功 显示本地文件 */
    successUpload(url) {
      this.articleData.ll_cover = url;
    },
    /* 内容编辑 */
    mavonEditor(content, content_html) {
      this.articleData.ll_content = content;
      this.articleData.ll_content_html = content_html;
    },
    /* 发布 */
    async publishArticle(formArticle) {
      try {
        await this.$refs[formArticle].validate();
      } catch {
        return errorMessage(VALIDATE_ERROR);
      }
      try {
        let article = Object.assign({}, this.articleData);
        // 1. 给出后端需要的格式
        article.ll_tags = article.ll_tags.join(",");
        // 2. 判断是更新文章信息还是新增一篇文章
        let suffix = this.articleId != null ? "update" : "publish";
        // 3. 更新需要id用于where语句
        suffix == "update" && (article.ll_id = this.articleId);
        // 4. 发送请求
        let { code } = await articleOperator(article, suffix);
        if (code == 200) {
          this.$router.replace({ path: "/article/list" });
          successMessage(OPERATOR_OK);
        }
      } catch {
        errorMessage(OPERATOR_ERROR);
      }
    },
  },
};
</script>

<style scoped>
.mavon-editor-container {
  height: auto;
}
.publish-article,
.back {
  width: 100%;
}
.publish-article {
  margin-top: 1rem;
}
</style>