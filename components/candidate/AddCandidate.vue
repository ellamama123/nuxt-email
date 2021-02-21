<template lang="">
  <div>
    <CCard>
      <CCardHeader>
        Candidate Management
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Name"
              placeholder="Enter your name"
              v-model="form.name"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
            label="Phone"
            placeholder="Phone"
            v-model="form.phone"
            >
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
            label="Email"
            placeholder="Email"
            type="email"
            v-model="form.email"
            >
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="4">
            <CSelect
              label="Position"
              :options="LIST_POSITION"
              :value.sync="form.position"
            />
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>
          <div v-if="errors && errors.length ">
          <div
            v-for="error in errors"
            :key="error"
          >
            <p class="alert alert-warning">{{ error }}</p>
          </div>
        </div>
        <CButton v-if="!this.$route.params.id" color="success" class="btn-click" @click="submitForm()">
          Submit
        </CButton>
        <CButton v-else color="success" class="btn-click" @click="updateForm()">
          Update
        </CButton>
        <CButton color="primary" @click="$router.go(-1)" >
          Go Back
        </CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>
<script>
import {LIST_POSITION} from '@/const/constdata'
import {LIST_STATUS} from '@/const/constdata'
import axios from "axios";
export default {
  data() {
    return {
      LIST_POSITION,
      LIST_STATUS,
      form: {
        'name' : '',
        'phone' : '',
        'email' : '',
        'position' : 1,
      },
      errors : []
    }
  },
  mounted() {
    if(this.$route.params.id)
      this.getDetail()
  },
  methods:{
    submitForm(){
      if(this.validateForm().length === 0){
        axios.post('http://127.0.0.1:8000/api/candidate/', this.form).then(function(response){}).then(() => {
             this.$router.push({path:'/candidate/'})
           }
         )
      }
    },

    updateForm(){
      if(this.validateForm().length === 0){
        axios.put('http://127.0.0.1:8000/api/candidate/' + this.$route.params.id,this.form).then(function(response){}).then(() => {
            this.$router.push({path: '/candidate/'})
          }
        )
      }
    },

    getDetail(){
      axios.get('http://127.0.0.1:8000/api/candidate/' + this.$route.params.id) .then((response) => {
          this.form = response.data
      })
    },

    validateForm(){
      this.errors = []
      Object.entries(this.form).forEach(([key, value]) => {
        if (value === '') {
          this.errors.push('Dữ liệu ' + key + ' rỗng')
        }
      });
      return this.errors
    }
  }
}
</script>