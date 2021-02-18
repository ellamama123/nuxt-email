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
              <CInputCheckbox  />
            </td>
          </template>
          <template #date="{item}">
            <td>
              <CInput type="date" name="date" v-model="item.date" @change="check(item)"/>
            </td>
          </template>
          <template #salary="{item}">
            <td>
              <CInput  v-model="item.salary" />
            </td>
          </template>

          <template #position="{item}">
            <td>
              {{getPosition(item.position)}}
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
              <CButton color="primary" variant="outline" size="sm" @click="showModal(item)">
                Show
              </CButton>
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
          Send
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
    <CModal title="Detail Content Mail" color="success" :show.sync="warningModal" >
        {{content}}
    </CModal>
  </div>
</template>

<script>

import axios from "axios"
import moment from 'moment'
import {LIST_POSITION} from '@/const/constdata'
import {LIST_STATUS} from '@/const/constdata'

const fields = [
  {key : 'name',label :'Name'},
  {key : 'phone',label :'Phone'},
  {key : 'email',label :'Email'},
  {key : 'position',label :'Position'},
  {key : 'status',label :'Status'},
  {key : 'created_at',label :'Day Reception'},
  {
    key: 'date',
    label: 'interview schedule'
  },
  {
    key: 'salary',
    label: 'Salary',
  },
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
      dataSend : [],
      date: null,
      dataMailOffer: '',
      salary: '',
      errors: [],
      LIST_POSITION,
      LIST_STATUS,
      content: '',
      warningModal: false,
    }
  },

  mounted () {
    this.getMailOffer()
     this.listData()
  },

  methods: {
    listData: function () {
      const url = 'http://127.0.0.1:8000/api/candidate'
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
        else{
          value['template_id'] = this.dataMailOffer['category']
          value['content'] = this.changeText(this.dataMailOffer['content'],value['name'], value['date'], this.getPosition(value['position']), value['salary'])
          value['date_work'] = value.date,
          value['salary'] = value.salary

          axios.post('http://127.0.0.1:8000/api/send-mailOffer', value).then((response) => {
            axios.post('http://127.0.0.1:8000/api/history?candidate_id=' + value.id,value)
          })
        }
      }
    },

    check : function(item){
      this.dataSend.push(item)
    },

    showModal(item){
      this.content = this.changeText(this.dataMailOffer['content'], item.name, item.date, item.position, item.salary)
      this.warningModal = true
    },
    
    changeText: function(content,name,date,position,salary){
      if(!date && !salary){
        return content
      }
      else{
        content = content.replace('[Name]', name).replace('[date]',this.convertDate(date)).replace('[Position]', position).replace('[salary]', salary)
        return content
      }
    },

    getPosition(position){
      for(const pos of this.LIST_POSITION)
      {
        if(position == pos.value)
        {
          return pos.label
        }
      }
    },

    getStatus(status){
      for(const sta of this.LIST_STATUS)
      {
        if(status == sta.value)
        {
          return sta.label
        }
      }
    },

    convertDate(created){
      created = moment(String(created)).format('DD/MM/YYYY')
      return created
    }
    
  }
}
</script>
