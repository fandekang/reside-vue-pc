<template>
  <div>
    <router-view></router-view>
    <template v-if="skipDialogVisible">
      <el-dialog
        custom-class="custom-dialog"
        title="转件"
        :visible.sync="skipDialogVisible"
        width="30%"
        :close-on-click-modal="false"
        :before-close="beforeCloseEvent"
      >
        <skip-case :data="selectData" @refresh="skipRefresh"></skip-case>
      </el-dialog>
    </template>
    <div class="row">
      <div class="btns-wrapper">
        <button class="btn" @click="skipCase">转件</button>
        <button class="btn" @click="backCase">退件</button>
        <button class="btn" @click="cancelCase">撤件</button>
      </div>
      <div class="search-wrapper">
        <input
          type="text"
          class="input"
          v-model="searchVal"
          @keyup.enter="search"
          placeholder="请输入案件号搜索"
        >
        <button class="btn" @click="search">搜索</button>
      </div>
    </div>
    <grid-wrapper
      ref="multipleTable"
      height="350"
      :data-url="url"
      :columns="columns"
      :pager="pager"
      @select="check"
      @select-all="checkAll"
    ></grid-wrapper>
  </div>
</template>
<script>
import skipCase from "@/components/content/skipCase/skipCase";

export default {
  components: {
    skipCase
  },
  data() {
    return {
      url:
        process.env.ROOT_API +
        "task/getTaskList?actType=" +
        this.$route.query.actType,
      columns: [
        {
          type: "selection",
          width: "55",
          fixed: "left"
        },
        {
          prop: "procID",
          label: "procID",
          width: "100",
          hidden: true
        },
        {
          prop: "actID",
          label: "actID",
          width: "100",
          hidden: true
        },
        {
          prop: "procInstanceID",
          label: "procInstanceID",
          width: "100",
          hidden: true
        },
        {
          prop: "taskID",
          label: "taskID",
          width: "100",
          hidden: true
        },
        {
          prop: "processName",
          label: "流程名称",
          width: "100",
          fixed: "left"
        },
        {
          prop: "actName",
          label: "环节名称",
          width: "100"
        },
        {
          prop: "serialNO",
          label: "案件编号",
          width: "150"
          // hidden: true
        },
        {
          prop: "appMan",
          label: "申请人",
          width: "100"
        },
        {
          prop: "location",
          label: "坐落",
          width: "200"
        },
        {
          prop: "strTaskStatus",
          label: "流程状态",
          width: "100"
        },
        {
          prop: "action",
          label: "操作",
          width: "100",
          // fixed: "right",
          action: [
            {
              text: "办理",
              size: "small",
              handler: this.handleEvent
            }
          ]
        }
      ],
      pager: {
        curPage: 1,
        pageSizes: [5],
        pageSize: 5
      },
      searchVal: "",
      selectData: [],
      skipDialogVisible: false
      // dialogTitle: ""
    };
  },
  mounted() {
    // this.actType = this.$route.query.actType
    // console.log(this.$route);
  },
  methods: {
    // 转件成功后刷新
    skipRefresh() {
      this.url =
        process.env.ROOT_API +
        "task/getTaskList?actType=" +
        this.$route.query.actType +
        "&random=" +
        Math.random();
      this.beforeCloseEvent();
    },
    checkAll(selection) {
      this.selectData = selection;
      // this.$refs.multipleTable.$refs.elTable.clearSelection();
    },
    check(selection, row) {
      this.selectData = selection;
    },
    // 点击搜索按钮
    search() {
      let searchVal = this.searchVal,
        searchFields = JSON.stringify(["serialNO"]);
      this.url =
        process.env.ROOT_API +
        "task/getTaskList?actType=" +
        this.$route.query.actType +
        "&searchFields=" +
        searchFields +
        "&searchVal=" +
        searchVal;
    },
    // 点击行操作中的办理按钮
    handleEvent(row) {
      if (row.actID == 7 || row.actID == 19) {
        this.$router.push({
          path: "/handleWrite",
          query: {
            actID: row.actID,
            serialNO: row.serialNO
          }
        });
      } else if (row.actID == 8 || row.actID == 21) {
        // alert('缮证')
        this.$router.push({
          path: "/handleView",
          query: {
            actID: row.actID,
            serialNO: row.serialNO
          }
        });
      }
    },
    // 弹出框自定义关闭事件
    beforeCloseEvent() {
      this.skipDialogVisible = false;
    },
    // 转件
    skipCase() {
      if (this.selectData.length) {
        this.selectData.forEach(item => {
          if (item.actID == 7 || item.actID == 19) {
            this.skipDialogVisible = true;
          } else {
            this.$message.error("该环节不能办理转件");
          }
        });
      } else {
        this.$message.error("请选择一条或多条");
      }
    },
    // 退件
    backCase() {
      if (this.selectData.length) {
        if (this.selectData.length > 1) {
          this.$message.error("只能选择一条");
        } else {
          let res = this.selectData.every(
            item => item.actID == 7 || item.actID == 19
          );

          if (res) {
            this.$message.error("该环节不能办理退件");
          } else {
            let arr = [];
            this.selectData.forEach(item => {
              let obj = {
                procID: item.procID,
                type: "BackTask",
                taskID: item.taskID,
                procInstanceID: item.procInstanceID
              };
              arr.push(obj);
            });

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
                    this.$message({ type: "success", message: "退件成功" });
                    this.url =
                      process.env.ROOT_API +
                      "task/getTaskList?actType=" +
                      this.$route.query.actType +
                      "&random=" +
                      Math.random();
                  } else {
                    this.$message.error("退件失败");
                  }
                },
                err => {
                  this.$message.error("退件失败");
                  throw new Error(err);
                }
              );
          }
        }
      } else {
        this.$message.error("请选择一条");
      }

      // if (row.actID == 8 || row.actID == 21) {
      //   // alert('缮证')

      // }
    },
    // 撤件
    cancelCase() {
      let arr = [];
      if (this.selectData.length) {
        this.selectData.forEach(item => {
          let obj = {
            procID: item.procID,
            serialNO: item.serialNO,
            type: "UnRegistApp",
            taskID: item.taskID,
            actID: item.actID,
            procInstanceID: item.procInstanceID
          };
          arr.push(obj);
        });

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
                this.$message({ type: "success", message: "撤件成功" });
                this.url =
                  process.env.ROOT_API +
                  "task/getTaskList?actType=" +
                  this.$route.query.actType +
                  "&random=" +
                  Math.random();
              } else {
                this.$message.error("撤件失败");
              }
            },
            err => {
              this.$message.error("撤件失败");
              throw new Error(err);
            }
          );
      } else {
        this.$message.error("请选择一条或多条");
      }
    }
  }
};
</script>

<style scoped>
.custom-dialog {
  height: 50% !important;
}
</style>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  .btns-wrapper {
    .btn {
      padding: 8px 20px;
      margin-right: 20px;
      border: none;
      outline: none;
      background-color: rgba(242, 242, 242, 1);
      box-shadow: 3px 3px 3px rgba(226, 226, 226, 1);
      cursor: pointer;
    }
  }
  .search-wrapper {
    height: 30px;
    border-radius: 30px;
    overflow: hidden;
    font-size: 0;
    .input {
      display: inline-block;
      height: 100%;
      text-indent: 10px;
      border: none;
      outline: none;
      background-color: rgba(226, 226, 226, 1);
    }
    .input:focus {
      background-color: rgba(226, 226, 226, 0.6);
    }
    .btn {
      display: inline-block;
      width: 50px;
      height: 100%;
      border: none;
      outline: none;
      background-color: rgba(131, 81, 208, 1);
      color: #fff;
      cursor: pointer;
    }
    .btn:hover {
      background-color: rgba(131, 81, 208, 0.7);
    }
  }
}
</style>
