<template>
  <div >
    <el-dialog
    title="配置用户角色"
    :visible.sync="visible"
    width="30%"
    :before-close="hideDialog">
    <span>
      <el-tree
      :data="roles"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="confim">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["visible", "id", "role"],
  data() {
    return {
      // visible:this.visible,
      // id:this.id,
      selects: this.role,
      roles: [
        {
          id: 1,
          label: "超级管理员"
        },
        {
          id: 2,
          label: "主编",
          children: [
            {
              id: 3,
              label: "编辑"
            },
            {
              id: 4,
              label: "校对"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    role: {
      immediate: true,
      handler: function(val, oldval) {
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys(val);
        }
      }
    }
  },
  methods: {
    confim() {
      axios
        .get("/user/role", {
          data: { id: this.id, role: this.$refs.tree.getCheckedKeys() }
        })
        .then(res => {
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
      this.$router.push({ name: "SystemUser" });
      this.$emit("update:visible", false);
    },
    hideDialog(ok) {
      this.$emit("update:visible", false);
    }
  }
};
</script>


<style>
.dialog {
  position: absolute;
  z-index: 9999;
  width: 50%;
  height: 50%;
  top: 100px;
  left: 100px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.5);
}
</style>
