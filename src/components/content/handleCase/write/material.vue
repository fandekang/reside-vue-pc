<template>
  <div style="margin-top: 20px;">
    <template v-if="addDialogVisible">
      <el-dialog
        title="添加材料"
        :visible.sync="addDialogVisible"
        width="70%"
        :close-on-click-modal="false"
        :before-close="addDialogCloseEvent"
      >
        <material-add @refresh="refresh"></material-add>
      </el-dialog>
    </template>
    <template v-if="editDialogVisible">
      <el-dialog
        title="修改材料"
        :visible.sync="editDialogVisible"
        width="70%"
        :close-on-click-modal="false"
        :before-close="editDialogCloseEvent"
      >
        <material-edit :id="currentRow.id" :casenum="currentRow.casenum" @refresh="editRefresh"></material-edit>
      </el-dialog>
    </template>
    <template v-if="uploadDialogVisible">
      <el-dialog
        title="文件上传"
        :visible.sync="uploadDialogVisible"
        width="50%"
        :close-on-click-modal="false"
        :before-close="uploadDialogCloseEvent"
      >
        <upload :id="currentRow.id" @refresh="uploadRefresh"></upload>
      </el-dialog>
    </template>
    <div class="row">
      <div class="btns-wrapper">
        <button class="btn" @click="add">添加</button>
        <button class="btn" @click="del">删除</button>
        <button class="btn" @click="edit">修改</button>
      </div>
      <div class="search-wrapper">
        <input
          type="text"
          class="input"
          v-model="searchVal"
          @keyup.enter="search"
          placeholder="请输入材料编号"
        >
        <button class="btn" @click="search">搜索</button>
      </div>
    </div>
    <grid-wrapper
      ref="materialTable"
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
import materialAdd from "@/components/content/handleCase/write/material-add";
import materialEdit from "@/components/content/handleCase/write/material-edit";
import upload from "@/components/content/handleCase/write/upload";

export default {
  components: {
    materialAdd,
    materialEdit,
    upload
  },
  data() {
    return {
      url:
        process.env.ROOT_API +
        "recdata/getRecdataList?serialNO=" +
        this.$route.query.serialNO,
      columns: [
        {
          type: "selection",
          width: "55",
          fixed: "left"
        },
        {
          prop: "actID",
          label: "actID",
          width: "100",
          hidden: true
        },
        {
          prop: "id",
          label: "id",
          width: "100",
          hidden: true
        },
        {
          prop: "datano",
          label: "材料编号",
          width: "200"
          // fixed: "left"
        },
        {
          prop: "dataname",
          label: "材料名称",
          width: "200"
        },
        {
          prop: "datatype",
          label: "是否原件",
          width: "100",
          formater: function(val) {
            if (val == 1) {
              return "是";
            } else {
              return "否";
            }
          }
        },
        {
          prop: "action",
          label: "操作",
          width: "150",
          // fixed: "right",
          action: [
            {
              text: "预览",
              size: "small",
              handler: this.preview
            },
            {
              text: "文件上传",
              size: "small",
              handler: this.fileUpload
            }
          ]
        }
      ],
      pager: {
        pageSizes: [5],
        pageSize: 5
      },
      searchVal: "",
      selectData: [], // 选择复选框，选择的行数据
      currentRow: {}, // 当前行的数据
      addDialogVisible: false,
      editDialogVisible: false,
      uploadDialogVisible: false
    };
  },
  watch: {},
  methods: {
    add() {
      this.addDialogVisible = true;
    },
    edit() {
      if (this.selectData.length == 1) {
        this.currentRow = this.selectData[0];
        this.editDialogVisible = true;
      } else {
        this.$message.error("请选择一条数据");
        this.$refs.materialTable.$refs.elTable.clearSelection();
      }
    },
    del() {
      let ids = [];
      this.selectData.map(item => {
        ids.push(item.id);
      });
      ids = JSON.stringify(ids);

      this.$http
        .post(
          process.env.ROOT_API + "recdata/deleteObj",
          { ids: ids },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$message({ type: "success", message: "删除成功" });
              this.url =
                process.env.ROOT_API +
                "recdata/getRecdataList?serialNO=" +
                this.$route.query.serialNO +
                "&random=" +
                Math.random();
            } else {
              this.$message.error("删除失败");
            }
          },
          err => {
            this.$message.error("删除失败");
            throw new Error(err);
          }
        );
    },
    editRefresh() {
      this.url =
        process.env.ROOT_API +
        "recdata/getRecdataList?serialNO=" +
        this.$route.query.serialNO +
        "&random=" +
        Math.random();
      this.editDialogCloseEvent();
    },
    // 添加材料成功刷新
    refresh() {
      this.url =
        process.env.ROOT_API +
        "recdata/getRecdataList?serialNO=" +
        this.$route.query.serialNO +
        "&random=" +
        Math.random();
      this.addDialogCloseEvent();
    },
    // 文件上传成功刷新
    uploadRefresh() {
      this.url =
        process.env.ROOT_API +
        "recdata/getRecdataList?serialNO=" +
        this.$route.query.serialNO +
        "&random=" +
        Math.random();
      this.uploadDialogCloseEvent();
    },
    checkAll(selection) {
      this.selectData = selection;
    },
    check(selection, row) {
      this.selectData = selection;
    },
    // 点击搜索按钮
    search() {
      let searchVal = this.searchVal,
        searchFields = JSON.stringify(["datano"]);

      this.url =
        process.env.ROOT_API +
        "recdata/getRecdataList?serialNO=" +
        this.$route.query.serialNO +
        "&searchFields" +
        searchFields +
        "&searchVal=" +
        searchVal;
    },
    // 点击行操作中的办理
    preview(row) {
      if (row.storepath) {
        window.open(
          process.env.ROOT_API +
            "recdata/previewRecdata?id=" +
            row.id +
            "&random=" +
            Math.random()
        );
      } else {
        this.$message({ type: "info", message: "该项没有文件" });
      }
    },
    // 文件上传
    fileUpload(row) {
      this.currentRow = row;
      this.uploadDialogVisible = true;
    },
    // 添加框关闭事件
    addDialogCloseEvent() {
      this.addDialogVisible = false;
    },
    // 修改框关闭事件
    editDialogCloseEvent() {
      this.editDialogVisible = false;
    },
    // 上传框关闭事件
    uploadDialogCloseEvent() {
      this.uploadDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
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
