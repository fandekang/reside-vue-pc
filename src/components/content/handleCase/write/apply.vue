<template>
  <div>
    <section v-if="ifmVisible == 0">
      <div class="form-horizontal">
        <div class="form-group">
          <label class="control-label">姓名</label>
          <div class="down">
            <input type="text" v-model="form.name" disabled>
            <button class="edit" @click="editBuyer">修改</button>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">身份证</label>
          <div class="down">
            <input type="text" v-model="form.cardID" disabled>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">年龄</label>
          <div class="down">
            <input type="text" v-model="form.age" disabled>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">性别</label>
          <div class="down">
            <el-radio-group v-model="form.sex">
              <el-radio label="1" disabled>男</el-radio>
              <el-radio label="2" disabled>女</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">户主姓名</label>
          <div class="down">
            <input type="text" v-model="form.headname" disabled>
            <button class="edit" @click="editSeller">修改</button>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">户主身份证</label>
          <div class="down">
            <input type="text" v-model="form.headcardid" disabled>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">户主年龄</label>
          <div class="down">
            <input type="text" v-model="form.headage" disabled>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">户主性别</label>
          <div class="down">
            <el-radio-group v-model="form.headsex">
              <el-radio label="1" disabled>男</el-radio>
              <el-radio label="2" disabled>女</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">房屋坐落</label>
          <div class="down">
            <input
              type="text"
              v-model="form.roomlocation"
              disabled>
            <button class="edit" @click="editRoom">修改</button>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">房屋面积(㎡)</label>
          <div class="down">
            <input type="text" v-model="form.roomaera" disabled>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">是否合租</label>
          <div class="down">
            <el-radio-group v-model="form.isrent">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">户型</label>
          <div class="down">
            <input type="text" v-model="form.roommode" disabled>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label">房产证号</label>
          <div class="down">
            <input type="text" v-model="form.roomcard" disabled>
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <button type="button" class="submit" @click="submit">提交</button>
      </div>
    </section>
    <edit-buyer v-if="ifmVisible == 1" :id="appMan1ID" @back="back" @rowData="getBuyerRowData"></edit-buyer>
    <edit-seller v-if="ifmVisible == 2" :id="appMan2ID" @back="back" @rowData="getSellerRowData"></edit-seller>
    <edit-room v-if="ifmVisible == 3" :id="oldHouseID" @back="back" @rowData="getRoomRowData"></edit-room>
  </div>
</template>
<script>
import editBuyer from "@/components/content/handleCase/write/edit-buyer";
import editSeller from "@/components/content/handleCase/write/edit-seller";
import editRoom from "@/components/content/handleCase/write/edit-room";

export default {
  components: {
    editBuyer,
    editSeller,
    editRoom
  },
  data() {
    return {
      form: {
        name: "",
        cardID: "",
        age: "",
        sex: "1",
        headname: "",
        headcardid: "",
        headage: "",
        headsex: "1",
        roomlocation: "",
        roomaera: "",
        roommode: "",
        roomcard: "",
        isrent: "0"
      },
      ifmVisible: 0,
      appMan1ID: "",
      appMan2ID: "",
      oldHouseID: "",
      newHouseID: '',
      appMan1Type: "2",
      appMan2Type: "2",
      houseType: '2'
    };
  },
  created() {
    this.isApply();
  },
  methods: {
    submit() {
      let param = {
        casenum: this.$route.query.serialNO,
        appMan1Type: this.appMan1Type,
        appMan2Type: this.appMan2Type,
        houseType: this.houseType,
        appMan1ID: this.appMan1ID,
        appMan2ID: this.appMan2ID,
        oldHouseID: this.oldHouseID,
        newHouseID: this.newHouseID,
        isRent: this.form.isrent
      };
      param = JSON.stringify(param);

      this.$http
        .post(
          process.env.ROOT_API + "guide/updateRecandappformInfo",
          { recandappformInfo: param },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$message({ type: "success", message: "提交成功" });
            } else {
              this.$message.error("提交失败");
            }
          },
          err => {
            throw new Error(err);
          }
        );
    },
    // 判断是否已经申请过
    isApply() {
      this.$http
        .post(
          process.env.ROOT_API + "recandappform/getRecByCasenum",
          { casenum: this.$route.query.serialNO },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);

            if (res.success) {
              if (res.data) {
                // console.log(res.data);
                this.appMan1ID = res.data.appMan1ID;
                this.appMan2ID = res.data.appMan2ID;
                this.oldHouseID = res.data.houseID;
                this.newHouseID = res.data.houseID

                this.form.name = res.data.appMan1;
                this.form.cardID = res.data.appMan1CardID;
                this.form.age = res.data.appMan1Age;
                this.form.sex = res.data.appMan1Sex;

                this.form.headname = res.data.appMan2;
                this.form.headcardid = res.data.appMan2CardID;
                this.form.headage = res.data.appMan2Age;
                this.form.headsex = res.data.appMan2Sex;

                this.form.roomlocation = res.data.houseLocation;
                this.form.roomaera = res.data.houseArea;
                this.form.roommode = res.data.houseType;
                this.form.roomcard = res.data.housePropertyCardNum;
                this.form.isrent = res.data.isReat;
              }
            }
          },
          err => {
            this.$message.error("获取数据失败！");
            throw new Error(err);
          }
        );
    },
    // 修改申请人信息
    editBuyer() {
      this.ifmVisible = 1;
    },
    // 修改户主信息
    editSeller() {
      this.ifmVisible = 2;
    },
    // 修改房屋信息
    editRoom() {
      this.ifmVisible = 3;
    },
    back() {
      this.ifmVisible = 0;
    },
    // 获得选中的申请人信息
    getBuyerRowData(row) {
      // console.log(row);
      this.appMan1Type = '1'
      this.appMan1ID = row.person_id
      this.form.name = row.person_name
      this.form.cardID = row.person_card_id
      this.form.age = row.person_age
      this.form.sex = row.person_sex
    },
    // 获得选中的户主信息
    getSellerRowData(row) {
      // console.log(row)
      this.appMan2Type = '1'
      this.appMan2ID = row.person_id
      this.form.headname = row.person_name
      this.form.headcardid = row.person_card_id
      this.form.headage = row.person_age
      this.form.headsex = row.person_sex
    },
    // 获得选中的房屋信息
    getRoomRowData(row) {
      this.houseType = '1'
      this.newHouseID = row.house_id
      this.form.roomlocation = row.house_location
      this.form.roomaera = row.house_area
      this.form.roommode = row.house_type
      this.form.roomcard = row.house_card_num
    }
  }
};
</script>
<style lang="scss" scoped>
.form-horizontal {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  .form-group {
    width: 40%;
    margin: 10px 0;
    .control-label {
      font-weight: 700;
    }
    .down {
      margin-top: 10px;
      display: flex;
      input[type="text"] {
        display: inline-block;
        padding: 6px 8px;
        width: 80%;
        outline: none;
        border-radius: 4px;
        border: 1px solid rgba(204, 204, 204, 1);
      }
      .edit {
        margin-left: 5px;
        background: transparent;
        color: blue;
        border: none;
        outline: none;
        text-decoration: underline;
        white-space: nowrap;
        cursor: pointer;
      }
    }
  }
}
.bottom-btn {
  margin-top: 20px;
  .submit {
    padding: 8px 40px;
    border: none;
    outline: none;
    border-radius: 6px;
    background-color: rgba(131, 81, 208, 1);
    color: #fff;
    cursor: pointer;
  }
}
</style>
