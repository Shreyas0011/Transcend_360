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
 * Extracts the base domain from current hostname (e.g. hostel.transcend-360.vercel.app -> transcend-360.vercel.app)
 */
export function getBaseDomain(): string {
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.startsWith('hostel.')) {
    return hostname.substring('hostel.'.length);
  }
  if (hostname.startsWith('transportation.')) {
    return hostname.substring('transportation.'.length);
  }
  if (hostname.startsWith('facilities.')) {
    return hostname.substring('facilities.'.length);
  }
  return hostname;
}

/**
 * Constructs the target origin/URL for a given portal based on current host environment.
 * Supports Vercel deployments (e.g. hostel.transcend-360.vercel.app), custom domains (hostel.tgi360.org), and localhost (hostel.localhost:5173).
 */
export function getPortalUrl(portalId: PortalSubdomain | string): string {
  const { protocol, port } = window.location;
  const portSuffix = port ? `:${port}` : '';
  const baseDomain = getBaseDomain();
  const cleanPortalId = portalId.toLowerCase();

  if (cleanPortalId === 'main' || cleanPortalId === 'landing' || cleanPortalId === 'tgi360') {
    return `${protocol}//${baseDomain}${portSuffix}`;
  }

  return `${protocol}//${cleanPortalId}.${baseDomain}${portSuffix}`;
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
