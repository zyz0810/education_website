<template>
  <el-drawer
    :visible.sync="visible"
    direction="rtl"
    :wrapperClosable="closeOnClickModal"
    :size="width"
    @close="close"
    :append-to-body="appendToBody"
    :title="title"
    :class="isFullscreen ? 'full_screen' : ''"
    :show-close="false"
    @open="open"
  >
    <div slot="title" class="dialog-title">
      {{ title }}
      <i class="el-icon-close fr" @click="close"></i>
    </div>
    <slot></slot>
    <slot name="footer" class="page_footer"></slot>
  </el-drawer>
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
