<template>
  <section>
    <grid-wrapper
      ref="roomTable"
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
const columns = [
  {
    type: "selection",
    width: "55",
    fixed: "left"
  },
  {
    prop: "house_id",
    label: "house_id",
    hidden: true
  },
  {
    prop: "house_card_num",
    label: "房产证号",
    width: "200"
    // fixed: "left"
  },
  {
    prop: "house_type",
    label: "户型",
    width: "80"
  },
  {
    prop: "house_area",
    label: "房屋面积",
    width: "100"
  },
  {
    prop: "house_location",
    label: "房屋坐落",
    width: "200"
  },
  {
    prop: "house_state",
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
    prop: "house_do_state",
    label: "是否正在办理",
    width: "150",
    formatter: function(value) {
      if (value == 0) {
        return "否";
      } else {
        return "是";
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
];
export default {
  data() {
    return {
      data: [],
      columns: columns,
      pager: {
        pageSizes: [5, 10, 20],
        pageSize: 5
      },
      selectData: []
    };
  },
  mounted() {
    const controlButton = [
      { field: "selectHouseInfo.houseLocation", text: "房屋位置" },
      { field: "selectHouseInfo.housePropertyCardNum", text: "房产证号" }
    ];
    let selRow = this.$store.state.moduleHead.selRowDataJSON;
    if (selRow.room) {
      let result = [];
      selRow.room.datadesc.forEach(item => {
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
      createTaskStepTitle: "居住证办理一房屋"
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
        this.$refs.roomTable.$refs.elTable.toggleRowSelection(row, true);
      });
    },
    next() {
      let selRow = "";
      if (this.selectData.length) {
        if (this.selectData.length > 1) {
          this.$message.error("只能选中一条数据");
        } else {
          let houseID = this.selectData[0].house_id;

          let parseData = this.resolveData(
            this.selectData,
            "房屋",
            this.columns
          );
          let selRowDataJSON = this.$store.state.moduleHead.selRowDataJSON;

          $.ajax({
            type: "post",
            url: process.env.ROOT_API + "guide/judgeHouseApprove",
            data: {
              houseID: houseID
            },
            async: false,
            success: function(res) {
              if (res.success) {
                selRow = selRowDataJSON;
                selRow.room = parseData;
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
        // this.$message.error("只能选择一条");
      }
      // console.log(selRow);
      return selRow;
    },
    load(val) {
      val.curPage = 1;
      val.pageSize = 5;

      this.$http
        .post(process.env.ROOT_API + "guide/getHouseInfo", val, {
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
