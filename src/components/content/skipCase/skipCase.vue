<template>
  <div>
    <div class="item" v-if="staffArr.length">
      <span class="btn" ref="btn1" @click="check1()"></span>
      <el-dropdown class="info disabled" trigger="click" @command="select">
        <span class="el-dropdown-link" v-show="visible">
          {{name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <template v-for="item in staffArr">
            <el-dropdown-item :key="item.staffID" :command="item">{{item.staffName}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="item">
      <span class="btn el-icon-check" ref="btn2" @click="check2()"></span>
      <span class="info">转到待接收列表</span>
    </div>

    <div class="bottom-btn">
      <button type="button" class="submit" @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      staffID: "",
      staffArr: [], // 人员列表
      name: "转到指定人员",
      visible: false
    };
  },
  created() {
    if (this.data.length == 1) {
      this.getAllStaff();
    } else if (this.data.length > 1) {
    }
  },
  methods: {
    check1() {
      if (this.$refs.btn1.className.indexOf("el-icon-check") < 0) {
        this.$refs.btn1.className = "btn el-icon-check";
        this.$refs.btn2.className = "btn";
        this.$refs.btn1.nextElementSibling.className = "info";
        this.$refs.btn2.nextElementSibling.className = "info disabled";
        this.visible = true;
      }
    },
    check2() {
      if (this.$refs.btn2.className.indexOf("el-icon-check") < 0) {
        this.$refs.btn2.className = "btn el-icon-check";
        this.$refs.btn1.className = "btn";
        this.$refs.btn1.nextElementSibling.className = "info disabled";
        this.$refs.btn2.nextElementSibling.className = "info";
        this.visible = false;
        this.name = "转到指定人员";
      }
    },
    select(item) {
      this.staffID = item.staffID;
      this.name = item.staffName;
    },
    getAllStaff() {
      let param = {
        random: Math.random(),
        actID: this.data[0].actID,
        serialNO: this.data[0].serialNO
      };
      console.log(param);
      this.$http
        .post(process.env.ROOT_API + "task/getAllStaff", param, {
          emulateJSON: true
        })
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            this.staffArr = res.data;
          },
          err => {
            throw new Error(err);
          }
        );
    },
    submit() {
      let arr = [];
      if (this.data.length == 1) {
        let obj = {
          procID: this.data[0].procID,
          nextStaffID: this.staffID,
          type: "SendTask",
          taskID: this.data[0].taskID,
          actID: this.data[0].actID,
          procInstanceID: this.data[0].procInstanceID
        };
        arr.push(obj);
      } else if (this.data.length > 1) {
        this.data.map(item => {
          let obj = {
            procID: item.procID,
            type: "SendTask",
            taskID: item.taskID,
            actID: item.actID,
            procInstanceID: item.procInstanceID
          };
          arr.push(obj);
        });
      }

      this.$http
        .post(
          process.env.ROOT_API + "task/changeTask",
          { taskListString: JSON.stringify(arr) },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$message({ type: "success", message: "转件成功" });
              this.$emit('refresh')
            } else {
              this.$message.error("转件失败");
            }
          },
          err => {
            this.$message.error("转件失败");
            throw new Error(err);
          }
        );
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  margin: 5px 0;
  height: 30px;
  line-height: 30px;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 100%;
    font-weight: 700;
    background: rgba(131, 81, 208, 1);
    color: #fff;
    cursor: pointer;
  }
  .el-icon-check::before {
    font-size: 16px;
    font-weight: 700;
  }
  .info {
    flex: 1;
    height: 100%;
    text-align: center;
    background: rgba(226, 226, 226, 1);
    color: #333;
  }
  .disabled {
    color: #ccc;
    cursor: not-allowed;
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
