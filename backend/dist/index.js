"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const upload_1 = __importDefault(require("./upload")); // ייבוא נתיב ההעלאה
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// שרת את קבצי התמונות
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// הוספת הנתיב להעלאת תמונות
app.use("/upload", upload_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Hello node!');
});
let equipments = [
    {
        id: 1,
        status: 'available',
        category: 'Fiction',
        name: 'A Million To One',
        author: 'Tony Faggioli',
        imgUri: '/photos/books/A Million To One.webp',
        description: 'A gripping tale of overcoming insurmountable odds.'
    },
    {
        id: 2,
        status: 'available',
        category: 'Science',
        name: 'Atoms',
        author: 'Olivia Wilson',
        imgUri: '/photos/books/Atoms.webp',
        description: 'An insightful exploration into the smallest building blocks of life.'
    },
    {
        id: 3,
        status: 'available',
        category: 'History',
        name: 'Babel',
        author: 'R.F Kuang',
        imgUri: '/photos/books/Babel.jpg',
        description: 'A story that delves into the complexity of language and culture.'
    },
    {
        id: 4,
        status: 'available',
        category: 'Fiction',
        name: 'Begin Again',
        author: 'Kimberly Ellen Dredger',
        imgUri: '/photos/books/Begin Again.jpg',
        description: 'A narrative about new beginnings and second chances.'
    },
    {
        id: 5,
        status: 'available',
        category: 'Science',
        name: 'Biology',
        author: 'Helena Curtis',
        imgUri: '/photos/books/Biology.jpg',
        description: 'An engaging look into the wonders of life and nature.'
    },
    {
        id: 6,
        status: 'available',
        category: 'psychology',
        name: 'Brand Guidelines',
        author: 'Harper Russo | John Smuel | Clark Anderson',
        imgUri: '/photos/books/Brand Guidelines.webp',
        description: 'A creative journey through the evolution of modern design.'
    },
    {
        id: 7,
        status: 'available',
        category: 'Science',
        name: 'Breath',
        author: 'James Nestor',
        imgUri: '/photos/books/Breath.jpg',
        description: 'A novel that captures the essence of life in every breath.'
    },
    {
        id: 8,
        status: 'available',
        category: 'Fiction',
        name: 'Children Of Dune',
        author: 'Frank Herbert',
        imgUri: '/photos/books/Children Of Dune.jpg',
        description: 'A continuation of an epic saga set in a harsh desert world.'
    },
    {
        id: 9,
        status: 'available',
        category: 'History',
        name: 'Coffee',
        author: 'Nick Trump',
        imgUri: '/photos/books/Coffee.jpg',
        description: 'A warm story blending moments of passion and reflection over a cup of coffee.'
    },
    {
        id: 10,
        status: 'available',
        category: 'Fiction',
        name: 'Competition',
        author: 'James Case',
        imgUri: '/photos/books/Competition.jpg',
        description: 'A thrilling tale of rivalry and the pursuit of excellence.'
    },
    {
        id: 11,
        status: 'available',
        category: 'Fiction',
        name: 'Conviction',
        author: 'Tammy Salyer',
        imgUri: '/photos/books/Conviction.jpg',
        description: 'An inspiring narrative about standing by one’s beliefs against all odds.'
    },
    {
        id: 12,
        status: 'available',
        category: 'Science',
        name: 'Determined',
        author: 'Robert M.Sapolsky',
        imgUri: '/photos/books/Determined.jpg',
        description: 'A story of persistence and determination in the face of challenges.'
    },
    {
        id: 13,
        status: 'available',
        category: 'Fiction',
        name: 'Different Seasons',
        author: 'Stephen King',
        imgUri: '/photos/books/Different Seasons.jpg',
        description: 'An exploration of change and the passage of time through varied seasons.'
    },
    {
        id: 14,
        status: 'available',
        category: 'Science',
        name: 'DNA',
        author: 'Albert Kim',
        imgUri: '/photos/books/DNA.webp',
        description: 'A riveting tale that unravels the mysteries hidden within our genetic code.'
    },
    {
        id: 15,
        status: 'available',
        category: 'History',
        name: 'Egyptian',
        author: 'Dan Kely',
        imgUri: '/photos/books/Egyptian.jpg',
        description: 'A historical journey deep into the secrets of ancient Egypt.'
    },
    {
        id: 16,
        status: 'available',
        category: 'Science',
        name: 'Follow The Science',
        author: 'Sharyl Attkisson',
        imgUri: '/photos/books/Follow The Science.jpg',
        description: 'An intriguing blend of fact and fiction through the lens of scientific discovery.'
    },
    {
        id: 17,
        status: 'available',
        category: 'History',
        name: 'Freedom',
        author: 'Joy Hakim',
        imgUri: '/photos/books/Freedom.jpg',
        description: 'A powerful narrative exploring the human quest for liberation.'
    },
    {
        id: 18,
        status: 'available',
        category: 'Astronomy',
        name: 'Galactic Astronomy',
        author: 'James Binney & Michael Merrifield',
        imgUri: '/photos/books/Galactic Astronomy.jpg',
        description: 'An odyssey through the cosmos uncovering the marvels of the universe.'
    },
    {
        id: 19,
        status: 'available',
        category: 'Fiction',
        name: 'Gone With The Wind',
        author: 'Margaret Mitchell',
        imgUri: '/photos/books/Gone With The Wind.jpg',
        description: 'A classic epic of love and loss set against a turbulent historical backdrop.'
    },
    {
        id: 20,
        status: 'available',
        category: 'Fiction',
        name: 'Haven Fall',
        author: 'Sara Holland',
        imgUri: '/photos/books/Haven Fall.jpg',
        description: 'A dramatic tale of a sanctuary facing an unforeseen downfall.'
    },
    {
        id: 21,
        status: 'available',
        category: 'History',
        name: 'History Book',
        author: 'Olivia Wilson',
        imgUri: '/photos/books/History Book.webp',
        description: 'A reflective journey through the pivotal moments that shaped our past.'
    },
    {
        id: 22,
        status: 'available',
        category: 'Fiction',
        name: 'I Know Why The Caged Bird Sings',
        author: 'Maya Angelou',
        imgUri: '/photos/books/I Know Why The Caged Bird Sings.jpg',
        description: 'A moving story of overcoming adversity and finding one’s voice.'
    },
    {
        id: 23,
        status: 'available',
        category: 'Fiction',
        name: 'In The Woods',
        author: 'Tana French',
        imgUri: '/photos/books/In The Woods.jpg',
        description: 'A suspenseful journey deep into the mysteries hidden within the forest.'
    },
    {
        id: 24,
        status: 'available',
        category: 'Fiction',
        name: 'IT',
        author: 'Stephen King',
        imgUri: '/photos/books/IT.jpg',
        description: 'A chilling narrative that blurs the lines between reality and horror.'
    },
    {
        id: 25,
        status: 'available',
        category: 'Fiction',
        name: 'Little Brother Lost',
        author: 'J.A. Ford',
        imgUri: '/photos/books/Little Brother Lost.jpg',
        description: 'A poignant tale of separation and the enduring bonds of family.'
    },
    {
        id: 26,
        status: 'available',
        category: 'Fiction',
        name: 'Lough Derg',
        author: 'Alice Curtayne',
        imgUri: '/photos/books/Lough Derg.webp',
        description: 'A mystical story inspired by ancient legends and sacred sites.'
    },
    {
        id: 27,
        status: 'available',
        category: 'Fiction',
        name: 'Minoruty Rule',
        author: 'Naomi Klein',
        imgUri: '/photos/books/Minoruty Rule.jpg',
        description: 'An exploration of power dynamics within a divided society.'
    },
    {
        id: 28,
        status: 'available',
        category: 'Science',
        name: 'Molecular Science',
        author: 'John Doe',
        imgUri: '/photos/books/Molecular Science.jpg',
        description: 'A deep dive into the fascinating world of scientific discovery.'
    },
    {
        id: 29,
        status: 'available',
        category: 'Fiction',
        name: 'Origin',
        author: 'Dan Brown',
        imgUri: '/photos/books/Origin.jpg',
        description: 'A captivating narrative questioning the very beginnings of life.'
    },
    {
        id: 30,
        status: 'available',
        category: 'Art & Photography',
        name: 'Photography',
        author: 'Richard Sanchez',
        imgUri: '/photos/books/Photography.webp',
        description: 'A vivid portrayal of moments captured through the lens of a camera.'
    },
    {
        id: 31,
        status: 'available',
        category: 'Art & Photography',
        name: 'Portpholio',
        author: 'Noah Schumacher',
        imgUri: '/photos/books/Portpholio.webp',
        description: 'A creative compilation showcasing diverse artistic expressions.'
    },
    {
        id: 32,
        status: 'available',
        category: 'psychology',
        name: 'Psych',
        author: 'Paul Bloom',
        imgUri: '/photos/books/Psych.jpeg',
        description: 'A psychological thriller that challenges the boundaries of reality.'
    },
    {
        id: 33,
        status: 'available',
        category: 'Fiction',
        name: 'Red Planet',
        author: 'Robert A.Heinlein',
        imgUri: '/photos/books/Red Planet.avif',
        description: 'A daring adventure set on a mysterious and distant world.'
    },
    {
        id: 34,
        status: 'available',
        category: 'Astronomy',
        name: 'Saturn',
        author: 'William Sheehan',
        imgUri: '/photos/books/Saturn.jpg',
        description: 'A cosmic tale inspired by the majestic beauty of our solar system.'
    },
    {
        id: 35,
        status: 'available',
        category: 'Fiction',
        name: 'Shadows In The Deep',
        author: 'Helena V.Paris',
        imgUri: '/photos/books/Shadows In The Deep.jpg',
        description: 'A suspenseful mystery lurking beneath the surface of everyday life.'
    },
    {
        id: 36,
        status: 'available',
        category: 'Astronomy',
        name: 'Space',
        author: 'Marius Sulla',
        imgUri: '/photos/books/Space.jpg',
        description: 'An expansive journey through the final frontier of the universe.'
    },
    {
        id: 37,
        status: 'available',
        category: 'History',
        name: 'Stalins Usable Past',
        author: 'David Brandenberger',
        imgUri: '/photos/books/Stalins Usable Past.jpg',
        description: 'A provocative look into history and its often unsettling legacies.'
    },
    {
        id: 38,
        status: 'available',
        category: 'Fiction',
        name: 'Stars In The Sky At Night',
        author: 'Michelle Morrison',
        imgUri: '/photos/books/Stars In The Sky At Night.png',
        description: 'A poetic exploration of the shimmering wonders above us.'
    },
    {
        id: 39,
        status: 'available',
        category: 'Science',
        name: 'The Connections In Our Brain',
        author: 'Curtis Hewitt',
        imgUri: '/photos/books/The Connections In Our Brain.jpg',
        description: 'A fascinating narrative on the intricate networks of the mind.'
    },
    {
        id: 40,
        status: 'available',
        category: 'Science',
        name: 'The Creative Brain',
        author: 'Brian Eagleman',
        imgUri: '/photos/books/The Creative Brain.jpg',
        description: 'A celebration of innovation and the boundless power of imagination.'
    },
    {
        id: 41,
        status: 'available',
        category: 'Fiction',
        name: 'The Crow Folk',
        author: 'Mark Stay',
        imgUri: '/photos/books/The Crow Folk.jpg',
        description: 'A dark fairy tale about a mysterious, enigmatic community.'
    },
    {
        id: 42,
        status: 'available',
        category: 'Fiction',
        name: 'The Fall',
        author: 'J.R. Rowlings',
        imgUri: '/photos/books/The Fall.jpg',
        description: 'A dramatic story of downfall, loss, and eventual redemption.'
    },
    {
        id: 43,
        status: 'available',
        category: 'History',
        name: 'The History Of Israel',
        author: 'Thomas Graham',
        imgUri: '/photos/books/The History Of Israel.png',
        description: 'A rich tapestry weaving together the ancient and modern history of a nation.'
    },
    {
        id: 44,
        status: 'available',
        category: 'History',
        name: 'The Last Pharaoh',
        author: 'William Hepburn',
        imgUri: '/photos/books/The Last Pharaoh.jpg',
        description: 'An epic tale set during the twilight of an ancient empire.'
    },
    {
        id: 45,
        status: 'available',
        category: 'Astronomy',
        name: 'The Outer Space',
        author: 'Kimberly Hopkins',
        imgUri: '/photos/books/The Outer Space.png',
        description: 'A visionary journey that ventures beyond the confines of our world.'
    },
    {
        id: 46,
        status: 'available',
        category: 'Fiction',
        name: 'The Pelican Brief',
        author: 'John Grisham',
        imgUri: '/photos/books/The Pelican Brief.jpg',
        description: 'A legal thriller unraveling deep political intrigue and conspiracies.'
    },
    {
        id: 47,
        status: 'available',
        category: 'Science',
        name: 'The Promise Of Psychedelics',
        author: 'DR.Peter Silverstone',
        imgUri: '/photos/books/The Promise Of Psychedelics.png',
        description: 'A mind-bending exploration into the transformative power of altered states.'
    },
    {
        id: 48,
        status: 'available',
        category: 'Fiction',
        name: 'The Road',
        author: 'Cormac McCarthy',
        imgUri: '/photos/books/The Road.png',
        description: 'A harrowing tale of survival in a post-apocalyptic landscape.'
    },
    {
        id: 49,
        status: 'available',
        category: 'History',
        name: 'The Secret History',
        author: 'Dona Tartt',
        imgUri: '/photos/books/The Secret History.jpg',
        description: 'A mysterious narrative filled with hidden truths and enigmatic secrets.'
    },
    {
        id: 50,
        status: 'available',
        category: 'Fiction',
        name: 'The Stand',
        author: 'Stephen King',
        imgUri: '/photos/books/The Stand.png',
        description: 'An epic confrontation between the forces of good and evil.'
    },
    {
        id: 51,
        status: 'available',
        category: 'History',
        name: 'The Song of Achilles',
        author: 'Madeline Miller',
        imgUri: '/photos/books/The Song of Achilles.png',
        description: 'A lyrical retelling of myth and heroism in ancient times.'
    },
    {
        id: 52,
        status: 'available',
        category: 'Fiction',
        name: 'Trust',
        author: 'Hernan Diaz',
        imgUri: '/photos/books/Trust.jpg',
        description: 'A suspenseful narrative questioning loyalty and the nature of betrayal.'
    }
];
let users = [
    { id: 1, username: 'admin', password: '1234567', isAdmin: true }
];
let borrows = [];
/**
 * Middleware לבדיקת הרשאת אדמין (isAdmin)
 */
const isAdmin = (req, res, next) => {
    const userHeader = req.header('user');
    if (!userHeader) {
        res.status(403).send({ message: 'Forbidden - missing user header' });
        return;
    }
    if (userHeader === 'admin') {
        const adminUser = users.find(u => u.isAdmin && u.username === 'admin');
        if (!adminUser) {
            res.status(403).send({ message: 'Forbidden - admin not found' });
            return;
        }
        req.user = adminUser;
        next();
        return;
    }
    const userId = parseInt(userHeader, 10);
    if (isNaN(userId)) {
        res.status(403).send({ message: 'Forbidden - invalid user id' });
        return;
    }
    const adminUserById = users.find(u => u.isAdmin && u.id === userId);
    if (!adminUserById) {
        res.status(403).send({ message: 'Forbidden - user is not admin' });
        return;
    }
    req.user = adminUserById;
    next();
};
const isLoggedIn = (req, res, next) => {
    const userHeader = req.header('user');
    console.log("Received user header:", userHeader);
    if (!userHeader) {
        res.status(401).send({ message: 'Unauthorized - missing user header' });
        return;
    }
    if (userHeader === 'admin') {
        const adminUser = users.find(u => u.isAdmin && u.username === 'admin');
        if (!adminUser) {
            res.status(401).send({ message: 'Unauthorized - admin not found' });
            return;
        }
        req.user = adminUser;
        next();
        return;
    }
    const userId = parseInt(userHeader, 10);
    if (isNaN(userId)) {
        res.status(401).send({ message: 'Unauthorized - invalid user id' });
        return;
    }
    const userExists = users.find(u => u.id === userId);
    if (!userExists) {
        res.status(401).send({ message: 'Unauthorized - user not found' });
        return;
    }
    req.user = userExists;
    next();
};
/**
 * מסלול התחברות /auth/login
 */
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(401).send({ message: 'Invalid username or password' });
        return;
    }
    console.log('Users after registration:', users);
    res.status(200).send({ message: 'Login successful', userId: user.id, username: user.username });
});
/**
 * מסלול הרשמה /auth/register
 */
app.post('/auth/register', (req, res) => {
    const { username, password, phone, email } = req.body;
    if (!username || !password || !phone || !email) {
        res.status(400).send({ message: 'All fields are required' });
        return;
    }
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const existingUser = users.find(u => u.username === trimmedUsername);
    if (existingUser) {
        res.status(409).send({ message: 'Username already exists' });
        return;
    }
    const existingEmail = users.find(u => u.email === trimmedEmail);
    if (existingEmail) {
        res.status(409).send({ message: 'Email already exists' });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        res.status(400).send({ message: 'Invalid email format' });
        return;
    }
    const newUser = {
        id: Math.floor(Math.random() * 1000) + 1,
        username: trimmedUsername,
        password,
        phone,
        email: trimmedEmail
    };
    users.push(newUser);
    res.status(201).send({ message: 'User registered successfully', userId: newUser.id });
});
// מסלול לקבלת רשימת ציוד – כל הציוד
app.get('/api/equipments', (req, res) => {
    res.send(equipments);
});
// Endpoint לקבלת ציוד לפי מזהה
app.get('/api/equipments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const equipment = equipments.find(e => e.id === id);
    if (!equipment) {
        res.status(404).send({ message: 'Equipment not found' });
        return;
    }
    res.send(equipment);
});
// שינוי הנתיבים לניהול ציוד ל־/api/admin/...
app.post('/api/admin/equipments', isAdmin, (req, res) => {
    const newEquipment = Object.assign(Object.assign({}, req.body), { id: Math.floor(Math.random() * 1000) + 1, status: 'available' });
    equipments.push(newEquipment);
    res.status(201).send(newEquipment);
});
app.put('/api/admin/equipments/:id', isAdmin, (req, res) => {
    const id = parseInt(req.params.id, 10);
    const equipmentIndex = equipments.findIndex(e => e.id === id);
    if (equipmentIndex === -1) {
        res.status(404).send({ message: 'Equipment not found' });
        return;
    }
    equipments[equipmentIndex] = Object.assign(Object.assign({}, equipments[equipmentIndex]), req.body);
    res.status(200).send(equipments[equipmentIndex]);
});
// מסלול יצירת בקשת השאלה – שינוי סטטוס לבקשה pending ולא לעדכן את הציוד
app.post('/borrow', isLoggedIn, (req, res) => {
    const { equipmentId, startDate, endDate } = req.body;
    const userId = req.user.id;
    const equipment = equipments.find(e => e.id === equipmentId);
    if (!equipment) {
        res.status(404).send({ message: 'Equipment not found' });
        return;
    }
    if (equipment.status === 'borrowed') {
        res.status(400).send({ message: 'Equipment is already borrowed' });
        return;
    }
    const newBorrow = {
        id: Math.floor(Math.random() * 1000) + 1,
        userId,
        equipmentId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'pending'
    };
    borrows.push(newBorrow);
    // לא מעדכנים את סטטוס הציוד עד לאישור מנהל
    res.status(201).send(newBorrow);
});
// נתיב להחזרת ציוד (על ידי המשתמש)
app.put('/borrow/:borrowId/return', isLoggedIn, (req, res) => {
    const borrowId = parseInt(req.params.borrowId, 10);
    const borrow = borrows.find(b => b.id === borrowId);
    if (!borrow) {
        res.status(404).send({ message: 'Borrow record not found' });
        return;
    }
    if (borrow.userId !== req.user.id) {
        res.status(403).send({ message: 'You are not allowed to return this equipment' });
        return;
    }
    borrow.status = 'returned';
    const equipment = equipments.find(e => e.id === borrow.equipmentId);
    if (equipment) {
        equipment.status = 'available';
    }
    res.status(200).send({ message: 'Equipment returned successfully' });
});
// נתיב לקבלת בקשות ההשאלה של המשתמש
app.get('/borrows/me', isLoggedIn, (req, res) => {
    const userBorrows = borrows
        .filter(b => b.userId === req.user.id)
        .map(b => (Object.assign(Object.assign({}, b), { startDate: b.startDate instanceof Date ? b.startDate.toISOString().split('T')[0] : b.startDate, endDate: b.endDate instanceof Date ? b.endDate.toISOString().split('T')[0] : b.endDate })));
    res.status(200).send(userBorrows);
});
// נתיב למנהל לקבלת בקשות השאלה שממתינות לאישור
app.get('/admin/borrows', isAdmin, (req, res) => {
    // ניתן לשנות לפי צורך – כאן מחזירים את כל הבקשות (בסטטוסים pending או approved)
    res.status(200).send(borrows);
});
// נתיב למנהל לקבלת בקשות שהפכו להיות overdue
app.get('/admin/borrows/overdue', isAdmin, (req, res) => {
    const overdueBorrows = borrows.filter(b => b.endDate < new Date() && b.status === 'borrowed');
    res.status(200).send(overdueBorrows);
});
// נתיב למנהל לעדכון בקשת השאלה – לאישור או דחייה
app.put('/admin/borrows/:id', isAdmin, (req, res) => {
    const borrowId = parseInt(req.params.id, 10);
    const { status, endDate } = req.body; // status צפוי להיות 'borrowed' (אישור) או 'rejected'
    const borrow = borrows.find(b => b.id === borrowId);
    if (!borrow) {
        res.status(404).send({ message: 'Borrow record not found' });
        return;
    }
    // במקרה של אישור, מעדכנים גם את סטטוס הציוד
    if (status === 'borrowed') {
        const equipment = equipments.find(e => e.id === borrow.equipmentId);
        if (equipment) {
            equipment.status = 'borrowed';
        }
    }
    // במקרה של דחייה, ניתן להשאיר את הציוד כזמין
    if (status === 'rejected') {
        const equipment = equipments.find(e => e.id === borrow.equipmentId);
        if (equipment) {
            equipment.status = 'available';
        }
    }
    borrow.status = status;
    if (endDate) {
        borrow.endDate = new Date(endDate);
    }
    res.status(200).send(borrow);
});
app.get('/categories', (req, res) => {
    const categories = [...new Set(equipments.map(e => e.category))];
    res.send(categories);
});
app.get('/admin/users', isAdmin, (req, res) => {
    res.send(users);
});
app.delete('/admin/borrows/:id', isAdmin, (req, res) => {
    const borrowId = parseInt(req.params.id, 10);
    const index = borrows.findIndex(b => b.id === borrowId);
    if (index === -1) {
        res.status(404).send({ message: 'Borrow record not found' });
        return;
    }
    borrows.splice(index, 1);
    res.status(200).send({ message: 'Request deleted successfully' });
});
