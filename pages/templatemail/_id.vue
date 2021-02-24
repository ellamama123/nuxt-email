<template>
  <div>
    <add-template></add-template>
  </div>
</template>

<script>
import AddTemplate from "@/components/template/AddTemplate";
export default {
  middleware: "auth",
  components: { AddTemplate },
};
</script>
