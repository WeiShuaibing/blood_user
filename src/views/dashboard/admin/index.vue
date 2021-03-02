<template>
  <div class="dashboard-editor-container">
    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->

    <!--爱心勋章-->
    <div style="width: 100%;margin-bottom: 20px;">
      <el-row>
        <el-col :span="12">
          <h3>爱心勋章:</h3>
          <svg-icon icon-class="xunzhang" v-for="i in bloodTotalNum" :key="i" style="height: 40px;width: 40px;" />
        </el-col>
        <el-col :span="12">
          <h3>用血特权:</h3>
          <span v-if="bloodTotalMM <= 500" style="font-size: 26px;color: #FFD700;font-weight: 600">Ⅲ 级特权</span>
          <span v-else-if="bloodTotalMM <= 1000" style="font-size: 26px;color: #FFD700;font-weight: 600">Ⅱ 级特权</span>
          <span v-else style="font-size: 26px;color: #FFD700;font-weight: 600">Ⅰ 级特权</span>
          <span style="color: #668B8B;">共献血</span>
          <span style="color: #668B8B;">{{bloodTotalMM}} </span>
          <span style="color: #668B8B;">mm</span>
        </el-col>
      </el-row>
    </div>
    <div style="width: 100%;height: 200px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>公告</span>
        </div>
        <div v-for="o in messages" :key="o.id" >
          <el-row class="text item" style="line-height: 2;font-size: 16px;">
            <el-col :span="20">{{ o.message }}</el-col>
            <el-col :span="4">{{ o.createDate }}</el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div style="width: 100%;margin-top: 10px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>献血注意事项</span>
        </div>
        <div v-for="o in careful" :key="o.id" >
          <el-row class="text item" style="line-height: 2;font-size: 16px;">
            <el-col :span="20">{{ o.careful }}</el-col>
            <el-col :span="4">{{ o.createDate }}</el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <el-row style="background:#fff;padding:16px;margin-bottom:32px;margin-top: 20px;">
<!--      <line-chart :chart-data="lineChartData" />-->
      <el-alert v-for="item in bloodInfo" :key="item" :title="item" type="success" :closable="false" center style="margin-top: 10px;"></el-alert>
    </el-row>

  </div>
</template>

<script>
// import LineChart from './components/LineChart'
import { getPage } from '@/api/message'
import { getPageOfCareful } from '@/api/careful'
import { getMyBloodInfo } from '@/api/appointment'
import { getBloodInfo } from '@/api/user'
import { getMyThank } from '@/api/thank'

export default {
  name: 'DashboardAdmin',
  components: {
    // LineChart,
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis
      messages: [],
      careful: [],
      bloodInfo: [],
      bloodTotalNum: 0,
      bloodTotalMM: 0
    }
  },
  mounted() {
    this.getMessage()
    this.getCareful()
    this.getBloodInfo()
    this.xianxueInfo()
    this.thankInfo()
  },
  methods: {
    thankInfo() {
      getMyThank().then(res => {
        console.log(res.data)
        console.log('xxxx')
        if (res.data !== null) {
          this.$notify({
            title: '感谢',
            message: '偿献血践于行,感恩社会始于心。感谢您的无偿献血。',
            type: 'success'
          })
        }
      })
    },
    xianxueInfo() {
      getBloodInfo().then(res => {
        this.bloodTotalNum = res.data.totalNum
        this.bloodTotalMM = res.data.totalMM
      })
    },
    getBloodInfo() {
      getMyBloodInfo().then(res => {
        this.bloodInfo = res.data
      })
    },
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    getMessage() {
      getPage(1, 5).then(res => {
        this.messages = res.data.records
      })
    },
    getCareful() {
      getPageOfCareful(1, 20).then(res => {
        this.careful = res.data.records
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
