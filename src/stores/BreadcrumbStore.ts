import { Expense } from "@/model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBreadcrumbStore = defineStore("BreadcrumbStore", () => {
  const firstItem = new Expense(-1, null, "Расходы", "", "");
  const breadcrumb = ref<Expense[]>([firstItem]);
  const lastItem = ref<Expense>(firstItem);

  function addBreadcrumb(item: Expense) {
    breadcrumb.value.push(item);
    lastItem.value = item;
  }

  function isLastBreadcrumb(item: Expense): boolean {
    return lastItem.value.id === item.id;
  }

  function truncateBreadcrumbsTo(id: number) {
    if (id === -1) {
      resetBreadcrumbs();
      return;
    }
    const index = breadcrumb.value.findIndex((i) => i.id === id);
    if (index !== -1) {
      breadcrumb.value = breadcrumb.value.slice(0, index + 1);
      lastItem.value = breadcrumb.value[breadcrumb.value.length - 1] ?? firstItem;
    }
  }

  function resetBreadcrumbs(){
    breadcrumb.value = [firstItem];
    lastItem.value = firstItem;
  }

  return {
    breadcrumb,
    addBreadcrumb,
    resetBreadcrumbs,
    isLastBreadcrumb,
    truncateBreadcrumbsTo,
  };
});
