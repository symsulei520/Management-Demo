<template>
  <div class="register">
    <div>
      <el-form ref="registerForm" :model="user" :rules="rules" @submit.prevent>
        <el-form-item>
          <h2>后台管理帐号注册</h2>
        </el-form-item>
        <el-form-item label="帐号" prop="username">
          <el-input v-model="user.username" suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick">
          <el-input v-model="user.nick" suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload list-type="picture-card" :show-file-list="false" :auto-upload="true" action="/"
            :on-change="onChangFile" :before-upload="onbeforeUpload">
            <!-- 当执行if判断时判断地址是否存在，如果地址存在，将图片地址作为src绑定属性的值，同时头像上传框显示上传的图片 -->
            <el-image v-if="img" :src="img" class="avatar"></el-image>
            <!-- 当else执行时，头像上传框显示icon标签 -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onRegister" @keyup.enter.native="onRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    RequestRegister
  } from '../api/indexApi';
  import DataUtil from "@/utils/DataUtil.js";
  import Sha256 from "js-sha256";
  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
          nick: '',
          headerFile: null
        },
        img: '',
        //表单验证
        rules: {
          username: [{
            required: true,
            message: "请输入帐号",
            trigger: "blur"
          }],
          password: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur"
            }
          ],
          nick: [{
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }]
        }
      }
    },
    created() {
      console.log("123>>>>>>>>>>>>");
    },
    methods: {
      // 选择本地图片时回调，预览本地上传文件;file表示本地上传的文件对象
      onChangFile(file) {
        // 将本地上传的图片地址赋值给自定义img对象
        this.img = URL.createObjectURL(file.raw);
      },
      // 图片上传之前回调,参数为本地上传的图片对象
      onbeforeUpload(file) {
        // 将本地上传的文件对象赋值给自定义的空的数组对象
        this.user.headerFile = file;
      },
      onRegister() {
        // 表单校验与帐号登录关联，表单验证通过才会执行之后的登录操作
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const username = this.user.username;
            const password = this.user.password;
            const psw = Sha256(password);
            const nick = this.user.nick;
            const currentTime = DataUtil.formatDate.format(
              new Date(),
              "yyyy-MM-dd hh:mm:ss"
            )
            const fileHeader = this.user.headerFile;
            console.log("fileHeader>>>>>>>", fileHeader);
            // 1、创建一个空对象实例
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', psw);
            formData.append('nick', nick);
            formData.append('createtime', currentTime);
            formData.append('headerimg', fileHeader);
            // 调用注册接口
            RequestRegister(formData).then(res => {
              if (res.resultCode === 1) {
                console.log("注册成功");
                this.$router.replace({
                  path: "/login"
                });
              }
            })
          }
        })
      }
    }
  }

</script>

<style lang='scss'>
  .register {
    width: 500px;
    height: 550px;
    background: #c5daf8;
    border-radius: 5px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    // opacity: 0.6;

    h2 {
      padding: 30px 0 0px 0;
      color: gray;
      font-weight: initial;
    }

    form {
      margin: 0 auto;
      width: 70%;

      .form-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        label {
          padding: 10px 0;
          text-align: left;
          font-size: 14px;
          margin-left: 15px;
        }

        input {
          height: 35px;
          background: #e7effd;
          border: none;
          text-indent: 10px;
        }

        span {
          display: inline-block;
          text-align: left;
          display: flex;
          align-items: center;
        }
      }

      .el-upload--picture-card {
        width: 80px;
        height: 80px;

        .avatar-uploader-icon {
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .el-image__inner {
          width: 79px;
          height: 79px;
          border-radius: 3px;
        }
      }

      .btn input {
        width: 100%;
        height: 50px;
        // background: #00aaee;
        border: none;
        outline: none;
        border-radius: 5px;
        color: white;
        font-size: 18px;
        margin-top: 20px;
      }

      .btn input:hover {
        cursor: pointer;
        background: rgb(12, 129, 175);
      }
    }
  }

</style>
