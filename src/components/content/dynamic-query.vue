<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="100%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="btns-wrapper">
      <button class="btn" @click="openDialog">设置查询条件</button>
      <button class="btn">导出Excel</button>
      <button class="btn">图表统计</button>
    </div>
    <grid-wrapper :dataJson="dataJson" :pager="pager" :columns="columns"></grid-wrapper>
  </div>
</template>
<script>
// let arr1 = [
//   {
//     HOUSEHOUSE_AREA: 22,
//     HOUSEHOUSE_DESC: "1",
//     HOUSEHOUSE_DO_STATE: "1",
//     HOUSEHOUSE_ID: "13",
//     HOUSEHOUSE_LOCATION: "范德康家族睡衣",
//     RECANDAPPFORMCASENUM: "2019000072",
//     RECANDAPPFORMISRENT: "1"
//   }
// ];
export default {
  data() {
    return {
      dialogVisible: false,
      dataJson: null,
      columns: [],
      pager: {
        curPage: 1,
        pageSizes: [5],
        pageSize: 5
      },
      resData: null
    };
  },
  created() {
    this.$http
      .get(process.env.ROOT_API + "query/trendsAllQuery?queryStructID=2")
      .then(
        res => {
          this.resData = res.body.data[0];
          this.resolveColumnName();
          this.resolveDataJson();
        },
        err => {
          throw new Error(err);
        }
      );
  },
  methods: {
    openDialog() {
        this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 格式化column
    resolveColumnName() {
      let arr = [];
      this.resData.columnNameAliasList.forEach(item => {
        let obj = {};
        obj.label = item;
        arr.push(obj);
      });
      arr.forEach((item, index) => {
        this.resData.columnNameList.forEach((val, ci) => {
          if (index == ci) {
            item["prop"] = val.split(".").join("");
          }
        });
      });
      //   console.log(arr);
      this.columns = arr;
    },
    // 格式化dataJSON
    resolveDataJson() {
      let jsonArr = [];
      this.resData.rowData.forEach(row => {
        let obj = {};

        this.resData.columnNameList.forEach((item, index) => {
          row.forEach((col, ci) => {
            if (index == ci) {
              item = item.split(".").join("");
              obj[item] = col;
            }
          });
        });

        jsonArr.push(obj);
      });
      //   console.log(jsonArr);
      this.dataJson = jsonArr;
    }
  }
};
</script>
<style lang="scss" scoped>
.btns-wrapper {
  margin: 10px 0;
  .btn {
    padding: 6px 15px;
    border: none;
    outline: none;
    background-color: rgba(242, 242, 242, 1);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.349019607843137);
    cursor: pointer;
  }
}
</style>
