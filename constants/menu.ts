export type MenuItem = {
  key: string;
  label: string;
  link?: string;
  icon?: boolean;
};

export const mainMenu: MenuItem[] = [
  {
    label: 'Help',
    key: 'Help',
    icon: false
  }
];