<template>
  <div class="nav-bar-container">
    <el-button type="primary" class="home" @click="GoHome" :disabled="currentParentId === null">
      <BsHouseFill />
    </el-button>
    <el-button type="primary" class="up" @click="GoUp" :disabled="currentParentId === null">
      <BsArrowUp />
    </el-button>
    <el-button type="primary" class="add" @click="addNewItem">
      <AiOutlinePlus />
    </el-button>
    <el-button
      type="primary"
      class="add-new-child"
      @click="addNewChildItem"
      :disabled="selectedId === null"
    >
      <AiOutlineSisternode />
    </el-button>
    <ExpenseListAddNewItem
      :isDialogVisible="isDialogVisible"
      @closeDialog="isDialogVisible = false"
      :parentId="parentId"
    />
  </div>
</template>
<script setup lang="ts">
import { BsArrowUp, BsHouseFill } from "vue-icons-plus/bs";
import { AiOutlinePlus, AiOutlineSisternode } from "vue-icons-plus/ai";
import { ElButton } from "element-plus";
import { useExpensesStore } from "@/stores/ExpensesStore";
import { useBreadcrumbStore } from "@/stores/BreadcrumbStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ExpenseListAddNewItem from "@/components/ExpenseListAddNewItem.vue";

const expensesStore = useExpensesStore();
const breadcrumbStore = useBreadcrumbStore();
const { goOneLevelUp, setChildrenExpensesByParentId } = expensesStore;
const { resetBreadcrumbs, truncateBreadcrumbsTo } = breadcrumbStore;
const { selectedId, currentParentId } = storeToRefs(expensesStore);
const isDialogVisible = ref(false);
const parentId = ref<number | null>(null);

const addNewItem = () => {
  parentId.value = currentParentId.value;
  isDialogVisible.value = true;
};

const addNewChildItem = () => {
  parentId.value = selectedId.value;
  isDialogVisible.value = true;
};

const GoUp = () => {
  goOneLevelUp();
  truncateBreadcrumbsTo(currentParentId.value ?? -1);
};

const GoHome = () => {
  setChildrenExpensesByParentId(null);
  resetBreadcrumbs();
};
</script>

<style scoped>
.nav-bar-container {
  display: grid;
  grid-template-columns: 30px 30px 30px 30px 1fr;
  grid-template-areas: "home-btn up-btn add-btn add-child-btn .";
  column-gap: 12px;
}
.home {
  grid-area: home-btn;
}
.up {
  grid-area: up-btn;
}
.add {
  grid-area: add-btn;
}
.add-new-child {
  grid-area: add-child-btn;
}

.el-button + .el-button {
  margin-left: 0 !important;
}
</style>
