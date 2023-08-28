import { handleAuth } from '@auth0/nextjs-auth0';
import { useUser } from "@auth0/nextjs-auth0/client";

export const GET = handleAuth();

