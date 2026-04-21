# 🚀 SBI School - Quick Reference Card

## INSTANT ACCESS LINKS

### 🏠 Public Pages
- **Homepage:** `index.html` 
- **Teacher Login:** `teacher.html`
- **Alumni:** `alumni.html`
- **Shop/Catalog:** `catalog.html`

### 🔐 Admin Logins
- **Owner Portal:** `owner.html` → `owner` / `classicmen2025`
- **Teacher Portal:** `teacher.html` → `teacher@sbi.com` / `teachersbi2025`

---

## ⚡ QUICKSTART (5 Minutes)

### Step 1: Create First Student
1. Open `owner.html`
2. Login: `owner` / `classicmen2025`
3. Click **Students** tab
4. Fill form (Name, Course Type, Email, Password)
5. Click **Add Student**
6. Get auto-generated ID (e.g., `stu531001`)

### Step 2: Test Student Login
1. Open `index.html`
2. Scroll to **Student Login** section
3. Use email/ID + password from Step 1
4. Click **Clock In** on dashboard

### Step 3: Add Teacher Content
1. Open `teacher.html`
2. Login: `teacher@sbi.com` / `teachersbi2025`
3. Click **My Assignments** tab
4. Select course type
5. Post a question
6. Student will see it immediately

### Step 4: Create Daily Schedule
1. Back to `owner.html`
2. Click **Schedule** tab
3. Pick today's date
4. Add class time + notes
5. Student dashboard updates instantly

---

## 📊 TEST DATA SETUP

### Create Test Scenario (3 students, 1 hour each)

Run this in browser console while logged in as owner:

```javascript
// Quick student creation
var testStudents = [
  {name: 'John Smith', course: '531', email: 'john@test.com', pass: 'test123'},
  {name: 'Sarah Johnson', course: '532', email: 'sarah@test.com', pass: 'test123'},
  {name: 'Mike Davis', course: '533', email: 'mike@test.com', pass: 'test123'}
];

testStudents.forEach(function(s, i) {
  var students = JSON.parse(localStorage.getItem('students') || '[]');
  var id = 'stu' + s.course + '00' + (i+1);
  students.push({
    id: 'stu_' + Date.now() + i,
    name: s.name,
    studentId: id,
    email: s.email,
    password: s.pass,
    courseType: s.course,
    totalHours: Math.random() * 800,
    daysAttended: Math.floor(Math.random() * 40),
    clockedIn: false,
    clockLog: [],
    answers: []
  });
  localStorage.setItem('students', JSON.stringify(students));
});

alert('3 test students created!');
```

---

## 🎯 FEATURE CHECKLIST

### ✅ COMPLETE Features
- [x] 3-role authentication (Student, Teacher, Owner)
- [x] Student ID auto-generation (stu531/532/533)
- [x] Clock in/out with GPS location verification (100 ft)
- [x] Hour tracking (1500 total required)
- [x] 4-milestone test system
- [x] Teacher assignment posting & grading
- [x] Daily schedule management
- [x] Student applications with background check
- [x] Alumni & graduation workflow
- [x] Staff profiles
- [x] Merchandise catalog (view-only)
- [x] School announcements/news feed
- [x] Mobile responsive design

### ⏳ Future Enhancements
- [ ] Backend database (replace localStorage)
- [ ] Biometric fingerprint integration
- [ ] Email notifications (currently console.log)
- [ ] SMS text notifications
- [ ] Payment processing for catalog
- [ ] Video course integration
- [ ] Certificate generation

---

## 🔄 DATA FLOW DIAGRAM

```
┌─────────────┐
│   OWNER     │ (owner.html)
│  - Create   │
│    Students │
│  - Schedule │
│  - Grad     │
└──────┬──────┘
       │ Auto-generates Student IDs
       │
       ├──→ ┌──────────────┐
       │    │  STUDENTS    │ (index.html → student.html)
       │    │  - Clock In  │
       │    │  - View Asgn │
       │    │  - Take Test │
       │    └──────┬───────┘
       │           │
       ├──────────→├──→ ┌────────────┐
       │           │    │  TEACHERS  │ (teacher.html)
       │           │    │  - Post Q  │
       │           │    │  - Grade   │
       │           │    │  - View    │
       │           │    │    Students│
       │           │    └────────────┘
       │           │
       └──→ ┌──────┴──────┐
           │  PUBLIC      │
           │  - alumni    │
           │  - catalog   │
           │  - apply     │
           └─────────────┘
```

---

## 🎨 COLOR SCHEME (Bootstrap in CSS)

```css
--purple: #6b21a8        /* Buttons, accents *)
--gold: #c9a84c          /* Primary highlight *)
--green: #6fcf97         /* Success, clock in *)
--red: #e87b7b           /* Errors, clock out *)  
--black: #0a0806         /* Background *)
--card: #110f0c          (* Card backgrounds *)
--white: #faf8f5         (* Text *) 
```

---

## 📝 LOG IN CREDENTIALS CHEAT SHEET

| Role | Username/Email | Password | Access |
|---|---|---|---|
| **Owner** | `owner` | `classicmen2025` | `owner.html` |
| **Teacher** | `teacher@sbi.com` | `teachersbi2025` | `teacher.html` |
| **Student** | *Your Email* | *Your Password* | `student.html` after login |

**Note:** Student passwords are set by owner during account creation.

---

## 🚨 Emergency Fixes

### Lost All Data?
localStorage was cleared. Run this to restore:
```javascript
localStorage.setItem('ownerPassword', 'classicmen2025');
localStorage.setItem('teacherPassword', 'teachersbi2025');
```

### Forgot Owner Password?
Clear browser data, site data will reset to defaults above.

### Student Can't Clock In?
- Check location services enabled
- Disable location requirement in Owner Settings
- Or set school coordinates to `40.7128, -74.0060` (NYC example)

---

## 📞 File Structure

```
school/
├── index.html              (Landing + Student Login)
├── student.html            (Dashboard)
├── teacher.html            (Instructor Portal)
├── owner.html              (Admin Dashboard)
├── apply.html              (Apply Form)
├── alumni.html             (Graduates + Staff)
├── catalog.html            (Shop)
├── school_logo.png         (Branding)
└── SYSTEM_GUIDE.md         (Full docs)
```

---

## 💾 Data Storage

**localStorage Keys:**
- `students` - All student records
- `teacherAssignments` - Questions from teachers
- `daily Schedule_YYYY-MM-DD` - Per-day schedules
- `schoolNewsFeed` - Announcements
- `schoolStaff` - Staff profiles
- `alumni` - Graduated students
- `shopCatalog` - Merchandise
- `studentApplications` - Pending applicants
- `schoolLat`, `schoolLng` - Location coords
- `currentStudentId` - Active session
- `currentOwnerId`, `currentTeacherId` - Sessions

---

## 🎓 Done! Everything Works

**Your SBI School system is ready to go!**

- ✅ All 3 portals functional
- ✅ Student tracking live
- ✅ Teacher assignments working
- ✅ Graduation workflow complete
- ✅ Responsive mobile design
- ✅ Location verification ready

**Go to `index.html` to start!**
