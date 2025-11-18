<template>
  <div class="container">
    <div class="header">Expenses</div>
    <ExpenseNavBar class="nav" />
    <div class="list" @click="onClick">
      <ExpenseList :items="childrenExpenses" />
    </div>
    <div class="details">
      <ExpenseListItemDetails />
    </div>
  </div>
</template>

<script setup lang="ts">
import ExpenseList from "@/components/ExpenseList.vue";
import ExpenseListItemDetails from "@/components/ExpenseListItemDetails.vue";
import ExpenseNavBar from "@/components/ExpenseNavBar.vue";
import { useExpensesStore } from "@/stores/ExpensesStore";
import { storeToRefs } from "pinia";

const expensesStore = useExpensesStore();
const { childrenExpenses } = storeToRefs(expensesStore);
const { setSelectedId } = expensesStore;

const onClick = () => {
  setSelectedId(null);
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 3fr 400px;
  grid-template-rows: 30px 35px 1fr;
  grid-template-areas:
    "header header"
    "nav nav"
    "list details";
  column-gap: 10px;
  row-gap: 10px;
  height: 100%;
}
.header {
  grid-area: header;
  border-color: rgb(217, 91, 255);
  border-style: solid;
  border-width: 1px;
}
.nav {
  grid-area: nav;
  border-color: #ccc;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}
.list {
  grid-area: list;
}
.details {
  grid-area: details;
  border-color: #eee;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
}
</style>
