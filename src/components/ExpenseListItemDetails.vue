<template>
  <div class="details-container" v-if="selectedId !== null">
    <div class="details-name">{{ expenseData?.name }}</div>
    <div class="details-description">{{ expenseData?.description }}</div>
    <el-divider class="details-divider1" />
    <div class="details-empty"></div>
    <el-date-picker
      class="details-calendar"
      type="date"
      format="DD.MM.YYYY"
      v-model="dateValue"
      @change="onDateChange"
    />
    <div class="details-cost-title">Стоимость:</div>
    <el-input class="details-cost" v-model="cost" @keydown="onCostKeyDown" />
    <el-divider class="details-divider2" />
    <div class="details-monthly-title">За месяц:</div>
    <div class="details-monthly">{{ expenseData?.cost }} €</div>
  </div>
</template>

<script setup lang="ts">
import { useExpensesStore } from "@/stores/ExpensesStore";
import { useExpensesDataStore } from "@/stores/ExpensesDataStore";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { ElDatePicker, ElDivider, ElInput } from "element-plus";
import moment from "moment";

const expensesStore = useExpensesStore();
const { selectedId, childrenExpenses } = storeToRefs(expensesStore);
const { getSelfAndChildrenIds } = expensesStore;
const expensesDataStore = useExpensesDataStore();
const { getDataById, findDataByDate, getMonthSumById } = expensesDataStore;
const dateValue = ref(new Date());
const cost = ref("");

const expenseData = computed(() => {
  if (selectedId.value !== null) {
    const expense = childrenExpenses.value.find((exp) => exp.id === selectedId.value);
    const expData = getDataById(selectedId.value);
    if (!expense || !expData) {
      return null;
    }
    const ids = getSelfAndChildrenIds(selectedId.value);
    const monthExpense = getMonthSumById(ids);
    return {
      name: expense.name,
      description: expense.description,
      cost: monthExpense,
    };
  }
  return null;
});

watch(selectedId, () => {
  // Reset date and cost when selectedId changes
  dateValue.value = moment().toDate();
  cost.value = "";
});

const onDateChange = (value: string) => {
  const date = moment(value).format("YYYY-MM-DD");
  const dataEntry = findDataByDate(selectedId.value!, date);
  if (dataEntry) {
    cost.value = `${dataEntry.cost.toString()}`;
  } else {
    cost.value = "";
  }
};

const onCostKeyDown = (event: KeyboardEvent | Event) => {
  // Type guard to ensure we're working with KeyboardEvent
  if (!(event instanceof KeyboardEvent)) {
    return;
  }

  // Allow: navigation keys, backspace, delete, tab
  const navigationKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Home", "End"];

  if (navigationKeys.includes(event.code)) {
    return; // Allow navigation keys
  }

  // Allow Ctrl/Cmd+A, Ctrl/Cmd+C, Ctrl/Cmd+V, Ctrl/Cmd+X
  if (event.ctrlKey || event.metaKey) {
    return;
  }

  // Check if it's a digit
  const isDigitKey = isDigit(event.code);

  // Check if it's a period (but prevent if shift is pressed or period already exists)
  const isPeriodKey = event.code === "Period" || event.code === "NumpadDecimal";
  const alreadyHasPeriod = cost.value.includes(".");

  // Prevent if:
  // - Not a digit and not a period
  // - Shift is pressed with digit keys (to prevent symbols like !, @, #, etc.)
  // - It's a period but one already exists
  const shouldPrevent =
    (!isDigitKey && !isPeriodKey) ||
    (isDigitKey && event.shiftKey) ||
    (isPeriodKey && alreadyHasPeriod);

  if (shouldPrevent) {
    event.preventDefault();
  }
};

const isDigit = (keyCode: string): boolean => {
  const digitKeyCodes = [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Numpad0",
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
  ];
  return digitKeyCodes.includes(keyCode);
};
</script>

<style scoped>
.details-container {
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-template-columns: 120px 220px 1fr;
  grid-template-areas:
    "name name name"
    "description description description"
    "divider1 divider1 divider1"
    "empty calendar some"
    "cost-title cost some2"
    "divider2 divider2 divider2"
    "monthly-title monthly some3";
  row-gap: 5px;
  margin: 0 5px;
}
.details-name {
  grid-area: name;
}
.details-description {
  grid-area: description;
  font-size: 0.7em;
  color: #838383;
}
.details-calendar {
  grid-area: calendar;
  /* width: 100%; */
  /* justify-self: center; */
}
.details-divider1 {
  grid-area: divider1;
  margin: 10px 0;
}
.details-cost-title {
  grid-area: cost-title;
  align-self: center;
}
.details-cost {
  grid-area: cost;
}
.details-empty {
  grid-area: empty;
}
.details-divider2 {
  grid-area: divider2;
  margin: 10px 0;
}
.details-monthly-title {
  grid-area: monthly-title;
  align-self: center;
}
.details-monthly {
  grid-area: monthly;
}
</style>
