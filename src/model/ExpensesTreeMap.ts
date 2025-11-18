import type { Expense } from "@/model/Expense";

export class ExpensesTreeMap {
  private map: Map<number | null, Set<number>> = new Map();
  constructor(private expenses: Expense[]) {
    this.build();
  }

  private build = (): void => {
    this.buildRecursive([null]);
  };

  public buildRecursive = (ids: (number | null)[]): void => {
    for (const id of ids) {
      const childrenIds = this.expenses.filter((exp) => exp.parentId === id).map((exp) => exp.id);
      if (childrenIds.length > 0) {
        this.map.set(id, new Set(childrenIds));
        this.buildRecursive(childrenIds);
      }
    }
  };

  public hasChildren = (id: number | null): boolean => {
    return this.map.has(id);
  };

  public getChildren = (id: number | null): number[] => {
    const childrenIds = this.map.get(id);
    if (!childrenIds) {
      return [];
    }
    return Array.from(childrenIds);
  }
}
