<template>
  <div ref="stepItem">
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label">申请人姓名</label>
        <div class="down">
          <input type="text" :value="form.appMan" disabled>
        </div>
      </div>
      
      <div class="form-group">
        <label class="control-label">申请人身份证</label>
        <div class="down">
          <input type="text" :value="form.cardID" disabled>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">户主姓名</label>
        <div class="down">
          <input type="text" :value="form.appMan2" disabled>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">户主身份证</label>
        <div class="down">
          <input type="text" :value="form.headcardid" disabled>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">房屋坐落</label>
        <div class="down">
          <input type="text" :value="form.houseLocation" disabled>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        procID: "",
        houseID: "",
        personID: {
          proposerID: "",
          houseOwnerID: ""
        },
        appMan: "",
        appMan2: "",
        houseLocation: "",
        cardID: "",
        headcardid: ""
      }
    };
  },
  mounted() {
    this.$store.commit("changeTaskStepTitle", {
      createTaskStepTitle: "居住证办理一汇总"
    });
    let obj = this.$store.state.moduleHead.selRowDataJSON;
    // console.log(obj);
    this.form.procID = obj.task.procID;
    obj.buyer.datadesc.forEach(item => {
      item.forEach(row => {
        if (row.prop == "person_name") {
          this.form.appMan = row.value;
        }
        if (row.prop == "person_card_id") {
          this.form.cardID = row.value;
        }
        if (row.prop == "person_id") {
          this.form.personID.proposerID = row.value;
        }
      });
    });

    obj.seller.datadesc.forEach(item => {
      item.forEach(row => {
        if (row.prop == "person_name") {
          this.form.appMan2 = row.value;
        }
        if (row.prop == "person_card_id") {
          this.form.headcardid = row.value;
        }
        if (row.prop == "person_id") {
          this.form.personID.houseOwnerID = row.value;
        }
      });
    });

    obj.room.datadesc.forEach(item => {
      item.forEach(row => {
        if (row.prop == "house_location") {
          this.form.houseLocation = row.value;
        }
        if (row.prop == "house_id") {
          this.form.houseID = row.value;
        }
      });
    });
  },
  methods: {
    finish() {
      let obj = {
        procID: this.form.procID,
        houseID: this.form.houseID,
        caseType: "1",
        isRent: "1",
        personID: {
          proposerID: this.form.personID.proposerID,
          houseOwnerID: this.form.personID.houseOwnerID
        },
        appMan: this.form.appMan,
        appMan2: this.form.appMan2,
        houseLocation: this.form.houseLocation
      };
    //   console.log(obj);
      obj = JSON.stringify(obj);
      this.$http
        .post(
          process.env.ROOT_API + "task/createTask",
          { creatTaskInfo: obj },
          { emulateJSON: true }
        )
        .then(
          res => {
            res = JSON.parse(res.bodyText);
            if (res.success) {
              this.$emit("closeDialog");
              this.$message({ type: "success", message: "创建案件成功" });
            } else {
              this.$message.error("创建案件失败");
            }
          },
          err => {
            this.$message.error("创建案件失败");
            throw new Error(err);
          }
        );
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
    width: 45%;
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
        width: 100%;
        outline: none;
        border-radius: 4px;
        border: 1px solid rgba(204, 204, 204, 1);
      }
    }
  }
}
</style>
