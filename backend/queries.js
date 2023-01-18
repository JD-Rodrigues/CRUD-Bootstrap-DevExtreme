import mysql from "mysql2/promise.js";



// host Railway
const connection = async () => {
  const connection = await mysql.createConnection(proccess.env.CONN_SETTINGS); 
  console.log('Conectou ao mysql')
  return connection
}

// Esta função recebe um objeto contendo as colunas e os valores da row a ser criada na tabela "funcionários" do banco de dados

const create = async (info) => {
  let columns; 
  let howMuchValues;
  const infoValues = Object.values(info)
  const infoKeys = Object.keys(info)

  //Aqui é feita uma iteração sobre a lista de keys do objeto recebido como argumento, concatenando cada key a uma string atribuída à variável "columns". O resultado será algo como: "title, board_order, class".

  infoKeys.forEach((key, index)=>{
    switch (index) {
      case 0:
        columns = `${key}, `;
        break;
      case infoKeys.length - 1:
        columns += `${key}`;
        break;
      default:
        columns += `${key}, `;
    }
  })


//Aqui é feita uma iteração sobre a lista de valores do objeto recebido como argumento. A cada loop, um ponto de interrogação (?) será concatenado a uma string atribuída à variável "howMuchValues". O resultado será algo como: "?, ?, ?".

  infoValues.forEach((value, index)=>{
    switch (index) {
      case 0:
        howMuchValues = `?, `;
        break;
      case infoValues.length - 1:
        howMuchValues += `?`;
        break;
      default:
        howMuchValues += `?, `;
    }
  })


  // Aqui os valores das três variáveis (columns, howMuchValues and infoValues) é interpolado em uma string de requisição ao banco de dados. O resultado será semelhante a: "INSERT INTO database.table (title, board_order, class) VALUES (?, ?, ?), ['To do', 3, 'success']".

  try {
    const conn = await connection()
    await conn.query(`INSERT INTO funcionários(${columns}) VALUES(${howMuchValues})`, infoValues, (err, result)=> {
      if(err) throw err;
      console.log(result)
    })
    
  } catch(err) {
    console.log(err);
  }


}


//Retorna todas as linhas da tabela "Funcionários" como um array de objetos, em que cada objeto representará uma linha.

const read = async () => {  
  try {      
    const conn = await connection()
    const data = await conn.query(`SELECT * FROM funcionários`)
    return data[0]        
  } catch(error) {
    if (error) console.log(error);
  }  
}


// Esta função atualiza uma linha da tabela "funcionários".
// Recebe 2 parâmetros: 1º - o id do funcionário; 2º - um objeto contendo as colunas a serem atualizadas e os novos valores.
// Realiza um processo semelhante ao que é implementado na função create() (vide comentário), para requisitar a atualização das informações do funcionário.

const update = async (id, info) => {
  try {
    const keys = Object.keys(info)
    const values = Object.values(info)
    let columns;
    if(keys.length === 1) {
      columns = `${keys[0]} = ?`
    } else {
      keys.forEach((key,index)=> {
        switch (index) {
          case 0:
            columns = `${key} = ?, `;
            break;
          case keys.length - 1:
            columns += `${key} = ?`;
            break;
          default:
            columns += `${key} = ?, `
        }
      })
    }
    
    const conn = await connection()
    await conn.query(`UPDATE funcionários SET ${columns} WHERE id = ${id}`, values, (err, res, meta) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        console.log(meta)
        
      }
    })
  } catch(error) {
    if (error) console.log(error);
  }
  
}


//Recebe o id de um funcionário e remove da base de dados o funcionário cujo id é idêntico ao passado como argumento nesta função.

const remove = async (id) => {
  try {
    const conn = await connection()
    await conn.query(`DELETE FROM funcionários WHERE id = ?`, [id], (err, res, meta) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        console.log(meta)
        
      }
    })
  } catch(error) {
    if (error) console.log(error);
  }

  
}

export {read, remove, create, update}
