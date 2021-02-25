<template>
  <div>
    <WidgetsDropdown />
  </div>
</template>

<script>
import WidgetsDropdown from "./widgets/WidgetsDropdown";

export default {
  middleware: "auth",
  name: "Dashboard",
  components: {
    WidgetsDropdown,
  },
};
</script>
