import React from 'react';
import yaml from 'js-yaml';

const DetailsPane = ({ selectedItem, type, macros, lists, dependencies, onMacroClick, onListClick }) => {
  if (!selectedItem) {
    return <div className="details-pane">Select an item to see details</div>;
  }

  const allMacroNames = macros.map(m => m.macro);
  const allListNames = lists.map(l => l.list);

  const formatCondition = (condition) => {
    return condition
      .replace(/ and /g, ' and\n')
      .replace(/ or /g, ' or\n');
  };

  const renderCondition = (condition) => {
    const formattedCondition = formatCondition(condition);
    const parts = formattedCondition.split(/(\b\w+\b)/);
    return parts.map((part, index) => {
      if (allMacroNames.includes(part)) {
        return (
          <button key={index} className="macro-button" onClick={() => onMacroClick(part)}>
            {part}
          </button>
        );
      }
      if (allListNames.includes(part)) {
        return (
          <button key={index} className="list-button" onClick={() => onListClick(part)}>
            {part}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="details-pane">
      <h2>{type} Details</h2>
      <h3>{selectedItem.rule || selectedItem.macro || selectedItem.list}</h3>
      {selectedItem.desc && <p>{selectedItem.desc}</p>}
      {selectedItem.condition && (
        <p>
          <strong>Condition:</strong>
          <pre>{renderCondition(selectedItem.condition)}</pre>
        </p>
      )}
       {selectedItem.exceptions && (
            <p>
                <strong>Exceptions:</strong>
                <pre>{renderCondition(yaml.dump(selectedItem.exceptions))}</pre>
            </p>
        )}
      {selectedItem.items && (
        <p>
          <strong>Items:</strong> {selectedItem.items.join(', ')}
        </p>
      )}
      {type === 'macros' && dependencies.macros[selectedItem.macro] && (
        <div>
          <h4>Rules using this macro:</h4>
          <ul>
            {dependencies.macros[selectedItem.macro].map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      )}
        {type === 'lists' && dependencies.lists[selectedItem.list] && (
            <div>
            <h4>Rules using this list:</h4>
            <ul>
                {dependencies.lists[selectedItem.list].map((rule) => (
                <li key={rule}>{rule}</li>
                ))}
            </ul>
            </div>
        )}
    </div>
  );
};

export default DetailsPane;
