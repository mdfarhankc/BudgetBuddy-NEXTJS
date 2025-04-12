// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            profilePic: string;
            currencyId: string;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        profilePic: string;
        
    }
}
