<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" @addDept="handleAddDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps">
      <treeTools slot-scope="{data}" :tree-node="data" @addDept="handleAddDept" @editDept="editDept" @refreshList="getDepartments" />
    </el-tree>
    <addDept ref="addDept" :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
  </div>
</template>

<script>
import treeTools from './component/tree-tools.vue'
import addDept from './component/add-depts.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [],
      company: {},
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyManage, companyName } = await getDepartments()
        this.departs = tranListToTreeData(depts, '')
        console.log(this.departs)
        this.company = { name: companyName, manager: companyManage }
      } finally {
        this.loading = false
      }
      // console.log(depts)
    },
    handleAddDept(node) {
      this.dialogVisible = true
      this.currentNode = node
    },
    editDept(node) {
      console.log(node)
      this.dialogVisible = true
      this.currentNode = { ...node }
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      padding-right: 20px;
    }
  }
}
</style>
