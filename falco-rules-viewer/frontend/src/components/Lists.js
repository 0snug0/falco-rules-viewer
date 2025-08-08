import React, { useState, useMemo } from 'react';

const Lists = ({ lists, dependencies, onListClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'count', direction: 'descending' });

  const sortedLists = useMemo(() => {
    let sortableItems = [...lists].map(list => ({
      ...list,
      count: dependencies.lists[list.list]?.length || 0
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
  }, [lists, dependencies, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredLists = sortedLists.filter(list =>
    list.list.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Lists</h2>
      <input
        type="text"
        placeholder="Search lists..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('list')}>List</th>
            <th onClick={() => requestSort('count')}>Referenced By</th>
          </tr>
        </thead>
        <tbody>
          {filteredLists.map((list) => (
            <tr key={list.list} onClick={() => onListClick(list)}>
              <td>{list.list}</td>
              <td>{list.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lists;
