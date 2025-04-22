import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Borrow from './Borrow.jsx'; // נניח שהקומפוננטה נמצאת באותה תיקיה
import LoaderUser from './LoaderUser.jsx'; // ייבוא הקומפוננטה Loader
import styles from '../style/Equipments.module.css';

const Equipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null); 
  const [userBorrows, setUserBorrows] = useState([]);
  const userId = useSelector((state) => state.user.userId);
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
  
  // Fetch equipments עם לוודא שהטעינה תמשך לפחות 2 שניות
  useEffect(() => {
    const fetchEquipments = async () => {
      setIsLoading(true);
      setError('');
      const startTime = Date.now();
      try {
        const response = await fetch('http://localhost:3000/api/equipments', {
          headers: {
            'Content-Type': 'application/json',
            user: userId || ''
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch equipments');
        }

        const data = await response.json();
        setEquipments(data);
      } catch (err) {
        setError('There was a problem fetching the data. Please try again later.');
      } finally {
        // נוודא שהטעינה תמשך בדיוק 3 שניות
        const elapsed = Date.now() - startTime;
        const delay = Math.max(2000 - elapsed, 0);
        setTimeout(() => {
          setIsLoading(false);
        }, delay);
      }
    };

    if (userId) {
      fetchEquipments();
    }
  }, [userId]);

  // Fetch user's borrow requests
  useEffect(() => {
    const fetchUserBorrows = async () => {
      try {
        const response = await fetch('http://localhost:3000/borrows/me', {
          headers: {
            'Content-Type': 'application/json',
            user: userId || ''
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserBorrows(data);
        }
      } catch (error) {
        console.error('Error fetching user borrows:', error);
      }
    };

    if (userId) {
      fetchUserBorrows();
    }
  }, [userId, showModal]);

  const handleBorrowClick = (equipmentId) => {
    setSelectedEquipmentId(equipmentId);
    setShowModal(true);
  };

  // פונקציה לבדיקת האם למשתמש כבר קיימת בקשה עבור ציוד מסויים
  // נבדוק אם קיימת בקשה עם סטטוס pending או borrowed
  const hasBorrowRequest = (equipmentId) => {
    return userBorrows.some(
      borrow =>
        borrow.equipmentId === equipmentId &&
        (borrow.status === 'pending' || borrow.status === 'borrowed')
    );
  };

  return (
    <div className={styles['equipments-container']}>
      {isLoading ? (
        <LoaderUser />
      ) : (
        <>
          <h2 className={styles['equipments-title']}>Books</h2>
          {userId && (
            <Button
              variant="contained"
              // color="primary"
              onClick={() => navigate('/borrows/me')}
              className={styles['borrow-button']}
            >
              My Borrow Requests
            </Button>
          )}
          {error && <p className={styles['equipments-error-message']}>{error}</p>}
          
          <div className={styles['equipments-books-grid']}>
            {equipments.map((item) => {
              // הכפתור יהיה זמין אם הציוד במצב available וגם המשתמש לא שלח בקשה עבור ציוד זה
              const disableButton = item.status !== 'available' || hasBorrowRequest(item.id);
              return (
                <div key={item.id} className={styles['equipments-book-item']}>
                  {item.imgUri && 
                  <img  
                  src={getImageUrl(item.imgUri)}
                  alt={item.name} />}
                  <div>
                    <h3>{item.name}</h3>
                    {item.author && <p><strong>Author:</strong> {item.author}</p>}
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Status:</strong> {item.status}</p>
                    {item.description && <p><strong>Description:</strong> {item.description}</p>}
                    {item.status === 'available' && (
                      <button 
                        onClick={() => handleBorrowClick(item.id)}
                        disabled={disableButton}
                        className={disableButton ? styles.disabledButton : ''}
                      >
                        {disableButton ? 'Request Sent' : 'Borrow'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {showModal && (
        <Borrow
          equipmentId={selectedEquipmentId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Equipments;
