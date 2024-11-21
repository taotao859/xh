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
        <el-menu-item index="/mlmodel" @click="resetView">
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
      <template>
        <el-main>
          <el-card style="height: 100%" shadow="never">
            <!-- 图片显示区 -->
            <div v-if="selectedNumber === null" class="image-grid">
              <el-row gutter="20">
                <el-col :span="12" v-for="(image, index) in images" :key="index">
                  <img
                    :src="image"
                    alt="图片"
                    class="grid-image"
                    @click="handleImageClick(index + 1)" />
                </el-col>
              </el-row>
            </div>

            <!-- 数字显示区 -->
            <div v-else class="number-display">
              <span class="number">{{ selectedNumber }}</span>
            </div>
          </el-card>
        </el-main>
      </template>

    </el-container>
  </el-container>
</template>

<script>
import logo from '@/assets/logo1.jpg'
import image1 from '@/assets/1.png'
import image2 from '@/assets/2.png'
import image3 from '@/assets/3.png'
import image4 from '@/assets/4.png'
export default {
  name: 'mlmodel',
  data() {
    return {
      logo: logo,
      pageName: 'ML模型',
      salesName: this.$cookie.get('name'),
      images: [
        image1, // 替换为实际图片路径
        image2,
        image3,
        image4,
      ],
      selectedNumber: null, // 用于记录点击后显示的数字
    }
  },
  computed: {},
  mounted: function () {
    this.selectedNumber = this.$route.query.id
    if (this.selectedNumber === '' || this.selectedNumber === undefined){
      this.selectedNumber = null
    }
  },
  methods: {
    handleImageClick(number) {
      this.selectedNumber = number; // 设置当前点击的数字
    },
    resetView() {
      this.selectedNumber = null; // 重置为图片显示状态
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

.number-display {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 48px;
  font-weight: bold;
}

.number {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 50%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
