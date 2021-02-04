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
          <CBadge :color="getBadge(item.category)">
            {{item.category}}
          </CBadge>
        </td>
      </template>
      
      </CDataTable>
    </CCardBody>
  </div>
</template>
<script>
import axios from "axios"
const fields = [
  {key : 'name',label :'Tên'},
  'category',
  'content',
  'created_at'
]

export default {
  
  watch: {
  },
  name: 'AdvancedTables',
  data() {
    return {
     
      dataTemplate : [],
      fields:fields,
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
      switch (status) {
        case '1': return 'Mail cảm ơn'
        case '2': return 'Mai offer'
        case '3': return 'Mail phỏng vấn'
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0 })
    }
  }
}
</script>
