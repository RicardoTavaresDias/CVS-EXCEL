import ExcelJS from 'exceljs'
import XLSX from 'xlsx'

export class ExceljsController {
  async insert(request, response){
    try {
      // Acessando o arquivo e acessando a aba Ativos.
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.readFile("./teste.xlsx")
      const sheet = workbook.getWorksheet("Ativos")

      // Levantando todas os dados cadastrados na planilha com biblioteca XLSX.
      const xlsxFile = XLSX.readFile("./teste.xlsx")
      const xlsxSheetName = xlsxFile.SheetNames[0]
      const xlsxSheet = xlsxFile.Sheets[xlsxSheetName]
      const data = XLSX.utils.sheet_to_json(xlsxSheet, { header: 2 })

      // Linha.
      let rowIndex = data.length + 1

      // Loop para inserir os dados na planilha.
      for(const item of request.body){
        const row = sheet.getRow(rowIndex)

        // Coluna
        row.getCell(1).value = item.EQUIPAMENTO,
        row.getCell(2).value = item.MODELO,
        row.getCell(3).value = item.SETOR,
        row.getCell(4).value = item.SERIE

        rowIndex++
      }

      // Salva arquivo.
      await workbook.xlsx.writeFile("teste.xlsx")
      response.status(200).json({ message: "Dados inseridos com sucesso!"})

    }catch(error){
      response.status(422).json({ message: 'Error ao inserir usuario na planilha CVS!', error: error.message })
    }
  }

}