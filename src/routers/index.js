import { Router } from "express";
import { routerXLSX } from './router-xlsx.js'
import { routerExcelJS } from "./router-exceljs.js";

export const routers = Router()

routers.use("/xlsx", routerXLSX)
routers.use("/exceljs", routerExcelJS)