import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongo/client';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., "Sign in with...")
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { name, password, role } = credentials;
        const client = await clientPromise;
        const db = await client.db();
        const users = db.collection('users');
        const user = await users.findOne({ name });
        console.log(user);
        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            // Return the user object if authentication is successful

            return user;
          }
        }

        // If authentication fails, return null
        return null;
      },
      Profile(
        profile
      ){
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          role: profile.role,
        };
      }
    }),
  ],
  // callbacks: {
  //   async jwt({ token, trigger, session, user }) {
  //     if (trigger === 'update' && session?.name) {
  //       token.name = session.name;
  //     }
  //     token.role = user?.role;
      
  //     return token;
  //   },
  // },
  callbacks: {
    jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: '/signin',
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    
    
  },
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };