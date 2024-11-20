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
        <el-card shadow="never">
          <!-- 新增的头部行 -->
          <el-row style="margin-bottom: 20px;" align="middle">
            <!-- 左侧 "数据集" 文本 -->
            <el-col :span="4" style="text-align: left;">
              <h2 style="margin: 0;">大模型agent对话</h2>
            </el-col>
            <!-- 右侧 "新增" 按钮 -->
          </el-row>
          <!-- 对话显示区 -->
          <div ref="messageList"
            style="
              width: 100%;
              height: 500px;
              overflow-y: auto;
              border: 1px solid #ebeef5;
              border-radius: 4px;
              padding: 10px;
              margin-bottom: 20px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              /*align-items: flex-start; !* 默认对齐方式 *!"
          >
            <div v-for="(msg, index) in messages" :key="index" class="message-box" :class="msg.sender === 'user' ? 'user-box' : 'bot-box'">
              <div :class="{ 'name-box': msg.sender === 'user', 'ai-box': msg.sender === 'bot' }">{{ msg.sender === 'user' ? salesName : 'AI' }}</div>
              <div class="content-box">{{ msg.text }}</div>
            </div>
          </div>

          <!-- 输入区 -->
          <el-input
            type="textarea"
            v-model="userInput"
            placeholder="输入你的问题"
            rows="3"
            style="margin-bottom: 10px;"
          ></el-input>
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'agent',
  data () {
    return {
      pageName: '大模型agent对话',
      salesName: this.$cookie.get('name'),
      userInput: '', // 用户输入的内容
      messages: [] // 存储对话记录
    }
  },
  computed: {

  },
  mounted: function () {

  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() === '') {
        this.$message.warning('请输入内容');
        return;
      }

      // 添加用户消息
      this.messages.push({ sender: 'user', text: this.userInput });
      this.scrollToBottom();
      // 模拟AI回复
      setTimeout(() => {
        this.messages.push({ sender: 'bot', text: '你好' });
        this.scrollToBottom();
      }, 500);

      // 清空输入框
      this.userInput = '';
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageList;
        container.scrollTop = container.scrollHeight;
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
.upload-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 灰色半透明 */
  z-index: 9995; /* 调低层级 */
  pointer-events: auto; /* 禁止点击 */
}

/* 提高进度条弹窗层级 */
.upload-progress-dialog .el-dialog__wrapper {
  z-index: 10000 !important; /* 确保进度条弹窗在遮罩层之上 */
  background-color: white; /* 保持进度条的白色背景 */
}

/* 遮罩层的层级要低于进度条 */
.upload-add-dialog .el-dialog__wrapper {
  z-index: 9990 !important; /* 确保上传弹窗在遮罩层之下 */
}
.message-box {
  display: flex;
  align-items: flex-start; /* 名称和消息内容对齐 */
  margin-bottom: 10px;
}

/* 用户名或 AI 的名称样式 */
.name-box {
  min-width: 50px; /* 确保名称部分固定宽度 */
  font-weight: bold;
  margin-right: 10px;
  text-align: right;
  color: #409eff;
}
.ai-box {
  min-width: 50px; /* 确保名称部分固定宽度 */
  font-weight: bold;
  margin-right: 10px;
  text-align: right;
  color: #388e3c;
}
/* 消息内容的样式 */
.content-box {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  max-width: 60%; /* 限制消息框宽度 */
  word-wrap: break-word;
  display: inline-block;
  background-color: #f6f6f6;
}

/* 用户消息 */
.user-box .content-box {
  background-color: #e6f7ff;
  color: #409eff;
}

/* AI 消息 */
.bot-box .content-box {
  background-color: #e8f5e9; /* 绿色背景 */
  color: #388e3c;
}
</style>

