<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      action="#"
      :before-upload="beforeUpload"
      :http-request="requestCustom"
    >
      <img v-if="cover" :src="cover" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { FORMAT_ERROR, FILE_SIZE_ERROR } from "@/common/tips";
import { errorMessage } from "@/common/message";

export default {
  name: "upload-image",
  props: {
    cover: {
      type: String,
      default: "",
      require: true,
    },
    type: {
      type: Array,
      default: () => ["png", "jpg", "jpeg"],
    },
    size: {
      type: Number,
      default: 2,
    },
  },
  methods: {
    /* 自定义上传配置 */
    requestCustom(config) {
      console.log("文件上传的请求配置", config);
      // 拿到封面绝对路径 暂时没写
      this.$emit("success-upload", "xxx");
    },
    /* 上传前的文件类型以及文件大小校验 */
    beforeUpload({ type, size }) {
      type = type.split("/")[1];
      if (!this.type.includes(type)) {
        return errorMessage(FORMAT_ERROR);
      }
      if (size / 1024 / 1024 > this.size) {
        return errorMessage(FILE_SIZE_ERROR);
      }
    },
  },
};
</script>

<style>
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