// types/next-auth.d.ts or next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      data: {
        id: string;
        email: string;
        name: string;
        role: string;
        accessToken: string;
        refreshToken: string;
        profileStatus: string;
        profileComplete: boolean;
        profilePicUrl: string;
      };
      count: number;
      errors: any;
      message: string;
      success: boolean;
    };
  }

  interface User {
    // Define custom fields on User here if needed
  }
}
