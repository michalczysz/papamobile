import { Search, Home, Info } from '@mui/icons-material'


export const SidebarData = [
  {
    title: 'General',
    path: '/',
    icon: <Home />,
    cName: 'nav-text'
  },
  {
    title: 'Detail',
    path: '/detail',
    icon: <Search />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   cName: 'nav-text'
  // },
  {
    title: 'About',
    path: '/about',
    icon: <Info />,
    cName: 'nav-text'
  },
];