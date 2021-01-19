export const adminRoutes = [
  {
    drawerIcon: 'home-outline',
    drawerLabel: 'Dashboard',
    routeName: 'DashboardScreen',
    roles: 'all',
  },
  {
    drawerIcon: 'ios-folder-open-outline',
    drawerLabel: 'Jenis Pengaduan',
    routeName: 'TypeComplaintScreen',
    roles: 'admin',
  },
  {
    drawerIcon: 'clipboard-outline',
    drawerLabel: 'Pengaduan',
    routeName: 'ComplaintScreen',
    roles: 'all',
  },
  {
    drawerIcon: 'notifications',
    drawerLabel: 'Notifikasi',
    routeName: 'Notif',
    roles: 'all',
  },
  {
    drawerIcon: 'settings-outline',
    drawerLabel: 'Pengaturan',
    routeName: 'Setting',
    roles: 'admin',
  },
];

export const defaultRoutes = [
  {
    drawerIcon: 'home-outline',
    drawerLabel: 'Dashboard',
    routeName: 'DashboardScreen',
    roles: 'all',
  },
  {
    drawerIcon: 'clipboard-outline',
    drawerLabel: 'Pengaduan',
    routeName: 'ComplaintScreen',
    roles: 'all',
  },
  {
    drawerIcon: 'notifications',
    drawerLabel: 'Notifikasi',
    routeName: 'Notif',
    roles: 'all',
  },
];
