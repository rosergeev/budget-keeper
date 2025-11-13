import { defineStore } from "pinia";
import expensesData from "@/data/expensesData.json";
import { ExpenseData } from "@/model/ExpenseData";
import { ref } from "vue";

export const useExpensesDataStore = defineStore("ExpensesDataStore", () => {
  const data = ref<ExpenseData[]>([]);

  function init() {
    data.value = expensesData.data;
  }

  function getDataById(id: number): ExpenseData[] | null {
    return data.value.filter((d) => d.id === id);
  }

  return {
    data,
    init,
    getDataById,
  };
});
