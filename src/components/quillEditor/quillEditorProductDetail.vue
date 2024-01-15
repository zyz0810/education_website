<template>
  <div>
    <quill-editor
      ref="myQuillEditor"
      v-model="currentContent"
      :options="editorOption"
      @focus="onEditorFocus($event)"
      @blur="onEditorBlur($event)"
      @change="onEditorChange($event)"
      class="quill"
    >
<!--      <div id="toolbar" slot="toolbar">-->
<!--        <span-->
<!--          v-if="isShowImg"-->
<!--          class="iconfont icon-piliangdaoru editorImg"-->
<!--          title="图片"-->
<!--          @click="insertImgClick($event)"-->
<!--        />-->
        <!-- <span class="iconfont icon-chuangjian" title="视频" @click="insertVideoClick($event)" />  插入视频 -->
<!--      </div>-->
    </quill-editor>
<!--    <input-->
<!--      id="insert_image"-->
<!--      style="display: none"-->
<!--      type="file"-->
<!--      @change="fileInsert($event)"-->
<!--    />-->

<!--    <el-upload action style="display: none"-->
<!--               ref="uploadBigImg"-->
<!--               :before-upload="beforeImgUpload"-->
<!--               :http-request="fileInsert"-->
<!--               accept=".png,.jpg,.jpeg"-->
<!--               class="uploadImg"-->
<!--               multiple-->
<!--               :on-success="handleSuccess">-->
<!--      <i class="el-icon-plus"></i>-->
<!--    </el-upload>-->
    <el-upload action style="display: none"
               ref="uploadBigImg"
               :before-upload="beforeImgUpload"
               :http-request="fileInsert"
               accept=".png,.jpg,.jpeg"
               class="uploadImg">
      <i class="el-icon-plus"></i>
    </el-upload>

    <!-- 选择图片input -->
<!--    <input-->
<!--      id="insert_video"-->
<!--      style="display: none"-->
<!--      type="file"-->
<!--      @change="fileInsert($event)"-->
<!--    />-->
    <!-- 选择视频input -->
  </div>
</template>

<script>
import $ from "jquery";
// import { uploadImg } from "@/api/upload";
import { uploadFile } from "@/api/common";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ["clean"], // 清除文本格式-----['clean']
  ["image"], // 链接、图片、视频-----['link', 'image', 'video']
];
export default {
  name: "MyQuillEditor",
  props: {
    content: {
      type: String,
      default: "",
    },
    isChange: {
      type: Boolean,
      default: false,
    },
    isShowImg: {
      type: Boolean,
      default: false,
    },
    isProductDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: {}, // 富文本编辑器对象
      currentContent: this.content, // 富文本编辑器默认内容
      initialValue: this.content,
      editorOption: {
        placeholder: "请输入...",
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              // image: function (value) {
              //   if (value) {
              //     document.getElementById("insert_image").click();
              //   } else {
              //     this.quill.format("image", false);
              //   }
              // },
              'image': function (value) {
                if (value) {
                  document.querySelector('.uploadImg .el-upload__input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            },
          },
        },
      },
    };
  },
  mounted() {
    this.editor = this.$refs.myQuillEditor.quill;
  },
  beforeDestroy() {
    this.editor = null;
    this.currentContent = "";
    this.$emit("update:content", "");
    delete this.editor;
  },
  methods: {
    // 富文本编辑器 点击插入图片或者视频上传并预览
    fileInsert(e) {
      console.log(e)
      // let oFile = e.target.files[0];
      let oFile = e.file;
      if (typeof oFile === "undefined") {
        return;
      }
      // const name = e.target.files[0].name; // 文件扩展名
      const name = e.file.name; // 文件扩展名
      const type = name.split(".").pop();
      let sfileType = "image"; // 上传文件类型
      if (!["jpg", "jpeg", "png",].includes(type)) {
        this.$alert("上传图片只能是jpg、jpeg、png格式!", "提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      // const isLt2M = e.target.files[0].size / 1024 < 800;
      const isLt2M = e.file.size / 1024 <= 800;
      if(this.isProductDetail && !isLt2M){
        this.$alert("图片不能超过800KB", "提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(oFile);
      reader.onloadend = () => {
        uploadFile(oFile,'productDetail')
          .then((res) => {
            this.editor.insertEmbed(
              this.editor.selection.savedRange.index,
              sfileType,
              res.picUrl
            ); // 这个方法用来手动插入dom到编辑器里
            this.editor.setSelection(
              this.editor.selection.savedRange.index + 1
            ); // 这个方法可以获取光标位置
          })
          .catch((response) => {
            this.$message({ message: "图片上传失败", type: "warning" });
          });
      };
    },
    beforeImgUpload(file) {
      const isJPG = file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg';
      const isLt2M = file.size / 1024 <= 800;
      console.log(file.type)
      // if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      //   this.$message.error('上传头像图片只能是jpg、jpeg、png格式!');
      // }
      if (!isJPG) {
        this.$message.error('上传头像图片只能是jpg、jpeg、png格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 800KB!');
      }
      return isJPG && isLt2M;
    },
    uploadSectionFile (e) {
      const file = e.file;
      // productImageList
      console.log(file.type)
      const isJPG = file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg';
      const isLt2M = file.size / 1024 <= 800;
      // // if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      // //   this.$message.error('上传头像图片只能是jpg、jpeg、png格式!');
      // // }
      // if (!isJPG) {
      //   this.$message.error('上传图片只能是jpg、jpeg、png格式!');
      //   this.$refs.uploadBigImg.abort()
      //   return false;
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 800KB!');
      //   console.log(this.productImageList)
      //   this.$refs.uploadBigImg.abort()
      //   return false;
      // }

      if(isJPG && isLt2M){
        console.log('1111')
        uploadFile(file,'product')
          .then((res) => {
            this.productImageList.push({ uid: file.uid, url: res.picUrl });
            if(this.productData.operatorType == "update"){
              // this.productImageNeedApproveList.push({
              //   large: res.picUrl,
              //   medium: res.picUrl,
              //   source: res.picUrl,
              //   thumbnail: res.picUrl,
              // });
              this.productImageNeedApproveList = this.productImageList.map(item=>{
                let json = {};
                json = {
                  large: item.url,
                  medium: item.url,
                  source: item.url,
                  thumbnail: item.url,
                };
                return json;
              })
              this.form.productImageList.push({
                large: res.picUrl,
                medium: res.picUrl,
                source: res.picUrl,
                thumbnail: res.picUrl,
              });
            }else{
              this.form.productImageList.push({
                large: res.picUrl,
                medium: res.picUrl,
                source: res.picUrl,
                thumbnail: res.picUrl,
              });
            }


          })
          .catch((e) => {
            this.$message({ message: "添加图片失败", type: "warning" });
          });
      }

    },
    handleRemove (file, fileList) {
      this.productImageList = [];
      this.form.productImageList = [];
      fileList.map((item) => {
        let json = {
          large: item.url,
          medium: item.url,
          source: item.url,
          thumbnail: item.url,
        };
        this.productImageList.push({ uid: item.uid, url: item.url });
        this.form.productImageList.push(json);
        if(this.productData.operatorType == "update"){
          this.productImageNeedApproveList = this.productImageList.map(item=>{
            let json = {};
            json = {
              large: item.url,
              medium: item.url,
              source: item.url,
              thumbnail: item.url,
            };
            return json;
          })
        }

      });
    },

    handleSuccess (res, file) {
      let quill = this.$refs.myQuillEditor.quill
      let length = quill.getSelection().index;
      quill.insertEmbed(length, 'image', res)
      quill.setSelection(length + 1)
    },

    onEditorReady(editor) {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {
      this.$emit("update:content", this.currentContent);
    },
    // 富文本编辑器 获得焦点事件
    onEditorFocus(editor) {},
    // 富文本编辑器 内容改变事件
    onEditorChange(editor) {
      this.$emit(
        "update:isChange",
        !Object.is(this.initialValue, this.currentContent)
      );
      this.$emit("update:content", this.currentContent);
    },
    // 富文本编辑器 点击插入图片
    // insertImgClick(e) {
    //   document.getElementById("insert_image").click();
    // .uploadImg .el-upload__input
    // },
    // 富文本编辑器 点击插入视频
    insertVideoClick(e) {
      document.getElementById("insert_video").click();
    },
    changeContent(value) {
      this.initialValue = value;
      this.currentContent = value;
    },

  },
};
</script>

<style lang="scss" scoped>
.editorImg::before {
  font-size: 20px;
  cursor: pointer;
}

.quill /deep/ .ql-container {
  height: 300px;
}
</style>
