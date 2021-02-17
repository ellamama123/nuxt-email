<template lang="">
  <div>
    <CButton
      color="success"
      class="m-2"
    >
      <nuxt-link to="/management/candidate/add">Thêm mới</nuxt-link>
    </CButton>
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
          {{ getPosition(item.position) }}
        </td>
      </template>
      <template #edit="{item}">
        <td class="py-2">
          <CButton color="success">
            <nuxt-link :to="`/management/candidate/${item.id}`">Sửa</nuxt-link>
          </CButton>
        </td>
      </template>
       <template #delete="{item}">
        <td class="py-2">
          <CButton color="danger" @click="deleteCandidate(item)">
            Xóa
          </CButton>
        </td>
      </template>
        <template #status="{item}">
          <td>
            {{getStatus(item.status)}}
          </td>
        </template>
      </CDataTable>
    </CCardBody>
    <CButton color="success" class="m-2">
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
  {key : 'position',label :'Vị trí ứng tuyển'},
  {key : 'status',label :'Trạng thái'},
  {key : 'created_at',label :'Ngày tiếp nhận'},
  {
    key : 'edit',
    label : 'Sửa'
  },
  {
    key : 'delete',
    lable : 'Xóa'
  }
];

export default {
  name: "AdvancedTables",
  data() {
    return {
      dataCandidate : [],
      fields:fields,
    };
  },
  
  mounted() {
    this.listData()
  },

  methods: {
    
    listData: function () {
      const url = 'http://127.0.0.1:8000/api/candidate'
      axios.get(url).then((response) => {
        this.dataCandidate = response.data
      })
    },

    deleteCandidate: function(item) {
      if(confirm("Bạn có chắc chắn muốn xóa không ?")){

      axios.delete('http://127.0.0.1:8000/api/candidate/'+item.id).then((res) => {
        this.listData()
      }).then(
          () => {
              this.$router.push({ path: '/management/candidate/' })

          });
      }      
    },

    getPosition(position){
      if(position == 1) return "C#"
      else if(position == 2) return "PHP"
      else return "Tester"
    },

    getStatus(status){
      if(status == 0) return 'Chưa gửi'
      else return 'Đã gửi'
    }

  },
};
</script>