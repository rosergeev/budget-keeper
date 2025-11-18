import { defineStore } from "pinia";
import expensesData from "@/data/expensesData.json";
import { ExpenseData } from "@/model/ExpenseData";
import moment from "moment";
import { ref } from "vue";

export const useExpensesDataStore = defineStore("ExpensesDataStore", () => {
  const allData = ref<ExpenseData[]>([]);
  const data = ref<ExpenseData[]>([]);
  const map: Map<number, ExpenseData[]> = new Map();

  function init() {
    allData.value = expensesData.data;
    const firstDateOfMonth = moment().startOf("month");
    data.value = expensesData.data
      .filter((d) => {
        const date = moment(d.date);
        return date.isSameOrAfter(firstDateOfMonth);
      })
      .map((d) => {
        return new ExpenseData(d.id, d.cost, moment(d.date).format("DD.MM.YYYY"));
      });
    buildMap();
  }

  function getDataById(id: number): ExpenseData[] | null {
    return data.value.filter((d) => d.id === id);
  }

  function findDataByDate(id: number, date: string): ExpenseData | null {
    const expenseDatas = map.get(id);
    const found = expenseDatas?.find((d) => d.date === date);
    return found ? found : null;
  }

  const buildMap = () => {
    map.clear();
    for (const d of allData.value) {
      if (!map.has(d.id)) {
        map.set(d.id, []);
      }
      map.get(d.id)!.push(d);
    }
  };

  return {
    data,
    init,
    getDataById,
    findDataByDate,
  };
});
