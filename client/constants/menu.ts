export type MenuItem = {
  key: string;
  label: string;
  link?: string;
  icon?: boolean;
};

export const mainMenu: MenuItem[] = [
  {
    label: 'Demo',
    key: 'demo',
    icon: false,
    link: '/'
  }
];

export const footerMenu: MenuItem[] = [
  {
    label: 'Terms and conditions',
    key: 'terms-and-conditions',
    icon: false,
    link: '/'
  },
  {
    label: 'Contact',
    key: 'contact',
    icon: false,
    link: '/'
  }
];
