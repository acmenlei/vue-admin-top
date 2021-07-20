<template>
  <el-card class="publish">
    <el-form ref="form-article" :model="articleData" label-width="40px">
      <el-form-item label="标题">
        <el-input
          placeholder="输入标题"
          v-model="articleData.articleTitle"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="articleData.articleCategroy" placeholder="文章分类">
          <el-option label="note" value="note"></el-option>
          <el-option label="technical" value="technical"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <!-- 后台拉取 -->
        <el-checkbox-group v-model="articleData.articleTags">
          <el-checkbox label="node"></el-checkbox>
          <el-checkbox label="vue"></el-checkbox>
          <el-checkbox label="react"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          placeholder="请输入简介..."
          type="textarea"
          v-model="articleData.articleIntroduce"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="uploadSuccess"
        >
          <img
            v-if="articleData.articleCover"
            :src="articleData.articleCover"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <mavon-editor class="mavon-editor-container" v-model="value" />
    <el-button class="publish-article" type="primary" @click="publishArticle('form-article')">
      publish article
    </el-button>
  </el-card>
</template>

<script>
import "mavon-editor/dist/css/index.css"; // 富文本编辑器css
import Tips from "@/common/tips"
import { errorMessage } from "@/common/message"

export default {
  name: "edit",
  data() {
    return {
      value: "",
      articleData: {
        articleTitle: null, // 标题
        articleCategroy: null, // 分类
        articleCover: null, // 封面
        articleTags: [], // 标签
        articleIntroduce: null, // 简介
      },
    };
  },
  methods: {
    uploadSuccess() {},
    publishArticle(formArticle) {
      this.$refs[formArticle].validate((error) => {
        if(!error) {
          console.log(this.articleData);
        } else {
          errorMessage(Tips.VALIDATE_ERROR)
        }
      })
    },
  },
};
</script>

<style>
.mavon-editor-container {
  height: 80vh;
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