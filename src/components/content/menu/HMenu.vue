<template>
  <common-content :title="'横向导航'" :summary="'横向导航简介'" :AttrHeadList="AttrHeadList" :AttrList="AttrList"
                  :MethodHeadList="MethodHeadList" :MethodList="MethodList" :EventHeadList="EventHeadList" :EventList="EventList">
    <tbody slot="tbody">
      <tr>
        <td>
          <menu-wrapper :title="title1" :menu-trigger="'click'" :default-active="'1'" :data-json="localData" mode="horizontal"></menu-wrapper>
        </td>
      </tr>
      <tr>
        <td>
          <menu-wrapper :title="title1" titleBgColor="#545c64" titleTextColor="#fff"
                        :default-active="'1'"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b" :data-json="localData" mode="horizontal"></menu-wrapper>
        </td>
      </tr>
      <!--<tr>-->
        <!--<td>-->
          <!--<menu-wrapper data-url="/ContentManagerPC/workflow/menu" mode="horizontal" :default-active="'1'"></menu-wrapper>-->
        <!--</td>-->
      <!--</tr>-->
    </tbody>
    <div slot="code">
      <p>{{ menuCode1 }}</p>
      <p>{{ menuCode2 }}</p>
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
  name: "HMenu",
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
      menuCode1: "<menu-wrapper :title=\"title1\" :menu-trigger=\"'click'\" :default-active=\"'1'\" :data-json=\"localData\" mode=\"horizontal\"></menu-wrapper>",
      menuCode2: "<menu-wrapper :title=\"title1\" titleBgColor=\"#545c64\" titleTextColor=\"#fff\"\n" +
      "                        :default-active=\"'1'\"\n" +
      "                        background-color=\"#545c64\"\n" +
      "                        text-color=\"#fff\"\n" +
      "                        active-text-color=\"#ffd04b\" :data-json=\"localData\" mode=\"horizontal\"></menu-wrapper>",
      title1: "<b>Menu Wrapper</b>"
    };
  },
  computed: {
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
</style>
