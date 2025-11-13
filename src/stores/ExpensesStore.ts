import type { Expense } from "@/model/Expense";
import { defineStore } from "pinia";
import expensesData from "@/data/data.json";
import { computed, ref } from "vue";

export const useExpensesStore = defineStore("ExpensesStore", () => {
  const expenses = ref<Expense[]>([]);
  const selectedId = ref<number | null>(null);
  const childrenExpenses = ref<Expense[]>([]);

  const firstChild = computed<Expense | null>(() => {
    return childrenExpenses.value.length > 0 ? childrenExpenses.value[0] ?? null : null;
  });

  function init() {
    expenses.value = expensesData.expenses;
    childrenExpenses.value = expenses.value.filter((expense) => expense.parentId === null);
  }

  function addExpense(expense: Expense) {
    expenses.value.push(expense);
  }

  function removeExpense(expense: Expense) {
    expenses.value = expenses.value.filter((e) => e.id !== expense.id);
  }

  function setSelectedId(id: number | null) {
    selectedId.value = id;
  }

  function setChildrenExpensesByParentId(id: number | null) {
    const children = expenses.value.filter((expense) => expense.parentId === id);
    if (children.length > 0) {
      childrenExpenses.value = children;
    }
  }

  function GoOneLevelUp() {
    const firstItemParentId = firstChild.value?.parentId;
    if (firstItemParentId !== undefined) {
      setChildrenExpensesByParentId(
        expenses.value.find((expense) => expense.id === firstItemParentId)?.parentId ?? null
      );
    }
  }

  return {
    childrenExpenses,
    selectedId,
    firstChild,
    init,
    setChildrenExpensesByParentId,
    addExpense,
    removeExpense,
    setSelectedId,
    GoOneLevelUp,
  };
});
