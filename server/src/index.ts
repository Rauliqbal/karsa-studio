import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import authRoutes from './routes/auth-route.js'
import authService from './routes/service-route.js'

const app = new Hono()

// Middlewares
app.use(logger())

// Routes
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/auth', authRoutes)
app.route('/api', authService)

serve({
  fetch: app.fetch,
  port: 4000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
