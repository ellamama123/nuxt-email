<template lang="">
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol lg="10 center">
            List Email
          </CCol>
          <CCol lg="2 right" >
            <CButton
              color="success"
              class="m-2"
            >
              <nuxt-link to="/templatemail/add">Add</nuxt-link>
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <search-list-template @set-condition="getData"></search-list-template>
        <list-template :dataTemplate="dataTemplate" @refresh="fetchData()" ></list-template>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>

import axios from "axios"
import ListTemplate from '@/components/template/ListTemplate'
import SearchListTemplate from '@/components/template/SearchListTemplate'

export default {
  data(){
    return{
      dataTemplate: [],
      cond: {},
    }
  },

  components: { ListTemplate , SearchListTemplate},

  mounted() {
    this.fetchData()
  },

  methods: {
    fetchData: function () {
      const url = 'http://127.0.0.1:8000/api/template'
      axios.get(url, {params: this.cond}).then((response) => {
        this.dataTemplate = response.data
        console.log(this.dataTemplate)
      })
    },

    getData(value){
      this.cond = value
      this.fetchData()
    }
  }
}
</script>
