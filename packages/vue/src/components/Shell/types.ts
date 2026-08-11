export interface SideNavLeafItem {
  id: string;
  label: string;
  href: string;
}

export interface SideNavItem extends SideNavLeafItem {
  children?: SideNavLeafItem[];
}
