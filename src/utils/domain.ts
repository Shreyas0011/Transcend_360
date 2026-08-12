export type PortalSubdomain = 'main' | 'hostel' | 'transportation' | 'facilities';

/**
 * Returns the current active portal subdomain based on window.location.hostname.
 */
export function getSubdomain(): PortalSubdomain {
  const hostname = window.location.hostname.toLowerCase();
  
  if (hostname.startsWith('hostel.') || hostname === 'hostel') {
    return 'hostel';
  }
  if (hostname.startsWith('transportation.') || hostname === 'transportation') {
    return 'transportation';
  }
  if (hostname.startsWith('facilities.') || hostname === 'facilities') {
    return 'facilities';
  }
  
  return 'main';
}

/**
 * Constructs the target origin/URL for a given portal based on current environment (localhost vs production).
 */
export function getPortalUrl(portalId: PortalSubdomain | string): string {
  const { protocol, hostname, port } = window.location;
  const portSuffix = port ? `:${port}` : '';
  const isLocal = hostname.includes('localhost') || hostname === '127.0.0.1' || hostname === '::1';

  const cleanPortalId = portalId.toLowerCase();

  if (cleanPortalId === 'main' || cleanPortalId === 'landing' || cleanPortalId === 'tgi360') {
    if (isLocal) {
      return `${protocol}//localhost${portSuffix}`;
    }
    return `${protocol}//tgi360.org`;
  }

  if (isLocal) {
    return `${protocol}//${cleanPortalId}.localhost${portSuffix}`;
  }

  return `${protocol}//${cleanPortalId}.tgi360.org`;
}

/**
 * Handles cross-subdomain navigation with SSO token.
 */
export function navigateToPortal(portalId: string, ssoToken?: string) {
  const baseUrl = getPortalUrl(portalId);
  if (ssoToken) {
    const url = new URL(baseUrl);
    url.searchParams.set('sso_token', ssoToken);
    window.location.href = url.toString();
  } else {
    window.location.href = baseUrl;
  }
}
