<template>
  <section>
    <grid-wrapper
      ref="buyerTable"
      height="350"
      :data-json="data"
      :columns="columns"
      :pager="pager"
      @select="check"
      @select-all="checkAll"
    ></grid-wrapper>
  </section>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          type: "selection",
          width: "55",
          fixed: "left"
        },
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
          // fixed: "left"
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
        }
        // {
        //   prop: "action",
        //   label: "操作",
        //   width: "100",
        //   // fixed: "right",
        //   action: [
        //     {
        //       text: "编辑",
        //       size: "small",
        //       handler: this.editHandler
        //     },
        //     {
        //       text: "详细",
        //       size: "small",
        //       handler: this.detailHandler
        //     }
        //   ]
        // }
      ],
      pager: {
        pageSizes: [5],
        pageSize: 5
      },
      selectData: []
    };
  },
  mounted() {
    const controlButton = [
      { field: "selectPersonInfo.personName", text: "姓名" },
      { field: "selectPersonInfo.personCardID", text: "身份证号" }
    ];
    let selRow = this.$store.state.moduleHead.selRowDataJSON;
    if (selRow.buyer) {
      let result = [];
      selRow.buyer.datadesc.forEach(item => {
        let row = {};
        item.forEach(obj => {
          row[obj.prop] = obj.value;
        });
        result.push(row);
      });

      this.data = result;
      this.$nextTick(() => {
        this.setRowSelection(this.data);
        this.selectData = this.data;
      });
    }
    this.$store.commit("changeTaskStepTitle", {
      createTaskStepTitle: "居住证办理一申请人"
    });
    this.$store.commit("changeControlButton", { controlButton: controlButton });
    this.$store.commit("changeSelectControlButton", {
      selectControlButton: controlButton[0]
    });
  },
  methods: {
    // 设置行选中
    setRowSelection(rows) {
      rows.forEach(row => {
        this.$refs.buyerTable.$refs.elTable.toggleRowSelection(row, true);
      });
    },
    next() {
      let selRow = "";
      if (this.selectData.length) {
        // console.log(this.selectData)
        if (this.selectData.length > 1) {
          this.$message.error("只能选中一条数据");
          this.$refs.buyerTable.$refs.elTable.clearSelection();
        } else {
          let personID = this.selectData[0].person_id;
          let parseData = this.resolveData(
            this.selectData,
            "申请人",
            this.columns
          );
          let selRowDataJSON = this.$store.state.moduleHead.selRowDataJSON;

          $.ajax({
            type: "post",
            url: process.env.ROOT_API + "guide/judgePersonApprove",
            data: {
              personID: personID
            },
            async: false,
            success: function(res) {
              if (res.success) {
                selRow = selRowDataJSON;
                selRow.buyer = parseData;
                selRow = JSON.stringify(selRow);
              } else {
                selRow = res.errorMsg;
              }
            },
            error: function(err) {
              selRow = "请查询信息并选择";
              throw new Error(err);
            }
          });
        }
      } else {
        selRow = "请查询信息并选择";
      }
      // console.log(selRow);
      return selRow;
    },
    load(val) {
      val.curPage = 1;
      val.pageSize = 5;

      this.$http
        .post(process.env.ROOT_API + "guide/getPersonInfo", val, {
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
    },
    check(selection, row) {
      this.selectData = selection;
    },
    checkAll(selection) {
      this.selectData = selection;
    },
    resolveData(checkedArr, CHname, columns) {
      let obj = {
        CHname: CHname,
        datadesc: []
      };
      for (let i in checkedArr) {
        let arr = [];
        let row_item = checkedArr[i]; // 每一条选中的数据

        for (let row_item_key in row_item) {
          for (let j in columns) {
            let obj_item = {};
            let column_item = columns[j];
            if (row_item_key == column_item.prop) {
              obj_item.prop = column_item.prop;
              obj_item.label = column_item.label;
              obj_item.value = row_item[row_item_key];
              if (column_item.hidden) {
                obj_item.hidden = true;
              }
              arr.push(obj_item);
            }
          }
        }
        obj.datadesc.push(arr);
      }
      return obj;
    }
  }
};
</script>
