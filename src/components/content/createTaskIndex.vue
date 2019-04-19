<template>
  <el-container>
    <el-header>
      <span class="operate-wrapper">
        <button class="btn disabled" ref="prev" @click="lastStep()">上一步</button>
        <button class="btn" ref="next" @click="nextStep()">下一步</button>
        <button class="btn hidden" ref="finished" @click="finish()">创建流程</button>
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
          <input type="text" class="input" autofocus v-model="searchVal" @keyup.enter="search()">
          <button class="btn" @click="search()">搜索</button>
        </span>
      </span>
    </el-header>
    <el-main>
      <router-view ref="step" @closeDialog="closeDialog"></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  // props: {
  //   selRowDataStr: {
  //     type: Object
  //   }
  // },
  data() {
    return {
      searchVal: "",
      pageIndex: 0 // 当前页的索引
    };
  },
  computed: {
    selRowDataStr() {
      return this.$store.state.moduleHead.selRowDataJSON;
    },
    controlButtonArr: {
      get() {
        return this.$store.state.moduleHead.controlButton;
      },
      set(arr) {
        this.$store.commit("changeControlButton", { controlButton: arr });
      }
    },
    selectItem: {
      get() {
        return this.$store.state.moduleHead.selectControlButton;
      },
      set(value) {
        this.$store.commit("changeSelectControlButton", {
          selectControlButton: value
        });
      }
    }
  },
  watch: {
    // 每一步骤先清空文本框数据
    pageIndex(newVal, oldVal) {
      this.searchVal = "";
    }
  },
  created() {},
  mounted() {
    this.$router.push(this.selRowDataStr.pathArr[0]);
    // alert(JSON.stringify(this.selRowDataStr))
  },
  methods: {
    lastStep() {
      if (
        this.pageIndex > 0 &&
        this.pageIndex <= this.selRowDataStr.pathArr.length
      ) {
        this.pageIndex--;
        this.$refs.finished.className = "btn hidden";
        this.$refs.next.className = "btn";
        // console.log(this.pageIndex);
        this.$router.push(this.selRowDataStr.pathArr[this.pageIndex]);
      }

      if (this.pageIndex === 0) {
        this.$refs.prev.className = "btn disabled";
      }
    },
    nextStep() {
      // this.$refs.step.$refs.buyer.__vue__.next();
      console.log(this.$refs)
      let selRow = this.$refs.step.next();
      // let selRow = this.$refs.step.$refs.stepItem.__vue__.next();
      // alert(selRow)
      // console.log(selRow)

      if (selRow.indexOf("{") < 0 && selRow.indexOf("[") < 0) {
        this.$message.error(selRow)
      } else {
        let selRowDataJSON = JSON.parse(selRow)
        this.$store.commit('changeSelRow', {selRowDataJSON: selRowDataJSON})
        if (
          this.pageIndex >= 0 &&
          this.pageIndex < this.selRowDataStr.pathArr.length
        ) {
          this.pageIndex++;
          // console.log(this.pageIndex);
          this.$refs.prev.className = "btn";
          this.$router.push(this.selRowDataStr.pathArr[this.pageIndex]);
        }

        if (this.pageIndex === this.selRowDataStr.pathArr.length - 1) {
          this.$refs.next.className = "hidden";
          this.$refs.finished.className = "btn";
        }
      }
    },
    finish() {
      this.$refs.step.finish();
    },
    search() {
      // alert(this.selectItem.field + ": " + this.searchVal);
      if (this.searchVal.replace(/^\s+|\s+$/g, "") != "") {
        let selectValArr = this.selectItem.field.split(".");
        let a = {};
        let b = selectValArr[1];
        let queryParams = {};

        a[b] = this.searchVal;
        queryParams[selectValArr[0]] = JSON.stringify(a);
        // console.log(queryParams)
        // console.log(this.$refs)
        this.$refs.step.load(queryParams);
      } else {
        this.$message.error("请输入要查询的值");
      }
    },
    select(item) {
      // alert(JSON.stringify(item))
      this.searchVal = "";
      this.$store.commit("changeSelectControlButton", {
        selectControlButton: item
      });
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
};
</script>
<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  height: auto !important;
  .operate-wrapper {
    display: inline-flex;
    box-shadow: 2px 4px 3px rgba(226, 226, 226, 1);
    font-size: 0px;
    overflow: hidden;
    .btn {
      padding: 4px 8px;
      border: none;
      outline: none;
      background: rgba(242, 242, 242, 1);
      color: #333;
      font-size: 14px;
      cursor: pointer;
    }
    .hidden {
      display: none;
    }
    .disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    .btn:hover {
      background: rgba(226, 226, 226, 1);
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
