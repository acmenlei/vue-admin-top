<template>
  <el-card id="home">
    <div class="user" v-for="user in users" :key="user.id">
      <p>username: {{ user.username }}</p>
      <p>address: {{ user.address.street }}</p>
      <p>website: {{ user.website }}</p>
      <p>email: {{ user.email }}</p>
    </div>
  </el-card>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      users: []
    }
  }
};
</script>
