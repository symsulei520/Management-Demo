<template>
  <el-container class="wrap">
    <el-header style="height:80px">
      <Header></Header>
    </el-header>
    <el-container>
      <!-- <el-aside> -->
      <div class="menubg">
        <Menu></Menu>
      </div>
      <!-- </el-aside> -->
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$router.currentRoute.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- tag 标签导航菜单组件 -->
        <tag-view></tag-view>
        <!-- 路由输出 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
import TagView from "@/components/TagView.vue";
export default {
  components: {
    Header,
    Menu,
    TagView
  },
  methods: {
  
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
}
.el-header,
.el-footer {
  background: linear-gradient(to left, #6091d1, #7692eb, #8370d6, #723feb);
  color: #333;
  text-align: center;
  line-height: 80px;
}

.menubg {
  background: #545c64;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  line-height: 20px;
}
.el-breadcrumb {
  padding: 10px 0;
}
</style>
