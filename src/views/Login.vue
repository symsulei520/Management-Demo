<template>
  <div class="login">
    <!-- :rules="rules" 绑定表单校验规则 -->
    <!-- :model="user" 进行表单验证时，需要绑定输入的信息数组-->
    <!-- hide-required-asterisk 添加时为false，表单label红点取消 -->
    <el-form :model="user" :rules="rules" ref="loginForm" hide-required-asterisk @submit.prevent>
      <el-form-item>
        <h2>后台管理中心</h2>
      </el-form-item>
      <!-- prop 属性设置为需校验的字段名 -->
      <el-form-item label="帐号" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- @keyup.enter.native="onLogin" 绑定登陆按钮 回车自动登录  -->
        <el-input v-model="user.password" @keyup.enter.native="onLogin"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="user.checked">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onLogin" icon="el-icon-edit">登录</el-button>
      </el-form-item>
      <el-form-item>
        <p>{{message}}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Sha256 from "js-sha256"; // 导入加密文件
import { RequestLogin } from "@/api/indexApi.js"; // 1.引入登录接口API

// 引入封装的cookie的方法
import {
  SaveUserCookie,
  GetUserCookie,
  RemoveUserCookie
} from "@/common/UserCookie.js";

export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: "",
        checked: false
      },
      message: "",
      // 设置表单校验规则
      rules: {
        // 指定帐号输入规则，校验的字段username要与绑定的user.username名字相同
        username: [
          // required表示内容不为空，trigger: "blur" 表示在输入框失去焦点时触发
          { required: true, message: "请输入帐号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.message = this.$route.params.message;
  },

  // 页面加载调用获取Cookie值
  mounted() {
    // 从函数中取出 并赋值
    const user = GetUserCookie();
    // 判断密码是否保存在cookie中
    if (user == null) {
      return;
    }
    // 将从cookie中取出的用户信息 赋值给表单绑定的用户信息
    this.user.checked = true;
    this.user.username = user.username;
    this.user.password = user.password;
  },
  methods: {
    onLogin() {
      const that = this;
      that.$router.push({ path: "/index" });
      // 表单校验与帐号登录关联，表单验证通过才会执行之后的登录操作
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const cookieUser = "";
          // 获取表单输入框的用户名和密码
          const username = this.user.username;
          const psw = this.user.password;
          const password = Sha256(psw).trim(); // 密码加密 tirm()去空格
          // 2.调用登录接口函数，axios请求数据
          RequestLogin(username, password)
            .then(data => {
              if (data.resultCode === 1) {
                /**
                 *  登录成功后，去请求菜单数据，并在本地vuex储存
                 *    这里将请求页面数据放在页面刷新时执行
                 *    当登录成功时，也代表页面刷新一次，整个Vue实例都会重新实例化一次
                 *    所以将刷新事件写到页面渲染的入口app.vue中
                 *    this.$store.dispatch("saveMenu");
                 */
                // 0.执行saveMenu方法、初始化菜单
                this.$store.dispatch("saveMenu");

                // 1.判断是否记住密码，判断为真，将用户信息添加到cookie中
                if (this.user.checked == true) {
                  console.log("记住密码：", this.user.checked, "保存到cookie");
                  SaveUserCookie(this.user);
                } else {
                  // 不记住密码，清空用户信息
                  console.log("不记住密码：", this.user.checked, "清除cookie");
                  RemoveUserCookie();
                }
                // 2.token存储、安全校验
                localStorage.setItem("token", data.token);
                // 3.vuex 存储登录信息，保存用户信息到vuex-user
                this.$store.dispatch("saveUser", data.resultInfo);
                // 4.登录成功后自动切换路由
                that.$router.push({ path: "/index" });
              } else {
                this.message = data.resultInfo; // 用户密码错误的时候执行
              }
            })
            .catch(err => {
              console.log("err1233456789 >>> " + err);
            });
        }
      });
    },
    onRegister() {}
  }
};
</script>

<style lang="scss">
.login {
  width: 500px;
  height: 520px;
  background: #c5daf8;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;

  h2 {
    padding: 30px 0;
    color: gray;
    font-weight: initial;
  }
  form {
    margin: 0 auto;
    width: 80%;
    .form-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      label {
        padding: 10px 0;
        text-align: left;
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
        label {
          font-size: 14px;
          margin-left: 15px;
        }
      }
    }
    .btn input {
      width: 100%;
      height: 50px;
      background: #00aaee;
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
