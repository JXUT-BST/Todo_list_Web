<template  @keyup.enter="test">
  <div class="login_container">
    <div class="login_box">
      <h1>登入</h1>
      <div>
        <el-form label-width="70px" class="login_form" ref="loginRef">
          <el-form-item label="用户名" prop="username">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              prefix-icon="el-icon-key"
              v-model="password"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登入</el-button>
            <el-button plain @click="goRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";

// import func from "vue-editor-bridge";/

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      token: "",
    };
  },
  methods: {
    goRegister() {
      return this.$router.push("/register");
    },
    login() {
      var UserName = this.username;
      var Password = this.password;
      localStorage.setItem("username", this.username);
      var Token = this.token;
      const that = this;
      if (this.username === null || this.password === null) {
        Message({
          message: "用户名或密码不能为空",
          type: "warning",
          duration: 1500,
        });
        return;
      }
      axios
        .get(
          "http://47.96.122.117:10531/login?username=" +
            UserName +
            "&password=" +
            Password
        )
        .then(function (response) {
          const data = response.data;
          if (data.code === 0) {
            Message({
              message: "欢迎您" + UserName,
              type: "success",
              duration: 1500,
            });
            Token = data.token;
            localStorage.setItem("token", Token);
            return that.$router.push("/home");
          } else {
            Message({
              message: data.msg,
              type: "error",
              duration: 1500,
            });
          }
        })

        .catch(function (error) {
          Message({
            message: error,
            type: "error",
            duration: 1500,
          });
        });
    },
  },
};
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  position: relative;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h1 {
  text-align: center;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
