<template>
  <div class="container">
    <div class="modal" v-show="dialogVisible"></div>
      <condition-query class="condition-query-dialog" v-show="dialogVisible" @back="conditionDialogBack"></condition-query>
    <div class="btns-wrapper">
      <button class="btn" @click="openDialog">设置查询条件</button>
      <button class="btn">导出Excel</button>
      <button class="btn">图表统计</button>
    </div>
    <grid-wrapper :dataJson="dataJson" :pager="pager" :columns="columns"></grid-wrapper>
  </div>
</template>
<script>
import conditionQuery from "@/components/content/dynamic-query/condition-query";

export default {
  components: {
    conditionQuery
  },
  data() {
    return {
      dialogVisible: false,
      dataJson: null,
      columns: [],
      pager: {
        curPage: 1,
        pageSizes: [5, 10],
        pageSize: 10
      },
      resData: null,
      
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
      // this.$store.commit('toggleConditionQueryVisible', {conditionQueryVisible: true})
      this.dialogVisible = true;
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
    },
    conditionDialogBack() {
      this.dialogVisible = false
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  // display: flex;
  // flex-direction: column;
  height: 100%;
  .condition-query-dialog {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80%;
    background: #fff;
    z-index: 10;
  }
  .modal {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: rgba(0, 0, 0, 0.5);
  }
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
}
</style>
