<template>
  <el-container>
    <el-header>
      <span class="back" @click="back">
        <i class="fa fa-angle-double-left" aria-hidden="true"></i>返回
      </span>
      <span class="search-wrapper">
        <el-dropdown @command="select">
          <span class="el-dropdown-link">
            {{selectItem.text}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in controlButtonArr"
              :key="item.field"
              :command="{field:item.field, text:item.text}"
            >{{item.text}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="search">
          <input type="text" class="input" ref="inp" autofocus v-model="searchVal" @keyup.enter="search()">
          <button class="btn" @click="search">搜索</button>
        </span>
      </span>
    </el-header>
    <el-main>
      <grid-wrapper height="350" :data-json="data" :columns="columns" :pager="pager"></grid-wrapper>
    </el-main>
  </el-container>
</template>
<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      controlButtonArr: [
        { field: "selectPersonInfo.personName", text: "姓名" },
        { field: "selectPersonInfo.personCardID", text: "身份证号" }
      ],
      selectItem: {
        field: "selectPersonInfo.personName",
        text: "姓名"
      },
      searchVal: "",
      data: [],
      columns: [
        // {
        //   type: "selection",
        //   width: "55",
        //   fixed: "left"
        // },
        {
          prop: "person_id",
          label: "person_id",
          width: "100",
          hidden: true
        },
        {
          prop: "person_desc",
          label: "55",
          hidden: true
        },
        {
          prop: "person_name",
          label: "名字",
          width: "150"
        },
        {
          prop: "person_card_id",
          label: "身份证号",
          width: "200"
        },
        {
          prop: "person_age",
          label: "年龄",
          width: "150"
        },
        {
          prop: "person_sex",
          label: "性别",
          width: "100",
          formatter: function(value) {
            if (value == 1) {
              return "男";
            } else if (value == 2) {
              return "女";
            } else {
              return "未知";
            }
          }
        },
        {
          prop: "person_state",
          label: "是否有效",
          width: "100",
          formatter: function(value) {
            if (value == 0) {
              return "无效";
            } else {
              return "有效";
            }
          }
        },
        {
          prop: "action",
          label: "操作",
          width: "100",
          // fixed: "right",
          action: [
            {
              text: "确定",
              size: "small",
              handler: this.details
            }
          ]
        }
      ],
      pager: {
        pageSizes: [5],
        pageSize: 5
      }
    };
  },
  mounted() {
    this.$refs.inp.focus();
  },
  methods: {
    back() {
      this.$emit("back");
    },
    select(item) {
      this.selectItem = item;
    },
    search() {
      if (this.searchVal.replace(/^\s+|\s+$/g, "") != "") {
        let selectValArr = this.selectItem.field.split(".");
        let a = {};
        let b = selectValArr[1];
        let queryParams = {};

        a[b] = this.searchVal;
        queryParams[selectValArr[0]] = JSON.stringify(a);
        queryParams.curPage = 1;
        queryParams.pageSize = 5;
        // console.log(queryParams);

        this.$http
          .post(process.env.ROOT_API + "guide/getPersonInfo", queryParams, {
            emulateJSON: true
          })
          .then(
            res => {
              res = JSON.parse(res.bodyText);
              if (res.success) {
                if (res.data) {
                  if (res.data.list) {
                    this.data = res.data.list;
                  } else {
                    this.data = [];
                  }
                } else {
                  this.data = [];
                }
              }
            },
            err => {
              throw new Error(err);
            }
          );
      } else {
        this.$message.error("请输入要查询的值");
      }
    },

    details(row) {
      // console.log(row)
      if (row.person_state == 1) {
        if (this.id != row.person_id) {
          this.$emit("rowData", row);
          this.back();
        } else {
          this.$message.error('选择了重复的信息')
        }
      } else {
        this.$message.error('该条信息无效')
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  height: auto !important;
  .back {
    // font-size: 30px;
    color: #409eff;
    cursor: pointer;
    i {
      font-size: 20px;
    }
  }
  .search-wrapper {
    display: flex;
    align-content: center;
    font-size: 0;
    .el-dropdown {
      margin-right: 5px;
      line-height: 30px;
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
    .search {
      display: inline-block;
      height: 30px;
      border-radius: 30px;
      overflow: hidden;
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
}
</style>
