<template>
  <div id="not-found">
    <!-- <el-empty description="Not Found 404 未找到您想找的页面"></el-empty> -->
  <span>4</span>
  <span>0</span>
  <span>4</span>
  <p>啊哦~ 你所访问的页面不存在</p>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>

<style scoped>
#not-found {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
span {
  font-size: 100px;
  animation: scale 3s infinite alternate linear;
}
span:nth-child(1) {
  color: #2d8cf0;
}
span:nth-child(2) {
  color: #00a854;
}
span:nth-child(3) {
  color: #2d8cf0;
}
p {
  color: #777;
}
@keyframes scale {
  0% { font-size: 100px; }
  100% { font-size: 110px; }
}
</style>