<template>
  <el-dialog :visible.sync="showDialog"
             :close-on-click-modal="false"
             width="36%"
             @close="close"
             @open="open"
             top="30vh"
             title="确认提示">
    <div class="box">
      <div class="title">
<!--        <img src="../../assets/image/question.png" />-->
        <span>{{
          titlleDialog
        }}</span>
      </div>
      <div class="content">{{ contentDialog }}</div>
    </div>
    <div slot="footer"
         class="dialog-footer">
      <el-button class="ml_30"
                 @click="sure(0)">取 消</el-button>
      <el-button type="primary"
                 @click="sure(1)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "SureTips",
  props: {
    showDialog: {
      required: true,
      type: Boolean,
      default: false
    },
    titlleDialog: {
      required: true,
      type: String,
      default: ""
    },
    contentDialog: {
      required: true,
      type: String,
      default: ""
    }
  },
  computed: {},
  methods: {
    sure (val) {
      this.$emit("func", val);
    },
    open () { },
    close () { }
  }
};
</script>

<style lang="scss" scoped>
.box {
  .title {
    font-size: 20prx;
    color: #333;
    font-weight: 600;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      margin: 0px 10px 0px 0px;
    }
  }
  .content {
    text-align: center;
    margin: 20px 0px 0px;
    font-size: 16prx;
    color: #666;
  }
}
</style>
