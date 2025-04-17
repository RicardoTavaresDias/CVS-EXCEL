import XLSX from 'xlsx'

export class CvsController {
  createCVS(request, response){
    try {
      const data = request.body 

      // Cria uma planilha a partir dos dados
      const sheet = XLSX.utils.json_to_sheet(data)

      // Cria uma nova pasta de trabalho (book)
      const book = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(book, sheet, 'request')

      // Salva o arquivo
      XLSX.writeFile(book, 'teste.xlsx')
      response.status(200).json({ message: 'Salvo com sucesso, no arquivo CVS!' })

    }catch(error) {
      response.status(422).json({ message: 'Error ao criar planilha CVS!', error: error })
    }
  }

  indexCVS(request, response){
    try {
      // Caminho do arquivo Excel e Lê o nome das planilhas
      const file = XLSX.readFile("./teste.xlsx")
      const sheetName = file.SheetNames[0]

      // Pega a primeira planilha
      const sheet = file.Sheets[sheetName]

      // Converte a planilha para JSON
      const data = XLSX.utils.sheet_to_json(sheet, {  header: 2 })
      response.status(200).json(data)

    }catch(error) {
      response.status(422).json({ message: 'Error ao abrir a planilha CVS!', error: error })
    }
  }

  update(request, response){
    try {
      // Caminho do arquivo Excel e Lê o nome das planilhas
      const file = XLSX.readFile("./teste.xlsx")
      const sheetName = file.SheetNames[0]

      // Pega a primeira planilha
      const sheet = file.Sheets[sheetName]

      // Converte a planilha para JSON
      const data = XLSX.utils.sheet_to_json(sheet, {  header: 2 })
    
      // Verifica se o usuario existe na planilha
      const filterUser = data.filter(value => value.SERIE === request.body.SERIE)
      if(!filterUser.length){
        return response.status(400).json({ message: 'Usuario não cadastrado!' })
      } 
      
      // Atualizando dado
      const update = data.map(value => {
        if (value.SERIE === request.body.SERIE){
            request.body.EQUIPAMENTO ? value.EQUIPAMENTO = request.body.EQUIPAMENTO : value.EQUIPAMENTO
            request.body.MODELO ? value.MODELO = request.body.MODELO : value.MODELO
            request.body.SETOR ? value.SETOR = request.body.SETOR : value.SETOR
            request.body.SERIE ? value.SERIE = request.body.SERIE : value.SERIE
        }
        return value
      })

      // Cria uma planilha a partir dos dados
      const sheetNew = XLSX.utils.json_to_sheet(update)

      // Cria uma nova pasta de trabalho (book), criando nova planilha com dados novos
      const book = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(book, sheetNew, 'request')

      // Salva o arquivo
      XLSX.writeFile(book, './teste.xlsx')
      response.status(200).json({ message: 'Arquivo alterado com sucesso, no arquivo CVS!' })

    }catch(error) {
      response.status(422).json({ message: 'Error a atualizar dados na planilha CVS!', error: error })
    }
  }

  delete(request, response){
    try {
      // Caminho do arquivo Excel e Lê o nome das planilhas
      const file = XLSX.readFile("./teste.xlsx")
      const sheetName = file.SheetNames[0]

      // Pega a primeira planilha
      const sheet = file.Sheets[sheetName]

      // Converte a planilha para JSON
      const data = XLSX.utils.sheet_to_json(sheet, {  header: 2 })

      // Verifica se o usuario existe na planilha
      const filterUser = data.filter(value => value.SERIE === request.params.id)
      if(!filterUser.length){
        return response.status(400).json({ message: 'Usuario não cadastrado!' })
      } 

      // remove o usuario
      const remove = data.filter(value => value.SERIE !== request.params.id)
    
      // Cria uma planilha a partir dos dados
      const sheetNew = XLSX.utils.json_to_sheet(remove)

      // Cria uma nova pasta de trabalho (book), criando nova planilha com dados novos
      const book = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(book, sheetNew, 'request')

      // Salva o arquivo
      XLSX.writeFile(book, './teste.xlsx')
      response.status(200).json({ message: 'Usuario removido com sucesso, no arquivo CVS!' })

    }catch(error) {
      response.status(422).json({ message: 'Error ao remover usuario na planilha CVS!', error: error })
    }
  }

  insert(request, response){
    try {
      // Caminho do arquivo Excel e Lê o nome das planilhas
      const file = XLSX.readFile("./teste.xlsx")
      const sheetName = file.SheetNames[0]

      // Pega a primeira planilha
      const sheet = file.Sheets[sheetName]

      // Converte a planilha para JSON
      const insert = XLSX.utils.sheet_to_json(sheet, {  header: 2 })

      // Verifica se o usuario já existe na planilha
      for(const insertSerie of request.body){
        const filterUser = insert.filter(value => value.SERIE === insertSerie.SERIE)
        if(filterUser.length){
          return response.status(400).json({ message: 'Usuario já cadastrado!' })
        }
      }
      
      // Add novo usuario na planilha
      request.body.forEach(element => {
        insert.push(element)
      });
      
      // Cria uma planilha a partir dos dados
      const sheetNew = XLSX.utils.json_to_sheet(insert)

      // Cria uma nova pasta de trabalho (book), criando nova planilha com dados novos
      const book = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(book, sheetNew, 'request')

      // Salva o arquivo
      XLSX.writeFile(book, './teste.xlsx')
      response.status(200).json({ message: 'Usuario Cadastrado com sucesso, no arquivo CVS!' })

    }catch(error) {
      response.status(422).json({ message: 'Error ao inserir usuario na planilha CVS!', error: error })
    }
  }
}