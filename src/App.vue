<script setup lang="ts">
import { useExpensesStore } from "@/stores/ExpensesStore";
import { useExpensesDataStore } from "@/stores/ExpensesDataStore";

const expensesStore = useExpensesStore();
const expensesDataStore = useExpensesDataStore();
expensesStore.init();
expensesDataStore.init();
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
