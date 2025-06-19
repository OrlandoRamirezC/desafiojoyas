import express from 'express'
import 'dotenv/config'
import joyasRoutes from './routes/joyas.routes.js'
import { joyaLog } from './middleware/joyas.middleware.js'

const app = express()

const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json());
app.use(joyaLog)

// Server
app.use(joyasRoutes)
app.listen(PORT, console.log(`🔥 Server on 🔥 http://localhost:${PORT}`))



