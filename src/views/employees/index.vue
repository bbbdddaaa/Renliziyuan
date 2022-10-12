<template>
  <div>
    <!-- <PageTools type="success">
      <template #before>
        <span>共25条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </PageTools> -->
    <template>
      <div class="app-container">
        <PageTools :show-before="true">
          <span slot="before">共166条记录</span>
          <template slot="after">
            <el-button size="small" type="warning" @click="$router.push('/imoprt')">导入</el-button>
            <el-button size="small" type="danger" @click="exportExcel()">导出</el-button>
            <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
          </template>
        </PageTools>
        <!-- 放置表格和分页 -->
        <el-card>
          <el-table v-loading="loading" border :data="list">
            <el-table-column label="序号" sortable="" width="80" type="index" />
            <el-table-column label="姓名" prop="username" />
            <el-table-column label="工号" prop="workNumber" />
            <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
            <el-table-column label="部门" prop="departmentName" />
            <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
              <template slot-scope="{row}">
                {{ row.timeOfEntry | formatDate }}
              </template>
            </el-table-column>
            <el-table-column label="账户状态" prop="enableState">
              <template slot-scope="{row}">
                <el-switch :value="row.enableState ===1" />
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="280">
              <template slot-scope="{row}">
                <el-button type="text" size="small">查看</el-button>
                <el-button type="text" size="small">转正</el-button>
                <el-button type="text" size="small">调岗</el-button>
                <el-button type="text" size="small">离职</el-button>
                <el-button type="text" size="small">角色</el-button>
                <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row type="flex" justify="end" align="middle" style="height: 60px">
            <el-pagination
              background
              layout="prev, pager, next, sizes, total"
              :current-page.sync="page.page"
              :page-size.sync="page.size"
              :page-sizes="[5,10,15,20]"
              :total="total"
              @current-change="getEmployeeList"
              @size-change="getEmployeeList"
            />
          </el-row>
        </el-card>
      </div>
    </template>
    <addEmployee :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import addEmployee from './component/add-employee.vue'
import EnuHireType from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employee'
export default {
  components: {
    addEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnuHireType.hireType,
      dialogVisible: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const res = await getEmployeeList(this.page)
        this.list = res.rows
        this.total = res.total
        console.log(this.list)
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue) {
      // console.log(row, column, cellValue)
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res && res.value || this.hireType[1].value
    },
    handleEmploy() {
      // 点击的时候  需要弹出新增员工的弹窗
      this.dialogVisible = true
    },
    async del(id) {
      try {
        await this.$confirm('确认删除该员工吗？', '提示', { type: 'warning' })
        await delEmployee(id)
        this.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    },
    async exportExcel() {
      // 文件懒加载
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      // console.log(rows)
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map(item => {
        return header.map(key => {
          if (key === '聘用形式') {
            const find = this.hireType.find(hire => {
              return hire.id === item[exportExcelMapPath[key]]
            })
            return find ? find.value : '未知'
          }
          return item[exportExcelMapPath[key]]
        })
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          multiHeader: [['手机号', '核心信息', '', '', '', '其他信息', '']],
          merges: ['A1:A2', 'B1:E1', 'F1:G1'],
          header,
          data,
          filename: 'excel-list',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    }
  }
}
</script>

<style>

</style>
