<template>
  <div class="nav-bar-container">
    <el-button
      type="primary"
      link
      @click="GoUp"
      :disabled="firstChild?.parentId === null"
      class="up"
    >
      <BsArrowUp />
    </el-button>
    <el-button
      type="primary"
      link
      class="home"
      @click="GoHome"
      :disabled="firstChild?.parentId === null"
    >
      <BsHouseFill />
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { BsArrowUp, BsHouseFill } from "vue-icons-plus/bs";
import { ElButton } from "element-plus";
import { useExpensesStore } from "@/stores/ExpensesStore";
import { storeToRefs } from "pinia";
const expensesStore = useExpensesStore();
const { goOneLevelUp } = expensesStore;
const { firstChild } = storeToRefs(expensesStore);

const GoUp = () => {
  goOneLevelUp();
};

const GoHome = () => {
  expensesStore.setChildrenExpensesByParentId(null);
};
</script>

<style scoped>
.nav-bar-container {
  display: grid;
  grid-template-columns: 30px 30px 1fr;
  grid-template-areas: "home up empty";
}
.home {
  grid-area: home;
}
</style>
