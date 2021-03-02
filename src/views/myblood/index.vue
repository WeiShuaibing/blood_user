<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3"><span style="font-size: 28px;font-weight: 600">我的献血:</span></el-col>
    </el-row>
    <div style="margin-top: 50px;"></div>
    <el-row style="width: 70%;margin: 0 auto;margin-top: 30px;" v-for="item in bloodInfo" :key="item">
      <span style="color: #5a5e66;line-height: 2">预约时间：{{item.createDate}}</span>
      <el-steps v-if="item.status === 1" :active="2" finish-status="error">
        <el-step title="已预约"></el-step>
        <el-step title="已取消"></el-step>
      </el-steps>
      <el-steps v-else-if="item.status === 0" :active="1" finish-status="finish">
        <el-step title="已预约"></el-step>
        <el-step title="已入库"></el-step>
        <el-step title="已出库"></el-step>
      </el-steps>
      <el-steps v-else :active="item.status" finish-status="finish">
        <el-step title="已预约"></el-step>
        <el-step title="已入库"></el-step>
        <el-step title="已出库"></el-step>
      </el-steps>
    </el-row>
  </div>
</template>

<script>
import { getMyBloodStatus } from '@/api/appointment'
export default {
  name: 'MyloodIndex',
  data() {
    return {
      msg: '',
      bloodInfo: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getMyBloodStatus().then(res => {
        console.log(res.data)
        this.bloodInfo = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
