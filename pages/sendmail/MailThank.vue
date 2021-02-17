<template lang="">
  <div>
    <CCardBody>
      <CDataTable
        :items="dataCandidate"
        :fields="fields"
        :tableFilter="{ label: 'Tìm kiếm', placeholder: 'Nhập tên' , key : 'name' }"
        :items-per-page="5"
        pagination
      >
        <template #send="{item}">
        <td class="py-2">
          <CInputCheckbox @change="check(item)" />
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
        <CCollapse :show="Boolean(item._toggled)" >
          <CCardBody>
           {{changeText(dataMailThank.content,item.name)}}
          </CCardBody>
        </CCollapse>
      </template>
        <template #status="{item}">
          <td>
            {{getStatus(item.status)}}
          </td>
        </template>
      </CDataTable>
    </CCardBody>
    <CButton
      color="success" 
      class="m-2"
      @click="sendMail()"
    >
      GỬi
    </CButton>
  </div>
</template>
<script>
import axios from "axios"
const fields = [
  {key : 'name',label :'Tên'},
  {key : 'phone',label :'Số điện thoại'},
  {key : 'email',label :'Email'},
  {key : 'status',label :'Trạng thái'},
  {key : 'created_at',label :'Ngày tiếp nhận'},
  {
    key : 'send',
  },
   { 
    key: 'show_details', 
    label: '', 
    _style: 'width:1%', 
    sorter: false, 
    filter: false
  }
];

export default {
  name: 'AdvancedTables',
   data() {
    return {
      dataCandidate : [],
      fields:fields,
      dataMailThank : '',
      dataSend : [],
    }
  },

  created () {
    this.getMailThank()
    this.listData()
  },

  methods: {
    listData: function () {
      const url = 'http://127.0.0.1:8000/api/candidate?status=0'
      axios.get(url).then((response) => {
        this.dataCandidate = response.data
      })
    },

    getMailThank : function(){
      const url1 = 'http://127.0.0.1:8000/api/getMailThank'
      axios.get(url1).then((response) => {
        this.dataMailThank = response.data
        console.log(this.dataMailThank)
      })
    },

    sendMail : function()
    {
      for(const [key,value] of Object.entries(this.dataSend))
      {
        value['content'] =  changeText(this.dataMailThank['content'],value['content'])
        value['template_id'] = this.dataMailThank['category']
        axios.post('http://127.0.0.1:8000/api/send-mail',value).then((response) => {
          axios.put('http://127.0.0.1:8000/api/candidate/'+value.id+'?status=1').then((response) => {
            axios.post('http://127.0.0.1:8000/api/history?candidate_id='+value.id,value).then((response) => {
               this.$router.go(this.$router.currentRoute)
                alert('Gửi mail thành công')
            })
          })
        })
      }
    },
    
    check : function(item){
      this.dataSend.push(item)
    },

    changeText: function(content,name){
      content = content.replace('[Name]', name)
      return content
    },

    toggleDetails (item,index) {
     
      this.$set(this.dataCandidate[index], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },

    getStatus(status){
      if(status == 0) return 'Chưa gửi'
      else return 'Đã gửi'
    }
  }
}
</script>