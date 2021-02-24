<template>
  <CSidebar fixed :minimize="minimize" :show.sync="show" >
    <CSidebarBrand to="/">
      <img
        width="70%"
        height="90%"
        :src="require(`@/assets/img/logo.png`)"
        class="c-sidebar-brand-full"
      />
      <img src="logo.png" class="c-sidebar-brand-minimized" />
    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="nav" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="minimize = !minimize"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";
import { freeSet } from "@coreui/icons";
export default {
  name: "TheSidebar",
  freeSet,
  data() {
    return {
      minimize: false,
      nav,
      show: "responsive",
    };
  },
  mounted() {
    this.$root.$on("toggle-sidebar", () => {
      const sidebarOpened = this.show === true || this.show === "responsive";
      this.show = sidebarOpened ? false : "responsive";
    });
    this.$root.$on("toggle-sidebar-mobile", () => {
      const sidebarClosed = this.show === "responsive" || this.show === false;
      this.show = sidebarClosed ? true : "responsive";
    });
  },
};
</script>
