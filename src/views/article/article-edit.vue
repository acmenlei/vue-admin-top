<template>
  <el-card class="publish">
    <el-form :model="articleData" label-width="40px">
      <el-form-item label="标题">
        <el-input
          prefix-icon="el-icon-edit"
          v-model="articleData.articleTitle"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="articleData.articleCategroy" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
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
  </el-card>
</template>

<script>
import "mavon-editor/dist/css/index.css"; // 富文本编辑器css

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
  },
};
</script>

<style>
.mavon-editor-container {
  height: 80vh;
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