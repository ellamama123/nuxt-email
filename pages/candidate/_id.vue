<template>
  <div>
    <add-candidate></add-candidate>
  </div>
</template>

<script>
import AddCandidate from "@/components/candidate/AddCandidate";

export default {
  middleware: "auth",
  components: { AddCandidate },
};
</script>
