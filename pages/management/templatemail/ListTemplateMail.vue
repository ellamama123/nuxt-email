<template lang="">
  <div>
  <CButton
      color="success"
      class="m-2"
    >
      <nuxt-link to="/management/templatemail/AddTemplateMail">Thêm mới</nuxt-link>
    </CButton>
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
        <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item, index)"
          >
            {{Boolean(item._toggled) ? 'Hide' : 'Show'}}
          </CButton>
        </td>
      </template>
        <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 102 }">
              <h4>
                {{item.name}}
              </h4>
              <CButton size="sm" color="info" class="">
                <nuxt-link to="/management/templatemail/AddTemplateMail">Edit</nuxt-link>
              </CButton>
              <CButton size="sm" color="danger" class="ml-1" @click="Delete(item.id,index)">
                Delete
              </CButton>
            </CMedia>
          </CCardBody>
        </CCollapse>
      </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>
<script>
import axios from "axios"
const fields = [
  {key : 'name',label :'Tên'},
  {key: 'category', label: 'Loại mail'},
  {key: 'content', label: 'Nội dung'},
  {key: 'created_at', label: 'Ngày tạo'},
  {
    key: 'show_details',
    label: '',
    _style: 'width:1%',
    sorter:false,
    filter:false,
  }
]

export default {

  name: 'AdvancedTables',
  data() {
    return {
      dataTemplate : [],
      fields:fields,
      collapseDuration: 0,
      details: [],
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
      if(status ==1) return 'Thư cảm ơn'
      else if(status == 2) return 'Thư nhận việc'
      else return 'Thư phỏng vấn'
    },

    toggleDetails(item) {
      this.$set(this.dataTemplate[item.id], '_toggled', !item._toggled)
      console.log(this.dataTemplate[item.id - 2])
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0 })
    },

    Delete(id,index){
      axios.delete('http://127.0.0.1:8000/api/template/' + id).then((response) => {
        this.dataTemplate.splice(index,1)
      })
    },
  }
}
</script>
