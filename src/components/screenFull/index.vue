<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="screenfullBut ? '点击还原' : '全屏显示'"
    placement="bottom"
  >
    <svg
      fill="#e1e1e1"
      @click="fullscreen"
      class="screenfull"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ffffff"
        d="M628.053333 628.053333a32 32 0 0 1 45.226667 0l158.72 158.634667V693.333333l0.298667-4.352A32 32 0 0 1 896 693.333333v181.333334l-0.341333 3.84a21.333333 21.333333 0 0 1-20.992 17.493333h-181.333334l-4.352-0.298667a32 32 0 0 1-27.648-31.701333l0.298667-4.352a32 32 0 0 1 31.701333-27.648h93.44l-158.72-158.72-3.114666-3.584a32 32 0 0 1 3.114666-41.642667z m-232.106666 0a32 32 0 0 1 3.114666 41.642667l-3.114666 3.584-158.72 158.72h93.44a32 32 0 0 1 31.701333 27.648l0.298667 4.352a32 32 0 0 1-27.648 31.701333L330.666667 896H149.333333a21.333333 21.333333 0 0 1-20.992-17.493333L128 874.666667v-181.333334a32 32 0 0 1 63.701333-4.352l0.298667 4.352v93.354667l158.72-158.634667a32 32 0 0 1 45.226667 0zM874.666667 128a21.333333 21.333333 0 0 1 20.992 17.493333L896 149.333333v181.333334a32 32 0 0 1-63.701333 4.352L832 330.666667V237.312L673.28 395.946667a32 32 0 0 1-48.341333-41.642667l3.114666-3.584 158.72-158.72h-93.44a32 32 0 0 1-31.701333-27.648L661.333333 160a32 32 0 0 1 27.648-31.701333L693.333333 128h181.333334zM330.666667 128l4.352 0.298667a32 32 0 0 1 27.648 31.701333l-0.298667 4.352a32 32 0 0 1-31.701333 27.648H237.226667l158.72 158.72 3.114666 3.584a32 32 0 0 1-48.341333 41.642667L192 237.312V330.666667l-0.298667 4.352A32 32 0 0 1 128 330.666667V149.333333l0.341333-3.84A21.333333 21.333333 0 0 1 149.333333 128h181.333334z"
      />
    </svg>
  </el-tooltip>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "screnn-full",
  data() {
    return {
      screenfullBut: false, // 全屏按钮
    };
  },
  methods: {
    // 全屏功能
    fullscreen() {
      if (!screenfull.isEnabled) {
        this.$notification.open({
          message: "温馨提示",
          description:
            "您的浏览器无法使用全屏功能，请更换谷歌浏览器或者请手动点击F11按钮全屏展示！",
          duration: 10,
          placement: "bottomLeft",
        });
        return false;
      }
      screenfull.toggle();
      if (screenfull.isFullscreen) {
        this.screenfullBut = false;
      } else {
        this.screenfullBut = true;
      }
    },
  },
};
</script>

<style scoped>
.screenfull {
  width: 28px;
  cursor: pointer;
  opacity: .8;
  margin-right: 10px;
}
</style>