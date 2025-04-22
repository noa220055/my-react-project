import React from 'react';
import { Button } from '@mui/material';
import styles from '../style/AdminBorrows.module.css';

const AdminBorrowRequestItem = ({ borrow, onAction, onExtend, onDelete, listType }) => {
  // סינון לפי סוג הרשימה:
  if (listType === 'all' && borrow.isOverdue) {
    return null;
  }
  if (listType === 'overdue' && !borrow.isOverdue) {
    return null;
  }

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

  // פונקציות רינדור כפתורים (כפי שהוגדרו קודם)
  const renderActionButtonsAll = () => {
    if (borrow.status === 'pending') {
      return (
        <div className={styles.actions}>
          <Button onClick={() => onAction(borrow.id, 'approve')} className={styles.button}>
            APPROVE
          </Button>
          <Button onClick={() => onAction(borrow.id, 'reject')} className={styles.button}>
            REJECT
          </Button>
        </div>
      );
    } else if (borrow.status === 'approved' || borrow.status === 'borrowed') {
      return (
        <div className={styles.actions}>
          <Button onClick={() => onAction(borrow.id, 'mark-returned')} className={styles.button}>
            MARK AS RETURNED
          </Button>
          <Button onClick={() => onExtend(borrow)} className={styles.button}>
            EXTEND
          </Button>
          <Button onClick={() => onDelete(borrow.id)} className={styles.button}>
            DELETE MESSAGE
          </Button>
        </div>
      );
    } else if (
      borrow.status === 'rejected' ||
      borrow.status === 'returned' ||
      borrow.status === 'extended'
    ) {
      return (
        <div className={styles.actions}>
          <Button onClick={() => onDelete(borrow.id)} className={styles.button}>
            DELETE MESSAGE
          </Button>
        </div>
      );
    }
    return null;
  };

  const renderActionButtonsOverdue = () => (
    <div className={styles.actions}>
      <Button onClick={() => onExtend(borrow)} className={styles.button}>
        EXTEND
      </Button>
      <Button onClick={() => onDelete(borrow.id)} className={styles.button}>
        DELETE MESSAGE
      </Button>
    </div>
  );

  const renderActionButtons = () => {
    if (listType === 'all') {
      return renderActionButtonsAll();
    } else if (listType === 'overdue') {
      return renderActionButtonsOverdue();
    }
    return null;
  };

  return (
    <div className={styles.item}>
      <div className={styles.details}>
        <p className={styles.equipment}>
          Equipment: {borrow.equipment ? borrow.equipment.name : 'No equipment assigned'}
        </p>
        {borrow.equipment && (
          <>
            <p className={styles.dates}>
              Start Date: {borrow.startDate ? new Date(borrow.startDate).toLocaleDateString() : 'No start date'}
            </p>
            <p className={styles.dates}>
              End Date: {borrow.endDate ? new Date(borrow.endDate).toLocaleDateString() : 'No end date'}
            </p>
          </>
        )}
        <p className={styles.user}>
          User: {borrow.user ? borrow.user.username : 'No user assigned'}
        </p>
        <p className={styles.phone}>
          Phone: {borrow.user ? borrow.user.phone : 'No phone available'}
        </p>
        <p className={styles.email}>
          Email: {borrow.user ? borrow.user.email : 'No email available'}
        </p>
      </div>
      
      <div className={styles.imageContainer}>
        {borrow.equipment && borrow.equipment.imgUri ? (
          <img
            src={getImageUrl(borrow.equipment.imgUri)}
            alt={borrow.equipment.name}
            className={styles.equipmentImage}
          />
        ) : (
          <p>No Image</p>
        )}
      </div>
      
      {renderActionButtons()}
    </div>
  );
};

export default AdminBorrowRequestItem;
