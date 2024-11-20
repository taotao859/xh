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
        <!-- CSV 上传框（仅在有标签且已标注时显示） -->
          <!-- 新增的头部行 -->
        <el-row style="margin-bottom: 20px;" align="middle">
          <!-- 左侧 "数据集" 文本 -->
          <el-col :span="4" style="text-align: left;">
            <h2 style="margin: 0;">ML模型列表</h2>
          </el-col>
          <!-- 右侧 "新增" 按钮 -->
        </el-row>
        <!-- 模块布局 -->
        <el-row :gutter="20">
          <el-col :span="8" v-for="(module, index) in modules" :key="index">
            <el-card class="module-card" @click="openDialog(index)" shadow="hover">
              <img :src="module.image" class="module-image" />
              <p class="module-text">{{ module.text }}</p>
            </el-card>
          </el-col>
        </el-row>

        <!-- 弹窗 -->
        <el-dialog title="编辑模块" :visible.sync="dialogVisible" width="50%">
          <el-form>
            <el-form-item label="图片">
              <img :src="selectedModule.image" class="dialog-image" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                v-model="selectedModule.text"
                placeholder="请输入描述文字"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveChanges">保存</el-button>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'mlmodel',
  data() {
    return {
      pageName: 'ML模型',
      csvFileName: '',
      modules: [
        { image: "https://via.placeholder.com/300", text: "模块1描述" },
        { image: "https://via.placeholder.com/300", text: "模块2描述" },
        { image: "https://via.placeholder.com/300", text: "模块3描述" },
      ],
      dialogVisible: false,
      selectedModule: {}, // 当前选中的模块
    }
  },
  computed: {},
  mounted: function () {

  },
  methods: {
    openDialog(index) {
      this.selectedModule = { ...this.modules[index] }; // 复制选中的模块内容
      console.log(this.dialogVisible)
      this.dialogVisible = true;
      console.log(this.dialogVisible)
    },
    saveChanges() {
      const index = this.modules.findIndex(
        (module) => module.text === this.selectedModule.text
      );
      if (index > -1) {
        this.modules[index] = { ...this.selectedModule };
      }
      this.dialogVisible = false;
    },
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
.module-card {
  cursor: pointer;
  text-align: center;
  padding: 20px;
}
.module-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.module-text {
  font-size: 16px;
  font-weight: bold;
}
.dialog-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>
