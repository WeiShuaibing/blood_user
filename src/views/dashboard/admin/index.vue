<template>
  <div class="dashboard-editor-container">
    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" />-->
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
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top: 20px;">
<!--      <line-chart :chart-data="lineChartData" />-->

    </el-row>

  </div>
</template>

<script>
// import LineChart from './components/LineChart'
import { getPage } from '@/api/message'
import { getPageOfCareful } from '@/api/careful'
/* const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}*/

export default {
  name: 'DashboardAdmin',
  components: {
    // LineChart,
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis
      messages: [],
      careful: []
    }
  },
  mounted() {
    this.getMessage()
    this.getCareful()
  },
  methods: {
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
