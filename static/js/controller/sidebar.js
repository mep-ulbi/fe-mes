import { menuItems } from '../../js/controller/sidebar-model.js';
function createSidebar(menuItems) {
    const sidebarContent = document.getElementById('sidebarContent');
    let htmlContent = '';
  
    menuItems.forEach(item => {
      switch (item.type) {
        case 'logo':
          htmlContent += `
            <div class="nav-item">
              <a href="${item.logoLink}" class="nav-link d-flex align-items-center">
                <span class="sidebar-icon">
                  <img src="${item.logoImage}" height="60" width="60" alt="Logo">
                </span>
                <span class="mt-1 ms-1 sidebar-text"><b>${item.logoText}</b></span>
              </a>
            </div>`;
          break;
  
        case 'single':
          htmlContent += `
            <div class="nav-item">
              <a href="${item.link}" class="nav-link d-flex align-items-center">
                <span class="sidebar-icon">
                  ${item.icon}
                </span>
                <span class="sidebar-text">${item.text}</span>
              </a>
            </div>`;
          break;
  
        case 'submenu':
          const submenuId = item.text.toLowerCase().replace(/ /g, '-');
          htmlContent += `
            <div class="nav-item">
              <span class="nav-link collapsed d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#${submenuId}">
                <span class="d-flex align-items-center">
                  <span class="sidebar-icon">
                    ${item.icon}
                  </span> 
                  <span class="sidebar-text">${item.text}</span>
                </span>
                <span class="link-arrow">
                  <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </span>
              </span>
              <div class="multi-level collapse" role="list" id="${submenuId}" aria-expanded="false">
                <ul class="flex-column nav">`;
          item.items.forEach(subItem => {
            htmlContent += `
                  <li class="nav-item">
                    <a class="nav-link" href="${subItem.link}">
                      <span class="sidebar-text">${subItem.text}</span>
                    </a>
                  </li>`;
          });
          htmlContent += `
                </ul>
              </div>
            </div>`;
          break;
      }
    });
  
    sidebarContent.innerHTML = htmlContent;
  }
  
  
  
  // Call the function to create the sidebar
  createSidebar(menuItems);
  