import type { Expense } from "@/model/Expense";
import { defineStore } from "pinia";
import expensesData from "@/data/data.json";
import { computed, ref } from "vue";
import { ExpensesTreeMap } from "@/model/ExpensesTreeMap";

export const useExpensesStore = defineStore("ExpensesStore", () => {
  const expenses = ref<Expense[]>([]);
  const selectedId = ref<number | null>(null);
  const childrenExpenses = ref<Expense[]>([]);
  let expensesTreeMap: ExpensesTreeMap = new ExpensesTreeMap([]);

  const firstChild = computed<Expense | null>(() => {
    return childrenExpenses.value.length > 0 ? childrenExpenses.value[0] ?? null : null;
  });

  function init() {
    expenses.value = expensesData.expenses;
    expensesTreeMap = new ExpensesTreeMap(expenses.value);
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
      setSelectedId(null);
    }
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
    const firstItemParentId = firstChild.value?.parentId;
    if (firstItemParentId !== undefined) {
      setChildrenExpensesByParentId(
        expenses.value.find((expense) => expense.id === firstItemParentId)?.parentId ?? null
      );
    }
  }

  function hasChildren(id: number | null): boolean {
    return expensesTreeMap.hasChildren(id);
  }

  return {
    expenses,
    childrenExpenses,
    selectedId,
    firstChild,
    init,
    setChildrenExpensesByParentId,
    addExpense,
    removeExpense,
    setSelectedId,
    goOneLevelUp,
    hasChildren,
    getSelfAndChildrenIds
  };
});
