export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface FlatTreeNode {
  node: TreeNode;
  depth: number;
  parentId: string | null;
  posInSet: number;
  setSize: number;
}
