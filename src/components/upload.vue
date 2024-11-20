<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="this.$router.path" router>
        <el-menu-item index="/upload">
          <template slot="title">数据接口</template>
        </el-menu-item>
        <el-menu-item index="/agent">
          <template slot="title">agent对话</template>
        </el-menu-item>
        <el-menu-item index="/mlmodel">
          <template slot="title">ML模型</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4" style="text-align: left">
            <div v-text="pageName"></div>
          </el-col>
          <el-col :span="20" style="text-align: right">
            Hello, <span id="salesman" v-text="salesName"></span>
            <el-button id="log-out-button" icon="el-icon-switch-button" @click="$router.push({path: '/login'})"></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-card class="table-card" shadow="never">
          <!-- 新增的头部行 -->
          <el-row style="margin-bottom: 20px;" align="middle">
            <!-- 左侧 "数据集" 文本 -->
            <el-col :span="4" style="text-align: left;">
              <h2 style="margin: 0;">CSV上传与显示</h2>
            </el-col>
            <!-- 右侧 "新增" 按钮 -->
            <el-col :span="20">
              <div style="display: flex; align-items: center;">
                <el-input
                  v-model="csvFileName"
                  placeholder="请选择CSV文件"
                  readonly
                  style="flex: 1; margin-right: 10px;"
                ></el-input>
                <el-upload
                  :before-upload="handleCsvUpload"
                  :show-file-list="false"
                  accept=".csv"
                  style="margin-right: 10px;"
                >
                  <el-button type="primary">选择CSV文件</el-button>
                </el-upload>
                <el-button type="primary" @click="submitUpload">上传</el-button>
              </div>
            </el-col>

          </el-row>
          <!-- CSV 上传框（仅在有标签且已标注时显示） -->
          <!-- CSV 数据表格展示 -->
          <el-table :data="tableData" border style="margin-top: 20px;height: 100vh">
            <el-table-column
              v-for="(column, index) in tableColumns"
              :key="index"
              :prop="'column_' + index"
              :label="'列' + (index + 1)"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      pageName: 'CSV上传',
      csvFileName: '', // 文件名
      labelFileList: [], // 上传文件
      tableData: [], // 表格数据
      tableColumns: [], // 表格列
      salesName: this.$cookie.get('name'), // 用户名
    }
  },
  computed: {

  },
  mounted: function () {

  },
  methods: {
    // 处理 CSV 文件上传
    handleCsvUpload(file) {
      this.labelFileList = [file];
      this.csvFileName = file.name;
      this.processCsvFile()
      // 停止文件自动上传
      return false;
    },
    // 处理 CSV 文件并解析内容
    processCsvFile() {
      if (this.labelFileList.length === 0) {
        this.$message.error('请先选择CSV文件');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const csvContent = event.target.result;
        this.parseCsvContent(csvContent);
      };
      reader.readAsText(this.labelFileList[0]);
    },
    // 解析 CSV 文件内容
    parseCsvContent(content) {
      const rows = content.split('\n').map((row) => row.split(','));
      if (rows.length > 0) {
        // 设置表格列（按列数动态生成）
        this.tableColumns = Array.from({ length: rows[0].length }, (_, index) => `column_${index}`);
        // 设置表格数据
        this.tableData = rows.map((row) => {
          const rowData = {};
          row.forEach((cell, index) => {
            rowData[`column_${index}`] = cell;
          });
          return rowData;
        });
      }
    },
    // 提交上传表单
    submitUpload() {
      if (this.csvFileName) {
        formData.append('datasetLabelCsv', this.labelFileList[0])
        // const csvFile = this.$refs.csvUpload.files[0]
        // formData.append('datasetLabelCsv', csvFile)
      }
      console.log(3)
      this.$axios.post('/csv/upload', formData).then(Response => {

      })
    }
  }
}
</script>

<style>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #75d9d9;
  color: black;
  font-size: large;
  font-weight: bold;
  line-height: 60px;
  text-align: right;
}
.el-aside {
  background: #f0ffff;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: beige;
  color: black;
  text-align: center;
}
#log-out-button {
  background: none;
  border: none;
}
.el-menu-item {
  background-color: #f0ffff;
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
</style>
