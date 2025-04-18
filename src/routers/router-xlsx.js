import { Router } from 'express'
import { XlsxController } from '../controller/xlsx-controller.js'

export const routerXLSX = Router()
const xlsxController = new XlsxController()

routerXLSX.post('/', xlsxController.createCVS)
routerXLSX.get('/', xlsxController.indexCVS)
routerXLSX.patch('/', xlsxController.update)
routerXLSX.delete('/:id', xlsxController.delete)
routerXLSX.post('/insert', xlsxController.insert)