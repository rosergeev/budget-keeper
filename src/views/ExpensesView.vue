<template>
  <div class="container">
    <div class="breadcrumb">
      <BreadcrumbList />
    </div>
    <ExpenseNavBar class="nav" />
    <div class="list" @click="onListClick">
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
import BreadcrumbList from "@/components/BreadcrumbList.vue";
import { useExpensesStore } from "@/stores/ExpensesStore";
import { storeToRefs } from "pinia";

const expensesStore = useExpensesStore();
const { childrenExpenses } = storeToRefs(expensesStore);
const { setSelectedId } = expensesStore;

const onListClick = () => {
  setSelectedId(null);
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 3fr 400px;
  grid-template-rows: 35px 30px 1fr;
  grid-template-areas:
    "nav nav"
    "breadcrumb breadcrumb"
    "list details";
  column-gap: 10px;
  row-gap: 10px;
  height: 100%;
}
.breadcrumb {
  grid-area: breadcrumb;
  justify-self: center;
  align-items: center;
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
