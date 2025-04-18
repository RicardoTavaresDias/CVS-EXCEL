import { Router } from "express";
import { ExceljsController } from "../controller/exceljs-controller.js";

export const routerExcelJS = Router()
const exceljsController = new ExceljsController()

routerExcelJS.post("/insert", exceljsController.insert)