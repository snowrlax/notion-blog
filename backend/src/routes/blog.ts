import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@snowrlax/medium-common";

export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

bookRouter.use("/*", async (c, next) => {
    // get the header
    // verify the header
    // if wrong header we return 403 status code 

    const header = c.req.header('Authorization');
    if (!header) {
        c.status(401)
        return c.json({ error: "Unauthorized!!" })
    }

    // Bearer token
    const token = header.split(" ")[1]

    const response = await verify(token, c.env.JWT_SECRET)

    if (!response.id) {
        c.status(403)
        return c.json({ error: "unauthorized!" })
    }
    c.set('userId', response.id)
    await next()
})

// create a blog/post 
bookRouter.post('/', async (c) => {
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)
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
        const newpost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get('userId')
            }
        })
        if (!newpost) {
            c.status(500)
            return c.json({
                error: "server could not create a post!"
            })
        }
        return c.json({ id: newpost.id, message: "post created!" })
    } catch (e) {
        c.status(411)
        c.json({
            error: "post creation failed"
        })
    }
})

// update post 
bookRouter.put('/', async (c) => {
    const body = await c.req.json()
    const {success} = updateBlogInput.safeParse(body)
    if(!success) {
        c.status(411)
        return c.json({
            message: "incorrect inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId = c.get('userId')
    
    try {
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        c.status(200)
        return c.json({
            message: 'updated post!',
            id: post.id
        })
    } catch (e) {
        c.status(411)
        c.json({
            error: "cannot update post"
        })
    }
})

bookRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({})
        c.status(200)
        return c.json(posts)
    } catch (e) {
        c.status(401)
        return c.json({
            error: "can't get posts"
        })
    }
})

bookRouter.get('/:id', async (c) => {
    const postId = c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const response = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!response) {
            c.status(400)
            return c.json({ error: "post not found!" })
        }

        return c.json({ response })
    } catch (e) {
        c.status(400)
        return c.json({ error: "error finding post!" })
    }
})
