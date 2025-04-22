import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import styles from '../style/AdminEquipmentForm.module.css';

const AdminEquipmentForm = () => {
  const { id } = useParams(); // אם id = 'new' – מדובר בהוספה, אחרת בעריכה
  const navigate = useNavigate();
  const isEdit = id !== 'new';

  const [equipmentData, setEquipmentData] = useState({
    name: '',
    category: '',
    status: 'available',
    description: '',
    imgUri: '',
    author: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // רפרנס לקלט הקבצים המוסתר
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      const fetchEquipment = async () => {
        try {
          // אם יש לכם endpoint אחר לטיפול בקריאה של ציוד, ניתן לעדכן כאן בהתאם.
          const response = await fetch(`http://localhost:3000/api/equipments/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              user: 'admin'
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch book');
          }
          const data = await response.json();
          setEquipmentData({
            name: data.name || '',
            category: data.category || '',
            status: data.status || 'available',
            description: data.description || '',
            imgUri: data.imgUri || '',
            author: data.author || ''
          });
        } catch (err) {
          setError('Failed to load book data');
        }
      };
      fetchEquipment();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setEquipmentData({ ...equipmentData, [e.target.name]: e.target.value });
  };

  // פונקציה להעלאת קובץ תמונה לשרת
  const uploadImageFile = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const data = await response.json();
      console.log("Uploaded Image URL:", data.imageUrl);
      // הנתיב המוחזר נשמר ישירות
      setEquipmentData({ ...equipmentData, imgUri: data.imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // טיפול בהעלאת תמונה דרך הקלט (בחירה ידנית)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    uploadImageFile(file);
  };

  // טיפול בגרירה ושחרור
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadImageFile(file);
  };

  // לחיצה על אזור הגרירה מפעילה את בחירת הקובץ
  const handleClickDropZone = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // שימו לב – שינוי ה-endpoint כך שיתאים לנתיב ב-backend (הוספת /api/ בכתובת)
      const endpoint = isEdit
        ? `http://localhost:3000/api/admin/equipments/${id}`
        : 'http://localhost:3000/api/admin/equipments';
      const method = isEdit ? 'PUT' : 'POST';
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'user': 'admin'
        },
        body: JSON.stringify(equipmentData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save book');
      }
  
      alert('book saved successfully!');
      navigate('/admin/equipments');
    } catch (err) {
      setError(err.message || 'Error saving book');
    }
  
    setIsSubmitting(false);
  };

  return (
    <div className={styles['admin-equipment-form-container']}>
      <h2>{isEdit ? 'Edit Book' : 'Add New Book'}</h2>
      {error && <p className={styles['admin-equipment-form-error']}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles['admin-equipment-form']}>
        <TextField
          label="Name"
          name="name"
          value={equipmentData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          name="category"
          value={equipmentData.category}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author (optional)"
          name="author"
          value={equipmentData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description (optional)"
          name="description"
          value={equipmentData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        {/* אזור גרירה ושחרור להעלאת תמונה */}
        <div
          className={styles['admin-equipment-form-dropzone']}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClickDropZone}
        >
          Drag and drop an image here, or click to select one.
        </div>
        {/* קלט קבצים מוסתר */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />

        <div className={styles['admin-equipment-form-actions']}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/admin/equipments')}
            disabled={isSubmitting}
            className={styles['admin-equipment-cancel-button']}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            className={styles['admin-equipment-save-button']}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminEquipmentForm;
