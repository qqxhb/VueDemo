<template>
  <div>
    <div class="search-bar">
      <el-button class="create" type="primary" icon="el-icon-circle-plus" @click="add()">新建</el-button>
      <el-input style="width: 150px;" placeholder="请输入用户名"  v-model="name"></el-input>
      <el-button type="success" @click="search()">搜索</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
       <el-table-column label="Logo"  prop="logo" width="120">
         <template slot-scope="scope">
      <img  :src="scope.row.logo" alt="" style="height: 30px">
    </template>
      </el-table-column>
      <el-table-column label="昵称"  prop="nikeName" width="120">
      </el-table-column>
      <el-table-column label="用户名" prop="userName"  width="120">
      </el-table-column>
      <el-table-column label="邮箱" prop="email" width="240">
      </el-table-column>
      <el-table-column label="状态" prop="status" width="120">
      </el-table-column>
      <el-table-column label="操作">
              <template slot-scope="scope">
                <el-row>
                <el-button type="primary" icon="el-icon-edit" size="small" @click="edit(scope.row.id)">编辑</el-button>
                <el-button type="info" icon="el-icon-setting" size="small" @click="setrole(scope.row.id,scope.row.role)">配置角色</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small" @click="del(scope.row.id,false)">删除</el-button>
                </el-row>
              </template>
      </el-table-column>
    </el-table>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[4,7, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    <el-dialog
      title="警告"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>确认删除该用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
    <form-detail :visible.sync="roleVisible" :id="currentId" :role="currole"></form-detail>
  </div>
</template>

<script>
import axios from "axios";
import "./mock/form.js";
import FormDetail from "./formDetail.vue";
const info = {
  link: "/system/info",
  label: "用户信息"
};
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      roleVisible:false,
      currentId: 0,
      currole:[],
      info: info,
      name: "",
      currentPage: 1,
      pageSize:7,
      total:20
    };
  },
  components: {
    formDetail: FormDetail
  },
  mounted() {
   this.search();
  },
  methods: {
    search() {
      axios.get("/user/list", { data: { page: this.currentPage,size: this.pageSize, name: this.name } }).then(res => {
        this.tableData = res.data.users;
        this.total = res.data.total;
      });
      this.name='';
    },
    add() {
      this.$store.commit("setParam", {
        action: "add",
        id: 0,
        hbtnText: "新增用户",
        lbtnText: "立即创建",
        resetbtn: true
      });
      this.$router.push({ name: "SystemInfo" });
    },
    edit(id) {
      this.$store.commit("setParam", {
        action: "edit",
        id: id,
        hbtnText: "编辑用户",
        lbtnText: "保存",
        resetbtn: false
      });
      this.$router.push({ name: "SystemInfo" });
    },
    setrole(id,role){
      this.roleVisible=true;
       this.currentId=id;
       this.currole=role;
    },
     handleSizeChange(val) {
       this.pageSize=val;
        this.search();
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.search();
      },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.currentId = val[0] && val[0].id;
    },
    del(id) {
      if (id > 0) {
        this.$store.commit("setParam", {
          action: "edit",
          id: id,
          hbtnText: "编辑用户",
          lbtnText: "保存",
          resetbtn: false
        });
        this.dialogVisible = true;
      }
    },
    confirm() {
      this.dialogVisible = false;
      let res = axios
        .get("/user/delete", { id: this.$store.state.id })
        .then(res => {
          this.search();
          });
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        }
    }
  }
</script>

<style>
.toolbar {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.create {
  float: left;
}
.search-bar {
  padding: 10px;
  text-align: right;
}
.block {
  text-align: right;
  padding-right: 80px;
}
</style>

