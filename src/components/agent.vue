<template>
  <el-container>
    <el-aside width="100px">
      <div style="width: 100px">
        <img style="width: 100px" :src="logo" alt="logo" />
      </div>
      <el-menu :default-active="this.$router.path" router>
        <el-menu-item index="/home">
          <i class="el-icon-s-home" style="color: white;font-size: 30px"></i>
        </el-menu-item>
        <el-menu-item index="/upload">
          <i class="el-icon-folder-opened" style="color: white;font-size: 30px"></i>
        </el-menu-item>
        <el-menu-item index="/agent">
          <i class="el-icon-s-comment" style="color: white;font-size: 30px"></i>
        </el-menu-item>
        <el-menu-item index="/mlmodel">
          <i class="el-icon-data-line" style="color: white;font-size: 30px"></i>
        </el-menu-item>
        <el-menu-item index="/telecom">
          <i class="el-icon-phone" style="color: white;font-size: 30px"></i>
        </el-menu-item>
        <el-menu-item index="/ATO">
          <i class="el-icon-s-check" style="color: white;font-size: 30px"></i>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4" style="text-align: left;font-size: 24px">
            您好, <span id="salesman" v-text="salesName"></span>
          </el-col>
          <el-col :span="20" style="text-align: right">
            <el-button style="color: white;font-size: 24px" id="log-out-button" icon="el-icon-switch-button" @click="$router.push({path: '/login'})"></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="
      background-color: white;
      color: black;
      text-align: center; height: 100vh; display: flex; flex-direction: column;">
        <!-- 内容区 -->
        <div
          style="flex: 1; display: flex; flex-direction: column; padding: 20px;"
        >
          <!-- 标题 -->
          <el-row style="margin-bottom: 20px;" align="middle">
            <el-col :span="24" style="text-align: left;">
              <h2 style="margin: 0;">智驭风控AI —— 大模型风险决策助手</h2>
            </el-col>
          </el-row>

          <!-- 初始状态时，显示提示文本 -->
          <div
            v-if="messages.length === 0"
            style="
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #666;
        "
          >
            <h2 style="margin: 0;">有什么可以帮忙的？</h2>
            <el-input
              type="textarea"
              v-model="userInput"
              placeholder="输入你的问题"
              rows="3"
              style="margin-top: 20px; width: 50%;"
              @keyup.enter.native="sendMessage"
            ></el-input>
            <el-button type="primary" style="margin-top: 10px;" @click="sendMessage">发送</el-button>
          </div>

          <!-- 有聊天内容时，切换为聊天布局 -->
          <div
            v-else
            style="
          flex: 1;
          display: flex;
          max-height: calc(100vh - 150px);
          flex-direction: column;
          background-color: white;
          border: 1px solid #ebeef5;
          border-radius: 4px;
          padding: 10px;
        "
          >
            <!-- 对话显示区 -->
            <div ref="messageList"
                 style="
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            background-color: #f2f2f2;
          "
            >
              <div ref="messageList"
                   style="flex: 1; overflow-y: auto; padding: 10px; background-color: #f2f2f2;">
                <div
                  v-for="(msg, index) in messages"
                  :key="index"
                  class="message-box"
                  :class="msg.role === 'user' ? 'user-box' : 'bot-box'">
                  <div :class="{ 'name-box': msg.role === 'user', 'ai-box': msg.role === 'system' }">
                    {{ msg.role === 'user' ? "用户" : '智驭风控AI' }}
                  </div>
                  <div class="content-box" v-html="renderMarkdown(msg.content, index)"></div>
                </div>
              </div>


            </div>

            <!-- 输入区 -->
            <div
              style="
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            background-color: white;
            border-top: 1px solid #ebeef5;
            padding: 10px;
          "
            >
              <el-input
                type="textarea"
                :disabled="disabled_info"
                v-model="userInput"
                placeholder="输入你的问题"
                rows="3"
                style="margin-bottom: 10px;"
                @keyup.enter.native="sendMessage"
              ></el-input>
              <el-button :disabled="disabled_info" type="primary" @click="sendMessage">发送</el-button>
            </div>
          </div>
        </div>
      </el-main>
<!--      <el-main>-->
<!--        <el-card style="height: 100%" shadow="never">-->
<!--          &lt;!&ndash; 新增的头部行 &ndash;&gt;-->
<!--          <el-row style="margin-bottom: 20px;" align="middle">-->
<!--            &lt;!&ndash; 左侧 "数据集" 文本 &ndash;&gt;-->
<!--            <el-col :span="4" style="text-align: left;">-->
<!--              <h2 style="margin: 0;">大模型agent对话</h2>-->
<!--            </el-col>-->
<!--            &lt;!&ndash; 右侧 "新增" 按钮 &ndash;&gt;-->
<!--          </el-row>-->
<!--          &lt;!&ndash; 对话显示区 &ndash;&gt;-->
<!--          <div ref="messageList"-->
<!--            style="-->
<!--              width: 100%;-->
<!--              height: 500px;-->
<!--              overflow-y: auto;-->
<!--              border: 1px solid #ebeef5;-->
<!--              border-radius: 4px;-->
<!--              padding: 10px;-->
<!--              margin-bottom: 20px;-->
<!--              display: flex;-->
<!--              flex-direction: column;-->
<!--              align-items: flex-start;-->
<!--              /*align-items: flex-start; !* 默认对齐方式 *!"-->
<!--          >-->
<!--            <div v-for="(msg, index) in messages" :key="index" class="message-box" :class="msg.role === 'user' ? 'user-box' : 'bot-box'">-->
<!--              <div :class="{ 'name-box': msg.role === 'user', 'ai-box': msg.role === 'bot' }">{{ msg.role === 'user' ? salesName : 'AI' }}</div>-->
<!--              <div class="content-box">{{ msg.content }}</div>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; 输入区 &ndash;&gt;-->
<!--          <el-input-->
<!--            type="textarea"-->
<!--            v-model="userInput"-->
<!--            placeholder="输入你的问题"-->
<!--            rows="3"-->
<!--            style="margin-bottom: 10px;"-->
<!--          ></el-input>-->
<!--          <el-button type="primary" @click="sendMessage">发送</el-button>-->
<!--        </el-card>-->
<!--      </el-main>-->
    </el-container>
  </el-container>
</template>

<script>
import logo from '@/assets/logo1.jpg'
export default {
  name: 'agent',
  data () {
    return {
      logo: logo,
      pageName: '大模型agent对话',
      salesName: this.$cookie.get('name'),
      userInput: '', // 用户输入的内容
      disabled_info: false,
      isTyping: false,
      messages: [] // 存储对话记录
    }
  },
  computed: {

  },
  mounted: function () {
    this.disabled_info = false
  },
  methods: {
    renderMarkdown(content, index) {
      // 实现 Markdown 渲染逻辑
      content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/__(.+?)__/g, '<strong>$1</strong>');
      content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');
      content = content.replace(/_(.+?)_/g, '<em>$1</em>');
      content = content.replace(/\n/g, '<br />');
      content = content.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
      content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
      if (this.isTyping && index === this.messages.length - 1 ) {
        content += '<div class="typing-indicator">...</div>'
      }
      return content;
    },
    sendMessage() {
      if (this.userInput.trim()) {
        this.$message.success('开始对话，请稍等');
        this.disabled_info = true;
        this.messages.push({ role: "user", content: this.userInput });
        this.scrollToBottom();

        // 清空输入框
        this.userInput = "";
        this.isTyping = true;
        this.messages.push({ role: "system", content: "正在思考" });
        this.scrollToBottom();

        const requestData = {
          messages: this.messages
        };

        // 使用 fetch 发送 POST 请求，流式接收数据
        fetch('http://localhost:8443/api/getAgent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        })
          .then(response => {
            const reader = response.body.getReader();  // 获取流的 Reader
            const decoder = new TextDecoder();
            let content = "";  // 存储逐步接收的内容

            const processText = ({ done, value }) => {  // 使用箭头函数保证 `this` 不丢失
              // console.log('this inside processText:', this);  // 查看 this
              // console.log('this.messages inside processText:', this.messages);  // 查看 messages

              if (done) {
                this.isTyping = false;
                this.messages[this.messages.length - 1].content = content;
                this.scrollToBottom();
                this.disabled_info = false;
                return;
              }

              content += decoder.decode(value, { stream: true });
              // console.log(content);
              // console.log(this.messages);
              this.messages[this.messages.length - 1].content = content;
              this.scrollToBottom();

              // 继续读取流
              reader.read().then(processText);
            };

            reader.read().then(processText);  // 调用 processText 进行递归处理
          })
          .catch(error => {
            console.error('Request error:', error);
          }).catch(error => {
          console.error('Request error:', error);
          this.$message.error('发生错误');
          this.disabled_info = false;
        });
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageList;
        if (container) {
          console.log(container.scrollHeight);
          container.scrollTop = container.scrollHeight;
        }

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
.message-box {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.name-box {
  min-width: 100px;
  font-weight: bold;
  margin-right: 10px;
  text-align: right;
  color: #409eff;
}

.ai-box {
  min-width: 100px;
  font-weight: bold;
  margin-right: 10px;
  text-align: right;
  color: #388e3c;
}

.content-box {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  max-width: 85%;
  word-wrap: break-word;
  display: inline-block;
  background-color: #ffffff;
  text-align: left;
}

.user-box .content-box {
  background-color: white;
}

.bot-box .content-box {
  background-color: white;
}
.typing-indicator {
  font-size: 24px;
  color: #666;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

</style>

