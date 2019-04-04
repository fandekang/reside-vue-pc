import Vue from "vue";
import resource from "vue-resource";

export default {
  methods: {
    loadData() {
      if (this.dataUrl) {
        this.remoteData();
      }
      else if (this.dataJson && this.dataJson.length > 0) {
        if (this.pager) {
          this.source = this.resolvePager(this.dataJson, (this.pager.currentPage || 1), this.pager.pageSize);
          this.$set(this.pager, "total", this.dataJson.length);
        }
        else {
          this.source = this.dataJson;
        }
      }
    },
    remoteData() {
      Vue.use(resource);
      let url = this.dataUrl;
      let remoteParam = {};

      if (this.pager) {
        remoteParam = {
          pageInt: this.pager.currentPage || 1,
          pageSize: this.pager.pageSize
        };
      }

      this.beforeLoadData();
      this.$http.post(url, remoteParam, {emulateJSON: true}).then(response => {
        // console.log("成功");
        // console.log("bodyText = " + response.bodyText);
        const body = JSON.parse(response.bodyText);

        if (body.errorMsg) {
          this.$message.error(body.errorMsg);
        }
        // 后台菜单返回数据如果没有分页的,直接返回list,如果返回带分页,会返回{list: data, total: count}格式
        else if (body.data && body.data.list) {
          this.source = JSON.parse(response.bodyText).data.list;
        }
        else if (body.data) {
          this.source = JSON.parse(response.bodyText).data;
        }
        if (this.pager && body.data) {
          this.$set(this.pager, "total", body.data.total);
        }
        this.loadComplete();
      }, response => {
        this.$message.error("调取远程数据失败: " + JSON.stringify(response));
      });
    },
    beforeLoadData() {},
    loadComplete() {}
  },
  mounted() {
    this.loadData();
  }
};
