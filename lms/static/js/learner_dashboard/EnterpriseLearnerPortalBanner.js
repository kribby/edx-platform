import { getAuthenticatedAPIClient } from '@edx/frontend-auth';
import { getLearnerPortalLinks } from '@edx/frontend-enterprise';
import { NewRelicLoggingService } from '@edx/frontend-logging';

function EnterpriseLearnerPortalBanner() {
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
    const $dashboardContent = $('#content');
    const classNames = 'wrapper-msg urgency-low warning recovery-email-alert';
    for (let i = 0; i < learnerPortalLinks.length; i += 1) {
      const link = learnerPortalLinks[i];

      $dashboardContent.prepend(
        `<div>
            <div class="${classNames}" id="banner-msg">
                <i id="close" class="fa fa-close close-icon"></i>
                <div class="msg">
                    <div class="msg-content">
                        <div class="copy"><p>Visit your awesome edX for Business homepage to see all the courses your enterprise has sponsored. Go to your 
                            <a href="${link.url}" role="menuitem">${link.title}</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
      );
    }
  });
}

export { EnterpriseLearnerPortalBanner }; // eslint-disable-line import/prefer-default-export
