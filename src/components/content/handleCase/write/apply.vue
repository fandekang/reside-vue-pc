<template>
  <div>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label">姓名</label>
        <div class="down">
          <input id="name" type="text" class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">身份证</label>
        <div class="down">
          <input id="cardID" type="text" class="form-control" placeholder="请输入相应的身份证格式">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">年龄</label>
        <div class="down">
          <input id="age" type="text" class="form-control" placeholder="请输入0-150 的数字">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">性别</label>
        <div class="down">
          <div class="radio">
            <label for="optionsRadio1">
              <input type="radio" name="sex" class="sex" value="男" checked> 男
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="sex" class="sex" value="女"> 女
            </label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">户主姓名</label>
        <div class="down">
          <input id="headname" type="text" class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">户主身份证</label>
        <div class="down">
          <input id="headcardid" type="text" class="form-control" placeholder="请输入相应的身份证格式">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">户主年龄</label>
        <div class="down">
          <input id="headage" type="text" class="form-control" placeholder="请输入0-150 的数字">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">户主性别</label>
        <div class="down">
          <div class="radio">
            <label>
              <input type="radio" name="headsex" class="headsex" value="男" checked> 男
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="headsex" class="headsex" value="女"> 女
            </label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">房屋坐落</label>
        <div class="down">
          <input
            type="text"
            id="roomlocation"
            class="form-control"
            placeholder="XXX市（县）XXX街道（乡镇）XXX社区（村委会）XXX街（巷）xxx号XXXX楼XXX室"
          >
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">房屋面积(㎡)</label>
        <div class="down">
          <input type="text" id="roomaera" class="form-control" placeholder="数字，可带两位小数点">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">是否合租</label>
        <div class="down">
          <span class="radio">
            <label>
              <input type="radio" name="isrent" class="isrent" value="y" checked> 是
            </label>
          </span>
          <span class="radio">
            <label>
              <input type="radio" name="isrent" class="isrent" value="n"> 否
            </label>
          </span>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">户型</label>
        <div class="down">
          <input type="text" id="roommode" class="form-control" placeholder="如 平层户型、跃层户型、错层户型户">
        </div>
      </div>

      <div class="form-group">
        <label class="control-label">房产证号</label>
        <div class="down">
          <input type="text" id="roomcard" class="form-control">
        </div>
      </div>
    </form>
    <div class="bottom-btn">
      <button type="button" id="submit" class="submit">提交</button>
    </div>
  </div>
</template>
<script>
export default {};
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
