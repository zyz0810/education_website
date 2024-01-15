<template>
  <div>
    <el-upload class="avatar-uploader"
               :class="eventDetail.length==max?'form_upload':''"
               action
               multiple
               name="files"
               :file-list="eventDetail"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"
               :http-request="uploadFile"
               :on-change="handleEnclosure"
               :limit="max"
               accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
      <i class="el-icon-plus"></i>
    </el-upload>
    <div slot="tip"
         v-for="(item, indexChile) in eventDetail"
         :key="indexChile">
      <div>
        <!--expiredStatus 1 是已过期-->
<!--        <el-image class="icon_overdue"-->
<!--                  v-if='item.expiredStatus == 1'-->
<!--                  :src='require("../../assets/image/icon_expired.png")'></el-image>-->
      </div>
    </div>
    <div class="tips">最多支持上传{{max}}张</div>
    <el-dialog append-to-body
               :visible.sync="dialogVisible"
               size="tiny">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </div>
</template>

<script>
import { uploadFile } from "@/api/common";
export default {
  name: "Upload",
  props: {
    title: {
      required: true,
      type: String,
      default: ""
    },
    max: {
      required: true,
      type: Number,
      default: 1
    },
    eventDetail: {
      required: true,
      type: Array,
      default: () => []
    },
    id: {
      required: true,
      type: Number,
      default: 1
    },
    isMust: {
      required: true,
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  computed: {},
  watch () {
    // this.uploadFile()
    this.eventDetail = this.eventDetail
  },
  methods: {
    // 图片移除
    handleRemove (file, fileList) {
      this.eventDetail = fileList
      // const index=this.eventDetail.findIndex(item=>item.url==file.url)
      // if(index!=-1){
      // this.eventDetail=  this.eventDetail.splice(index,1)
      // }
      // this.eventDetail.push({image:res.picUrl,url:res.picUrl,parameterId:this.id})
      this.$emit('update:event-detail', this.eventDetail)
    },
    // 图片放大
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传
    uploadFile (e) {
      const file = e.file;
      uploadFile(file)
        .then(res => {
          this.eventDetail.push({ image: res.picUrl, url: res.picUrl, parameterId: this.id, isMust: this.isMust })
          this.$emit('update:event-detail', this.eventDetail)
          this.$message({ message: "上传成功", type: "success" });
        })
        .catch(e => {
          this.$message({ message: "上传失败", type: "warning" });
        });
    },
    // 公共提示窗
    hint (value) {
      return this.$confirm(value, "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "info"
      }).catch();
    },
    // 删除图片
    del () {
      this.hint("确定要删除该图片？").then(res => {
        if (res) {
          this.imageUrl = "";
          this.$emit("company", res.imageUrl);
        }
      });
    },
    handleEnclosure () { }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  display: flex;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.el-upload-list__item {
  width: 100px;
  height: 80px;
}
/deep/.el-upload--picture-card {
  width: 100px;
  height: 80px;
  line-height: 80px;
}
/deep/.el-upload-list--picture-card {
  display: flex;
}
.avatar {
  margin-right: 20px;
  width: 80px;
  height: 80px;
  display: block;
  margin-top: 0px;
}
.dis {
  line-height: 1.5em;
}
.relative {
  position: relative;
  .absolute {
    position: absolute;
    top: -0px;
    right: 0px;
    font-size: 25px;
    z-index: 9999;
  }
}
.tips {
  font-size: 12px;
  color: #666;
}
/deep/.form_upload {
  .el-upload--picture-card {
    display: none;
  }
}
.icon_overdue {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 60px;
  bottom: 30px;
}
</style>
