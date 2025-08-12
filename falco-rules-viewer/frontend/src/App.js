import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rules from './components/Rules';
import Macros from './components/Macros';
import Lists from './components/Lists';
import Modal from './components/Modal';
import DetailsPane from './components/DetailsPane';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('rules');
  const [modalContent, setModalContent] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('/data.json')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleMacroClick = (macroName) => {
    const macro = data.macros.find(m => m.macro === macroName);
    setModalContent({
      title: `Macro: ${macroName}`,
      content: <pre>{macro.condition}</pre>
    });
  };

  const handleListClick = (listName) => {
    const list = data.lists.find(l => l.list === listName);
    setModalContent({
      title: `List: ${listName}`,
      content: <ul>{list.items.map(item => <li key={item}>{item}</li>)}</ul>
    });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Falco Rules Viewer</h1>
        <nav>
          <button onClick={() => setActiveTab('rules')}>Rules</button>
          <button onClick={() => setActiveTab('macros')}>Macros</button>
          <button onClick={() => setActiveTab('lists')}>Lists</button>
        </nav>
      </header>
      <div className="main-container">
        <main>
          {activeTab === 'rules' && <Rules rules={data.rules} macros={data.macros} lists={data.lists} onMacroClick={handleMacroClick} onListClick={handleListClick} onRuleClick={setSelectedItem} />}
          {activeTab === 'macros' && <Macros macros={data.macros} lists={data.lists} dependencies={data.dependencies} onListClick={handleListClick} onMacroClick={setSelectedItem} />}
          {activeTab === 'lists' && <Lists lists={data.lists} dependencies={data.dependencies} onListClick={setSelectedItem} />}
        </main>
        <DetailsPane selectedItem={selectedItem} type={activeTab} macros={data.macros} lists={data.lists} dependencies={data.dependencies} onMacroClick={handleMacroClick} onListClick={handleListClick} />
      </div>
      <Modal show={!!modalContent} onClose={() => setModalContent(null)} title={modalContent?.title}>
        {modalContent?.content}
      </Modal>
    </div>
  );
}

export default App;
