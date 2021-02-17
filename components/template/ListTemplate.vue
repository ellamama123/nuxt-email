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
            <nuxt-link to="/templatemail/add">Thêm mới</nuxt-link>
          </CButton>
        </CCol>
      </CRow>
        
      </CCardHeader>
      <CCardBody>
        <CDataTable
          :items="dataTemplate"
          :fields="fields"
        >
          <template #category="{item}">
            <td>
              <CBadge>{{getBadge(item.category)}}</CBadge>
            </td>
          </template>
          <template #created_at="{item}">
            <td>
              {{convertDate(item.created_at)}}
            </td>
          </template>
          <template #edit="{item}">  
            <td class="py-2">
              <CButton color="success">
                <nuxt-link :to="`${item.id}`">Sửa</nuxt-link>
              </CButton>
            </td>
          </template>
          <template #delete="{item}"> 
            <td class="py-2">
              <CButton color="danger" @click="deleteTemplate(item)">
                Xóa
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import axios from "axios"
import moment from 'moment'
const fields = [
  {key : 'name',label :'Tên'},
  {key: 'category', label: 'Loại mail'},
  {key: 'content', label: 'Nội dung'},
  {key: 'created_at', label: 'Ngày tạo'},
  {
    key: 'edit',
    label: 'Sửa'
  },
  {
    key: 'delete',
    label: 'Xóa',
  },
]

export default {
  props: ['dataTemplate'],

  name: 'AdvancedTables',
  data() {
    return {
      fields:fields,
      selected: [],
    }
  },

  methods: {
    getBadge(status) {
      if(status ==1) return 'Mail Cảm Ơn'
      else if(status == 2) return 'Mail Phỏng Vấn'
      else return 'Mail Off'
    },

    toggleDetails(item) {
      console.log(item)
      this.$set(this.dataTemplate[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0 })
    },

    deleteTemplate(item){
      if(confirm("Bạn có muốn xóa không?")){
        axios.delete('http://127.0.0.1:8000/api/template/' + item.id).then((response) => {
          this.dataTemplate.splice(item.id,1)
          this.$emit('refresh')
        }).then(() => {
            this.$router.push({path: '/templatemail/'})
          })
      }
    },

    convertDate(created){
      created = moment(String(created)).format('DD/MM/YYYY')
      return created
    }
  }
}
</script>