<template>
  <el-dialog
    :visible="visible"
    :close-on-click-modal="closeOnClickModal"
    :width="width"
    @close="close"
    :append-to-body="appendToBody"
    :top="top"
    :title="title"
    :fullscreen="isFullscreen"
    :class="isFullscreen ? 'full_screen' : ''"
    :show-close="true"
    @open="open"
  >
    <div slot="title" class="dialog-title">
      {{ title }}
<!--      <el-tooltip content="关闭" placement="bottom">-->
<!--        <i class="iconfont icon-control102" @click="close"></i>-->
<!--      </el-tooltip>-->
<!--      <el-tooltip :content="!isFullscreen ? '全屏' : '缩小'" placement="bottom">-->
<!--        <i-->
<!--          class="iconfont"-->
<!--          :class="!isFullscreen ? 'icon-icon&#45;&#45;' : 'icon-suoxiao'"-->
<!--          @click="isFullscreen = !isFullscreen"-->
<!--        ></i>-->
<!--      </el-tooltip>-->
    </div>
    <slot></slot>
    <slot name="footer" class="page_footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      required: false,
      default: false,
      type: Boolean
    },
    width: {
      required: false,
      default: "40%",
      type: String
    },
    appendToBody: {
      required: false,
      default: false,
      type: Boolean
    },
    top: {
      required: false,
      default: "15vh",
      type: String
    },
    title: {
      required: false,
      default: "",
      type: String
    }
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  methods: {
    open() {
      this.$emit("open");
    },
    close() {
      this.dialogVisible = false;
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.iconfont::before {
  // float: right;
  cursor: pointer;
  font-size: 20px;
}
.iconfont:nth-child(2) {
  margin-right: 10px;
  right: 20px;
}
.iconfont:nth-child(1) {
  font-size: 21px;
  right: 0px;
}
.iconfont {
  position: absolute;
  color: #909399;
  font-weight: bold;
}

.dialog-title {
  position: relative;
  font-size: 18px;
  color: #909399;
  &:after{
    content: " ";
    position: absolute;
    left: -20px;
    bottom: -6px;
    right: -50px;
    height: 1px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    color: rgba(0,0,0,0.3);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
}
</style>
