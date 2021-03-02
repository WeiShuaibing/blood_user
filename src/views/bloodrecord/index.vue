<template>
  <div class="app-container">
    <el-row>
      <el-col :span="3"><span style="font-size: 28px;font-weight: 600">献血信息:</span></el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="献血形式"></el-table-column>
        <el-table-column prop="mm" label="血量(cc)"></el-table-column>
        <el-table-column prop="testreport.bloodType" label="血液类型"></el-table-column>
        <el-table-column prop="testreport.height" label="身高(cm)"></el-table-column>
        <el-table-column prop="testreport.weight" label="体重(kg)"></el-table-column>
        <el-table-column prop="testreport.bloodPressure" label="血压"></el-table-column>
        <el-table-column prop="testreport.hepatitis" label="肝炎"></el-table-column>
        <el-table-column prop="testreport.aizi" label="艾滋病"></el-table-column>
        <el-table-column prop="testreport.meidu" label="梅毒"></el-table-column>
        <el-table-column label="血液合格">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.testreport.status === 1" type="success">合格</el-tag>
            <el-tag v-if="scope.row.testreport.status === 2" type="warning">不合格</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="入/出库时间" width="150"></el-table-column>
        <el-table-column prop="createDate" label="预约时间" width="150"></el-table-column>
        <el-table-column label="血液状态" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 2" type="warning">入库</el-tag>
            <el-tag v-if="scope.row.status === 3" type="success">出库</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getBloodRecord } from '@/api/appointment'
export default {
  name: 'BloodRecordIndex',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getBloodRecord().then(res => {
        console.log(res.data)
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
