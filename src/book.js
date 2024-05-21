import React, { useState } from 'react';

const BookTable = ({ books }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const handleSave = (editedBook) => {
    // Save edited book logic
    console.log('Saving edited book:', editedBook);
    // Implement your save logic here
    setEditModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Book Records</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '5px', overflow: 'hidden' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <React.Fragment key={book.id}>
              <tr>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <button onClick={() => handleEdit(book)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer' }}>Edit</button>
                </td>
              </tr>
              <tr style={{ display: editModalOpen && selectedBook === book ? 'table-row' : 'none' }}>
                <td colSpan="3">
                  <div style={{ background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '5px', maxWidth: '500px', width: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#007bff' }}>Edit Book</h2>
                      <form>
                        <div style={{ marginBottom: '20px' }}>
                          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                          <input type="text" id="title" value={selectedBook.title} onChange={e => setSelectedBook({ ...selectedBook, title: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                          <label htmlFor="author" style={{ display: 'block', marginBottom: '5px' }}>Author:</label>
                          <input type="text" id="author" value={selectedBook.author} onChange={e => setSelectedBook({ ...selectedBook, author: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <button type="button" onClick={() => setEditModalOpen(false)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 15px', marginRight: '10px', cursor: 'pointer' }}>Cancel</button>
                          <button type="button" onClick={() => handleSave(selectedBook)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer' }}>Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
