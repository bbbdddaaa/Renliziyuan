<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon icon-class="eye-open" />
    <UploadExcel :on-success="handleSuccess" :before-upload="beforeUpload" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadExcel from '@/components/UploadExcel'
export default {
  name: 'Dashboard',
  components: {
    UploadExcel
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSuccess(data) {
      console.log(data)
    },
    beforeUpload(file) {
      console.log(file)
      if (file.size > 1024) {
        this.$message.error('too Big')
        return false
      }
      return true
    }
  }
  // async created() {
  //   const res = await this.$store.dispatch('user/getUserInfo')
  //   console.log(res)
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

</style>
