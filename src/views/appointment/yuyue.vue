<template>
  <div class="app-container">
    <div style="width: 70%;margin: 0 auto;padding: 20px;margin-top: 50px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-form ref="form" :model="appointment" label-width="80px">
        <el-form-item label="预约人">
          <el-input v-model="name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="appointment.minzu" :disabled="haveAppointment" placeholder="请选择活动区域">
            <el-option label="汉族" value="汉族"></el-option>
            <el-option label="回族" value="回族"></el-option>
            <el-option label="藏族" value="藏族"></el-option>
            <el-option label="维吾尔族" value="维吾尔族"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户籍" >
          <el-input v-model="appointment.huji" :disabled="haveAppointment" placeholder="请输入户籍"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model.number="appointment.phone" :disabled="haveAppointment" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="appointment.address" :disabled="haveAppointment" placeholder="请输入联系地址"></el-input>
        </el-form-item>
        <el-form-item label="婚姻">
          <el-select v-model="appointment.hunyin" :disabled="haveAppointment" placeholder="请选择活动区域">
            <el-option label="已婚" value="已婚"></el-option>
            <el-option label="未婚" value="未婚"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文化">
          <el-select v-model="appointment.wenhua" :disabled="haveAppointment" placeholder="请选择活动区域">
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="大专" value="大专"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="献血形式">
          <el-select v-model="appointment.type" :disabled="haveAppointment" placeholder="请选择活动区域">
            <el-option label="全血" value="全血"></el-option>
            <el-option label="血小板" value="血小板"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="献血量（mm）">
          <el-select v-model="appointment.mm" :disabled="haveAppointment" placeholder="请选择活动区域">
            <el-option label="100毫升" value="100"></el-option>
            <el-option label="200毫升" value="200"></el-option>
            <el-option label="300毫升" value="300"></el-option>
            <el-option label="400毫升" value="400"></el-option>
            <el-option label="500毫升" value="500"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约日期">
          <el-date-picker v-model="appointment.date" :disabled="haveAppointment" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="!haveAppointment" @click="onSubmit">立即预约</el-button>
          <el-button type="warning" v-if="haveAppointment" @click="removeAppointment">取消预约</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getMyAppointment, save, reback } from '@/api/appointment'
import { mapGetters } from 'vuex'

export default {
  name: 'Yuyue',
  data() {
    return {
      appointment: {
        appointmentId: 0,
        userId: 0,
        userName: '',
        minzu: '',
        huji: '',
        hunyin: '',
        wenhua: '',
        phone: '',
        type: '',
        mm: 100,
        address: '',
        xianxueaddress: '',
        date: ''
      },
      haveAppointment: false
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'name'
    ])
  },
  mounted() {
    this.myAppointment()
    console.log(this.name)
  },
  methods: {
    removeAppointment() {
      console.log(this.appointment)
      reback(this.appointment.appointmentId).then(res => {
        this.$message.success('取消预约成功！')
        this.myAppointment()
      })
    },
    myAppointment() {
      getMyAppointment().then(res => {
        if (res.data != null) {
          this.appointment = res.data
          this.haveAppointment = true
        } else {
          this.haveAppointment = false
        }
      })
    },
    onSubmit() {
      console.log(this.appointment)
      var a = this.appointment
      save({
        userId: this.token.split('_')[1],
        minzu: a.minzu,
        huji: a.huji,
        hunyin: a.hunyin,
        wenhua: a.wenhua,
        phone: a.phone,
        address: a.address,
        type: a.type,
        date: a.date
      }).then(res => {
        console.log(res)
        this.$message.success('预约成功，请等待医院的联系！')
        this.myAppointment()
      })
    }
  }
}
</script>

<style scoped>

</style>
