export class Expense {
  constructor(
    public id: number,
    public parentId: number | null,
    public name: string,
    public description: string,
    public image: string
  ) {}
  public static empty = (parentId: number | null = null): Expense => {
    return new Expense(-1, parentId, "", "", "");
  };
}
