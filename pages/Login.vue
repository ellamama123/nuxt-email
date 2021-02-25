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
              <div class="button-login">
                <CButton class="m-2 " color="success" @click="loginFacebook">
                  Login facebook
                </CButton>
              </div>
              <div class="text-login">
                <p>Or login with</p>
              </div>
              <div class="social-login">
                <CButton class="hollow button primary" @click="loginGoogle">
                  <img
                    width="15px"
                    style="margin-bottom:3px; margin-right:5px"
                    alt="Google login"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                  Sign in with Google
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
          .then(() => this.$router.push("/"));
      } catch (err) {
        this.error = "Username or Password not valid";
        this.showLoading = false;
      }
    },

    async loginFacebook() {
      this.$auth.loginWith("facebook");
    },

    async loginGoogle() {
      try {
        let response = this.$auth.loginWith("google", {
          params: { prompt: "select_account" },
        });
        console.log(response);
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>
