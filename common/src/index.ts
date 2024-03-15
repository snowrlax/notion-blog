import z from 'zod';

// create zod signup variable
export const signupInput = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
}) 
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
}) 
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

// type inference for frontend in zod
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>

export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdatBlogInput = z.infer<typeof updateBlogInput>