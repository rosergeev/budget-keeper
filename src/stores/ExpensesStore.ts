import type { Expense } from "@/model/Expense";
import { defineStore } from "pinia";
import expensesData from "@/data/data.json";
import { computed, ref } from "vue";
import { ExpensesTreeMap } from "@/model/ExpensesTreeMap";

export const useExpensesStore = defineStore("ExpensesStore", () => {
  const expenses = ref<Expense[]>([]);
  const selectedId = ref<number | null>(null);
  const currentParentId = ref<number | null>(null);
  let expensesTreeMap: ExpensesTreeMap = new ExpensesTreeMap([]);

  const childrenExpenses = computed<Expense[]>(() => {
    return expenses.value.filter((expense) => expense.parentId === currentParentId.value);
  });

  function init() {
    expenses.value = expensesData.expenses;
    expensesTreeMap = new ExpensesTreeMap(expenses.value);
  }

  function addExpense(expense: Expense) {
    expenses.value.push(expense);
  }

  function setSelectedId(id: number | null) {
    selectedId.value = id;
  }

  function setChildrenExpensesByParentId(id: number | null) {
    currentParentId.value = id;
    setSelectedId(null);
  }

  function getSelfAndChildrenIds(id: number | null): number[] {
    if (id === null) {
      return [];
    }
    const allChildrenIds: number[] = [];
    getChildrenIdsRecursive(id, allChildrenIds);
    return allChildrenIds;
  }

  const getChildrenIdsRecursive = (parentId: number, ids: number[]) => {
    const children = expensesTreeMap.getChildren(parentId);
    ids.push(parentId);
    for (const childId of children) {
      getChildrenIdsRecursive(childId, ids);
    }
  };

  function goOneLevelUp() {
    if (currentParentId.value === null) {
      return;
    }
    const parentExpense = expenses.value.find((expense) => expense.id === currentParentId.value);
    setChildrenExpensesByParentId(parentExpense?.parentId ?? null);
  }

  function hasChildren(id: number | null): boolean {
    return expensesTreeMap.hasChildren(id);
  }

  return {
    expenses,
    childrenExpenses,
    selectedId,
    currentParentId,
    init,
    setChildrenExpensesByParentId,
    addExpense,
    setSelectedId,
    goOneLevelUp,
    hasChildren,
    getSelfAndChildrenIds,
  };
});
