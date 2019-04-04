<template>
  <common-content :title="'面板'" :summary="'面板简介'" :AttrHeadList="AttrHeadList" :AttrList="AttrList"
                  :MethodHeadList="MethodHeadList" :MethodList="MethodList" :EventHeadList="EventHeadList" :EventList="EventList">
    <tbody slot="tbody">
    <tr>
      <td>
        <h3>普通面板</h3>
        <panel-wrapper>
          <div slot="header">
            头部
          </div>
          <div>
            内容
          </div>
        </panel-wrapper>
      </td>
    </tr>
    <tr>
      <td>
        <h3>带工具栏和底部的面板</h3>
        <panel-wrapper width="500px">
          <div slot="tools">
            <el-button icon="el-icon-d-caret" type="text"></el-button>
            <el-button icon="el-icon-more" type="text"></el-button>
          </div>
          <div slot="header">
            头部
          </div>
          <div>
            内容
          </div>
          <div slot="footer">
          腿部
          </div>
        </panel-wrapper>
      </td>
    </tr>
    <tr>
      <td>
        <h3>更多设置</h3>
        <panel-wrapper width="500px" shadow radius>
          <div slot="tools">
            <el-button icon="el-icon-d-caret" type="text"></el-button>
            <el-button icon="el-icon-more" type="text"></el-button>
          </div>
          <div slot="header">
            头部
          </div>
          <div>
            内容
          </div>
        </panel-wrapper>
      </td>
    </tr>
    <!--<tr>-->
      <!--<td>-->
        <!--<h3>作为列表项使用</h3>-->
        <!--<panel-wrapper height="150px" headerBgColor="#fff" :bordered="false" :innerBordered="false">-->
          <!--<div slot="header">-->
            <!--习近平举行仪式欢迎喀麦隆总统访华并同其举行会谈-->
          <!--</div>-->
          <!--<div>-->
            <!--国家主席习近平22日下午在人民大会堂北大厅举行仪式，欢迎喀麦隆总统保罗·比亚对我国进行国事访问。天安门广场上鸣礼炮21响。习近平主席夫人彭丽媛，中共中央政治局委员杨洁篪，全国人大常委会副委员长沈跃跃，国务委员兼外交部部长王毅，全国政协副主席张庆黎、何立峰等出席欢迎仪式。-->
          <!--</div>-->
          <!--<div slot="footer" class="footer">-->
            <!--<span>原创</span>&nbsp;&nbsp;<span>2018-03-23</span>&nbsp;&nbsp;-->
            <!--<el-button type="text" size="mini"><i class="el-icon-view"></i>阅读</el-button>(<span>1234</span>)&nbsp;-->
            <!--<el-button type="text" size="mini"><i class="el-icon-tickets"></i>评论</el-button>(<span>1234</span>)-->
          <!--</div>-->
        <!--</panel-wrapper>-->
        <!--<br/>-->
        <!--<panel-wrapper height="150px" headerBgColor="#fff" :bordered="false" :innerBordered="false">-->
          <!--<div slot="header">-->
            <!--习近平举行仪式欢迎喀麦隆总统访华并同其举行会谈-->
          <!--</div>-->
          <!--<div>-->
            <!--国家主席习近平22日下午在人民大会堂北大厅举行仪式，欢迎喀麦隆总统保罗·比亚对我国进行国事访问。天安门广场上鸣礼炮21响。习近平主席夫人彭丽媛，中共中央政治局委员杨洁篪，全国人大常委会副委员长沈跃跃，国务委员兼外交部部长王毅，全国政协副主席张庆黎、何立峰等出席欢迎仪式。-->
          <!--</div>-->
          <!--<div slot="footer" class="footer">-->
            <!--<span>原创</span>&nbsp;&nbsp;<span>2018-03-23</span>&nbsp;&nbsp;-->
            <!--<el-button type="text" size="mini"><i class="el-icon-view"></i>&nbsp;阅读</el-button>(<span>1234</span>)&nbsp;-->
            <!--<el-button type="text" size="mini"><i class="el-icon-tickets"></i>&nbsp;评论</el-button>(<span>1234</span>)-->
          <!--</div>-->
        <!--</panel-wrapper>-->
      <!--</td>-->
    <!--</tr>-->
    <tr>
      <td>
        <h3>带分页的列表</h3>
        <panelList-wrapper :data-json="localData" :pager="pager">
          <panel-wrapper slot-scope="scope" height="150px" headerBgColor="#fff" :bordered="false" :innerBordered="false">
            <div slot="header" v-html="scope.item.title">
            </div>
            <div class="body" v-html="scope.item.bodyText"></div>
            <div slot="footer" class="footer">
              <span>{{ scope.item.original ? '原创' : '非原创' }}</span>&nbsp;&nbsp;<span>{{ scope.item.pubdate}}</span>&nbsp;&nbsp;
              <el-button type="text" size="mini"><i class="el-icon-view"></i>阅读</el-button>(<span>{{ scope.item.viewcount }}</span>)&nbsp;
              <el-button type="text" size="mini"><i class="el-icon-tickets"></i>评论</el-button>(<span>{{ scope.item.commentcount }}</span>)
            </div>
          </panel-wrapper>
        </panelList-wrapper>
      </td>
    </tr>
    <tr>
      <td>
        <h3>带图片的列表</h3>
        <panelList-wrapper :data-json="localData1" :pager="pager2">
          <panel-wrapper slot-scope="scope" height="150px" headerBgColor="#fff" :bordered="false" :innerBordered="false">
            <img slot="img" :src="scope.item.imgPath">
            <div slot="header" v-html="scope.item.title">
            </div>
            <div class="body" v-html="scope.item.bodyText"></div>
            <div slot="footer" class="footer">
              <span>{{ scope.item.original ? '原创' : '非原创' }}</span>&nbsp;&nbsp;<span>{{ scope.item.pubdate}}</span>&nbsp;&nbsp;
              <el-button type="text" size="mini"><i class="el-icon-view"></i>阅读</el-button>(<span>{{ scope.item.viewcount }}</span>)&nbsp;
              <el-button type="text" size="mini"><i class="el-icon-tickets"></i>评论</el-button>(<span>{{ scope.item.commentcount }}</span>)
            </div>
          </panel-wrapper>
        </panelList-wrapper>
      </td>
    </tr>
    <!--<tr>-->
      <!--<td>-->
        <!--<h3>远程列表</h3>-->
        <!--<panelList-wrapper :data-url="'/ContentManagerPC/workflow/panel'" :pager="pager2">-->
          <!--<panel-wrapper slot-scope="scope" height="150px" headerBgColor="#fff" :bordered="false" :innerBordered="false">-->
            <!--<div slot="header" v-html="scope.item.title">-->
            <!--</div>-->
            <!--<div class="body" v-html="scope.item.bodyText"></div>-->
            <!--<div slot="footer" class="footer">-->
              <!--<span>{{ scope.item.original ? '原创' : '非原创' }}</span>&nbsp;&nbsp;<span>{{ scope.item.pubdate}}</span>&nbsp;&nbsp;-->
              <!--<el-button type="text" size="mini" @click="view(scope.item.title)"><i class="el-icon-view"></i>阅读</el-button>(<span>{{ scope.item.viewcount }}</span>)&nbsp;-->
              <!--<el-button type="text" size="mini"><i class="el-icon-tickets"></i>评论</el-button>(<span>{{ scope.item.commentcount }}</span>)-->
            <!--</div>-->
          <!--</panel-wrapper>-->
        <!--</panelList-wrapper>-->
      <!--</td>-->
    <!--</tr>-->
    </tbody>
    <div slot="code">
      <h3>普通面板</h3>
      <p>
        <span v-text="'<panel-wrapper>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<div slot=\'header\'>头部</div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<div>内容</div>'"></span>
      </p>
      <p>
        <span v-text="'</panel-wrapper>'"></span>
      </p>
      <h3>带工具栏和底部的面板</h3>
      <p>
        <span v-text="'<panel-wrapper width=\'500px\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<div slot=\'tools\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<el-button icon=\'el-icon-d-caret\' type=\'text\'></el-button>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<el-button icon=\'el-icon-more\' type=\'text\'></el-button>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<div/>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<div slot=\'header\'>头部</div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<div>内容</div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<div slot=\'footer\'>腿部</div>'"></span>
      </p>
      <p>
        <span v-text="'<panel-wrapper>'"></span>
      </p>
      <h3>带分页的列表</h3>
      <p>
        <span v-text="'<panelList-wrapper :data-json=\'localData\' :pager=\'pager\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<panel-wrapper slot-scope=\'scope\' height=\'150px\' headerBgColor=\'#fff\' :bordered=\'false\' :innerBordered=\'false\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<div slot=\'header\' v-html=\'scope.item.title\'></div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<div class=\'body\' v-html=\'scope.item.bodyText\'></div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<div slot=\'footer\' class=\'footer\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<span>{{ scope.item.original ? \'原创\' : \'非原创\' }}</span>&nbsp;&nbsp;<span>{{ scope.item.pubdate}}</span>&nbsp;&nbsp;'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<el-button type=\'text\' size=\'mini\'><i class=\'el-icon-view\'></i>阅读</el-button>(<span>{{ scope.item.viewcount }}</span>)&nbsp;'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<el-button type=\'text\' size=\'mini\'><i class=\'el-icon-tickets\'></i>评论</el-button>(<span>{{ scope.item.commentcount }}</span>)'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'</div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'</panel-wrapper>'"></span>
      </p>
      <p>
        <span v-text="'</panelList-wrapper>'"></span>
      </p>
      <h3>带图片的列表</h3>
      <p>
        <span v-text="'<panelList-wrapper :data-json=\'localData1\' :pager=\'pager2\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'<panel-wrapper slot-scope=\'scope\' height=\'150px\' headerBgColor=\'#fff\' :bordered=\'false\' :innerBordered=\'false\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<img slot=\'img\' :src=\'scope.item.imgPath\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<div slot=\'header\' v-html=\'scope.item.title\'></div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<div class=\'body\' v-html=\'scope.item.bodyText\'></div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<div slot=\'footer\' class=\'footer\'>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<span>{{ scope.item.original ? \'原创\' : \'非原创\' }}</span>&nbsp;&nbsp;<span>{{ scope.item.pubdate}}</span>&nbsp;&nbsp;'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<el-button type=\'text\' size=\'mini\'><i class=\'el-icon-view\'></i>阅读</el-button>(<span>{{ scope.item.viewcount }}</span>)&nbsp;'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'<el-button type=\'text\' size=\'mini\'><i class=\'el-icon-tickets\'></i>评论</el-button>(<span>{{ scope.item.commentcount }}</span>)'"></span>
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="'</div>'"></span>
      </p>
      <p>
        &nbsp;&nbsp;
        <span v-text="'</panel-wrapper>'"></span>
      </p>
      <p>
        <span v-text="'</panelList-wrapper>'"></span>
      </p>
      <div class="codeTip">panelList-wrapper是对panel的封装,它只负责数据部分以及分页,样式请根据panel自己设置</div>
      <pre v-html="localJsonStr"></pre>
      <div class="codeTip">'data-url'参数是用作获取后端服务器数据的,后台返回数据格式如下:</div>
      <pre v-html="respJsonStr"></pre>
      <div class="codeTip">
        是否带有图片,其实就是多加一句<span v-text="'<img slot=\'img\' :src=\'scope.item.imgPath\'>'"></span>
      </div>
      <div class="codeTip">
        注意这个imgPath,如果是本地的图片请加上require('path'),否则path作为字符串解析,如果是远程的图片,请加上完整的获取流地址
      </div>
      </div>
  </common-content>
</template>

<script>
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
  components: { commonContent },
  name: "Panel",
  data() {
    return {
      localData,
      localData1: [{
        "title": "带图片的新闻1",
        "bodyText": "百度新闻是包含海量资讯的新闻服务平台,真实反映每时每刻的新闻热点。您可以搜索新闻事件、热点话题、人物动态、产品资讯等,快速了解它们的最新进展。",
        "original": "true",
        "pubdate": "2018-03-23",
        "commentcount": "1234",
        "viewcount": "567",
        "imgPath": require("@/assets/images/timg-4.jpeg")
      }, {
        "title": "带图片的新闻2",
        "bodyText": "百度新闻是包含海量资讯的新闻服务平台,真实反映每时每刻的新闻热点。您可以搜索新闻事件、热点话题、人物动态、产品资讯等,快速了解它们的最新进展。",
        "original": "false",
        "pubdate": "2018-03-23",
        "commentcount": "789",
        "viewcount": "666",
        "imgPath": require("@/assets/images/timg-5.jpeg")
      }],
      responseData,
      AttrHeadList,
      AttrList,
      MethodHeadList,
      MethodList,
      EventHeadList,
      EventList,
      menuCode1: "<menu-wrapper :title=\"title1\" :menu-trigger=\"'click'\" :default-active=\"'1'\" :data-json=\"localData\" mode=\"horizontal\"></menu-wrapper>",
      menuCode2: "<menu-wrapper :title=\"title1\" titleBgColor=\"#545c64\" titleTextColor=\"#fff\"\n" +
      "                        :default-active=\"'1'\"\n" +
      "                        background-color=\"#545c64\"\n" +
      "                        text-color=\"#fff\"\n" +
      "                        active-text-color=\"#ffd04b\" :data-json=\"localData\" mode=\"horizontal\"></menu-wrapper>",
      title1: "<b>Menu Wrapper</b>",
      pager: {
        "pageSizes": [1, 10, 20],
        "pageSize": 1
      },
      pager2: {
        "pageSizes": [2, 5, 10],
        "pageSize": 5
      }
    };
  },
  computed: {
    localJsonStr() {
      return common.syntaxHighlight(this.localData);
    },
    respJsonStr() {
      return common.syntaxHighlight(this.responseData);
    }
  },
  methods: {
    view(title) {
      alert("阅读:" + title);
    }
  }
};
</script>

<style>
  div.body {
    color: #7F5A53;
  }
  div.footer {
    font-size: 12px!important;
    border-bottom: 1px dotted #ccc!important;
    color: #AFAFBC;
  }
  .codeArea.show {
    max-height: 3200px!important;
  }
</style>
