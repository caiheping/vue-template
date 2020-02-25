<template>
  <div class="home">
    user
    <!--  有user权限  -->
    <el-button v-permission="'user'">user</el-button>
    <!--  没有home权限  -->
    <el-button v-permission="'home'">home</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
    <el-progress :percentage="50"></el-progress>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: true
      }
    }
  };
</script>
