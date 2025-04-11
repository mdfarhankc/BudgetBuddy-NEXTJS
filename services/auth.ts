import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const getUserFromDb = async (email: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) return null;

        const isPassMatch = await comparePassword(password, user.hashedPassword)
        if (!isPassMatch) return null
        return user;
    } catch (error) {
        console.error("Error in getUserFromDb: ", error)
        return null;
    }
}

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function comparePassword(passowrd: string, hash: string) {
    return bcrypt.compare(passowrd, hash)
}