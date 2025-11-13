export class Expense {
  constructor(
    public id: number,
    public parentId: number | null,
    public name: string,
    public description: string,
    public image: string
  ) {}
}
