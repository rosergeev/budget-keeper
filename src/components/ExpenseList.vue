<template>
  <div class="list-container">
    <div v-for="item in items" :key="item.id">
      <ExpenseListItem :expense="item" :isSelected="selectedId === item.id" class="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ExpenseListItem from "@/components/ExpenseListItem.vue";
import { useExpensesStore } from "@/stores/ExpensesStore";
import { storeToRefs } from "pinia";
import type { Expense } from "@/model/Expense";
import { toRefs } from "vue";
const props = defineProps<{
  items: Expense[];
}>();

const { items } = toRefs(props);
const expensesStore = useExpensesStore();
const { selectedId } = storeToRefs(expensesStore);
</script>

<style scoped>
.list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  justify-content: space-between;
}
.item {
  height: 140px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
