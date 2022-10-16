<template>
  <div>
    <el-upload
      v-loading="loading"
      class="upload"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="HttpRequest"
      :limit="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <img style="width:100%" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  // id 和 key 由后端提供  axios发请求
  SecretId: 'AKIDSwLesz1xpbFk5IQPFxDLKBvZ5ShnjWB5',
  SecretKey: 'ufKrIbkmkbOqIh2JSTM7jEbpwwqeMuMg'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      dialogVisible: false,
      previewImgUrl: '',
      loading: false
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({ name: 'default', url: this.defaultUrl })
    }
  },
  methods: {
    onPreview(file) {
      console.log(file)
      this.dialogVisible = true
      this.previewImgUrl = file.url
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    HttpRequest(file) {
      this.loading = true
      cos.putObject({
        Bucket: 'hz-33-1314348454', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // error 上传失败的信息 如果上传成功 err为null
        // console.log(err || data)
        if (err) return this.$message.error('上传失败')
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'http://' + data.Location
        })
      })
    },
    beforeUpload(file) {
      const allowType = ['image/jpeg', 'image/jpg']
      if (!allowType.includes(file.type)) {
        this.$message.error('只能上传' + allowType.join(',') + '类型')
        return false
      }

      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能超过1mb')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload{
    width: 148px;
    height: 148px;
    overflow: hidden;
  }
</style>
