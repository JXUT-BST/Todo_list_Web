<template>
  <div class="login_container">
    <div class="login_box">
      <h1>注册</h1>
      <div>
        <el-form label-width="80px" class="login_form" ref="loginRef">
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
          <el-form-item label="确定密码" prop="password">
            <el-input
              prefix-icon="el-icon-key"
              v-model="repassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button plain @click="btnRegister">点击注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";

export default {
  data() {
    return {
      username: null,
      password: null,
      repassword: null,
    };
  },
  methods: {
    btnRegister() {
      if (this.username === null || this.password === null) {
        Message({
          message: "用户名或密码不能为空",
          type: "warning",
          duration: 1500,
        });
        return;
      }
      if (this.password != this.repassword) {
        Message({
          message: "密码不一致！",
          type: "warning",
          duration: 1500,
        });
        return;
      }

      var that = this;
      axios
        .post("http://47.96.122.117:10531/register", {
          username: this.username,
          password: this.password,
        })
        .then(function (res) {
          const data = res.data;

          if (data.code === 0) {
            Message({
              message: "注册成功",
              type: "success",
              duration: 1500,
            });
            that.$router.push("/login");
          } else {
            Message({
              message: data.msg,
              type: "注册失败",
              duration: 1500,
            });
          }
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
h1 {
  font-size: 20px;
}
</style>
