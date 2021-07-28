import { Loading } from "element-ui";
import { nProgress } from '../permission';
import { LOADINGING } from "./tips"

let loading = null;

export const showLoading = () => {
  loading = Loading.service({
    lock: true,
    text: LOADINGING,
    background: 'rgba(0, 0, 0, 0.5)'
  })
  nProgress.start() // 开启进度显示
};

// 异步关闭加载与进度
export function hideLoading() {
  setTimeout(() => {
    loading.close()
    nProgress.done()
  })
}
