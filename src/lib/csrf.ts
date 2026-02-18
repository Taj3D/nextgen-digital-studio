import { NextRequest, NextResponse } from 'next/server';

// Generate CSRF Token
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Validate CSRF Token
export function validateCSRFToken(token: string | null, storedToken: string | null): boolean {
  if (!token || !storedToken) return false;
  return token === storedToken;
}

// Middleware to add CSRF token to response
export function addCSRFToken(request: NextRequest, response: NextResponse): NextResponse {
  const token = generateCSRFToken();
  
  // Set as cookie (httpOnly for security)
  response.cookies.set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  // Also set as a readable cookie for client-side access
  response.cookies.set('csrf_token_client', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return response;
}

// Get CSRF token from request
export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get('csrf_token')?.value || null;
}

// Get CSRF token from header
export function getCSRFTokenFromHeader(request: NextRequest): string | null {
  return request.headers.get('x-csrf-token') || null;
}
