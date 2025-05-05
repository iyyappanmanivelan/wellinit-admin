import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Overview',
    path: '/',
    icon: 'hugeicons:grid-view',
    active: true,
  },
  {
    id: 'blogs',
    subheader: 'Manage Blog',
    path: paths.manageblogs,
    icon: 'hugeicons:book-open-01',
    active: true,
  },
  // {
  //   id: 'mentors',
  //   subheader: 'Blog Content Management',
  //   path: '#!',
  //   icon: 'mynaui:user-hexagon',
  // },
  // {
  //   id: 'messages',
  //   subheader: 'Messages',
  //   path: '#!',
  //   icon: 'mage:message-dots',
  // },
  // {
  //   id: 'settings',
  //   subheader: 'Settings',
  //   path: '#!',
  //   icon: 'hugeicons:settings-01',
  // },
];

export default sitemap;
