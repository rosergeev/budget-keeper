<template>
  <div
    class="item-container"
    :class="{ selected: isSelected }"
    @dblclick="onDblClick"
    @click="onClick"
  >
    <BiChevronsDown :class="'chevron'" v-if="hasChildren(expense.id)" />
    <img :src="expense.image" alt="Expense Image" v-if="expense.image" class="image" />
    <div :class="[expense.image ? 'name' : 'name-without-image']">{{ expense.name }}</div>
    <div :class="[expense.image ? 'info' : 'info-without-image']">
      {{ expense.description }}
    </div>
    <div class="empty"></div>
    <div class="data">Data loading...</div>
  </div>
</template>

<script setup lang="ts">
import type { Expense } from "@/model/Expense";
import { defineProps, toRefs } from "vue";
import { useExpensesStore } from "@/stores/ExpensesStore";
import { BiChevronsDown } from "vue-icons-plus/bi";

const props = defineProps<{
  expense: Expense;
  isSelected: boolean;
}>();
const { expense, isSelected } = toRefs(props);
const expensesStore = useExpensesStore();
const { setSelectedId, setChildrenExpensesByParentId, hasChildren } = expensesStore;

const onDblClick = () => {
  setChildrenExpensesByParentId(expense.value.id);
};

const onClick = (ev: MouseEvent) => {
  if (isSelected.value) {
    setSelectedId(null);
  } else {
    setSelectedId(expense.value.id);
  }
  ev.stopPropagation();
};
</script>

<style scoped>
.item-container {
  display: grid;
  grid-template-rows: 1fr 1fr 2fr 1fr;
  grid-template-columns: 1fr 2fr 30px;
  grid-template-areas:
    "image name chevron"
    "image info info"
    "image empty empty"
    "image data data";
  column-gap: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #eee;
  border-radius: 5px;
}
.item-container:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.item-container.selected {
  border-color: #549eff;
  border-width: 1px;
  border-style: solid;
}
.item-container.selected:hover {
  transform: none;
  box-shadow: none;
}
.image {
  grid-area: image;
  align-self: center;
  margin-left: 2px;
  width: 100%;
}
.name {
  grid-area: name;
  align-self: end;
}
.info {
  grid-area: info;
  font-size: 0.7em;
  color: #838383;
  align-self: start;
}
.data {
  grid-area: data;
  align-self: center;
  justify-self: start;
}
.name-without-image {
  grid-area: 1/1/2/3;
  align-self: end;
  margin-left: 5px;
}
.info-without-image {
  grid-area: 2/1/3/3;
  font-size: 0.8em;
  align-self: start;
  margin-left: 5px;
}
.chevron {
  height: 22px;
  grid-area: chevron;
  align-self: center;
  justify-self: center;
}
</style>
