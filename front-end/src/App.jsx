// 
import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import CustomStore from 'devextreme/data/custom_store';


const store = new CustomStore({
    load: async function (loadOptions) {
        
        try {
            const data = await fetch('https://crud-bootstrap-api.onrender.com');
            
            return data.json()
        } catch (error) {
            console.log(error)
        }
    },
    insert: async function (values) {
        console.log(values)
        await fetch(`https://crud-bootstrap-api.onrender.com`, 
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
        await fetch(`https://crud-bootstrap-api.onrender.com/${key.id}`, 
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
        await fetch(`https://crud-bootstrap-api.onrender.com/${key.id}`, {
            method: "DELETE"
        });   

        
    }
});

import {
  DataGrid,
  Column,
  Toolbar,
  // ...
  RequiredRule,
  Editing,
  SearchPanel
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
      <div>
          <h3 className='text-center mb-4 text-light title'>Quadro de funcionários</h3>
          <DataGrid toolbar={true}
            dataSource={store}
          >
          <SearchPanel 
            visible={true}
          />
              <Toolbar>
            </Toolbar>  
              <Column 
                  
                  dataField="Nome">
                  <RequiredRule />
              </Column>
              <Column 
                  
                  dataField="Função">
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
                  dataField="País"
                  
              >
                    
                  <RequiredRule />
              </Column>
              <Editing 
                  useIcons={true}
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
