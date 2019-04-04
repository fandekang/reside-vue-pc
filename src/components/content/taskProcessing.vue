<template>
  <div>
    <router-view></router-view>
    <template v-if="dialogVisible">
      <el-dialog
        custom-class="custom-dialog"
        title="转件"
        :visible.sync="dialogVisible"
        width="40%"
        :close-on-click-modal="false"
        :before-close="beforeCloseEvent"
      >
        <div class="111">11111</div>
        <div class="222">22222222</div>
      </el-dialog>
    </template>
    <div class="row">
      <div class="btns-wrapper">
        <button class="btn" @click="skip">转件</button>
        <button class="btn">退件</button>
        <button class="btn">撤件</button>
      </div>
      <div class="search-wrapper">
        <input type="text" class="input" v-model="searchVal" @keyup.enter="search">
        <button class="btn" @click="search">搜索</button>
      </div>
    </div>
    <grid-wrapper
      ref="multipleTable"
      :data-json="localData"
      :columns="columns"
      :pager="pager"
      @select="check"
      @select-all="checkAll"
    ></grid-wrapper>
  </div>
</template>
<script>
import localData from "@/components/content/data";
import Write from "@/components/content/handleCase/write";

export default {
  components: {
    Write
  },
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: "55",
          fixed: "left"
        },
        {
          prop: "actID",
          label: "流程名称",
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
          width: "200"
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
      localData: localData.localData,
      pager: {
        pageSizes: [5],
        pageSize: 5
      },
      searchVal: "",
      selectData: {},
      dialogVisible: false,
      // dialogTitle: ""
    };
  },
  methods: {
    checkAll() {
      this.$message.error("只能选中一条数据");
      this.$refs.multipleTable.$refs.elTable.clearSelection();
    },
    check(selection, row) {
      // console.log(selection)
      // console.log(row)
      if (selection.length > 1) {
        this.$message.error("只能选中一条数据");
        this.$refs.multipleTable.$refs.elTable.clearSelection();
      } else {
        this.selectData = row;
      }
    },
    // 点击搜索按钮
    search() {},
    // 点击行操作中的办理
    handleEvent(row) {
      // alert(JSON.stringify(row));
      this.selectData = row;
      this.dialogVisible = true;
      this.$router.push('/handleWrite')
    },
    // 弹出框自定义关闭事件
    beforeCloseEvent() {
      this.dialogVisible = false;
    },
    // 转件
    skip() {
      this.dialogVisible = true
    }
  }
};
</script>

<style>
/* .el-dialog__wrapper .el-dialog {
  height: 35% !important;
} */
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
