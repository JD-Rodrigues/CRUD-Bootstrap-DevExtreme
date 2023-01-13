const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  
  return res.json(
    [
      {
        Nome_de_Família: 'Durvalino dos Santos',
        BirthDate: '22/05/1986',
        HireDate: '29/02/2022',
        Country: 'Brasil', 
        Position: 'Product Owner'
      },
      {
        NomeCompleto: 'Durvalino dos Santos',
        BirthDate: '22/05/1986',
        HireDate: '29/02/2022',
        Country: 'Brasil', 
        Position: 'Product Owner'
      }
    ]
  )
})

module.exports = {router}