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

export function flattenTree(
  nodes: TreeNode[],
  expandedIds: Set<string>,
  depth = 0,
  parentId: string | null = null
): FlatTreeNode[] {
  const result: FlatTreeNode[] = [];
  nodes.forEach((node, index) => {
    result.push({ node, depth, parentId, posInSet: index + 1, setSize: nodes.length });
    if (node.children && node.children.length > 0 && expandedIds.has(node.id)) {
      result.push(...flattenTree(node.children, expandedIds, depth + 1, node.id));
    }
  });
  return result;
}
