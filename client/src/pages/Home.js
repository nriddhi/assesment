import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  });
  const[msg, setMsg] = useState('');
  const[errmsg, setErrmsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/getData`);
      setData(result.data.map((item) => ({ ...item, selected: false })));
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleModalOpen = (mode, item) => {
    setMsg('');
    setErrmsg('');
    setModalMode(mode);
    if (mode === 'edit') {
      setFormData(item);
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
      });
    }
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setMsg('');
    setErrmsg('');
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      axios.post(`/api/create`, formData)
      .then(function (response) {
        setMsg(response.data.msg);
      })
      .catch(function (error) {
        setErrmsg(error.response.data.msg);
      });
    } else {
      axios.patch(`/api/edit/${formData._id}`, formData)
      .then(function (response) {
        setMsg(response.data.msg);
      })
      .catch(function (error) {
        setErrmsg(error.response.data.msg);
      });
    }
    //setModalIsOpen(false);
  };

  const handleSelect = (id) => {
    setData(prevData => prevData.map(item => ({
      ...item,
      selected: item._id === id ? !item.selected : item.selected,
    })));
  }

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        selected: checked,
      }))
    );
  };

  const handleDeleteSelected = () => {
    const message = `Are you sure to delete?`;
    if(window.confirm(message)) {
    const idsToDelete = data
      .filter(item => item.selected)
      .map(item => item._id);
    axios.delete(`/api/delete`, { data: { ids: idsToDelete } })
      .then(response => {
        // Handle success
        window.location.reload();
      })
      .catch(error => {
        // Handle error
      });
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>

<div className='table'>
      <h1 className='mb-4'>Products Data Management</h1>
      <button className='btn btn-success text-light mx-2' onClick={() => handleModalOpen('add', null)}>Add Product</button>
      <button className='btn btn-danger' onClick={handleDeleteSelected}>Delete Selected</button>
      <table className='m-3'>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={data.every((item) => item.selected)}
                onChange={handleSelectAll}
              />
            </th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
          </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item._id}>
              <td>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => handleSelect(item._id)}
                />
              </td>
              <td><Link onClick={() => handleModalOpen('edit', item)}>{item.name}</Link></td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <button onClick={() => handleModalOpen('edit', item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {data.length > itemsPerPage && (
          <div className='mt-3 mb-2'>
            <button className='btn btn-success pagi'
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
              <button className='btn btn-success pagi'
                key={i}
                disabled={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className='btn btn-success pagi'
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {modalIsOpen && (
        <div className='modal-content'>
          <div onClick={handleModalClose} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} />
          <div className='body'>
            <h2>{modalMode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
            {msg ? <h4 className='msg'>{msg}</h4> : ''}
            {errmsg ? <h4 className='errmsg'>{errmsg}</h4> : ''}
            <form onSubmit={handleSubmit}>            
            <div>
                <input type="hidden" name="_id" value={formData._id} onChange={handleInputChange} />
              </div>
              <div>
                <label>Name:</label>
                <input className='form-control' type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <label>Price:</label>
                {modalMode === 'add' ?
                <input className='form-control' type="number" name="price" value={formData.price} onChange={handleInputChange} />
                :<input className='form-control' type="number" name="price" value={formData.price} onChange={handleInputChange} />
                }
              </div>
              <div>
                <label>Category:</label>
                <input className='form-control' type="text" name="category" value={formData.category} onChange={handleInputChange} />
              </div>
              <button className="mr-2" type="submit">{modalMode === 'add' ? 'Add' : 'Save'}</button>
              <button onClick={handleModalClose}>Cancel</button>
            </form>
           
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
