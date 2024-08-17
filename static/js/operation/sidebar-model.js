export const menuItems = [
    {
      type: 'user-card',
      userName: 'Jane',
      userImage: '../../assets/img/team/profile-picture-3.jpg',
      signOutLink: '../../pages/examples/sign-in.html',
    },
    {
      type: 'logo',
      logoImage: '../../assets/img/favicon/logo-mes.png' ,
      logoText: 'MES',
      logoLink: '../../index.html',
    },
    {
      type: 'single',
      text: 'Dashboard',
      icon: '<svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>',
      link: '../../pages/operation/dashboard.html',
    },
    {
      type: 'submenu',
      text: 'Data Operation',
      icon: '<svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>',
      items: [
        {
          text: 'Monitoring Produksi',
          link: '../../pages/operation/data-produksi.html',
        },
        {
          text: 'Monitoring Mesin',
          link: '../../pages/operation/data-mesin.html',
        },
      ],
    },
  ];
  