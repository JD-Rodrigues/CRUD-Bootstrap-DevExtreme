
import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import CustomStore from 'devextreme/data/custom_store';


const store = new CustomStore({
    load: async function (loadOptions) {
        const data = await fetch('http://localhost:3001');
        return data.json()
    },
    insert: function (values) {
        return axios.post('/data', values);
    },
    update: function (key, values) {
        return axios.put(`/data/${key}`, values);
    },
    remove: function (key) {
        return axios.delete(`/data/${key}`);
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
