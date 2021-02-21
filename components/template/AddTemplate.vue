<template lang="">
  <div>
  <CCard>
    <CCardHeader>

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
          <CTextarea
          label="Content"
          row="10"
          v-model="form.content"
          >
          </CTextarea>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="4">
          <CSelect
            label="Category mail"
            :options="LIST_CATEGORY"
          :value.sync="form.category"
        />
      </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <CButton v-if="!this.$route.params.id" color="success" class="btn-click" @click="submidForm()">
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
  <div v-if="errors && errors.length ">
  <div
    v-for="error in errors"
    :key="error"
  >
    <p class="alert alert-warning">{{ error }}</p>
  </div>
</div>
  </div>
</template>
<script>
import {LIST_CATEGORY} from '@/const/constdata'
import axios from "axios"
export default {
  data() {
    return {
      LIST_CATEGORY,
      form:{
        'name': '',
        'content': '',
        'category': 1,
      },
      errors : []
    }
  },

  mounted() {
    if(this.$route.params.id){
      this.getDetail()
    }
  },
  
  methods:{
    
    submidForm(){
      const base_url = 'http://127.0.0.1:8000/api/template/'
      if(this.validateForm().length == 0){
        axios.post(base_url, this.form).then(function(response){}).then(
          () => {
            this.$router.push({path: '/templatemail/'})
          }
        )
      }
    },

    updateForm(){
      const base_url = 'http://127.0.0.1:8000/api/template/'
      if(this.validateForm().length == 0){
        axios.put(base_url + this.$route.params.id, this.form).then(function(response) {}).then(
          () => {
            this.$router.push({path: '/templatemail/'})
          }
        )
      }
    },

    getDetail(){
      axios.get('http://127.0.0.1:8000/api/template/' + this.$route.params.id).then((response) => {
          this.form = response.data
      })
    },

    validateForm(){
      this.errors = []
      Object.entries(this.form).forEach(([key, value]) => {
        if (!value ) {
          this.errors.push('Dữ liệu ' + key + ' rỗng')
        }
      });
      return this.errors
    }
  },
}
</script>