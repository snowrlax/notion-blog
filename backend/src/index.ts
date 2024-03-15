import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { bookRouter } from './routes/blog'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>()

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', bookRouter);


export default app
