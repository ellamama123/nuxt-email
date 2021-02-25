<template>
  <div>
    <CRow>
      <CCol sm="6">
        <CCard class="card-login">
          <CCardHeader>
            Login
          </CCardHeader>
          <CCardBody>
            <div v-if="error">
              <CAlert color="warning" closeButton>
                {{ error }}
              </CAlert>
            </div>
            <form>
              <div>
                <CInput
                  label="Email"
                  placeholder="Enter your mail"
                  v-model="userForm.email"
                />
              </div>
              <div>
                <CInput
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  v-model="userForm.password"
                />
              </div>

              <div class="button-login">
                <CButton class="m-2 " color="success" @click="login">
                  Login
                </CButton>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <div v-if="showLoading">
      <CElementCover
        :boundaries="[{ sides: ['top', 'left'], query: '.media-body' }]"
        :opacity="0.8"
      >
        <h1 class="d-inline">Loading...</h1>
        <CSpinner size="5xl" color="success" />
      </CElementCover>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        email: "",
        password: "",
      },
      error: "",
      showLoading: false,
    };
  },
  created() {
    if (this.$auth.$state.loggedIn) {
      this.$router.replace({ name: "/dashboard" });
    }
  },
  methods: {
    async login() {
      try {
        this.showLoading = true;
        await this.$auth
          .login({
            data: this.userForm,
          })
          .then(() => this.$router.push("/")); // muốn dùng được đoạn này thì cài thêm vue-router nhé
      } catch (err) {
        this.error = "Username or Password not valid";
        this.showLoading = false;
      }
    },
  },
};
</script>
