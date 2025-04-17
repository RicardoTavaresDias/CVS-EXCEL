import XLSX from 'xlsx'

export class CvsController {
  createCVS(request, response){
    try {
      const data = request.body 
      const sheet = XLSX.utils.json_to_sheet(data)
      const book = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(book, sheet, 'request')
      XLSX.writeFile(book, 'teste.xlsx')
      response.status(200).json({ message: 'Salvo com sucesso, no arquivo CVS!' })
    }catch(error) {
      response.status(422).json({ message: 'Error ao criar planilha CVS!', error: error })
    }
  }

  indexCVS(request, response){
    try {
      const file = XLSX.readFile("./teste.xlsx")
      const sheetName = file.SheetNames[0]
      const sheet = file.Sheets[sheetName]
      const data = XLSX.utils.sheet_to_json(sheet, {  header: 2 })

      response.status(200).json(data)
    }catch(error) {
      response.status(422).json({ message: 'Error ao abrir a planilha CVS!', error: error })
    }
  }

  update(request, response){
    try {
      const file = XLSX.readFile("./teste.xlsx")
      const sheetName = file.SheetNames[0]
      const sheet = file.Sheets[sheetName]

      const data = XLSX.utils.sheet_to_json(sheet, {  header: 2 })

      const update = data.map(value => {
        if (value.id === request.body.id){
            request.body.idade ? value.idade = Number(request.body.idade) : value.idade
            request.body.name ? value.name = request.body.name : value.name
        }
        return value
      })

      const sheetNew = XLSX.utils.json_to_sheet(update)
      const book = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(book, sheetNew, 'request')
      XLSX.writeFile(book, './teste.xlsx')

      response.status(200).json({ message: 'Arquivo alterado com sucesso, no arquivo CVS!' })
    }catch(error) {
      response.status(422).json({ message: 'Error a atualizar dados na planilha CVS!', error: error })
    }
  }

  delete(request, response){
    try {
      const file = XLSX.readFile("./teste.xlsx")
      const sheetName = file.SheetNames[0]
      const sheet = file.Sheets[sheetName]

      const data = XLSX.utils.sheet_to_json(sheet, {  header: 2 })

      const filterUser = data.filter(value => value.id === Number(request.params.id))
      if(!filterUser.length){
        return response.status(400).json({ message: 'Usuario não cadastrado!' })
      } 

      const remove = data.filter(value => value.id !== Number(request.params.id))
    
      const sheetNew = XLSX.utils.json_to_sheet(remove)
      const book = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(book, sheetNew, 'request')
      XLSX.writeFile(book, './teste.xlsx')

      response.status(200).json({ message: 'Usuario removido com sucesso, no arquivo CVS!' })
    }catch(error) {
      response.status(422).json({ message: 'Error ao remover usuario na planilha CVS!', error: error })
    }
  }

  insert(request, response){
    try {
      const file = XLSX.readFile("./teste.xlsx")
      const sheetName = file.SheetNames[0]
      const sheet = file.Sheets[sheetName]

      const insert = XLSX.utils.sheet_to_json(sheet, {  header: 2 })
      
      const filterUser = insert.filter(value => value.name === request.body.name)
      if(filterUser.length){
        return response.status(400).json({ message: 'Usuario já cadastrado!' })
      }

      insert.push(request.body)

      const sheetNew = XLSX.utils.json_to_sheet(insert)
      const book = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(book, sheetNew, 'request')
      XLSX.writeFile(book, './teste.xlsx')

      response.status(200).json({ message: 'Usuario Cadastrado com sucesso, no arquivo CVS!' })
    }catch(error) {
      response.status(422).json({ message: 'Error ao inserir usuario na planilha CVS!', error: error })
    }
  }
}