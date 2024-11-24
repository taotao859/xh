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
        <el-menu-item index="/telecom">
          <i class="el-icon-phone" style="color: white"></i>
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
      <el-main style="overflow: hidden">
        <el-card style="height: 100%; overflow-y:auto" shadow="never">
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
                      v-for="(btn, index) in buttom_1"
                      :key="`db-btn-${index}`"
                      class="icon-button"
                      @click="handleFeatureUnavailable"
                      @mouseover="handleFeatureUnavailable"
                    >
                      <img :src="btn" alt="功能" class="button-icon" />
                    </el-button>
                  </div>
                </div>

                <!-- 第二部分 -->
                <div class="section-card">
                  <h3>第三方数据上传</h3>
                  <div class="buttons-container" style="flex-wrap: wrap;">
                    <el-button
                      v-for="(btn, index) in buttom_2"
                      :key="`thirdparty-btn-${index}`"
                      class="icon-button"
                      @click="handleFeatureUnavailable"
                      @mouseover="handleFeatureUnavailable"
                    >
                      <img :src="btn" alt="功能" class="button-icon" />
                    </el-button>
                    <br><br>
                    <el-button
                      v-for="(btn, index) in buttom_3"
                      :key="`thirdparty-btn-${index}`"
                      class="icon-button"
                      @click="handleFeatureUnavailable"
                      @mouseover="handleFeatureUnavailable"
                    >
                      <img :src="btn" alt="功能" class="button-icon" />
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
              <div v-if="csvFileName!==''" class="right-section">
                <div class="section-card">
                  <span>是{{csv_type}}场景</span>
                  <br><br>
                  <span>包含{{num_rows}}用户数据</span>
                  <br><br>
                  <span>每位用户包含{{num_cols}}维初始特征</span>
                </div>
                <div class="section-card">
                  <div ref="lineChart" id="line-chart" style="width: 100%; height: 400px; margin-top: 20px;"></div>
                </div>
                <div class="section-card">
                  <div ref="scatterChart" id="scatter-chart" style="width: 100%; height: 400px; margin-top: 20px;"></div>
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
import mysql from '@/assets/mysql.png'
import oracle from '@/assets/oracle.png'
import postg from '@/assets/post.png'
import wexin from '@/assets/wexin.png'
import QQ from '@/assets/QQ.png'
import zhifubao from '@/assets/img_3.png'
import yunshanfu from '@/assets/onlinePay.png'
import nongye from '@/assets/img_1.png'
import gongshang from '@/assets/img_2.png'
import * as echarts from "echarts";
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
      num_rows: '',
      num_cols: '',
      csv_type: '',
      buttom_1: [
        mysql,
        oracle,
        postg
      ],
      buttom_2: [
        wexin,
        QQ,
        zhifubao
      ],
      buttom_3: [
        yunshanfu,
        nongye,
        gongshang
      ],
      images: [
        logo,
        logo,
        logo
      ],
      chartData: {
        x: [],
        y: []
      },
      x_name: '',
      y_name: '',
      chartInstance: null,
      chartInstance_2: null
    }
  },
  computed: {

  },
  mounted: function () {

  },
  methods: {
    // 处理 CSV 文件上传
    resetChart() {
      if (this.chartInstance) {
        this.chartInstance.dispose(); // 切换页面时销毁图表
        this.chartInstance = null;
      }
      if (this.chartInstance_2) {
        this.chartInstance_2.dispose(); // 切换页面时销毁图表
        this.chartInstance_2 = null;
      }
    },
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
        formData.append('Csv', this.labelFileList[0])
        this.$message({
          message: `文件 ${this.csvFileName} 上传成功.`,
          type: "success",
        });
        // const csvFile = this.$refs.csvUpload.files[0]
        // formData.append('datasetLabelCsv', csvFile)
      }
      this.$axios.post('/upload', formData).then(Response => {
        this.num_rows = Response.data.num_rows
        this.num_cols = Response.data.num_cols
        this.csv_type = Response.data.csv_type
        this.x_name = Response.data.x_name
        this.y_name = Response.data.y_name
        this.chartData = Response.data.data;
        this.drawLineChart()
        this.drawScatterChart()
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
    drawLineChart() {
      if (!this.$refs.lineChart) return;
      const chartDom = document.getElementById("line-chart");
      if (!chartDom) {
        console.error("line chart container not found!");
        return;
      }
      console.log(1)
      this.chartInstance = echarts.init(chartDom);
      console.log(2)
      console.log(this.chartData)
      const options = {
        title: {
          text: "折线图"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          name: this.x_name, // X轴标签
          nameLocation: 'end', // 标签位置，可选 'start', 'center', 'end'
          type: 'value',
          data: this.chartData.x
        },
        yAxis: {
          name: this.y_name, // X轴标签
          nameLocation: 'end', // 标签位置，可选 'start', 'center', 'end'
          type: 'value'
        },
        series: [
          {
            data: this.chartData.y,
            type: "line"
          }
        ]
      };
      this.chartInstance.setOption(options);
    },
    drawScatterChart() {
      if (!this.$refs.scatterChart) return;
      const chartDom = document.getElementById("scatter-chart");
      if (!chartDom) {
        console.error("scatter chart container not found!");
        return;
      }
      console.log(1)
      this.chartInstance_2 = echarts.init(chartDom);
      const options = {
        title: {
          text: "散点图"
        },
        tooltip: {
          trigger: "item"
        },
        xAxis: {
          name: this.x_name, // X轴标签
          nameLocation: 'end', // 标签位置，可选 'start', 'center', 'end'
          type: 'value',
          data: this.chartData.x
        },
        yAxis: {
          name: this.y_name, // X轴标签
          nameLocation: 'end', // 标签位置，可选 'start', 'center', 'end'
          type: "value"
        },
        series: [
          {
            data: this.chartData.x.map((x, index) => [x, this.chartData.y[index]]),
            type: "scatter"
          }
        ]
      };
      this.chartInstance_2.setOption(options);
    }
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

