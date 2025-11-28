<template>
  <span
    class="breadcrumb-link"
    :class="{ 'is-last': isLastBreadcrumb(item) }"
    @click="!isLastBreadcrumb(item) && onBreadcrumbClick()"
  >
    {{ item.name }}
  </span>
  <span v-if="!isLastBreadcrumb(item)" class="separator"> / </span>
</template>

<script setup lang="ts">
import type { Expense } from "@/model";
import { toRefs } from "vue";
import { useBreadcrumbStore } from "@/stores/BreadcrumbStore";
import { useExpensesStore } from "@/stores/ExpensesStore";

const props = defineProps<{
  item: Expense;
}>();

const { item } = toRefs(props);
const breadcrumbStore = useBreadcrumbStore();
const { isLastBreadcrumb, truncateBreadcrumbsTo, resetBreadcrumbs } = breadcrumbStore;
const expensesStore = useExpensesStore();
const { setChildrenExpensesByParentId } = expensesStore;

const onBreadcrumbClick = () => {
  if (item.value.id === -1) {
    resetBreadcrumbs();
    setChildrenExpensesByParentId(null);
    return;
  }
  truncateBreadcrumbsTo(item.value.id);
  setChildrenExpensesByParentId(item.value.id);
};
</script>

<style scoped>
span {
  font-size: 0.8rem;
  font-weight: 600;
  color: #747474;
}
.breadcrumb-link {
  cursor: pointer;
}
.breadcrumb-link:not(.is-last):hover {
  color: #3e99f6;
}
.breadcrumb-link.is-last {
  cursor: no-drop;
  color: #c0c0c0;
}
</style>
