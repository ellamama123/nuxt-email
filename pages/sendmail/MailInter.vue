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
        <template #position="{item}">
          <td>
            <CBadge>{{getBadge(item.position)}}</CBadge>
          </td>
        </template>  
        <template #send="{item}">
        <td class="py-2">
          <CInputCheckbox @change="check(item)" />
        </td>
      </template>
      <template #dateTime="{item}">
        <td>
          <CInput type="datetime-local" name="dateTime" v-model="item.dateTime" />
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
            {{changeText(dataMailIntern.content, item.name, item.dateTime,getBadge(item.position))}}
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
import moment from 'moment'

const fields = [
  {key : 'name',label :'Tên'},
  {key : 'phone',label :'Số điện thoại'},
  {key : 'email',label :'Email'},
  {key : 'position',label :'Vị trí ứng tuyển'},
  {key : 'status',label :'Trạng thái'},
  {key : 'created_at',label :'Ngày tiếp nhận'},
  {
    key: 'dateTime',
    label: 'Lịch phỏng vấn'
  },  
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
      dataSend : [],
      dateTime: null,
      dataMailIntern: '',
    }
  },
  mounted () {
    this.getMailIntern()
    this.listData()
  },
  methods: {
    listData: function () {
      const url = 'http://127.0.0.1:8000/api/candidate?status=0'
      axios.get(url).then((response) => {
        this.dataCandidate = response.data
      })
    },

    getMailIntern:function(){
      const url = 'http://127.0.0.1:8000/api/getMailIntern'
      axios.get(url).then((response) => {
        this.dataMailIntern = response.data
      })
    },

    sendMail : function()
    {
      for(const [key,value] of Object.entries(this.dataSend))
      {
        value['template_id'] = this.dataMailIntern['category']
        value['content'] = this.changeText(this.dataMailIntern['content'], value['name'],value['dateTime'], this.getBadge(value['position']))
        value['position'] = this.getBadge(value['position'])
        value['datetime_interview'] = value.dateTime,

        axios.post('http://127.0.0.1:8000/api/send-mailIntern', value).then((response) => {
          axios.put('http://127.0.0.1:8000/api/candidate/' + value.id + '?status=1')
          axios.post('http://127.0.0.1:8000/api/history?candidate_id=' + value.id,value)
          this.$router.go(this.$router.currentRoute)
           alert('Gửi mail thành công')
        })
      }
    },

    check : function(item){
      this.dataSend.push(item)
    },

    getBadge(status) {
      if(status == 1) return 'C#'
      else if(status == 2) return 'PHP'
      else return 'Tester'
    },

    toggleDetails (item,index) {
      this.$set(this.dataCandidate[index], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
    
    changeText: function(content,name,dateTime,position){
      dateTime = moment(String(dateTime)).format('DD/MM/YYYY hh:mm')
      content = content.replace('[Name]', name).replace('[dateTime]',dateTime).replace('[Position]', position)
      return content
    },

    getStatus(status){
      if(status == 0) return 'Chưa gửi'
      else return 'Đã gửi'
    },
  }
}
</script>
