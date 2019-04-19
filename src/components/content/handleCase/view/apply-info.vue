<template>
  <div>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label">姓名</label>
        <div class="down">
          <input type="text" v-model="form.name">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">身份证</label>
        <div class="down">
          <input type="text" v-model="form.cardID" placeholder="请输入相应的身份证格式">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">年龄</label>
        <div class="down">
          <input type="text" v-model="form.age" placeholder="请输入0-150 的数字">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">性别</label>
        <div class="down">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">户主姓名</label>
        <div class="down">
          <input type="text" v-model="form.headname">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">户主身份证</label>
        <div class="down">
          <input type="text" v-model="form.headcardid" placeholder="请输入相应的身份证格式">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">户主年龄</label>
        <div class="down">
          <input type="text" v-model="form.headage" placeholder="请输入0-150 的数字">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">户主性别</label>
        <div class="down">
          <el-radio-group v-model="form.headsex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">房屋坐落</label>
        <div class="down">
          <input type="text" v-model="form.roomlocation" placeholder="XXX市（县）XXX街道（乡镇）XXX社区（村委会）XXX街（巷）xxx号XXXX楼XXX室">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">房屋面积(㎡)</label>
        <div class="down">
          <input type="text" v-model="form.roomaera" placeholder="数字，可带两位小数点">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">是否合租</label>
        <div class="down">
          <el-radio-group v-model="form.isrent">
            <el-radio label="y">是</el-radio>
            <el-radio label="n">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">户型</label>
        <div class="down">
          <input type="text" v-model="form.roommode" placeholder="如 平层户型、跃层户型、错层户型户">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">房产证号</label>
        <div class="down">
          <input type="text" v-model="form.roomcard">
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        cardID: "",
        age: "",
        sex: "男",
        headcardid: '',
        headage: '',
        roomlocation: '',
        roomaera: '',
        roommode: '',
        roomcard: '',
        headsex: '男',
        isrent: 'y'
      }
    };
  },
  created() {
    this.getData()
  },
  methods: {

    getData() {
      this.$http.post(process.env.ROOT_API + 'recandappform/getRecByCasenum', {casenum: this.$route.query.serialNO}, {emulateJSON: true})
      .then(
        res => {
          res = JSON.parse(res.bodyText)
          if (res.success) {
            if (res.data !== null) {
              this.form.name = res.data.name
              this.form.cardID = res.data.cardID
              this.form.age = res.data.age
              this.form.sex = res.data.sex
              this.form.headcardid = res.data.headcardid
              this.form.headage = res.data.headage
              this.form.roomlocation = res.data.roomlocation
              this.form.roomaera = res.data.roomaera
              this.form.roommode = res.data.roommode
              this.form.roomcard = res.data.roomcard
              this.form.headsex = res.data.headsex
              this.form.isrent = res.data.isrent
            }
          }
        },
        err => {
          this.$message.error('获取申请表失败')
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
</style>
