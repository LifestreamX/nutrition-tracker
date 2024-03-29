// Importing the NextAuth function from next-auth/next
import { authOptions } from '@/app/lib/authOptions';
import NextAuth from 'next-auth/next';

// Creating the authentication handler using NextAuth with the provided options
const handler = NextAuth(authOptions);

// Exporting the authentication handler for both GET and POST requests
export { handler as GET, handler as POST };
