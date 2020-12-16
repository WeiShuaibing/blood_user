<template>
  <div class="app-container">
    <el-row><span style="font-size: 28px;font-weight: bolder">健康自测</span></el-row>

    <div style="margin-top: 30px;"></div>

    <div style="width: 90%;margin: 0 auto; font-size: 20px;" v-for="item in questions" :key="item.question">
      <el-row>
        <el-col :span="20"><span>{{item.question}}</span></el-col>
        <el-col :span="4">
          <el-radio-group v-model="item.userAnswer" size="medium">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
    <div>
      <el-row>
        <el-col :span="4" :offset="10">
          <el-button type="success" @click="jiance">已做完，开始检测</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfTestIndex',
  data() {
    return {
      questions: [
        {
          id: 1,
          question: '您的身体状况是否良好，有头晕乏力等不适症状？',
          answer: '否',
          userAnswer: ''
        }, {
          id: 2,
          question: '献血后您是否会参加危险运动？长途驾驶汽车？从事地下或者高空作业？',
          answer: '否',
          userAnswer: ''
        }, {
          id: 3,
          question: '是否曾接受任何口腔护理？（如洗牙等）',
          answer: '否',
          userAnswer: ''
        }, {
          id: 4,
          question: '是否有多次不明原因多次或者，慢性腹泻?',
          answer: '否',
          userAnswer: ''
        }, {
          id: 5,
          question: '是否注册乙型肝炎免疫球蛋白?',
          answer: '否',
          userAnswer: ''
        }, {
          id: 6,
          question: '是否曾接受外科手术（包括介入性的诊断和治疗）?或接受输血治疗？',
          answer: '否',
          userAnswer: ''
        }, {
          id: 7,
          question: '是否曾接触产染病患者（如水痘、麻疹、肺结核等）？',
          answer: '否',
          userAnswer: ''
        }, {
          id: 8,
          question: '是否患有过敏性疾病或有反复发作的过敏症状？',
          answer: '否',
          userAnswer: ''
        }, {
          id: 9,
          question: '是否被告知永久不能献血？',
          answer: '否',
          userAnswer: ''
        }, {
          id: 10,
          question: '是否患有严重疾病（冠心病，高血压，心脏瓣膜病等）？',
          answer: '否',
          userAnswer: ''
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    jiance() {
      this.questions.forEach(item => {
        if (item.userAnswer === 0) {
          this.$message.warning('请做完所有的题目')
          throw new Error('error')
        }
      })
      this.questions.forEach(item => {
        if (item.userAnswer !== item.answer) {
          this.$message.warning('测试结束，很抱歉，您不符合献血要求')
          throw new Error('error')
        }
      })
      this.$message.success('恭喜您通过检测，您身体符合献血要求！')
    }
  }
}
</script>

<style scoped>

</style>
