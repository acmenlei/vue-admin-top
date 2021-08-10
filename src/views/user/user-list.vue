<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户 ID" prop="id"> </el-table-column>
      <el-table-column label="用户名" prop="name"> </el-table-column>
      <el-table-column label="用户描述" prop="desc"> </el-table-column>
      <el-table-column label="操作" prop="desc" width="300">
          <el-button-group>
              <el-button type="primary" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete">删除</el-button>
              <el-button type="warning" icon="el-icon-setting">分配权限</el-button>
          </el-button-group>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "user-list",
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          name: "好滋好味鸡蛋仔",
        },
        {
          name: "好滋好味鸡蛋仔",
        },
        {
          name: "好滋好味鸡蛋仔",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>