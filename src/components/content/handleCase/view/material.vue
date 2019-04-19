<template>
  <div style="margin-top: 20px;">
    <div class="row">
      <div class="search-wrapper">
        <input type="text" class="input" v-model="searchVal" @keyup.enter="search">
        <button class="btn" @click="search">搜索</button>
      </div>
    </div>
    <grid-wrapper height="350" :data-url="url" :columns="columns" :pager="pager"></grid-wrapper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url:
        process.env.ROOT_API +
        "recdata/getRecdataList?serialNO=" +
        this.$route.query.serialNO,
      columns: [
        {
          prop: "casenum",
          label: "casenum",
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
          width: "300"
        },
        {
          prop: "datatype",
          label: "是否原件",
          width: "100"
          // formater: function(val) {
          //   if (val == 1) {
          //     return "是";
          //   } else {
          //     return "否";
          //   }
          // }
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
            }
          ]
        }
      ],
      pager: {
        pageSizes: [5],
        pageSize: 5
      },
      searchVal: ""
    };
  },
  watch: {},
  methods: {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: flex-end;
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
