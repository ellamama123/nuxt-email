<template>
  <CHeader fixed with-subheader light v-if="$auth.loggedIn">
    <CToggler
      v-c-emit-root-event:toggle-sidebar-mobile
      in-header
      class="ml-3 d-lg-none"
    />
    <CToggler
      v-c-emit-root-event:toggle-sidebar
      in-header
      class="ml-3 d-md-down-none"
    />
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard">
          Dashboard
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-bell" />
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-list" />
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-envelope-open" />
        </CHeaderNavLink>
      </CHeaderNavItem>
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader>
      <ol
        vocab="http://schema.org/"
        class="breadcrumbs"
        typeof="BreadcrumbList"
      >
        <li property="itemListElement" typeof="ListItem">
          <NLink property="item" typeof="WebPage" to="/">
            <span property="name">Home</span>
          </NLink>
          <meta property="position" content="1" />
        </li>
        <li
          v-for="(crumb, index) in crumbs"
          :key="index"
          property="itemListElement"
          typeof="ListItem"
        >
          <NLink property="item" typeof="WebPage" :to="crumb.path">
            <span property="name">{{
              $route.fullPath === crumb.path && title !== null
                ? title
                : crumb.title
            }}</span>
          </NLink>
          <meta property="position" :content="index + 2" />
        </li>
      </ol>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
const titleCase = require("ap-style-title-case");
export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath;
      const params = fullPath.startsWith("/")
        ? fullPath.substring(1).split("/")
        : fullPath.split("/");
      const crumbs = [];
      let path = "";
      params.forEach((param, index) => {
        path = `${path}/${param}`;
        const match = this.$router.match(path);
        if (match.name !== null) {
          crumbs.push({
            title: titleCase(param.replace(/-/g, " ")),
            ...match,
          });
        }
      });
      return crumbs;
    },
  },
};
</script>
<style scoped>
ol.breadcrumbs {
  margin-top: 10px;
  list-style: none;
}
.breadcrumbs li {
  display: inline;
}
.breadcrumbs li:after {
  content: " » ";
  display: inline;
  font-size: 0.9em;
  color: #aaa;
  padding: 0 0.0725em 0 0.15em;
}
.breadcrumbs li:last-child:after {
  content: "";
}
.breadcrumbs li a {
  color: black;
}
.breadcrumbs li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
}
</style>
