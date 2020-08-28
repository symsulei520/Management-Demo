<template>
  <div class="kehuAdd">
    <el-form @submit.prevent label-width="100px">
      <el-form-item label="用户名：">
        <el-input placeholder="用户名:" name="username" v-model="user.username"></el-input>
      </el-form-item>

      <el-form-item label="性别：">
        <el-radio v-model="user.sex" label="1">男</el-radio>
        <el-radio v-model="user.sex" label="2">女</el-radio>
      </el-form-item>

      <el-form-item label="年龄：">
        <el-input placeholder="年龄" name="age" v-model="user.age"></el-input>
      </el-form-item>

      <!-- 到访时间 -->
      <el-form-item label="到访时间：">
        <el-date-picker v-model="user.visittime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>

      <el-form-item label="学历：">
        <el-input placeholder="选择学历" name="education" v-model="user.education"></el-input>
      </el-form-item>

      <el-form-item label="单位：">
        <el-input placeholder="选择单位" name="company" v-model="user.company"></el-input>
      </el-form-item>

      <!-- type="textarea"  自适应文本高度的文本域-->
      <!-- autosize 还可以设定为一个对象，指定最小行数和最大行数 -->
      <el-form-item label="到访原因：">
        <el-input placeholder="请输入原因" name="visitgoal" v-model="user.visitgoal" type="textarea"
          :autosize="{ minRows: 3, maxRows: 4}"></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <!-- el-upload 表示上传组件
         :show-file-list="false" 绑定属性表示是否显示选中图片地址列表
         list-type: picture-card 图片预览效果（图片上传框形状）
         :auto-upload= "true|false" 绑定属性表示是否自动提交图片到服务器,要成功获取到文件对象，必须将图片自动上传打开，auto-upload=true; 
         action指一个不存在地址 
         :on-change="函数" 绑定属性表示内容转变事件，这里表示上传的图片发生改变时执行
        -->
        <el-upload list-type="picture-card" :show-file-list="false" :auto-upload="true" action="/"
          :on-change="onChangFile" :before-upload="onbeforeUpload" :headers="headers">
          <!-- 当执行if判断时判断地址是否存在，如果地址存在，将图片地址作为src绑定属性的值，同时头像上传框显示上传的图片 -->
          <el-image v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
          <!-- 当else执行时，头像上传框显示icon标签 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAddFile">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // 引入开发环境的URL地址
  import {
    baseURL
  } from "@/api/request.js";
  // 引入添加用户接口
  import {
    RequestUserAdd
  } from "@/api/UserApi.js";

  // 日期格式化
  import util from "@/utils/DataUtil.js";
  export default {
    data() {
      return {
        user: {
          username: "",
          age: "", // 年龄
          sex: "1", // 性别 男0 女1
          visitgoal: "", // 来访目的
          visittime: "", // 到访时间
          education: "", // 学历
          company: "", // 单位
          headerFile: null // 头像
        },
        baseURL,
        imageUrl: "",
        headers: {
          Authorization: "Bear" + RequestUserAdd()
        }
      };
    },
    methods: {
      // 选择本地图片时回调，预览本地上传文件;file表示本地上传的文件对象
      onChangFile(file) {
        console.log("file>>>>>>>", typeof (file), file);
        // 将本地上传的图片地址赋值给imageUrl
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      // 图片上传之前回调
      onbeforeUpload(file) {
        // 将本地上传的文件对象赋值给自定义的空的数组对象
        console.log("file>>>>>>>>>>>>>>>>>>>>", file);
        this.user.headerFile = file;
      },
      onAddFile() {
        const username = this.user.username;
        const psw = this.user.psw;
        const fileHeader = this.user.headerFile;
        const age = this.user.age;
        const sex = this.user.sex;
        const visitgoal = this.user.visitgoal;
        const visittime = this.user.visittime;
        const logtime = util.formatDate.format(visittime, "yyyy-MM-dd hh:mm:ss");
        console.log("visittime >>>>>>>", logtime);
        const education = this.user.education;
        const company = this.user.company;
        // 1.创建formdata对象
        const formData = new FormData();
        // 添加数据，将帐号、密码、文件对象都添加到formdata中
        formData.append("username", username);
        formData.append("psw", psw);
        formData.append("fileHeader", fileHeader);
        formData.append("age", age);
        formData.append("sex", sex);
        formData.append("visitgoal", visitgoal);
        formData.append("visittime", logtime);
        formData.append("education", education);
        formData.append("company", company);

        // 调用添加用户接口
        RequestUserAdd(formData)
          .then(data => {
            if (data.resultCode === 1) {
              this.$router.replace({
                path: "/user/list"
              });
            }
          })
          .catch(err => {
            this.$message({
              message: "上传失败!" + err
            });
          });
      }
    }
  };

</script>

<style lang="scss" scoped>
  .kehuAdd {
    padding: 20px;
    border-radius: 4px;
    background: #f5f1f1;
  }

</style>
