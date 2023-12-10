import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    Auth0Provider({
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
      authorization: { params: { scope: "profile openid email name app_metadata.credential_type" } },
      profile(profile: any, tokens: any) {
        console.log("profile auth0: ", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          credential_type: profile.credential_type,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
