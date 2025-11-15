import type { Expense } from "@/model/Expense";

export class TrieNode {
  public children: Map<string, TrieNode>;
  constructor(public expense: Expense | null = null) {
    this.children = new Map<string, TrieNode>();
  }
}
