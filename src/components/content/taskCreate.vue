<template>
  <div>
    <template v-if="createTaskDialogVisible">
      <el-dialog
        custom-class="create-task-dialog"
        :title="dialogTitle"
        :visible.sync="createTaskDialogVisible"
        width="80%"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <createTaskIndex @closeDialog="closeDialog"></createTaskIndex>
      </el-dialog>
    </template>

    <section class="container-wrapper">
      <div class="list-wrapper">
        <template v-for="(item, index) in authList">
          <div
            class="item"
            :key="index"
            @click="tap(item.procID, item.busiessName)"
          >{{item.busiessName}}</div>
        </template>
      </div>
    </section>
  </div>
</template>
<script>
import createTaskIndex from "@/components/content/createTaskIndex";

export default {
  components: { createTaskIndex },
  data() {
    return {
      createTaskDialogVisible: false,
      procID: "",
      authList: []
    };
  },
  created() {
    this.getAuthList();
  },
  computed: {
    dialogTitle() {
      return this.$store.state.moduleHead.createTaskStepTitle;
    }
  },
  methods: {
    handleClose() {
      this.createTaskDialogVisible = false;
    },
    tap(procID, processName) {
      let jsonObj = {
          task: {
            procID: procID
          }
        },
        jsonStr = JSON.stringify(jsonObj),
        pathArr = [],
        pageNameArr = [],
        pageCheckArr = [];

      this.$http
        .post(
          process.env.ROOT_API + "guide/getFormList",
          { jsonStr: jsonStr },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              res.data.forEach(item => {
                pageNameArr.push(item.pageName);
                pathArr.push("/" + item.pagePath.slice(0, -5));
                pageCheckArr.push(item.checkValidRule);
              });

              let selRowDataJSON = {
                task: {
                  procID: procID,
                  serialNO: 0,
                  processName: processName
                },
                pathArr: pathArr,
                pageNameArr: pageNameArr,
                pageCheckArr: pageCheckArr
              };
              this.createTaskDialogVisible = true;
              this.$store.commit("changeSelRow", {
                selRowDataJSON: selRowDataJSON
              });
              // this.selRowDataStr = selRowDataJSON;
            } else {
              this.$message({
                type: "error",
                message: "创建失败"
              });
            }
          },
          err => {
            this.$message({
              type: "error",
              message: "创建失败"
            });
            throw new Error(err);
          }
        );
    },
    // 获取任务流程列表
    getAuthList() {
      this.$http.get(process.env.ROOT_API + "auth/getAuthList.do").then(
        res => {
          res = JSON.parse(res.bodyText);
          if (res.success) {
            this.authList = res.data;
          }
        },
        err => {
          this.$message.error("获取任务流程列表失败");
          throw new Error(err);
        }
      );
    },
    closeDialog() {
      this.handleClose();
      this.$store.commit("changeMenuItemName", { menuItemName: "正在办理" });
      this.$emit("defaultActive");
      this.$router.push("/task-processing?actType=2");
    }
  }
};
</script>
<style>
.create-task-dialog {
  height: 600px;
}
</style>

<style lang="scss" scoped>
.container-wrapper {
  .list-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .item {
      margin-top: 10px;
      padding: 8px 0;
      width: 40%;
      text-align: center;
      background: rgba(242, 242, 242, 1);
      cursor: pointer;
    }
  }
}
</style>
