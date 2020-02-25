<template>
  <div class="home">
    user
    <!--  有user权限  -->
    <el-button v-permission="'user'">user</el-button>
    <!--  没有home权限  -->
    <el-button v-permission="'home'">home</el-button>
  </div>
</template>
