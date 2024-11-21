<template>
  <el-container>
    <el-aside width="100px">
      <div style="width: 100px">
        <img style="width: 100px" :src="logo" alt="logo" />
      </div>
      <el-menu :default-active="this.$router.path" router>
        <el-menu-item index="/home">
          <i class="el-icon-s-home" style="color: white"></i>
        </el-menu-item>
        <el-menu-item index="/upload">
          <i class="el-icon-folder-opened" style="color: white"></i>
        </el-menu-item>
        <el-menu-item index="/agent">
          <i class="el-icon-s-comment" style="color: white"></i>
        </el-menu-item>
        <el-menu-item index="/mlmodel">
          <i class="el-icon-data-line" style="color: white"></i>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4" style="text-align: left">
            您好, <span id="salesman" v-text="salesName"></span>
          </el-col>
          <el-col :span="20" style="text-align: right">
            <el-button style="color: white" id="log-out-button" icon="el-icon-switch-button" @click="$router.push({path: '/login'})"></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-card style="height: 100%" shadow="never">
          <!-- 主体内容 -->
          <el-row style="margin-bottom: 20px;" align="middle">
            <el-col :span="4" style="text-align: left;">
              <h2 style="margin: 0;">数据上传与分析</h2>
            </el-col>
          </el-row>
          <!-- 左右两部分布局 -->
          <el-row gutter="20">
            <!-- 左侧 60% -->
            <el-col :span="16">
              <div class="left-section">
                <!-- 第一部分 -->
                <div class="section-card">
                  <h3>数据库上传</h3>
                  <div class="buttons-container">
                    <el-button
                      v-for="(btn, index) in 3"
                      :key="`db-btn-${index}`"
                      class="icon-button"
                      @click="handleFeatureUnavailable"
                      @mouseover="handleFeatureUnavailable"
                    >
                      <img :src="logo" alt="功能" class="button-icon" />
                    </el-button>
                  </div>
                </div>

                <!-- 第二部分 -->
                <div class="section-card">
                  <h3>第三方数据上传</h3>
                  <div class="buttons-container" style="flex-wrap: wrap;">
                    <el-button
                      v-for="(btn, index) in 3"
                      :key="`thirdparty-btn-${index}`"
                      class="icon-button"
                      @click="handleFeatureUnavailable"
                      @mouseover="handleFeatureUnavailable"
                    >
                      <img :src="logo" alt="功能" class="button-icon" />
                    </el-button>
                    <br><br>
                    <el-button
                      v-for="(btn, index) in 3"
                      :key="`thirdparty-btn-${index}`"
                      class="icon-button"
                      @click="handleFeatureUnavailable"
                      @mouseover="handleFeatureUnavailable"
                    >
                      <img :src="logo" alt="功能" class="button-icon" />
                    </el-button>
                  </div>
                </div>

                <!-- 第三部分 -->
                <div class="section-card">
                  <h3>本地CSV上传</h3>
                  <el-upload
                    class="upload-container"
                    drag
                    action="#"
                    :show-file-list="false"
                    :before-upload="handleCsvUpload"
                    accept=".csv"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">点击上传或拖拽文件到此处</div>
                  </el-upload>
                </div>
              </div>
            </el-col>

            <!-- 右侧 30% -->
            <el-col :span="8">
              <div class="right-section">
                <div class="section-card" v-for="(image, index) in images" :key="`image-${index}`">
                  <img :src="image" alt="展示图片" class="image-card" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import logo from '@/assets/logo1.jpg'
export default {
  name: 'upload',
  data () {
    return {
      logo: logo,
      pageName: 'CSV上传',
      csvFileName: '', // 文件名
      labelFileList: [], // 上传文件
      tableData: [], // 表格数据
      tableColumns: [], // 表格列
      salesName: this.$cookie.get('name'), // 用户名
      images: [
        logo,
        logo,
        logo
      ],
    }
  },
  computed: {

  },
  mounted: function () {

  },
  methods: {
    // 处理 CSV 文件上传
    handleCsvUpload(file) {
      this.$message({
        message: `文件 ${file.name} 上传中...`,
        type: "success",
      });
      this.labelFileList = [file];
      this.csvFileName = file.name;
      console.log(this.csvFileName)
      const formData = new FormData()
      if (this.csvFileName) {
        formData.append('datasetLabelCsv', this.labelFileList[0])
        this.$message({
          message: `文件 ${this.csvFileName} 上传成功.`,
          type: "success",
        });
        // const csvFile = this.$refs.csvUpload.files[0]
        // formData.append('datasetLabelCsv', csvFile)
      }
      this.$axios.post('/csv/upload', formData).then(Response => {
        this.$message.success('上传成功');
      })
      // 停止文件自动上传
      return false;
    },
    handleFeatureUnavailable() {
      this.$message({
        message: "功能未开放",
        type: "warning",
      });
    },
  }
}
</script>

<style>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #00237d;
  color: white;
  font-size: large;
  font-weight: bold;
  line-height: 60px;
  text-align: right;
}
.el-aside {
  background: #032262;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: white;
  color: black;
  text-align: center;
}
#log-out-button {
  background: none;
  border: none;
}
.el-menu-item {
  background-color: #032262;
  color: white;
}
.el-submenu {
  background-color: #f0ffff;
}
.label-empty {
  background-color: #ffcccb; /* 红色背景 */
}

.label-filled {
  background-color: #d3f9d8; /* 绿色背景 */
}
.el-image {
  margin-bottom: 20px;
}
.left-section,
.right-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-card {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.section-card h3 {
  margin-bottom: 20px;
  text-align: center;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.buttons-container.multi-row {
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.icon-button {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-button:hover {
  background-color: #e6f7ff;
}

.button-icon {
  width: 50px;
  height: 50px;
}

.upload-container {
  border: 2px dashed #dcdcdc;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
}

.image-card {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
</style>

