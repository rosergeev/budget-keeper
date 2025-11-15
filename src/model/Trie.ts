import { TrieNode } from "@/model/TrieNode";
import type { Expense } from "@/model/Expense";

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  private searchNode = (prefix: string): TrieNode | null => {
    let currentNode: TrieNode = this.root;
    for (const char of prefix.toLowerCase()) {
      const nextNode = currentNode.children.get(char);
      if (!nextNode) {
        return null;
      }
      currentNode = nextNode;
    }
    return currentNode;
  };

  public searchExpense = (word: string): Expense | null => {
    const node = this.searchNode(word);
    if (!node) {
      return null;
    }
    const endNode = node.children.get("*");
    return endNode?.expense ?? null;
  };

  public insert = (expense: Expense): void => {
    let currentNode: TrieNode = this.root;
    for (const char of expense.name.toLowerCase()) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }
      currentNode = currentNode.children.get(char)!;
    }
    currentNode.children.set("*", new TrieNode(expense)); // Mark the end of the word
  };

  private collectAllExpenses = (node: TrieNode, expenses: Expense[]): Expense[] => {
    for (const [char, childNode] of node.children) {
      if (char === "*") {
        if (childNode.expense) {
          expenses.push(childNode.expense);
        }
      } else {
        this.collectAllExpenses(childNode, expenses);
      }
    }
    return expenses;
  };

  public autocomlete = (prefix: string): Expense[] => {
    const currentNode = this.searchNode(prefix);
    if (!currentNode) {
      return [];
    }
    return this.collectAllExpenses(currentNode, []);
  };
}
