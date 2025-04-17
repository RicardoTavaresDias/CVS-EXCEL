import { Router } from 'express'
import { CvsController } from '../controller/cvs-controller.js'

export const routerCvs = Router()
const cvsController = new CvsController()

routerCvs.post('/', cvsController.createCVS)
routerCvs.get('/', cvsController.indexCVS)
routerCvs.patch('/', cvsController.update)
routerCvs.delete('/:id', cvsController.delete)
routerCvs.post('/insert', cvsController.insert)