<template>
<div>
<div class="back-bar">
      <router-link :to='back.link'><el-button class="back" type="primary" icon="el-icon-arrow-left">返回</el-button></router-link>
    </div>
    <div class="back-bar"><h3>{{this.$store.state.hbtnText}}</h3></div>
    <div class="content">
  <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
  <el-form-item label="用户名" prop="userName">
    <el-input v-model="userForm.userName"></el-input>
  </el-form-item>
  <el-form-item label="昵称" prop="nikeName">
    <el-input v-model="userForm.nikeName"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="userForm.mobile"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="userForm.email"></el-input>
  </el-form-item>
  <el-form-item label="状态" prop="status">
    <el-radio-group v-model="userForm.status">
      <el-radio label="未激活"></el-radio>
      <el-radio label="已激活"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="用户类型" prop="userType">
    <el-radio-group v-model="userForm.userType">
      <el-radio label="注册用户"></el-radio>
      <el-radio label="后台配置用户"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="备注" prop="desc">
    <el-input type="textarea" v-model="userForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('userForm')">{{this.$store.state.lbtnText}}</el-button>
    <el-button v-show=this.$store.state.resetbtn  @click="resetForm('userForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
</div>
</template>

<script>
import axios from "axios";
const back = {
  link: "/system/user",
  label: "用户信息"
};
export default {
  data() {
    return {
      back,
      userForm: {
        userName: "",
        nikeName: "",
        mobile: "",
        email: "",
        status: "",
        userType: "",
        desc: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        nikeName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { min: 11, max: 11, message: "手机号错误", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 5, max: 20, message: "邮箱错误", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择用户状态", trigger: "change" }
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    if (this.$store.state.id > 0) {
      let res = axios
        .get("/user/info", { id: this.$store.state.id })
        .then(res => {
          if (res.data.code != 200) {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
            return;
          }
          this.userForm = res.data.user;
        });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$store.state.id > 0) {
            axios.get("/user/edit", { data: this.userForm }).then(res => {
              if (res.data.code != 200) {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
                return;
              }
            });
            this.$message({
              message: "修改成功！",
              type: "success"
            });
          } else {
            axios.get("/user/add", { data: this.userForm }).then(res => {
              if (res.data.code != 200) {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
                return;
              }
            });
            this.$message({
              message: "添加成功！",
              type: "success"
            });
          }

          this.$router.push({ name: "SystemUser" });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.back-bar {
  padding: 10px 0 0 15px;
  text-align: left;
  height: 40px;
  line-height: 40px;
  clear: both;
}
.content {
  width: 60%;
  padding: 50px 0 0 160px;
}
</style>