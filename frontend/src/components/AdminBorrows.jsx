import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../style/AdminBorrows.module.css';
import AdminBorrowRequestItem from './AdminBorrowRequestItem';
import ExtendBorrowDialog from './AdminExtendBorrowDialog';

const AdminBorrows = () => {
  const [borrows, setBorrows] = useState([]);
  const [overdueBorrows, setOverdueBorrows] = useState([]);
  const [error, setError] = useState('');
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);

  useEffect(() => {
    document.body.className = styles["AdminBorrowstPage"];
    return () => {
      document.body.className = "";
    };
  }, []);

  // טעינת מפה של משתמשים
  const fetchUsersMap = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/users', {
        headers: { user: 'admin' },
      });
      const usersMap = {};
      response.data.forEach(user => {
        usersMap[user.id] = user;
      });
      return usersMap;
    } catch (err) {
      setError('Failed to fetch users.');
      return {};
    }
  };

  // טעינת בקשות השאלה שאינן overdue (ל-All)
  const fetchBorrows = async () => {
    try {
      const [borrowsResponse, usersMap] = await Promise.all([
        axios.get('http://localhost:3000/admin/borrows', {
          headers: { user: 'admin' },
        }),
        fetchUsersMap(),
      ]);

      const borrowsWithDetails = await Promise.all(
        borrowsResponse.data.map(async (borrow) => {
          const equipmentResponse = await axios.get(
            `http://localhost:3000/api/equipments/${borrow.equipmentId}`,
            { headers: { user: 'admin' } }
          );
          const isOverdue = new Date(borrow.endDate) < new Date();
          return {
            ...borrow,
            equipment: equipmentResponse.data,
            user: usersMap[borrow.userId] || null,
            isOverdue,
          };
        })
      );
      // מסננים בקשות overdue
      const activeBorrows = borrowsWithDetails.filter(borrow => !borrow.isOverdue);
      setBorrows(activeBorrows);
    } catch (err) {
      setError('Failed to fetch borrows.');
    }
  };

  // טעינת בקשות השאלה שפגו את תאריךן (ל-Overdue)
  const fetchOverdueBorrows = async () => {
    try {
      const [borrowsResponse, usersMap] = await Promise.all([
        axios.get('http://localhost:3000/admin/borrows', {
          headers: { user: 'admin' },
        }),
        fetchUsersMap(),
      ]);

      const overdueBorrows = borrowsResponse.data.filter(borrow => new Date(borrow.endDate) < new Date());
      
      const overdueBorrowsWithDetails = await Promise.all(
        overdueBorrows.map(async (borrow) => {
          const equipmentResponse = await axios.get(
            `http://localhost:3000/api/equipments/${borrow.equipmentId}`,
            { headers: { user: 'admin' } }
          );
          return {
            ...borrow,
            equipment: equipmentResponse.data,
            user: usersMap[borrow.userId] || null,
            isOverdue: true,
          };
        })
      );
      setOverdueBorrows(overdueBorrowsWithDetails);
    } catch (err) {
      setError('Failed to fetch overdue borrows.');
    }
  };

  useEffect(() => {
    fetchBorrows();
    fetchOverdueBorrows();
  }, []);

  // טיפול בפעולות בקשת השאלה:
  const handleBorrowAction = async (borrowId, action, extraPayload = {}) => {
    try {
      let payload = { ...extraPayload };

      if (action === 'approve') {
        payload.status = 'borrowed';
      } else if (action === 'reject') {
        payload.status = 'rejected';
      } else if (action === 'mark-returned') {
        payload.status = 'returned';
        // payload.equipmentStatus = 'available';
      } else if (action === 'extend') {
        // אם הספר מעולם לא אושר (status = pending), לאחר Extend נשאיר אותו כ-pending
        // אחרת, אם כבר אושר (approved או borrowed), נשמור את הסטטוס כ-borrowed
        if (selectedBorrow && selectedBorrow.status === 'pending') {
          payload.status = 'pending';
        } else {
          payload.status = 'borrowed';
        }
        payload.endDate = extraPayload.endDate;
      }

      await axios.put(`http://localhost:3000/admin/borrows/${borrowId}`, payload, {
        headers: { user: 'admin' }
      });

      // אם הפעולה היא mark-returned, יש לעדכן גם את סטטוס הציוד ל-"available"
    if (action === 'mark-returned') {
      // מחפשים את הבקשה מתוך הסטייט כדי לקבל את equipmentId
      const borrow = borrows.find(b => b.id === borrowId);
      if (borrow) {
        await axios.put(
          `http://localhost:3000/api/admin/equipments/${borrow.equipmentId}`,
          { status: 'available' },
          { headers: { user: 'admin' } }
        );
      }
    }

      // רענון הנתונים
      fetchBorrows();
      fetchOverdueBorrows();
      
    } catch (err) {
      setError(`Failed to ${action} borrow request.`);
    }
  };

  const handleExtendClick = (borrow) => {
    setSelectedBorrow(borrow);
    setExtendModalOpen(true);
  };

  const handleDelete = async (borrowId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/borrows/${borrowId}`, {
        headers: { user: 'admin' }
      });
      fetchBorrows();
      fetchOverdueBorrows();
    } catch (err) {
      setError('Failed to delete borrow request.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Borrow Requests</h2>
      {error && <p className={styles.error}>{error}</p>}

      <section>
        <h3 className={styles.sectionTitle}>All Borrow Requests</h3>
        {borrows.length === 0 && <p className={styles.noData}>No borrow requests.</p>}
        <div className={styles.list}>
          {borrows.map((borrow) => (
            <AdminBorrowRequestItem 
              key={borrow.id} 
              borrow={borrow}
              onAction={handleBorrowAction}
              onExtend={handleExtendClick}
              onDelete={handleDelete}
              listType="all"
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className={styles.sectionTitle}>Overdue Borrow Requests</h3>
        {overdueBorrows.length === 0 && <p className={styles.noData}>No overdue borrow requests.</p>}
        <div className={styles.list}>
          {overdueBorrows.map((borrow) => (
            <AdminBorrowRequestItem 
              key={borrow.id} 
              borrow={borrow}
              onAction={handleBorrowAction}
              onExtend={handleExtendClick}
              onDelete={handleDelete}
              listType="overdue"
            />
          ))}
        </div>
      </section>

      <ExtendBorrowDialog 
        open={extendModalOpen}
        borrow={selectedBorrow}
        onClose={() => setExtendModalOpen(false)}
        onExtend={(newEndDate) => {
          handleBorrowAction(selectedBorrow.id, 'extend', { endDate: newEndDate });
          setExtendModalOpen(false);
        }}
      />
    </div>
  );
};

export default AdminBorrows;
