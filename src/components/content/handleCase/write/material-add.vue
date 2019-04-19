<template>
  <div>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label">材料编号</label>
        <div class="down">
          <input type="text" v-model="form.datano">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">材料名称</label>
        <div class="down">
          <input type="text" v-model="form.dataname">
        </div>
      </div>

      <div class="form-group">
        <div class="down">
          <el-radio-group v-model="form.datatype">
            <el-radio label="1">原件</el-radio>
            <el-radio label="2">复印件</el-radio>
          </el-radio-group>
        </div>
      </div>
    </form>
    
    <div class="bottom-btn">
      <button type="button" class="submit" @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        datano: "",
        datatype: "1",
        dataname: ""
      }
    };
  },
  methods: {
    submit() {
        let param = {
            id: null,
            casenum: this.$route.query.serialNO,
            datano: this.form.datano,
            dataname: this.form.dataname,
            datatype: this.form.datatype,
            statue: null,
            storepath: ''
        }
        param = JSON.stringify(param)

        this.$http.post(process.env.ROOT_API + 'recdata/addObj', {addRecString: param}, {emulateJSON: true})
        .then(
            res => {
                res = JSON.parse(res.bodyText)
                if (res.success) {
                    this.$emit('refresh')
                    this.$message({type: 'success', message: '提交成功'})
                } else {
                    this.$message.error('提交失败')
                }
            },
            err => {
                this.$message.error('提交失败')
                throw new Error(err)
            }
        )
    }
  }
};
</script>
<style lang="scss" scoped>
.form-horizontal {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  .form-group {
    width: 45%;
    margin: 10px 0;
    .control-label {
      font-weight: 700;
    }
    .down {
      margin-top: 10px;
      display: flex;
      input[type="text"] {
        display: inline-block;
        padding: 6px 8px;
        width: 100%;
        outline: none;
        border-radius: 4px;
        border: 1px solid rgba(204, 204, 204, 1);
      }
    }
  }
}
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
