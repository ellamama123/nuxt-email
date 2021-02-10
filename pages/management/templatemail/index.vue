<template lang="">
  <div>
  <CButton
      color="success"
      class="m-2"
    >
      <nuxt-link to="/management/templatemail/add">Thêm mới</nuxt-link>
    </CButton>
    
    <CCardBody>
      <CDataTable
        :items="dataTemplate"
        :fields="fields"
      >
        <template>
          <CInputCheckbox
            label="Check All"
            
          />
        </template>
        <template #category="{item}">
          <td>
            <CBadge>{{getBadge(item.category)}}</CBadge>
          </td>
        </template>  
        <template #checkbox="{item}">
          <td>
            <CInputCheckbox :value="item.id"/>
          </td>
        </template>
        <template #edit="{item}">  
          <td class="py-2">
            <CButton color="success">
              <nuxt-link :to=" '/management/templatemail/' + item.id ">Edit</nuxt-link>
            </CButton>
          </td>
        </template>
        <template #delete="{item}"> 
          <td class="py-2">
            <CButton color="danger" @click="Delete(item)">
              Xóa
            </CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>
<script>
import axios from "axios"
const fields = [
  {
    key:'checkbox',
    label: '',
  },
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

  name: 'AdvancedTables',
  data() {
    return {
      dataTemplate : [],
      fields:fields,
      selected: [],
    }
  },
  mounted() {
    this.listData()
  },

  methods: {
    listData: function () {
      const url = 'http://127.0.0.1:8000/api/template'
      axios.get(url).then((response) => {
        this.dataTemplate = response.data
      })
    },

    getBadge(status) {
      if(status == 0) return 'Mail cảm ơn'
      else if(status == 1) return 'Mail phỏng vấn'
      else return 'Mail offer'
    },

    toggleDetails(item) {
      console.log(item)
      this.$set(this.dataTemplate[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0 })
    },

    Delete(item){
      if(confirm("Bạn có muốn xóa không?")){
        axios.delete('http://127.0.0.1:8000/api/template/' + item.id).then((response) => {
          this.listData()
      })
      }
    },
  }
}
</script>
