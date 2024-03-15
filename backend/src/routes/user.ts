import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from "@snowrlax/medium-common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

// User routes
userRouter.post('/signup', async (c) => {
    const body = await c.req.json()
    const { success } = signupInput.safeParse(body)

    if(!success) {
        c.status(411)
        return c.json({
            message: "inputs are not correct"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                name: body.name,
                password: body.password
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
            jwt: token
        })
    } catch (e) {
        c.status(411)
        return c.json({
            error: "cannot signup or user already exists"
        })
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body)
    if(!success) {
        c.status(411)
        return c.json({
            message: "incorrect inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })
        if (!user) {
            c.status(403)
            return c.json({ error: "user not found" })
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
            jwt: token
        })
    } catch (e) {
        c.status(411)
        return c.json({
            error: "cannot signup"
        })
    }
})
