<template lang="">
  <div>
    <CCard>
      <CCardHeader> 
        <p class="center">Send Mail Offer</p>
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
            <td class="py-2">
              <CInputCheckbox @change="check(item)" />
            </td>
          </template>
          <template #date="{item}">
            <td>
              <CInput type="date" name="date" v-model="item.date" />
            </td>
          </template>
          <template #salary="{item}">
            <td>
              <CInput  v-model="item.salary" />
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
                {{changeText(dataMailOffer.content, item.name, item.date,getBadge(item.position), item.salary)}}
              </CCardBody>
            </CCollapse>
          </template>
          <template #position="{item}">
            <td>
              <CBadge>{{getBadge(item.position)}}</CBadge>
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
    key: 'date',
    label: 'Lịch phỏng vấn'
  },
  {
    key: 'salary',
    label: 'Lương',
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
      date: null,
      dataMailOffer: '',
      salary: '',
      errors: [],
    }
  },

  mounted () {
    this.getMailOffer()
     this.listData()
  },

  methods: {
    listData: function () {
      const url = 'http://127.0.0.1:8000/api/candidate?status=0'
      axios.get(url).then((response) => {
        this.dataCandidate = response.data
      })
    },

    getMailOffer:function(){
      const url = 'http://127.0.0.1:8000/api/getMailOffer'
      axios.get(url).then((response) => {
        this.dataMailOffer = response.data
      })
    },

    sendMail : function()
    {
      this.errors = []
      for(const [key,value] of Object.entries(this.dataSend))
      {
        if(!value.date || !value.salary){
          this.errors.push('Phải nhập đầy đủ dữ liệu')
        }
        value['template_id'] = this.dataMailOffer['category']
        value['content'] = this.changeText(this.dataMailOffer['content'],value['name'], value['date'], this.getBadge(value['position']), value['salary'])
        value['date_work'] = value.date,
        value['salary'] = value.salary

      axios.post('http://127.0.0.1:8000/api/send-mailOffer', value).then((response) => {
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

    toggleDetails (item,index) {
      this.$set(this.dataCandidate[index], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
    
    changeText: function(content,name,date,position,salary){
      content = content.replace('[Name]', name).replace('[date]',this.convertDate(date)).replace('[Position]', position).replace('[salary]', salary)
      return content
    },

    getBadge(status) {
      if(status == 1) return 'C#'
      else if(status == 2) return 'PHP'
      else return 'Tester'
    },

    getStatus(status){
      if(status == 0) return 'Chưa gửi'
      else return 'Đã gửi'
    },

    convertDate(created){
      created = moment(String(created)).format('DD/MM/YYYY')
      return created
    }
    
  }
}
</script>
