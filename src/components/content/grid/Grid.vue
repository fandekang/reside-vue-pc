<template>
  <common-content :title="'表格封装'" :summary="'表格简介'" :AttrHeadList="AttrHeadList" :AttrList="AttrList"
                  :MethodHeadList="MethodHeadList" :MethodList="MethodList" :EventHeadList="EventHeadList" :EventList="EventList">
    <tbody slot="tbody">
    <tr>
      <td>
        <h3>dom 定义表头参数</h3>
        <grid-wrapper :data-json="localData" :height="200">
          <!--<el-table-column type="selection" width="55"></el-table-column>-->
          <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="wife" label="配偶" width="120"></el-table-column>
          <el-table-column prop="sun" label="孩子" width="150"></el-table-column>
          <el-table-column prop="birth" label="生日" width="150"></el-table-column>
          <el-table-column prop="address" label="地址" width="150"></el-table-column>
          <el-table-column prop="nation" label="国籍" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </grid-wrapper>
      </td>
    </tr>
    <tr>
      <td>
        <h3>JSON 定义表头参数</h3>
        <grid-wrapper ref="jsonTable" :data-json="localData" :columns="columns" @select="selectEvt" @select-all="selectAllEvt" @selection-change="selectChangeEvt" @cell-click="cellClickEvt"></grid-wrapper>
        <br/>
        <el-button @click="clearSelection()" size="small">取消选择</el-button>
        <el-button @click="toggleRowSelection()" size="small">选中取消第二行</el-button>
      </td>
    </tr>
    <tr>
      <td>
        <h3>带分页的表格</h3>
        <grid-wrapper :data-json="localData" :columns="columns" :pager="pager1"></grid-wrapper>
      </td>
    </tr>
    <!--<tr>-->
      <!--<td>-->
        <!--<h3>远程数据的表格</h3>-->
        <!--<grid-wrapper data-url="/ContentManagerPC/workflow/table" :columns="columns1" :pager="pager2"></grid-wrapper>-->
      <!--</td>-->
    <!--</tr>-->
    </tbody>
    <div slot="code">
      <h3>dom 定义表头参数</h3>
      <p>
        <span v-text="'<grid-wrapper :data-json=\'localData\' :height=\'200\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<el-table-column fixed prop=\'date\' label=\'日期\' width=\'150\'></el-table-column>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<el-table-column prop=\'name\' label=\'姓名\' width=\'120\'></el-table-column>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<el-table-column prop=\'wife\' label=\'配偶\' width=\'120\'></el-table-column>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<el-table-column prop=\'sun\' label=\'孩子\' width=\'150\'></el-table-column>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<el-table-column prop=\'birth\' label=\'生日\' width=\'150\'></el-table-column>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<el-table-column prop=\'address\' label=\'地址\' width=\'150\'></el-table-column>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<el-table-column prop=\'nation\' label=\'国籍\' width=\'150\'></el-table-column>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<el-table-column fixed=\'right\' label=\'操作\' width=\'100\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<template slot-scope=\'scope\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<el-button @click=\'handleClick(scope.row)\' type=\'text\' size=\'small\'>查看</el-button>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<el-button type=\'text\' size=\'small\'>编辑</el-button>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'</template>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'</el-table-column>'"></span>
      </p>
      <p>
        <span v-text="'</grid-wrapper>'"></span>
      </p>
      <h3>JSON 定义表头参数</h3>
      <p>
        <span v-text="'<grid-wrapper :data-json=\'localData\' :columns=\'columns\'></grid-wrapper>'"></span>
      </p>
      <div class="codeTip">'columns'参数是用作定义列信息的,第一种是使用html标签内的属性来定义,而这种是使用json方式定义,数据格式如下:</div>
      <pre v-html="columnsStr"></pre>
      <h3>带分页的表格</h3>
      <p>
        <span v-text="'<grid-wrapper ref=\'jsonTable\' :data-json=\'localData\' :columns=\'columns\' :pager=\'pager1\'></grid-wrapper>'"></span>
      </p>
      <p>
        <span v-text="'<el-button @click=\'learSelection()\' size=\'small\'>取消选择</el-button>'"></span>
      </p>
      <p>
        <span v-text="'<el-button @click=\'toggleRowSelection()\' size=\'small\'>选中取消第二行</el-button>'"></span>
      </p>
      <div class="codeTip">利用$refs来调用内部方法,我在中间层封了emitMethod来调用原Elemenu UI的内部方法,使用方式如下: </div>
      <p>
        <span v-text="'clearSelection () {'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'this.$refs.jsonTable.emitMethod(\'clearSelection\');'"></span>
      </p>
      <p>
        <span v-text="'}'"></span>
      </p>
      <div class="codeTip">this.$refs.jsonTable.source可以获取到table的数据: </div>
      <p>
        <span v-text="'toggleRowSelection () {'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'this.$refs.jsonTable.emitMethod(\'toggleRowSelection\', this.$refs.jsonTable.source[2]);'"></span>
      </p>
      <p>
        <span v-text="'}'"></span>
      </p>
      <div class="codeTip">'data-json'参数是用作定义数据的,数据格式如下:</div>
      <pre v-html="localJsonStr"></pre>
      <div class="codeTip">'data-url'参数是用作获取后端服务器数据的,后台返回数据格式如下:</div>
      <pre v-html="respJsonStr"></pre>
    </div>
  </common-content>
</template>

<script>
/* eslint-disable object-property-newline */
import commonContent from "../common.vue";
import common from "../../../assets/js/common";
import data from "./data";

const localData = data.localData;
const responseData = data.responseData;
const AttrHeadList = data.AttrHeadList;
const AttrList = data.AttrList;
const MethodHeadList = data.MethodHeadList;
const MethodList = data.MethodList;
const EventHeadList = data.EventHeadList;
const EventList = data.EventList;

export default {
  name: "Grid",
  components: { commonContent },
  data() {
    return {
      localData,
      responseData,
      AttrHeadList,
      AttrList,
      MethodHeadList,
      MethodList,
      EventHeadList,
      EventList,
      columns: [{
        "type": "selection", "width": "55", "fixed": "left"
      }, {
        "prop": "name", "label": "叫什么", "width": "150"
      }, {
        "prop": "date", "label": "什么时间", "width": "150"
      }, {
        "prop": "address", "label": "在哪里", "width": "200"
      }, {
        "prop": "nation", "label": "国籍", "width": "150"
      }, {
        "prop": "birth", "label": "生日", "width": "150"
      }, {
        "prop": "wife", "label": "配偶", "width": "150"
      }, {
        "prop": "sun", "label": "孩子", "width": "150"
      }, {
        "prop": "action", "label": "操作", "width": "100", "fixed": "right", "action": [{
          "text": "编辑", "size": "small", "handler": this.editHandler
        }, {
          "text": "详细", "size": "small", "handler": this.detailHandler
        }]
      }],
      columns1: [{
        "type": "selection", "width": "55", "fixed": "left"
      }, {
        "prop": "username", "label": "名字", "width": "150", "fixed": "left"
      }, {
        "prop": "age", "label": "年龄", "width": "150"
      }, {
        "prop": "localtion", "label": "坐落", "width": "150"
      }, {
        "prop": "sex", "label": "性别", "width": "150"
      }, {
        "prop": "nation", "label": "国籍", "width": "150"
      }, {
        "prop": "birth", "label": "生日", "width": "150"
      }],
      pager1: {
        "pageSizes": [5, 10, 20],
        "pageSize": 5
      },
      pager2: {
        "pageSizes": [5, 10, 20],
        "pageSize": 5
      }
    };
  },
  methods: {
    editHandler(row) {
      console.log("选中行: " + this.currentRow);
      console.log("修改: " + row.name);
    },
    detailHandler(row) {
      console.log("详细: " + row.name);
    },
    handleClick(row) {
      console.log(row);
    },
    clearSelection() {
      this.$refs.jsonTable.emitMethod("clearSelection");
    },
    toggleRowSelection() {
      this.$refs.jsonTable.emitMethod("toggleRowSelection", this.$refs.jsonTable.source[2]);
    },
    selectEvt(selection, row) {
      console.log("勾选checkbox, 选中的数据: " + JSON.stringify(selection) + ",点击的那一行数据: " + JSON.stringify(row));
    },
    selectAllEvt(selection) {
      console.log("勾选全部checkbox, 选中的数据: " + JSON.stringify(selection));
    },
    selectChangeEvt(selection) {
      console.log("勾选改变, 选中的数据: " + JSON.stringify(selection));
    },
    cellClickEvt(row, column, cell, event) {
      console.log("单元格单击, 行: " + JSON.stringify(row) + ", 列: " + column + ", 单元格: " + cell + ", " + event.target);
    }
  },
  computed: {
    columnsStr() {
      return common.syntaxHighlight(this.columns);
    },
    localJsonStr() {
      return common.syntaxHighlight(this.localData);
    },
    respJsonStr() {
      return common.syntaxHighlight(this.responseData);
    }
  }
};
</script>

<style>
  .codeArea.show {
    max-height: 3200px!important;
  }
</style>
