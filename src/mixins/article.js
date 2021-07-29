import { getArticleCategorys, getArticleTags } from "@/api/article"

export default {
    data() {
        return {
            tagList: [], // 标签集合
            categoryList: [], // 分类集合
        }
    },
    mounted() {
        this.getAritcleConfig()
    },
    methods: {
        /* 获取文章标签和分类 */
        async getAritcleConfig() {
            const tags = await getArticleTags();
            const categorys = await getArticleCategorys();
            this.tagList = tags.data;
            this.categoryList = categorys.data;
        },
    },
}