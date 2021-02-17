<template lang="">
  <div>
  <CCard>
    <CCardHeader>

    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="12">
          <CInput
            label="Tên"
            placeholder="Enter your name"
            v-model="form.name"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CTextarea
          label="Nội dung"
          row="10"
          v-model="form.content"
          >
          </CTextarea>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="4">
          <CSelect
            label="Loại mail"
            :options="LIST_CATEGORY"
          :value.sync="form.category"
        />
      </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <CButton color="success" class="btn-click" @click="add()">
        Gửi
      </CButton>
      <CButton color="primary" @click="$router.go(-1)" >
        Quay lại
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
    if(this.$route.name !== 'management-templatemail-add'){
      this.list()
    }
  },
  
  methods:{
    add(){
      this.errors = []
      Object.entries(this.form).forEach(([key, value]) => {
        if (!value ) {
          this.errors.push('Dữ liệu ' + key + ' rỗng')
        }
      });
      console.log(this.errors)
      if (!this.errors.length) {
      if(this.$route.name === 'management-templatemail-add')
      {
        axios.post('http://127.0.0.1:8000/api/template/', this.form).then(function(response) {}.bind(this)).then(
          () => {
            this.$router.push({path: '/management/templatemail/'})
          }
        )
      }
      else
      {
        axios.put('http://127.0.0.1:8000/api/template/' + this.$route.params.id, this.form).then(function(response){

        }.bind(this)).then(
          () => {
            this.$router.push({path: '/management/templatemail/'})
          }
        )
      }
      }
      
    },
    list(){
            axios.get('http://127.0.0.1:8000/api/template/' + this.$route.params.id) .then((response) => {
                this.form = response.data
            })            
    },
  },
}
</script>