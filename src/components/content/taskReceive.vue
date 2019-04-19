<template>
  <div>
    <div class="row">
      <div class="btns-wrapper">
        <button class="btn" @click="receive">接收</button>
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
const columns = [
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
    width: "100"
  },
  {
    prop: "actName",
    label: "环节名称",
    width: "100"
  },
  {
    prop: "serialNO",
    label: "案件编号",
    width: "200"
  },
  {
    prop: "appMan",
    label: "申请人",
    width: "100"
  },
  {
    prop: "location",
    label: "坐落",
    width: "100"
  },
  {
    prop: "strTaskStatus",
    label: "流程状态",
    width: "100"
  }
];
export default {
  data() {
    return {
      url:
        process.env.ROOT_API +
        "task/getTaskList?actType=" +
        this.$route.query.actType,
      columns: columns,
      pager: {
        curPage: 1,
        pageSizes: [5],
        pageSize: 5
      },
      selectData: [],
      searchVal: ""
    };
  },
  methods: {
    check(selection, row) {
      this.selectData = selection;
    },
    checkAll(selection) {
      this.selectData = selection;
    },
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
    receive() {
      if (this.selectData.length) {
        let taskListString = [];

        this.selectData.forEach(item => {
          let obj = {
            procID: item.procID,
            type: "AcceptTask",
            taskID: item.taskID,
            actID: item.actID,
            procInstanceID: item.procInstanceID
          };

          taskListString.push(obj);

          this.$http
            .post(
              process.env.ROOT_API + "task/changeTask",
              { taskListString: JSON.stringify(taskListString) },
              { emulateJSON: true }
            )
            .then(
              res => {
                res = JSON.parse(res.bodyText);
                if (res.success) {
                  this.$message({ type: "success", message: "接收成功" });
                  this.url =
                    process.env.ROOT_API +
                    "task/getTaskList?actType=" +
                    this.$route.query.actType +
                    "&random=" +
                    Math.random();
                } else {
                  this.$message.error("接收失败");
                }
              },
              err => {
                this.$message.error("接收失败");
                throw new Error(err);
              }
            );
        });
      } else {
        this.$message.error("请至少选中一条");
      }
    }
  }
};
</script>
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
