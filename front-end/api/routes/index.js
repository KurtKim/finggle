import { Router } from 'express'

import Search from './search'

const router = Router()

router.use('/search', Search)

export default router