// src/EditBookModal.js

import React, { useState, useEffect } from 'react';

const EditBookModal = ({ isOpen, onClose, book, onSave }) => {
  const [editedBook, setEditedBook] = useState({});

  useEffect(() => {
    if (book) {
      setEditedBook(book);
    }
  }, [book]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(editedBook);
    onClose();
  };

  return (
    <div className={isOpen ? 'modal show' : 'modal'}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={editedBook.title || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Author:</label>
            <input type="text" name="author_name" value={editedBook.author_name || ''} onChange={handleChange} />
          </div>
          <div>
            <label>First Publish Year:</label>
            <input type="text" name="first_publish_year" value={editedBook.first_publish_year || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Subject:</label>
            <input type="text" name="subject" value={editedBook.subject || ''} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
