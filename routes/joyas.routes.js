import { Router } from 'express'
import { getFiltroJoyas, getPageJoyas } from '../src/controllers/joyascontroller.js'

const router = Router()

router.get('/joyas', getPageJoyas)
router.get('/joyas/filtros', getFiltroJoyas)

export default router