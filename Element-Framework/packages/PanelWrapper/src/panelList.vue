<template>
  <div>
    <template v-for="(item,index) in source">
      <slot :item="item" :index="index">
      </slot>
      <br :key="index"/>
    </template>
    <template v-if="pager">
      <grid-page-wrapper :pager="pager" @curChange="curChangeHandler" @pageSizeChange="pageSizeChangeHandler"></grid-page-wrapper>
    </template>
  </div>
</template>

<script>
import resolvePager from "../../assets/resolvePager";
import gridPageWrapper from "../../GridWrapper/src/grid-page.vue";
import loadData from "../../assets/loadData";

export default {
  name: "panelList-wrapper",
  components: { gridPageWrapper },
  mixins: [ resolvePager, loadData ],
  data() {
    return {
      source: []
    };
  },
  props: {
    dataJson: Array,
    dataUrl: String,
    pager: Object
  }
};
</script>
