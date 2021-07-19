import { Loading } from "element-ui";

let loading = null;
export const showLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: 'rgba(0, 0, 0, 0.5)'
  });
};
export function hideLoading() {
   setTimeout(() => {
    loading.close();   
   });
}
