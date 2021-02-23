<template>
  <CContainer class="min-vh-100 d-flex align-items-center">
    <CRow class="w-100 justify-content-center">
      <CCol md="6" sm="8">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <CForm>
              <h1>Register</h1>
              <p class="text-muted">
                Create your account
              </p>
              <CInput
                placeholder="Username"
                autocomplete="username"
                v-model="form.name"
              >
                <template #prepend-content>
                  <CIcon name="cil-user" />
                </template>
              </CInput>
              <CInput
                placeholder="Email"
                autocomplete="email"
                prepend="@"
                v-model="form.email"
              />
              <CInput
                placeholder="Password"
                type="password"
                autocomplete="new-password"
                v-model="form.password"
              >
                <template #prepend-content>
                  <CIcon name="cil-lock-locked" />
                </template>
              </CInput>
              <CInput
                placeholder="Repeat password"
                type="password"
                autocomplete="new-password"
                class="mb-4"
                v-model="form.password_confirmation"
              >
                <template #prepend-content>
                  <CIcon name="cil-lock-locked" />
                </template>
              </CInput>
              <CButton color="success" @click="register" block>
                Create Account
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  middleware: "guest",
  name: "Register",
  data() {
    return {
      form: { name: "", email: "", password: "", password_confirmation: "" },
    };
  },
  methods: {
    async register() {
      await this.$axios.post("/register", this.form);
      this.$auth.login({ data: this.form });
      this.$router.push("/");
    },
  },
};
</script>
