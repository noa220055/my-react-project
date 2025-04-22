import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import LoaderAdmin from './LoaderAdmin'; 
import styles from '../style/AdminEquipments.module.css';

const AdminEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // פונקציה שמוודאת שה-URL של התמונה תקין
  const getImageUrl = (imgUri) => {
    if (!imgUri) return null;
    if (imgUri.startsWith('http')) return imgUri;
    if (imgUri.startsWith('/uploads')) {
      return `http://localhost:3000${imgUri}`;
    }
    if (imgUri.startsWith('/photos')) {
      return imgUri;
    }
    return imgUri;
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      setIsLoading(true);
      setError('');
      const startTime = Date.now();
      try {
        const response = await axios.get('http://localhost:3000/api/equipments', {
          headers: {
            'Content-Type': 'application/json',
            user: 'admin'
          }
        });
        setEquipments(response.data);
      } catch (err) {
        setError('There was a problem fetching the equipments.');
      } finally {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(2000 - elapsed, 0);
        setTimeout(() => {
          setIsLoading(false);
        }, delay);
      }
    };

    fetchEquipments();
  }, []);

  const handleAdd = () => {
    navigate('/admin/equipments/new');
  };

  const handleEdit = (id) => {
    navigate(`/admin/equipments/${id}`); // כאן תוקן הבעיה עם הסוגריים והפסיקים
  };

  // כפתור שמוביל לדף ניהול בקשות ההשאלה
  const goToBorrowsPanel = () => {
    navigate('/admin/borrows');
  };

  return (
    <div className={styles['admin-equipments-container']}>
      {isLoading ? (
        <LoaderAdmin />
      ) : (
        <>
          <h2>Manage Books</h2>
          <div className={styles['admin-buttons']}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAdd} 
              className={styles['admin-equipments-addButton']}
            >
              Add New Book
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={goToBorrowsPanel}
              className={styles['admin-equipments-borrowsButton']}
            >
              Manage Borrow Requests
            </Button>
          </div>
          {error && <p className={styles['admin-equipments-error']}>{error}</p>}
          <div className={styles['admin-equipments-grid']}>
            {equipments.map(equipment => (
              <div
                key={equipment.id}
                className={styles['admin-equipments-card']}
                onClick={() => handleEdit(equipment.id)}
              >
                {equipment.imgUri && (
                  <img
                    src={getImageUrl(equipment.imgUri)}
                    alt={equipment.name}
                    className={styles['admin-equipments-image']}
                  />
                )}
                <div className={styles['admin-equipments-details']}>
                  <h3>{equipment.name}</h3>
                  {equipment.author && (
                    <p>
                      <strong>Author:</strong> {equipment.author}
                    </p>
                  )}
                  <p>
                    <strong>Category:</strong> {equipment.category}
                  </p>
                  <p>
                    <strong>Status:</strong> {equipment.status}
                  </p>
                  {equipment.description && <p>{equipment.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminEquipments;
