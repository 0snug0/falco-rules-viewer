import React, { useState, useMemo } from 'react';

const priorityOrder = {
  "critical": 1,
  "warning": 2,
  "notice": 3,
  "info": 4,
  "debug": 5,
};

const Rules = ({ rules, onRuleClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'rule', direction: 'ascending' });

  const sortedRules = useMemo(() => {
    let sortableItems = [...rules];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'priority') {
            const a_priority = priorityOrder[a[sortConfig.key].toLowerCase()] || 99
            const b_priority = priorityOrder[b[sortConfig.key].toLowerCase()] || 99
            if (a_priority < b_priority) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a_priority > b_priority) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
              return 0;
        }

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
  }, [rules, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredRules = sortedRules.filter(rule => {
    const lowercasedTerm = searchTerm.toLowerCase();
    if (rule.rule.toLowerCase().includes(lowercasedTerm)) {
      return true;
    }
    const condition = rule.condition.toLowerCase();
    if (condition.includes(lowercasedTerm)) {
        return true;
    }
    if (rule.exceptions) {
        const exceptions = JSON.stringify(rule.exceptions).toLowerCase();
        if (exceptions.includes(lowercasedTerm)) {
            return true;
        }
    }
    return false;
  });

  return (
    <div>
      <h2>Rules</h2>
      <input
        type="text"
        placeholder="Search rules..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('rule')}>Rule</th>
            <th onClick={() => requestSort('priority')}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {filteredRules.map((rule) => (
            <tr key={rule.rule} onClick={() => onRuleClick(rule)}>
              <td>{rule.rule}</td>
              <td>
                <span className={`priority priority-${rule.priority.toLowerCase()}`}>
                  {rule.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rules;
