import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditBookModal from './EditBookModal';

function BookTable() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/subjects/science_fiction.json?limit=${booksPerPage}&offset=${(currentPage - 1) * booksPerPage}`);
        setBooks(response.data.works);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, booksPerPage]);

  const handleSort = column => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEdit = book => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const handleSave = editedBook => {
    const updatedBooks = books.map(book => (book.key === editedBook.key ? editedBook : book));
    setBooks(updatedBooks);
  };

  const sortedBooks = sortBy
    ? [...books].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : books;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Book Records</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '5px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer', padding: '10px', textAlign: 'left', borderTop: '2px solid #fff', borderBottom: '2px solid #fff', borderRight: '2px solid #fff', paddingLeft: '20px' }}>Title {sortBy === 'title' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
            <th onClick={() => handleSort('author_name')} style={{ cursor: 'pointer', padding: '10px', textAlign: 'left', borderTop: '2px solid #fff', borderBottom: '2px solid #fff', borderRight: '2px solid #fff', paddingLeft: '20px' }}>Author {sortBy === 'author_name' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
            <th onClick={() => handleSort('first_publish_year')} style={{ cursor: 'pointer', padding: '10px', textAlign: 'left', borderTop: '2px solid #fff', borderBottom: '2px solid #fff', borderRight: '2px solid #fff', paddingLeft: '20px' }}>First Publish Year {sortBy === 'first_publish_year' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
            <th onClick={() => handleSort('subject')} style={{ cursor: 'pointer', padding: '10px', textAlign: 'left', borderTop: '2px solid #fff', borderBottom: '2px solid #fff', paddingLeft: '20px' }}>Subject {sortBy === 'subject' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <React.Fragment key={book.key}>
              <tr style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'inherit', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', borderRight: '1px solid #ddd', paddingLeft: '20px' }}>{book.title}</td>
                <td style={{ padding: '10px', borderRight: '1px solid #ddd', paddingLeft: '20px' }}>{book.author_name}</td>
                <td style={{ padding: '10px', borderRight: '1px solid #ddd', paddingLeft: '20px' }}>{book.first_publish_year}</td>
                <td style={{ padding: '10px', paddingLeft: '20px' }}>{book.subject}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}><button onClick={() => handleEdit(book)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer' }}>Edit</button></td>
              </tr>
              <tr style={{ display: editModalOpen && selectedBook === book ? 'table-row' : 'none' }}>
                <td colSpan="5">
                  <EditBookModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} book={selectedBook} onSave={handleSave} />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setBooksPerPage(10)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 15px', marginRight: '10px', cursor: 'pointer' }}>10 per page</button>
        <button onClick={() => setBooksPerPage(50)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 15px', marginRight: '10px', cursor: 'pointer' }}>50 per page</button>
        <button onClick={() => setBooksPerPage(100)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer' }}>100 per page</button>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <span style={{ marginRight: '10px' }}>Page {currentPage} of {Math.ceil(sortedBooks.length / booksPerPage)}</span>
        {Array.from({ length: Math.ceil(sortedBooks.length / booksPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 15px', margin: '0 5px', cursor: 'pointer' }}>{index + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default BookTable;
