<template>
  <div style="width:100%">
    <el-row type="flex" justify="space-between" align="middle" style="height:40px;width:100%">
      <el-col>
        <span>{{ treeNode.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex">
          <span>{{ treeNode.manager }}</span>
          <el-dropdown @command="handleCommand">
            <span>操作 <i class="el-icon-arrow-down el-icon--right" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {

  props: {
    treeNode: {
      type: Object, // 对象类型
      required: true // 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      console.log(type)

      if (type === 'add') {
        // 新增
        // 现在 treeTools
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
        this.$emit('editDept', this.treeNode)
      } else {
        // del
        this.$confirm('是否确认删除该部门', '提示', { type: 'warning' }).then(async res => {
          return delDepartments(this.treeNode.id)
        }).then(res => {
          this.$message.success('删除成功')
          this.$emit('refreshList')
        })
      }
    }
  }
}
</script>

<style>

</style>
