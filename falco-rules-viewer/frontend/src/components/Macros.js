import React, { useState, useMemo } from 'react';

const Macros = ({ macros, dependencies, onMacroClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'count', direction: 'descending' });

  const sortedMacros = useMemo(() => {
    let sortableItems = [...macros].map(macro => ({
      ...macro,
      count: dependencies.macros[macro.macro]?.length || 0
    }));

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [macros, dependencies, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredMacros = sortedMacros.filter(macro =>
    macro.macro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Macros</h2>
      <input
        type="text"
        placeholder="Search macros..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('macro')}>Macro</th>
            <th onClick={() => requestSort('count')}>Referenced By</th>
          </tr>
        </thead>
        <tbody>
          {filteredMacros.map((macro) => (
            <tr key={macro.macro} onClick={() => onMacroClick(macro)}>
              <td>{macro.macro}</td>
              <td>{macro.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Macros;
