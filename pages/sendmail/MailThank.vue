<template lang="">
  <div>
    <CCard>
      <CCardHeader>
        <p class="center">Send Mail Thank</p>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          :items="dataCandidate"
          :fields="fields"
          :tableFilter="{ label: 'Tìm kiếm', placeholder: 'Nhập tên' , key : 'name' }"
          :items-per-page="5"
          pagination
        >
          <template #send="{item}">
            <td >
              <CInputCheckbox @change="check(item)" />
            </td>
          </template>
          <template #status="{item}">
            <td>
              {{getStatus(item.status)}}
            </td>
          </template>
          <template #created_at="{item}">
            <td>
              {{convertDate(item.created_at)}}
            </td>
          </template>
          <template #show="{item}">
            <td>
              <CButton color="primary" variant="outline" size="sm"  @click="warningModal = true">
                Show
              </CButton>
              <CModal title="Detail Content Mail" color="success" :show.sync="warningModal">
                {{changeText(dataMailThank.content,item.name)}}
              </CModal>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
      <CCardFooter>
        <CButton
          color="success" 
          class="m-2"
          @click="sendMail()"
        >
           GỬi
        </CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>

import axios from "axios"
import moment from "moment"

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
    key: 'show',
    label: '',
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
      warningModal: false,
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

    getStatus(status){
      if(status == 0) return 'Chưa gửi'
      else return 'Đã gửi'
    },

    convertDate(created){
      created = moment(String(created)).format('DD/MM/YYYY')
      return created
    },

    showModal(item){
      console.log(item.id)
    }
  }
}
</script>