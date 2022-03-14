<template>
  <div class="todoListBox">
    <div class="header-box">
      <div class="header-left">
        <div>+</div>
        <h2>{{ hello }}--欢迎您</h2>
      </div>
      <div class="content-input">
        <input type="text" v-model.trim="event" />
      </div>
      <div class="header-right">
        <el-button type="primary" round @click="addList">添加</el-button>
        <el-button type="danger" round @click="back">退出</el-button>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <div
        class="content-item"
        v-for="(item, index) in todoList"
        :key="item.index"
      >
        <div class="content-left" @click="select(index)">
          <span :style="item.condition ? 'opacity:1' : 'opacity:0'"></span>
        </div>
        <div>
          <div style="color: #ccc" :disabled="item.condition">
            <!-- 我要拉屎 我要拉屎 我要拉屎 我要拉屎 我要拉屎 我要拉屎 -->
            {{ item.event }}
          </div>
        </div>
        <div class="content-right">
          <el-button type="danger" @click="delList(item.event, item.date)"
            >删除</el-button
          >
        </div>
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
      Token: "",
      hello: "",
      nowTime: 0,
      // 添加的数据
      event: "",
      todoList: [],
    };
  },
  created() {
    var token = localStorage.getItem("token");
    this.Token = token;

    this.getUserList();
    var uname = localStorage.getItem("username");
    this.hello = uname;
  },
  methods: {
    // 获取数据
    getUserList() {
      axios
        .get("http://47.96.122.117:10531/list", {
          headers: { "x-Token": this.Token },
        })
        .then((res) => {
          this.todoList = res.data.data;
          // console.log(res.data);
        });
    },
    back() {
      localStorage.clear;
      this.$router.push("/login");
      Message({
        message: "退出成功",
        type: "success",
        duration: 1500,
      });
      // this.todoList.unshift({
      //   text: "",
      //   isCheck: false,
      // });
    },
    /*   delect(index) {
      this.todoList.splice(index, 1);
    }, */
    select(index) {
      this.todoList[index].isCheck = !this.todoList[index].isCheck;
    },
    /*     selectAll() {
      this.todoList.forEach((item) => {
        if ((item.isCheck = true)) return;
        item.isCheck = true;
      });
    }, */
    // 添加数据
    async addList() {
      var time = Date.parse(new Date());
      this.nowTime = time;

      if (this.event === "") {
        Message({
          message: "添加失败 不能发送空白数据",
          type: "error",
          duration: 1500,
        });
        return;
      }
      const { data: res } = await axios.post(
        "http://47.96.122.117:10531/add",
        {
          event: this.event,
          condition: false,
          date: this.nowTime,
        },
        { headers: { "x-Token": this.Token } },
        console.log(this.Token)
      );
      if (res.code !== 0) {
        Message({
          message: "添加失败",
          type: "error",
          duration: 1500,
        });
        return;
      }
      this.event = "";
      this.getUserList();
      Message({
        message: "添加成功",
        type: "success",
        duration: 1500,
      });
    },

    // 删除数据
    // 删除数据
    async delList(event, date) {
      const { data: res } = await axios.delete(
        "http://47.96.122.117:10531/delete",
        {
          headers: { "x-Token": this.Token },
          data: { event: event, date: date },
        }
      );

      if (res.code !== 0) {
        Message({
          message: "删除失败  " + res.msg,
          type: "error",
          duration: 1500,
        });
      }
      // console.log(this.Token);
      // console.log(event);
      // console.log(date);
      // console.log(res);
      this.getUserList();
    },
  },
};
</script>

<style scoped>
.userTodo {
  text-align: left;
}
.todoListBox {
  width: 800px;
  height: 600px;
  background: #3c3e4f;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.header-box {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  border-bottom: #ccc solid 1px;
  color: #ccc;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-left div {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #9999e6;
  font-size: 30px;
  text-align: center;
  margin-right: 10px;
  line-height: 50px;
}
.content {
  height: 450px;
  overflow-y: auto;
}
.content-item {
  display: flex;
  justify-content: space-between;
  background-color: #6b6f7d;
  margin-top: 50px;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
}
.content-right {
  display: flex;
  align-items: center;
}
.content-left {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 50%;
}
.content-left span {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-color: #9999e6;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content-input {
  flex: 1;
  margin: 0 10px;
  outline: none;
  background: transparent;
  border: none;
  margin: 0 10px;
}
input {
  width: 100%;
  height: 70%;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 1px solid #ccc;
  color: #ccc;
}
.line {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through rgba(255, 255, 255, 0.8);
}
</style>
