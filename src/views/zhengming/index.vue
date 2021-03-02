<template>
  <div class="app-container">
    <div style="width: 700px;height: 800px;margin: 0 auto;" class="shadow">
      <div style="height: 50%;background-color: #d2382c;border-radius: 23px;">
        <el-row>
          <el-col :span="8"><el-image style="width: 300px; height: 300px" :src="logo" fit="fit"></el-image></el-col>
          <el-col :span="16">
            <div style="line-height: 3;width:250px;margin: 0 auto;margin-top: 80px;">
              <span style="font-size: 40px;color: yellow;text-shadow: 0.1em 0.1em 0.2em black">无偿献血证</span>
            </div>
            <div style="line-height: 3;width:250px;margin: 0 auto;margin-top: 80px;">
              <span style="font-size: 20px;color: yellow;text-shadow: 0.1em 0.1em 0.2em black;font-family:'Times New Roman',Times,serif;">国家卫生健康委员会监制</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 50%;border-radius: 23px;background: -webkit-gradient(linear,0 0,0 100%,from(#FFF0F5),to(#ffd9de));">
        <div style="height: 80px;"></div>
        <el-row style="font-size: 20px;font-weight: 600;padding: 30px;">
          <el-col :span="12">姓名: <span style="font-weight: 400;color: 	#FF69B4;">    {{bloodInfo.user.name}}</span></el-col>
          <el-col :span="12">血型: <span style="font-weight: 400;color: 	#FF69B4;">    {{bloodInfo.bloodType}}</span></el-col>
        </el-row>
        <el-row style="font-size: 20px;font-weight: 600;padding: 30px;">
          <el-col :span="12">献血总次数:<span style="font-weight: 400;color: 	#FF69B4;">    {{bloodInfo.totalNum}}次</span></el-col>
        </el-row>
        <el-row style="font-size: 20px;font-weight: 600;padding: 30px;">
          <el-col :span="12">全血献血总量:<span style="font-weight: 400;color: 	#FF69B4;">    {{bloodInfo.totalMM}}ml</span></el-col>
        </el-row>
        <el-row></el-row>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/zhenglogo.png'
import { getBloodInfo } from '@/api/user'

export default {
  name: 'ZhengmingIndex',
  data() {
    return {
      logo: logo,
      bloodInfo: {
        user: {}
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getBloodInfo().then(res => {
        this.bloodInfo = res.data
      })
    }
  }
}
</script>

<style scoped>
.shadow {
  box-shadow:0px 15px 10px -15px #000;
}
</style>
