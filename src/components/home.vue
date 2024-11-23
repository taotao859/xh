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
      <el-main style="overflow: hidden">
        <el-card style="height: 100%; overflow-y:auto" shadow="never">
          <el-row style="margin-bottom: 300px;" align="middle">
            <el-col :span="4" style="text-align: left;">
              <h2 style="margin: 0;">主页</h2>
            </el-col>
          </el-row>
          <div style="width: 500px;
              height: 400px;
              perspective: 1000px;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 20px;">
            <div class="row small-cubes">
              <div class="cube_small blue" @click="handleClick('1')" style="z-index: 7">
                <div class="face_small front_small"><div style="margin-top: -17.5px"></div></div>
                <div class="face_small left_small"><div style="margin-top: -17.5px"></div></div>
                <div class="face_small_top top_small"><div style="margin-top: 35px">信贷欺诈</div></div>
              </div>
              <div class="cube_small blue" @click="handleClick('3')" style="z-index: 6; margin-left: -20px; margin-top: -50px">
                <div class="face_small front_small"><div style="margin-top: -17.5px"></div></div>
                <div class="face_small left_small"><div style="margin-top: -17.5px"></div></div>
                <div class="face_small_top top_small"><div style="margin-top: 35px">银行卡欺诈</div></div>
              </div>

            </div>
            <div class="row_2 small-cubes">
              <div class="cube_small blue" @click="handleClick('2')" style="z-index: 7">
                <div class="face_small front_small"><div style="margin-top: -17.5px"></div></div>
                <div class="face_small left_small"><div style="margin-top: -17.5px"></div></div>
                <div class="face_small_top top_small"><div style="margin-top: 35px">洗钱欺诈</div></div>
              </div>
              <div class="cube_small blue" @click="handleClick('4')" style="z-index: 6; margin-left: -20px; margin-top: -50px">
                <div class="face_small front_small"><div style="margin-top: -17.5px"></div></div>
                <div class="face_small left_small"><div style="margin-top: -17.5px"></div></div>
                <div class="face_small_top top_small"><div style="margin-top: 35px">ATO欺诈</div></div>
              </div>

            </div>
            <!-- 中层 -->
            <div class="cube green" @click="handleClick('5')"  style="z-index: 5;margin-top: -100px;margin-left: 50px">
              <div class="face front"><div style="margin-top: -17.5px">大模型agent对话</div></div>
              <div class="face left"><div style="margin-top: -17.5px"></div></div>
              <div class="face_top top"><div style="margin-top: 125px"></div></div>
            </div>
            <!-- 顶层 -->
            <div class="cube gray" @click="handleClick('6')"  style="z-index: 4;margin-left: 50px">
              <div class="face front"><div style="margin-top: -17.5px">数据上传与分析</div></div>
              <div class="face left"><div style="margin-top: -17.5px"></div></div>
              <div class="face_top top"><div style="margin-top: 125px"></div></div>
  <!--            <div class="face top">-->
  <!--              &lt;!&ndash; 顶层分为4个小方块 &ndash;&gt;-->
  <!--              <div class="sub-cube" onclick="handleClick('Onboarding')">Onboarding</div>-->
  <!--              <div class="sub-cube" onclick="handleClick('Credit')">Credit</div>-->
  <!--              <div class="sub-cube" onclick="handleClick('Fraud')">Fraud</div>-->
  <!--              <div class="sub-cube" onclick="handleClick('Compliance')">Compliance</div>-->
  <!--            </div>-->
  <!--            <div class="face bottom">Top Bottom</div>-->
            </div>
          </div>
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
      pageName: '主页',
      logo: logo,
      salesName: this.$cookie.get('name'), // 用户名
      hoveredLayer: null, // 当前悬停的层级标题
      topItems: [
        { title: "Onboarding", description: "Onboard the right customers..." },
        { title: "Fraud", description: "Stop fraud across the journey..." },
        { title: "Credit", description: "Improve approval and repayment rates..." },
        { title: "Compliance", description: "Manage AML/BSA compliance risk..." },
      ],
    }
  },
  computed: {

  },
  mounted: function () {

  },
  methods: {
    hoverLayer(layerName) {
      this.hoveredLayer = layerName; // 更新悬停的标题
    },
    handleClick(label) {
      if (label === '1') {
        const params = { id: 1 }
        this.$router.push({ path: '/mlmodel', query: params })
      }
      if (label === '2') {
        const params = { id: 2 }
        this.$router.push({ path: '/mlmodel', query: params })
      }
      if (label === '3') {
        const params = { id: 3 }
        this.$router.push({ path: '/mlmodel', query: params })
      }
      if (label === '4') {
        const params = { id: 4 }
        this.$router.push({ path: '/mlmodel', query: params })
      }
      if (label === '5') {
        this.$router.push({ path: '/agent' })
      }
      if (label === '6') {
        this.$router.push({ path: '/upload'})
      }
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
.scene {
  width: 200px;
  height: 200px;
  perspective: 600px;
}


.cube {
  width: 300px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(30deg);
  transition: transform 1s;
}
.cube:hover {
  transform: rotateX(-30deg) rotateY(30deg) scale(1.2);
  //box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.blue .face {
  background-color: #add8e6;
}
.green .face {
  background-color: #a8d5ba;
}
.gray .face {
  background-color: #d3d3d3;
}
.blue .face_top {
  background-color: #add8e6;
}
.green .face_top {
  background-color: #a8d5ba;
}
.gray .face_top {
  background-color: #d3d3d3;
}
.face {
  position: absolute;
  width: 300px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  line-height: 100px;
  text-align: center;
}
.face_top {
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  line-height: 100px;
  text-align: center;
}
.front { transform: translateZ(150px); }
.left { transform: rotateY(-90deg) translateZ(150px); }
.top { transform: rotateX(90deg) translateZ(150px); }
.row {
  display: flex;
  gap: 40px;
}
.row_2 {
  display: flex;
  margin-left: 200px;
  margin-top: -60px;
  gap: 40px;
}
.cube_small {
  width: 140px;
  height: 140px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(30deg);
  transition: transform 1s;
}
.cube_small:hover {
  transform: rotateX(-30deg) rotateY(30deg) scale(1.2);
  //box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
}
.blue .face_small {
  background-color: #add8e6;
}
.blue .face_small_top {
  background-color: #add8e6;
}
.face_small {
  position: absolute;
  width: 140px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  line-height: 100px;
  text-align: center;
}
.face_small_top {
  position: absolute;
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  line-height: 100px;
  text-align: center;
}
.front_small { transform: translateZ(70px); }
.left_small { transform: rotateY(-90deg) translateZ(70px); }
.top_small { transform: rotateX(90deg) translateZ(70px); }
</style>
