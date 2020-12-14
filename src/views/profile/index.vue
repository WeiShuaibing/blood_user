<template>
  <div class="app-container">
    <el-card>
      <el-row>
        <el-form>
          <el-form-item label="姓名:">
            <el-input v-model.trim="user.name" />
          </el-form-item>
          <el-form-item label="年龄:">
            <el-input v-model.trim="user.age" />
          </el-form-item>
          <el-form-item label="性别:">
            <el-select v-model="user.sex" placeholder="请选择">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机:">
            <el-input v-model.trim="user.phone" />
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model.trim="user.address" />
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="2"><el-button type="primary" @click="submit">修改</el-button></el-col>
              <el-col :span="2" :offset="20"><el-button type="danger" @click="zhuxiao">注销</el-button></el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserById, save, deleteById } from '@/api/user'

export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    zhuxiao() {
      this.$confirm('此操作将永久删除所有个人信息，并不可再登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(this.user.userId).then(res => {
          this.$message.success('注销成功，请刷新！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submit() {
      save(this.user).then(res => {
        this.$message.success('修改成功！')
        this.getUser()
      })
    },
    getUser() {
      getUserById(this.token.split('_')[1]).then(res => {
        this.user = res.data
      })
    }
  }
}
</script>
