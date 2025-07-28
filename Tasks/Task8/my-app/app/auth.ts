import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth, 
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ]
})

//we need these two NextAuth and GoogleProvider to handle authentication
//NextAuth is the main library for authentication
//GoogleProvider is the specific provider for Google authentication
