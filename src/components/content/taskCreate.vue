<template>
  <div>
    <el-dialog
        custom-class="create-task-dialog"
        :title="dialogTitle"
        :visible.sync="createTaskDialogVisible"
        width="80%"
        :close-on-click-modal="false"
        :before-close="handleClose"
    >
      <createTaskIndex v-if="createTaskDialogVisible" :selRowDataStr="selRowDataStr"></createTaskIndex>
    </el-dialog>
    <section class="container-wrapper">
      <div class="list-wrapper">
        <template v-for="item in authList">
          <div
            class="item"
            :key="item.procID"
            @click="tap(item.procID, item.actID, item.busiessName)"
          >{{item.busiessName}}</div>
        </template>
      </div>
    </section>
  </div>
</template>
<script>
import createTaskIndex from "@/components/content/createTaskIndex";

export default {
  name: "taskCreate",
  components: { createTaskIndex },
  data() {
    return {
      procID: "",
      actID: "",
      selRowDataStr: "",
      dialogTitle: "居住证办理一申请人",
      authList: [
        { procID: 1, actID: 1, busiessName: "居住证首次登记" },
        { procID: 2, actID: 2, busiessName: "居住证转移登记" },
        { procID: 3, actID: 3, busiessName: "居住证变更登记" }
      ]
    };
  },
  computed: {
    createTaskDialogVisible: {
      get() {
        return this.$store.state.moduleDialog.createTaskDialogVisible;
      },
      set(visible) {
        this.$store.commit("toggleCreateTaskDialog", {
          createTaskDialogVisible: visible
        });
      }
    }
  },
  methods: {
    handleClose() {
        this.$store.commit("toggleCreateTaskDialog", {
          createTaskDialogVisible: false
        });
    },
    tap(procID, actID, processName) {
      let selRowDataJSON = {
        task: {
          procID: 1,
          serialNO: 0,
          processName: '居住证办理'
        },
        pathArr: [
            '/buyer',
            '/seller',
            '/houseroom',
            '/createsummary'
        ],
        pageNameArr: ["申请人", "户主", "房屋", "汇总"],
        pageCheckArr: ["", "", ""]
      };
    //   this.selRowDataStr = JSON.stringify(selRowDataJSON);
      this.selRowDataStr = selRowDataJSON;
      this.$store.commit("toggleCreateTaskDialog", {
        createTaskDialogVisible: true
      });
      //   let jsonObj = {
      //       task: {
      //         procID: procID
      //       }
      //     },
      //     jsonStr = JSON.stringify(jsonObj),
      //     pathArr = [],
      //     pageNameArr = [],
      //     pageCheckArr = [];

      //   this.$http
      //     .post(process.env.ROOT_API + "guide/getFormList", { jsonStr: jsonStr })
      //     .then(
      //       res => {
      //         if (res.success) {
      //           res.data.map(item => {
      //             pageNameArr.push(item.pageName);
      //             pathArr.push(item.pagePath);
      //             pageCheckArr.push(item.checkValidRule);
      //           });

      //           let selRowDataJSON = {
      //             task: {
      //               procID: procID,
      //               serialNO: 0,
      //               processName: processName
      //             },
      //             pathArr: pathArr,
      //             pageNameArr: pageNameArr,
      //             pageCheckArr: pageCheckArr
      //           };
      //           this.selRowDataStr = JSON.stringify(selRowDataJSON);
      //         } else {
      //             this.$message({
      //                 type: 'error',
      //                 message: '创建失败'
      //             })
      //         }
      //       },
      //       err => {
      //           throw new Error(err)
      //       }
      //     );
    }
  }
};
</script>
<style>
.create-task-dialog {
    height: 75%;
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
