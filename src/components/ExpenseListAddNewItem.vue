<template>
  <el-dialog
    v-model="isDialogVisible"
    title="Добавление нового элемента"
    width="500"
    align-center
    @close="emit('closeDialog')"
  >
    <el-form :model="newExpense" ref="formRef" :rules="rules">
      <el-form-item label="Название:" prop="name">
        <el-input v-model="newExpense.name" />
      </el-form-item>
      <el-form-item label="Описание:" prop="description">
        <el-input v-model="newExpense.description" />
      </el-form-item>
      <el-form-item label="Изображение:">
        <label for="file-input" class="el-button el-button--primary">Выбрать файл</label>
        <input id="file-input" type="file" hidden @change="uploadFile" />
        <div v-if="file" class="file-name">{{ file.name }}</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onAddNewItem">Добавить</el-button>
      <el-button @click="emit('closeDialog')">Отмена</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Expense } from "@/model/Expense";
import { ref, toRefs, watch, reactive } from "vue";
import { useExpensesStore } from "@/stores/ExpensesStore";
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  type FormInstance,
  type FormRules,
} from "element-plus";

const props = defineProps<{
  isDialogVisible: boolean;
  parentId: number | null;
}>();

const emit = defineEmits<{
  (e: "closeDialog"): void;
}>();

const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [{ required: true, message: "Пожалуйста, введите название", trigger: "blur" }],
  description: [{ required: true, message: "Пожалуйста, введите описание", trigger: "blur" }],
});

const file = ref<File | null>(null);
const newExpense = ref<Expense>(Expense.empty());
const { isDialogVisible, parentId } = toRefs(props);
const expensesStore = useExpensesStore();
const { expenses } = toRefs(expensesStore);

watch(
  () => isDialogVisible.value,
  (newVal) => {
    if (newVal) {
      clear();
    }
  }
);

const clear = () => {
  newExpense.value = Expense.empty(parentId.value);
  file.value = null;
};

const uploadFile = (event: Event) => {
  const input = event.target as HTMLInputElement;
  file.value = input?.files![0] || null;
};

const onAddNewItem = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid) => {
    if (valid) {
      const fileBase64 = await fileToBase64();
      const maxId = Math.max(...expenses.value.map((e) => e.id));
      newExpense.value.id = maxId + 1;
      console.log(`parentId: ${newExpense.value?.parentId}`);

      newExpense.value.image = fileBase64 || "";
      expensesStore.addExpense(newExpense.value);

      clear();
      emit("closeDialog");
    }
  });
};

const fileToBase64 = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!file.value) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      if (base64String === "") {
        resolve(null);
        return;
      }
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file.value);
  });
};
</script>

<style scoped>
.file-name {
  margin-left: 10px;
}
</style>
