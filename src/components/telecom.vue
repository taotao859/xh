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
        <el-menu-item index="/mlmodel" >
          <i class="el-icon-data-line" style="color: white"></i>
        </el-menu-item>
        <el-menu-item index="/telecom" @click="resetView">
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
      <template>
        <el-main style="overflow: hidden">
          <el-card style="height: 100%; overflow-y:auto" shadow="never">
            <el-row style="margin-bottom: 10px;" align="middle">
              <el-col :span="4" style="text-align: left;">
                <h2 style="margin: 0;">电信欺诈检测</h2>
              </el-col>
            </el-row>
            <!-- 图片显示区 -->
            <div v-if="selectedNumber === null && images.length > 1" class="image-grid">
              <el-row gutter="20">
                <el-col :span="12" v-for="(image, index) in images" :key="index">
                  <img
                    :src="image"
                    alt="图片"
                    class="grid-image"
                    @click="handleImageClick(index + 7)"
                  />
                </el-col>
              </el-row>
            </div>
            <div v-if="selectedNumber === null && images.length === 1" class="single-image-container">
              <img :src="images[0]" alt="图片" class="single-image" @click="handleImageClick(7)"/>
            </div>

            <!-- 主界面 -->
            <div v-else>
              <div class="header-buttons">
                <el-button
                  :type="activeTab === 'result' ? 'primary' : 'default'"
                  @click="switchTab('result')"
                >
                  结果分析
                </el-button>
                <el-button
                  :type="activeTab === 'feature' ? 'primary' : 'default'"
                  @click="switchTab('feature')"
                >
                  特征分析
                </el-button>
              </div>

              <!-- 结果分析界面 -->
              <div v-if="activeTab === 'result'" class="result-analysis">
                <div class="search-section">
                  <el-input v-model="searchQuery" placeholder="请输入搜索内容"></el-input>
                  <el-button type="primary" @click="handleSearch">搜索</el-button>
                </div>
                <div v-if="activeTab === 'result'" class="chart-section">
                  <div ref="pieChart" id="pie-chart" style="width: 600px; height: 600px;"></div>

<!--                  <div class="legend">-->
<!--                    <p><span style="color: #f5e694;">●</span> 绿色：正常数据</p>-->
<!--                    <p><span style="color: #bcbbd0;">●</span> 黄色：警告数据</p>-->
<!--                    <p><span style="color: #acd9ca;">●</span> 红色：异常数据</p>-->
<!--                  </div>-->
                </div>
              </div>

              <!-- 弹窗 -->
              <el-dialog style="max-height: 700px;overflow: hidden" v-if="showDialog" :visible.sync="showDialog" title="搜索结果">
                <div class="dialog-content">
                  <div style="height: 400px;overflow: auto" class="left-table">
                    <el-table :data="featureData" border>
                      <el-table-column prop="feature" label="特征" min-width="200px"></el-table-column>
                      <el-table-column prop="value" label="值" min-width="200px"></el-table-column>
                    </el-table>
                  </div>
                  <div class="right-summary">
                    <p>该用户风险概率：{{ shareProbability }}</p>
                    <p>判定为：{{ userVerdict }}</p>
                  </div>
                </div>
              </el-dialog>

              <!-- 特征分析界面 -->
              <div v-if="activeTab === 'feature'" class="feature-analysis">
                <div class="icon-section">
                  <div
                    class="feature-icon"
                    v-for="(feature, index) in features"
                    :key="index"
                    @click="handleIconClick(feature.label)"
                  >
                    <i :class="feature.iconClass" style="color: #032262">
                      <span style="margin-left: 10px;">{{ feature.label }}</span>
                    </i>
                  </div>
                </div>

                <div class="chart-section_2">
                  <div v-if="selectedFeature" class="left-buttons">
                    <div style="height: 0; visibility: hidden;"></div>
                    <el-button style="margin: 0;padding: 10px;" v-for="(btn, index) in chartButtons" :key="index" @click="setChartType(btn.type)">
                      {{ btn.label }}
                    </el-button>
                  </div>
                  <div class="chart-display">
                    <img v-if="!selectedFeature" :src="no_show" alt="默认图片" />
                    <div v-else ref="featureChart" id="feature-chart" style="width: 600px; height: 600px;"></div>
<!--                    <div ref="pieChart" id="pie-chart" style="width: 400px; height: 400px;"></div>-->
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-main>
      </template>

    </el-container>
  </el-container>
</template>

<script>
import * as echarts from 'echarts';
import logo from '@/assets/logo1.jpg'
import image1 from '@/assets/1.png'
import image2 from '@/assets/2.png'
import image3 from '@/assets/3.png'
import image4 from '@/assets/4.png'
import no_show from '@/assets/img.png'
import {data} from "autoprefixer";

export default {
  name: 'telecom',
  data() {
    return {
      logo: logo,
      pageName: 'ML模型',
      salesName: this.$cookie.get('name'),
      images: [
        image4,
      ],
      selectedNumber: null, // 用于记录点击后显示的数字
      activeTab: "result", // 当前激活的页面
      no_show: no_show,
      searchQuery: "",
      showDialog: false,
      featureData: [],
      shareProbability: "85%",
      userVerdict: "高风险",
      selectedFeature: null,
      chartButtons: [
        { type: "line", label: "概率密度图" },
        { type: "bar", label: "直方图" },
        { type: "scatter", label: "散点图" },
      ],
      chartType: "line",
      chartInstance: null, // 保存 ECharts 实例
      chartInstance_feature: null,
      features: [
        { label: '特征1', iconClass: 'el-icon-money' },
        { label: '特征2', iconClass: 'el-icon-school' },
        { label: '特征3', iconClass: 'el-icon-wallet' },
        { label: '特征4', iconClass: 'el-icon-bank-card' },
        { label: '特征5', iconClass: 'el-icon-chat-round' },
        { label: '特征6', iconClass: 'el-icon-location-information' },
        { label: '特征7', iconClass: 'el-icon-service' },
        { label: '特征8', iconClass: 'el-icon-view' },
      ],
      iconClass_list: [
        'el-icon-money',
        'el-icon-school',
        'el-icon-wallet',
        'el-icon-bank-card',
        'el-icon-chat-round',
        'el-icon-location-information',
        'el-icon-service',
        'el-icon-view'
      ],
      color_list: [
        "#acd9ca",
        "#f5e694",
        "#bcbbd0"
      ],
      legend_data: [],
      data: [],
      data_destiny: [],
      name_list: [],
      result: [],
      result_list: []
    }
  },
  watch: {
    activeTab(newTab) {
      if (newTab !== 'result' && this.chartInstance) {
        this.chartInstance.dispose(); // 切换页面时销毁图表
        this.chartInstance = null;
      }
    },
    selectedFeature(newFeature) {
      if (this.chartInstance_feature) {
        this.chartInstance_feature.dispose(); // 切换页面时销毁图表
        this.chartInstance_feature = null;
      }
    }
  },
  computed: {},
  mounted: function () {
    this.selectedNumber = this.$route.query.id
    if (this.selectedNumber === '' || this.selectedNumber === undefined){
      this.selectedNumber = null
      this.selectedFeature = null
    } else  {
      console.log("selected")
      console.log(this.selectedNumber)
      this.handleImageClick(this.selectedNumber)
    }
  },
  methods: {
    handleImageClick(number) {
      this.activeTab = 'result'
      if (this.activeTab === 'result') {
        console.log("number")
        console.log(number)

        if (number === 7 || number === '7'){
          console.log("in")
          console.log(number)
          this.$nextTick(() => {
            this.$axios.post('/upload_black_money', this.$qs.stringify({number: number})).then(Response => {
              this.name_list = Response.data.name_list
              this.data = Response.data.data
              this.result = Response.data.result
              this.legend_result = Response.data.legend_result
              this.result_list = Response.data.result_list
              this.data_destiny = Response.data.data_destiny
              let feature_result = []
              for (let i = 0; i < this.name_list.length; i++) {
                // console.log(this.name_list[i]);
                feature_result.push({ label: this.name_list[i], iconClass: this.iconClass_list[i] },)
              }
              this.features = feature_result
              console.log(this.result, this.legend_result)
              this.initPieChart(this.result, this.legend_result);
            })
            this.selectedNumber = number; // 设置当前点击的数字
          }
        )}
        else {
          this.$message({
            message: "功能未开放",
            type: "warning",
          });
        }
      }
    },
    resetView() {
      this.selectedNumber = null; // 重置为图片显示状态
      this.selectedFeature = null;
      this.legend_data= [],
      this.data = [],
      this.data_destiny= [],
      this.name_list= [],
      this.result= [],
      this.result_list= []
      if (this.chartInstance) {
        this.chartInstance.dispose(); // 切换页面时销毁图表
        this.chartInstance = null;
      }
      if (this.chartInstance_feature) {
        this.chartInstance_feature.dispose(); // 切换页面时销毁图表
        this.chartInstance_feature = null;
      }
    },
    switchTab(tab) {
      this.activeTab = tab;
      this.selectedFeature = null
      this.searchQuery = ''
      if (this.activeTab === 'result') {
        this.$nextTick(() => {
          this.initPieChart(this.result, this.legend_result);
        });
      }
    },
    handleSearch() {
      this.$axios.post('/search_feature', this.$qs.stringify({id: this.searchQuery, number: this.selectedNumber})).then(Response => {
        if (Response.data.code === 206){
          this.$message({
            message: Response.data.mes,
            type: "warning",
          });
          return
        }
        // console.log(Response.data)
        this.featureData = Response.data.feature_list
        this.shareProbability = Response.data.class_value
        this.userVerdict = Response.data.class_type
        this.showDialog = true;
      })

    },
    handleIconClick(label) {
      this.selectedFeature = label;
      this.updateChart();
    },
    setChartType(type) {
      this.chartType = type;
      if (this.chartInstance_feature) {
        this.chartInstance_feature.dispose(); // 切换页面时销毁图表
        this.chartInstance_feature = null;
      }
      this.$nextTick(() => {
        if (this.chartType === 'line'){
          console.log(6)
          const x = this.data_destiny[this.selectedFeature].x
          console.log(x)
          const y = this.data_destiny[this.selectedFeature].y
          const data = x.map((xi, idx) => [xi, y[idx]]);
          this.updateChart(data, []);
        } else {
          console.log(5)
          if (this.chartType === 'bar') {
            const data = this.data[this.selectedFeature].reduce((acc, value) => {
              const bin = Math.floor(value);
              acc[bin] = (acc[bin] || 0) + 1;
              return acc;
            }, [])
            this.updateChart(data, []);
          } else if (this.chartType === 'scatter') {
            const data = this.result_list.map((x, index) => [x, this.data[this.selectedFeature][index]])
            this.updateChart(data, []);
          }
        }
      });
    },
    updateChart(data, legend_data) {
      // const chart = echarts.init(document.getElementById("feature-chart"));
      if (!this.$refs.featureChart) return;
      const chartDom = document.getElementById("feature-chart");
      if (!chartDom) {
        console.error("Pie chart container not found!");
        return;
      }
      console.log(1)
      this.chartInstance_feature = echarts.init(chartDom);
      console.log(this.chartType)
      if (this.chartType !== 'pie'){
        console.log(7)
        const options = {
          title: {
            text: "数据分布",
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          xAxis: {
            type: 'category', // 设置为类别轴
          },
          yAxis: {
            type: 'value' // 设置为数值轴
          },
          series: [
            {
              type: this.chartType, // 折线图
              data: data // 数据
            }
          ]
        };
        this.chartInstance_feature.setOption(options);
      }
      else{
        console.log(9)
        const option = {
          title: {
            text: "数据分布",
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            bottom: "100",
            left: "right",
            data: legend_data
          },
          series: [
            {
              type: this.chartType,
              data: data
            },
          ],
        };
        this.chartInstance_feature.setOption(option);
      }
    },
    initPieChart(data, legend_data) {
      if (!this.$refs.pieChart) return;
      const chartDom = document.getElementById("pie-chart");
      if (!chartDom) {
        console.error("Pie chart container not found!");
        return;
      }
      console.log(this.data)
      this.chartInstance = echarts.init(chartDom);
      console.log(this.legend_data)
      const option = {
        title: {
          text: "数据分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: "10",
          left: "center",
          data: legend_data
        },
        series: [
          {
            name: "数据",
            type: "pie",
            radius: "50%",
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      console.log(3)
      this.chartInstance.setOption(option);
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

.el-image {
  margin-bottom: 20px;
}
.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.grid-image {
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.grid-image:hover {
  transform: scale(1.05);
}
.single-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.single-image {
  width: 80%;
  height: 80%;
  object-fit: cover; /* 确保图片按比例填充，不拉伸 */
  border-radius: 8px; /* 可选：为图片添加圆角 */
}
.single-image:hover {
  transform: scale(1.05);
}
.header-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.result-analysis .search-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.chart-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.legend p {
  margin: 5px 0;
}
.dialog-content {
  display: flex;
  justify-content: space-between;
}

.left-table {
  width: 50%;

}

.right-summary {
  width: 40%;
  padding-left: 20px;
}
.feature-analysis .icon-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.chart-display img {
  width: 70%;
}

.left-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 20%;
  margin-right: 20px;
}

#pie-chart {
  width: 600px;
  height: 600px;
}
.feature-analysis {
  display: flex;
  flex-direction: column;
}

.icon-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #f5f5f5; /* 淡灰色背景 */
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.feature-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.feature-icon:hover {
  transform: scale(1.1); /* 悬停放大效果 */
}

.feature-icon p {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}

.chart-section_2 {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: calc(100vh - 250px);
}

.chart-display {
  flex: 1;
  height: calc(100vh - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
