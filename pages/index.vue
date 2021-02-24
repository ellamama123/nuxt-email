<template>
  <Dashboard />
</template>

<script>
import Dashboard from "./Dashboard";

export default {
  middleware: "auth",
  components: {
    Dashboard,
  },
};
</script>
