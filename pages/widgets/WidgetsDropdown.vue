<template>
  <CRow>
    <CCol col="12" sm="6">
      <CCallout color="info">
        <small class="text-muted">Số ứng viên</small><br>
        <strong class="h4">{{ dataCandidate.length }}</strong>
        <p></p>
        <CLink
        class="text-white bg-success px-2"
        href="/management/candidate/"
      >→ Đi đến danh sách ứng viên</CLink>
      </CCallout>
    </CCol>
    <CCol col="12" sm="6">
      <CCallout color="danger">
        <small class="text-muted">Số mail đã gửi</small><br>
        <strong class="h4">{{ dataHistory.length }}</strong>
        <p></p>
         <CLink
        class="text-white bg-warning px-2"
        href="/management/candidate/"
      >→ Đi đến lịch sử gửi mail</CLink>
      </CCallout>
    </CCol>
    <CCol col="12" sm="6">
      <CCallout color="success">
        <strong class="h4">{{ dataCandidateThank.length }} ứng viên đang chờ được gửi mail</strong>
        <p></p>
         <CLink class="text-white bg-info px-2" href="/sendmail/mailthank/">→ Đi đến gửi mail nhận việc</CLink>
         <p></p>
         <CLink class="text-white bg-secondary px-2" href="/sendmail/MailInter/">→ Đi đến gửi mail cảm ơn</CLink>
         <p></p>
         <CLink class="text-white bg-dark px-2" href="/sendmail/MailOffer/">→ Đi đến gửi mail phỏng vấn</CLink>
      </CCallout>
    </CCol>
  </CRow>

</template>

<script>
import axios from "axios"
export default {
  name: "AdvancedTables",
  data() {
    return {
      dataCandidate : [],
      dataHistory : [],
      dataCandidateThank : [],
    };
  },
  mounted() {
    this.listData()
  },
  methods: {
    listData: function () {
      const url = 'http://127.0.0.1:8000/api/candidate'
      axios.get(url).then((response) => {
        this.dataCandidate = response.data
      })
      axios.get('http://127.0.0.1:8000/api/history').then((response) => {
        this.dataHistory = response.data
      }),
      axios.get('http://127.0.0.1:8000/api/candidate?status=0').then((response) => {
        this.dataCandidateThank = response.data
      })
    },
    
  },
};
</script>
