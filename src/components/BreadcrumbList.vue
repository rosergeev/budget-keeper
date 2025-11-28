<template>
  <BreadcrumbItem v-for="item in breadcrumb" :key="item.id" :item="item" />
</template>

<script setup lang="ts">
import { useBreadcrumbStore } from "@/stores/BreadcrumbStore";
import { storeToRefs } from "pinia";
import BreadcrumbItem from "@/components/BreadcrumbItem.vue";

const breadcrumbStore = useBreadcrumbStore();
const { breadcrumb } = storeToRefs(breadcrumbStore);
</script>

<style scoped></style>
