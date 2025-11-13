<template>
  <div>
    <div>{{ expenseData?.name }}</div>
    <div>{{ expenseData?.description }}</div>
    <div>{{ expenseData?.cost }}</div>
  </div>
</template>

<script setup lang="ts">
import { useExpensesStore } from "@/stores/ExpensesStore";
import { useExpensesDataStore } from "@/stores/ExpensesDataStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const expensesStore = useExpensesStore();
const { selectedId, childrenExpenses } = storeToRefs(expensesStore);
const expensesDataStore = useExpensesDataStore();
const { getDataById } = expensesDataStore;

const expenseData = computed(() => {
  if (selectedId.value !== null) {
    const expense = childrenExpenses.value.find((exp) => exp.id === selectedId.value);
    const expData = getDataById(selectedId.value);
    if (!expense || !expData) {
      return null;
    }
    return {
      name: expense.name,
      description: expense.description,
      cost: expData.reduce((sum, item) => sum + item.cost, 0),
    };
  }
  return null;
});
</script>

<style scoped>
.details-container {
  padding: 10px;
  border-color: rgb(255, 0, 0);
  border-style: solid;
  border-width: 1px;
}
</style>
