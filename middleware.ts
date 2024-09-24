import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth');
    if (req.nextUrl.pathname.startsWith('/modules')) {
        if (!token) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/modules/:path*'],
};
