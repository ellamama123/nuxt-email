<template lang="">
  <div>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Tên ứng viên"
          placeholder="Enter your name"
          v-model="form.name"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
         label="Điện thoại"
         placeholder="Nhập số điện thoại"
         v-model="form.phone"
        >
        </CInput>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
         label="Email"
         placeholder="Nhập email"
         type="email"
         v-model="form.email"
        >
        </CInput>
      </CCol>
    </CRow>
     <CRow>
      <CCol sm="4">
        <CSelect
          label="Vị trí"
          :options="LIST_POSITION"
          :value.sync="form.position"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="4" >
        <CSelect
          label="Trạng thái"
          :options="LIST_STATUS"
          v-model="form.status"
          disabled
        />
      </CCol>
    </CRow>
    
    <CButton color="success" class="btn-click" @click="add">
      Gửi
    </CButton>
    <CButton color="primary" >
      Clear
    </CButton>
  </div>
</template>
<script>
import {LIST_POSITION} from '@/const/constdata'
import {LIST_STATUS} from '@/const/constdata'
import axios from "axios"
export default {
  data() {
    return {
      LIST_POSITION,
      LIST_STATUS,
      form: {
                'name' : '',
                'phone' : '',
                'email' : '',
                'position' : 0,
                'status' : 0,
            },
    }
  },
  mounted() {
    if(this.$route.name !== 'management-candidate-add')
      this.list()
  },
  methods:{
    add(){
      console.log(this.form.position)
      if(this.$route.name === 'management-candidate-add')
      {
          // axios.post('http://127.0.0.1:8000/api/candidate/', this.form)
          //       .then(function( response ){
          //           this.$router.push({ path: '/' })
          //       }).then(
          //               () => {
          //                   this.$router.push({ path: '/management/candidate/' })

          //               }
          //           );;
      }
      else
      {
        axios.put('http://127.0.0.1:8000/api/candidate/'+this.$route.params.id, this.form)
                .then(function( response ){
                    this.$router.push({ path: '/' })
                }).then(
                        () => {
                            this.$router.push({ path: '/management/candidate/' })

                        }
                    );;
      }
      
    },
    list(){
            axios.get('http://127.0.0.1:8000/api/candidate/' + this.$route.params.id) .then((response) => {
                this.form = response.data
            })            
        },
  }
}
</script>