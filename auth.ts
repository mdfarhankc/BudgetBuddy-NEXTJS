import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { hashPassword } from "@/lib/utils";
import { ZodError } from "zod";
import { signInSchema } from "./validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    let user = null;
                    const { email, password } = await signInSchema.parseAsync(credentials);
                    const passwordHash = await hashPassword(password);
                    
                    if (!user) {
                        throw new Error("Invalid credentials.")
                    }
                    return user;
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null;
                    }
                }
            }
        })
    ],
})