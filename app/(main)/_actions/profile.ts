"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createAccountSchema, CreateAccountValues } from "@/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const createAccountAction = async (values: CreateAccountValues) => {
    const parsedBody = createAccountSchema.safeParse(values);
    if (!parsedBody.success) {
        throw new Error("Bad request!");
    }

    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    const { name, icon } = parsedBody.data;
    const newAccount = await prisma.account.create({
        data: {
            name,
            icon,
            user: {
                connect: { id: session.user.id }
            }
        }
    });

    revalidatePath('/dashboard');
    revalidatePath('/profile');
    return newAccount;
}


export const deleteAccountAction = async (accountId: string) => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    await prisma.account.delete({
        where: {
            id: accountId,
            userId: session?.user.id
        }
    })

    revalidatePath('/dashboard');
    revalidatePath('/profile');
}

// --------- CATEGORY -------------------- 

export const deleteCategoryAction = async (categoryId: string) => {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    await prisma.category.delete({
        where: {
            id: categoryId,
            userId: session?.user.id
        }
    })

    revalidatePath('/dashboard');
    revalidatePath('/profile');
}