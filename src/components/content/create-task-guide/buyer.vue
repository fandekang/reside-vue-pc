<template>
  <section>
    <grid-wrapper :data-json="localData" :columns="columns" :pager="pager"></grid-wrapper>
  </section>
</template>
<script>
import localData from "@/components/content/grid/data";

const columns = [
  {
    type: "selection",
    width: "55",
    fixed: "left"
  },
  {
    prop: "name",
    label: "名字",
    width: "150",
    fixed: "left"
  },
  {
    prop: "date",
    label: "年龄",
    width: "150"
  },
  {
    prop: "address",
    label: "坐落",
    width: "200"
  },
  {
    prop: "nation",
    label: "国籍",
    width: "150"
  },
  {
    prop: "action",
    label: "操作",
    width: "100",
    // fixed: "right",
    action: [
      {
        text: "编辑",
        size: "small",
        handler: this.editHandler
      },
      {
        text: "详细",
        size: "small",
        handler: this.detailHandler
      }
    ]
  }
];
export default {
  data() {
    return {
      localData: localData.localData,
      columns: columns,
      pager: {
        // pageSizes: [5, 10, 20],
        pageSizes: 5,
        pageSize: 5
      }
    };
  },
  mounted() {
    const controlButton = [
      { field: "selectPersonInfo.personName", text: "姓名" },
      { field: "selectPersonInfo.personID", text: "ID" }
    ];
    this.$store.commit("changeControlButton", { controlButton: controlButton });
    this.$store.commit("changeSelectControlButton", {
      selectControlButton: controlButton[0]
    });
  },
  methods: {}
};
</script>
