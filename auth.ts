import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./validations";
import { getUserFromDb } from "./services/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = await signInSchema.parseAsync(credentials);
                    const user = await getUserFromDb(email, password);
                    if (!user) {
                        throw new Error("Invalid credentials.");
                    }
                    return user;
                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        // authorized: async ({ auth }) => {
        //     console.log("callbacks - authorized - auth: ", auth);
        //     // Logged in users are authenticated, otherwise redirect to login page
        //     return !!auth
        // },
    },
    pages: {
        signIn: "/sign-in",
        signOut: "/",
    },
})