import React, { useState } from 'react';
import './admin.css';

const DashboardPageTemplate = ({ 
  title, 
  description, 
  itemName, 
  columns, 
  data, 
  onAdd, 
  onEdit, 
  onDelete 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="blog-management">
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="btn-add-new" onClick={onAdd}>
          <span className="icon">+</span> Add New {itemName}
        </button>
      </div>

      <div className="blogs-list-container">
        <div className="list-header">
          <h2>All {title}</h2>
          <div className="list-filters">
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                width: '250px'
              }}
            />
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="empty-state">
            <h3>No {title} found</h3>
            <p>Get started by creating your first {itemName.toLowerCase()}.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="items-table">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th key={index}>{col.header}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id || index}>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>
                        {col.render ? col.render(item) : item[col.accessor]}
                      </td>
                    ))}
                    <td>
                      <div className="action-buttons-row" style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="icon-btn btn-edit-sm" 
                          onClick={() => onEdit(item)}
                          title="Edit"
                          style={{ width: '32px', height: '32px', padding: 0 }}
                        >
                          ✏️
                        </button>
                        <button 
                          className="icon-btn btn-delete-sm" 
                          onClick={() => onDelete(item)}
                          title="Delete"
                          style={{ width: '32px', height: '32px', padding: 0, color: 'red' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPageTemplate;
