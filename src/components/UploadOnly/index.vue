<template>
  <div>
    <el-upload class="avatar-uploader"
               :class="eventDetail.length==9?'form_upload':''"
               action
               multiple
               name="files"
               :file-list="eventDetail"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"
               :http-request="uploadFile"
               :on-change="handleEnclosure"
               :limit=9
               accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
      <i class="el-icon-plus"></i>
    </el-upload>
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
    eventDetail: {
      required: true,
      type: Array,
      default: () => []
    },
    id: {
      required: false,
      type: Number,
      default: 1
    },
    isMust: {
      required: false,
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
        })
        .catch(e => {
          this.$message({ message: "上传附件失败", type: "warning" });
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
</style>
