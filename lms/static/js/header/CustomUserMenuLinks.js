import { getAuthenticatedAPIClient } from '@edx/frontend-auth';
import { getLearnerPortalLinks } from '@edx/frontend-enterprise';
import { NewRelicLoggingService } from '@edx/frontend-logging';

function CustomUserMenuLinks() {
  const apiClient = getAuthenticatedAPIClient({
    appBaseUrl: 'http://localhost:18000',
    authBaseUrl: 'http://localhost:18000',
    loginUrl: 'http://localhost:18000/login',
    logoutUrl: 'http://localhost:18000/logout',
    csrfTokenApiPath: '/csrf/api/v1/token',
    refreshAccessTokenEndpoint: 'http://localhost:18000/login_refresh',
    accessTokenCookieName: 'edx-jwt-cookie-header-payload',
    userInfoCookieName: 'edx-user-info',
    loggingService: NewRelicLoggingService,
  });
  getLearnerPortalLinks(apiClient).then((learnerPortalLinks) => {
    const $dashboardLink = $('#user-menu .dashboard');
    const classNames = 'mobile-nav-item dropdown-item dropdown-nav-item';
    for (let i = 0; i < learnerPortalLinks.length; i += 1) {
      const link = learnerPortalLinks[i];

      $dashboardLink.after(
        `<div class="${classNames}"><a href="${link.url}" role="menuitem">${link.title}</a></div>`
      );
    }
  });
}

export { CustomUserMenuLinks }; // eslint-disable-line import/prefer-default-export
