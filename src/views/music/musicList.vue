<template>
  <div class="musicList">
    <el-table stripe border height="750px">
      <!-- 多选框（设置type属性值为selection） -->
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="序号" prop="uid" sortable width="100px"></el-table-column>
      <el-table-column label="头像" prop="uid" sortable></el-table-column>
      <el-table-column label="姓名" prop="uid" sortable></el-table-column>
      <el-table-column label="密码" prop="uid" sortable></el-table-column>
      <el-table-column label="操作" prop="uid" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        
    };
  }
};
</script>

<style>
</style>