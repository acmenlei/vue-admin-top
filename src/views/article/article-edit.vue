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
          <el-option label="note" value="note"></el-option>
          <el-option label="technical" value="technical"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="ll_tags">
        <!-- 后台拉取 -->
        <el-checkbox-group v-model="articleData.ll_tags">
          <el-checkbox label="node"></el-checkbox>
          <el-checkbox label="vue"></el-checkbox>
          <el-checkbox label="react"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="简介" prop="ll_introduce">
        <el-input
          placeholder="请输入简介..."
          type="textarea"
          v-model="articleData.ll_introduce"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="ll_cover">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          action="#"
          :before-upload="beforeUpload"
          :http-request="requestCustom"
        >
          <img
            v-if="articleData.ll_cover"
            :src="articleData.ll_cover"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <mavon-editor
      @change="mavonEditor"
      class="mavon-editor-container"
      v-model="value"
    />
    <el-button
      class="publish-article"
      type="primary"
      @click="publishArticle('form-article')"
    >
      发布文章
    </el-button>
  </el-card>
</template>

<script>
import "mavon-editor/dist/css/index.css"; // 富文本编辑器css
import {
  VALIDATE_ERROR,
  FORMAT_ERROR,
  FILE_SIZE_ERROR,
  CONTENT_IS_EMPTY,
} from "@/common/tips";
import { errorMessage } from "@/common/message";

export default {
  name: "edit",
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
      },
    };
  },
  computed: {
    articleId: () => this.$route.query.id,
  },
  activated() {
    if (this.articleId != undefined) {
      // 1. 根据id获取对应的文章
    } else {
      this.articleData = {
        ll_title: null,
        ll_category: null,
        ll_cover: null,
        ll_tags: [],
        ll_introduce: null,
        ll_content: null,
        ll_content_html: null,
      };
    }
  },
  methods: {
    /* 自定义上传配置 */
    requestCustom(config) {
      console.log("文件上传的请求配置", config);
      // 拿到封面绝对路径 暂时没写
      this.articleData.ll_cover = "xxx";
    },
    /* 上传前的文件类型以及文件大小校验 */
    beforeUpload({ type, size }) {
      type = type.split("/")[1];
      if (!["png", "jpg", "jpeg"].includes(type)) {
        return errorMessage(FORMAT_ERROR);
      }
      if (size / 1024 / 1024 > 2) {
        return errorMessage(FILE_SIZE_ERROR);
      }
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
        if (this.articleData.ll_content == null) {
          return errorMessage(CONTENT_IS_EMPTY);
        }
        // 给出后端需要的格式
        this.articleData.ll_tags = this.articleData.ll_tags.join(",");
        console.log(this.articleData);
      } catch {
        errorMessage(VALIDATE_ERROR);
      }
    },
  },
};
</script>

<style>
.mavon-editor-container {
  height: 60vh;
}
.publish-article {
  width: 100%;
  margin-top: 1rem;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>