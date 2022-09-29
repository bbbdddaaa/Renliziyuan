<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理111" name="first">
          <el-row :gutter="10">
            <el-row type="flex" align="middle" style="height:60px">
              <el-button type="primary" style="margin-left:10px" icon="el-icon-plus" size="small" @click="dialogVisible = true"> 新增角色 </el-button>
            </el-row>
            <el-table v-loading="loading" :data="roleList">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作" width="240">
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRow(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination
                type
                background
                layout="prev, pager, next, sizes"
                :total="total"
                :current-page.sync="page.page"
                :page-size.sync="page.pagesize"
                :page-sizes="[2,5,10,15]"
                @current-change="getRoleList"
                @size-change="getRoleList"
              />
            </el-row>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <!-- <el-alert
            title="消息提示的文案"
            type="info"
            show-icon
          /> -->
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form :model="companyInfo" label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import addRole from './component/addRole.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      dialogVisible: false,
      companyInfo: {}
    }
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        console.log(total)
        this.total = total
        this.roleList = rows
        if (total > 0 && rows.length === 0) {
          this.page.page = this.page.page - 1
          this.getRoleList()
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    // 点击事件
    editRole(row) {
      console.log(row)
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
    },
    // 删除角色
    async delRow(id) {
      // this.$confirm('确认删除该角色吗?', '提示', {
      //   confirmButtonText: '确认',
      //   confirmButtonClass: '取消',
      //   type: 'warning'
      // }).then(success => {
      //   console.log(success)
      // }).catch(cancel => {
      //   console.log(cancel)
      // })
      try {
        await this.$confirm('确认删除该角色吗?', '提示', {
          confirmButtonText: '确认',
          confirmButtonClass: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRoleList()
        console.log('sucess')
      } catch (error) {
        console.log('cancel')
      }
    },
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.$store.getters.companyId)
      console.log(this.companyInfo)
    }
  }
}
</script>

<style>

</style>
