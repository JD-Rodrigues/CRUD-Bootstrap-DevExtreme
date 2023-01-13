// 
import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import './App.css'
import CustomStore from 'devextreme/data/custom_store';


const store = new CustomStore({
    load: async function (loadOptions) {
        
        try {
            const data = await fetch('http://localhost:3000');
            
            // if (Array.isArray(data.json())) {
            //     return data.json()
            // } else {
            //     alert('Excesso de requisições ao banco de dados! Volte dentro de alguns instantes.')               
                
            // }
            return data.json()
        } catch (error) {
            
        }
    },
    insert: async function (values) {
        console.log(values)
        await fetch(`http://localhost:3000`, 
            {
                headers: {"Content-type": "application/json; charset=UTF-8"},
                method: "POST",
                body:JSON.stringify({
                    data: {
                        Nome:values.Nome,
                        Data_de_nascimento: values.Data_de_nascimento,
                        Data_de_admissão: values.Data_de_admissão,
                        País: values.País,
                        Função: values.Função                        
                    }
                })
            })
    },
    update: async function (key, values) {
        await fetch(`http://localhost:3000/${key.id}`, 
            {
              headers: {"Content-type": "application/json; charset=UTF-8"},
              method: "PUT",
              body:JSON.stringify({
                data: values
              })
            })
        console.log(key)
    },
    remove: async function (key) {
        await fetch(`http://localhost:3000/${key.id}`, {
            method: "DELETE"
        });   

        
    }
});

import {
  DataGrid,
  Column,
  // ...
  RequiredRule,
  Editing
} from 'devextreme-react/data-grid';

// const data = [{
//         "FullName": "Durvalino dos Santos",
//         "BirthDate": "22/05/1986",
//         "HireDate": "29/02/2022",
//         "Country": "Brasil", 
//         "Position": "Product Owner"
//     },]


function App() {
  return (
      <div className="App">
          <DataGrid
            dataSource={store}
          >
              {/* ... */}
              <Column dataField="Nome">
                  <RequiredRule />
              </Column>
              <Column dataField="Função">
                  <RequiredRule />
              </Column>
              <Column
                  dataField="Data_de_nascimento">
                  <RequiredRule />
              </Column>
              <Column
                  dataField="Data_de_admissão">
                  <RequiredRule />
              </Column>
              {/* ... */}
              <Column
                  dataField="País">
                  <RequiredRule />
              </Column>
              <Editing
                  mode="popup"
                  allowUpdating={true}
                  allowDeleting={true}
                  allowAdding={true}
              />
          </DataGrid>
      </div>
  );
}


export default App
