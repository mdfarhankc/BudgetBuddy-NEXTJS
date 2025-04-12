import { object, string, z } from "zod";

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required"),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = object({
    name: string({ required_error: "Name is required" })
        .min(1, "Name is required"),
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: string({ required_error: "Confirm Password is required" })
        .min(1, "Confirm Password is required")
        .min(8, "Confirm Password must be more than 8 characters")
        .max(32, "Confirm Password must be less than 32 characters"),
}).refine(
    (data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"]
}
);
export type SignUpValues = z.infer<typeof signUpSchema>;