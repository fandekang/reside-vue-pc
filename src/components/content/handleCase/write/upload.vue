<template>
  <div>
    <!-- <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleChange"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">选择文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>-->
    <div>
      <input type="file" @change="change">
    </div>
    <div class="bottom-btn">
      <button type="button" class="submit" @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: {}
    };
  },
  props: {
    id: String
  },
  methods: {
    change(event) {
      this.file = event.target.files[0];
    },
    submit() {
      let formData = new FormData();

      if (this.file.name) {
        formData.append("id", this.id);
        formData.append("serialNo", this.$route.query.serialNO);
        formData.append("file", this.file);
      } else {
        this.$message.error("请选择要上传的文件");
      }

      this.$http.post(process.env.ROOT_API + 'recdata/uploadRecdata', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(
          res => {
              res = JSON.parse(res.bodyText)
              if (res.success) {
                  this.$message({type: 'success', message: '上传成功'})
                  this.$emit('refresh')
              } else {
                  this.$message.error('上传失败')
              }
          },
          err => {
              this.$message.error('上传失败')
              throw new Error(err)
          }
      )
    }
  }
};
</script>
<style lang="scss" scoped>
.bottom-btn {
  margin-top: 20px;
  .submit {
    padding: 8px 40px;
    border: none;
    outline: none;
    border-radius: 6px;
    background-color: rgba(131, 81, 208, 1);
    color: #fff;
    cursor: pointer;
  }
}
</style>
