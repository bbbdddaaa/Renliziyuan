<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登录账户设置" name="first">
            <el-form ref="form" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item prop="username" label="姓名">
                <el-input v-model="formData.username" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="formData.password" type="password" autocomplete="off" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailById">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second"><UserInfo /></el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third"><Jobinfo /></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import Jobinfo from './component/job-info.vue'
import UserInfo from './component/user-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    Jobinfo,
    UserInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      formData: {},
      rules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' },
          { min: 6, message: '密码长度最小6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      const res = await getUserDetailById(this.$route.params.id)
      console.log(res)
      this.formData = res
    },
    async saveUserDetailById() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.formData)
        this.$message.success('更新成功')
      } catch (e) {
        console.log(e)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
