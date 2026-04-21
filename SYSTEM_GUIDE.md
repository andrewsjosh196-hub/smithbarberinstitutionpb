# SBI School - Complete System Guide

## 🎓 System Overview

A comprehensive barber school management system with student tracking, instructor portals, staff management, and alumni system.

---

## 🔐 Login Credentials

### Three Independent Login Systems:

#### **Owner Portal** (`owner.html`)
- **Username:** `owner`
- **Password:** `classicmen2025` (can be changed in settings)
- **Features:**
  - Student management (auto-generate IDs by course type)
  - Daily schedule creation & announcements
  - Staff management (upload photos, manage profiles)
  - Alumni graduation workflow
  - Catalog/merch management
  - Application reviews & conversion to students
  - Location settings (100 ft radius for clock-in)
  - Milestone tests setup

#### **Teacher Portal** (`teacher.html`)
- **Email:** `teacher@sbi.com`
- **Password:** `teachersbi2025`
- **Features:**
  - Post theory/practice questions (by course type)
  - View clocked-in students in real-time
  - NO access to student personal data (emails, passwords, phone numbers)
  - School announcements/updates feed
  - Grade student assignments

#### **Student Portal** (`index.html` → `student.html`)
- **Credentials:** Set by owner during student creation
- **Access:** Email/StudentID + Password
- **Features:**
  - Clock in/out (with location verification if enabled)
  - Track hours toward 1500-hour requirement
  - View daily schedule & announcements
  - Complete teacher assignments
  - Milestone tracking with practice tests
  - View time logs & progress

---

## 📌 Course Types & Student ID Format

Three distinct course tracks:

| Course Type | Student ID Format | Example |
|---|---|---|
| Barber / Stylist | stu531xxx | stu531001, stu531002... |
| Teacher / Manager / Instructor | stu532xxx | stu532001, stu532002... |
| Crossover (Cosmetology→Barber) | stu533xxx | stu533001, stu533002... |

---

## 🚀 Quick Start: Adding Your First Student

1. **Go to:** `owner.html`
2. **Login** with credentials above
3. **Click tab:** "Students"
4. **Fill in form:**
   - Full Name
   - Course Type (required for correct ID generation)
   - Email
   - Password
5. **Click:** "Add Student"
6. **System generates:** Student ID automatically (e.g., stu531001)
7. **Share credentials** with student to access `index.html`

---

## 📋 Application Workflow

### For New Applicants:
1. Click **"Apply Now"** button on homepage (`index.html`)
2. Complete application form with:
   - Personal info
   - Felon status (background check emphasis)
   - Document verification (License, SSN, 9th grade proof)
   - Available times for in-person appointment
3. Submits to Owner dashboard

### Owner Reviews:
1. **Go to:** Owner Portal → "Applications" tab
2. **Click:** "View" to see full details
3. **Click:** "Accept" to convert to student
4. **System:** Creates student with auto-generated temporary password
5. **Action:** Share credentials with applicant

---

## ⏰ Clock In/Out System

### When Location Verification is ENABLED:
- Students **must be at the shop (100 ft radius)**
- GPS coordinates set in Owner Settings
- System calculates Haversine distance
- Prevents remote clock-in

### When Location Verification is DISABLED:
- Students can clock in from anywhere
- Owner can manually adjust hours in student records

### Clock Log:
- Automatically calculates hours between in/out
- Records date, time, duration
- Displays in "Recent Hours" on student dashboard

---

## 🎯 Milestone & Test System

### Four Milestones:
1. **0-300 hours** → Fundamentals Test
2. **300-600 hours** → Intermediate Skills Test
3. **600-900 hours** → Advanced Techniques Test
4. **900-1500 hours** → Final Certification Exam

### How It Works:
1. Owner **sets up milestones** in Settings tab
2. As student hits hour threshold → **Test button appears**
3. Student **takes test** (questions created by teacher)
4. Teacher **grades** and provides feedback
5. Once passed → **Milestone marked complete** ✓

---

## 📝 Assignment & Question System

### Teacher Creates Question:
1. Go to `teacher.html`
2. **Course Type:** Select which students see it (Barber/Stylist, Teacher/Manager, Crossover, or All)
3. **Type:** Theory, Practice Test, or Announcement
4. **Content:** Enter question/assignment
5. **Post**

### Students See Question:
1. Automatically filtered by their course type
2. Can submit answer via text area
3. Answer shows as "Pending Review"

### Teacher Grades:
1. Back in teacher portal or owner portal
2. Grade with score + feedback
3. Student gets notification of grade

---

## 👥 Staff Management

### Owner Can:
1. Add staff members (name, role, photo)
2. Photos appear on public Alumni page
3. Edit/delete staff any time

### Public Display:
- Shows on `alumni.html` in "Our Team" section
- Displays photo + name + role

---

## 🏆 Alumni & Graduation

### When Student Graduates:
1. **Owner:** Goes to "Alumni" tab
2. **Finds:** Student in "Active Students" list
3. **Clicks:** "Graduate" button
4. **System:**
   - Creates alumni record
   - Moves time logs to alumni section (owner-only view)
   - Sends time log copy to student email (console logs in demo)
   - Updates public alumni page

### Public Alumni Page:
- Shows graduates with photo + current status
- Does NOT show time logs publicly
- Time logs only visible to owner

---

## 🛍️ Catalog / Shop System

### Owner Adds Items:
1. Go to Settings → "Manage Catalog"
2. Enter: Name, Description, Color, Photo URL
3. **No purchasing** via website - view only

### Students/Visitors See:
- Item catalog on `catalog.html`
- "Call or Text Mr. Smith for orders"
- Contact info prominently displayed

---

## 📅 Daily Schedule & Announcements

### Owner Creates Schedule:
1. **Schedule tab** → Select date
2. **Add Class:** Time, Course Type, Notes
3. **Post to:** All students or specific course type

### Students See:
- Today's schedule on dashboard
- Color-coded by course type
- Includes class notes/announcements

### Announcements:
- Owner posts in Schedule tab
- Auto-displays on all dashboards
- Examples: "School closed tomorrow", "Emergency drill at 2pm"

---

## 🔧 Admin Settings

### Location Verification:
- **Enable/Disable** checkbox
- Set **school latitude & longitude**
- Set **maximum distance** (currently 100 ft = 0.019 miles)

### Password Management:
- Owner can change their own password
- Auto-generates temp passwords for new students

### Milestones:
- "Setup Default Milestones" creates 4 standard tests
- Customizable for future versions

---

## 📊 Data Persistence

**All data stored in browser `localStorage`:**
- ✅ Survives page refreshes
- ❌ Lost if browser data cleared
- ⚠️ Not synced across devices/browsers

**For Production (GoDaddy):**
- Will need backend database (Node.js + MongoDB recommended)
- Currently: Demo mode using localStorage

---

## 📱 Mobile Considerations

- **Fully responsive** - mobile-first design
- **Touch-friendly buttons** on all pages
- **Location services** work on mobile
- **Biometric fingerprint** - left for future (needs hardware integration)

---

## 🚀 Key Page URLs

| Page | Path | Purpose |
|---|---|---|
| Main Landing | `/index.html` | Home, Student Login |
| Student Dashboard | `/student.html` | Clock in, Assignments, Progress |
| Teacher Portal | `/teacher.html` | Post Questions, View Students |
| Owner Portal | `/owner.html` | Manage Everything |
| Apply | `/apply.html` | Student Applications |
| Alumni | `/alumni.html` | Graduates & Staff |
| Catalog | `/catalog.html` | Merchandise Showcase |

---

## 🎨 Branding

**Colors:**
- Primary Gold: `#c9a84c`
- Dark Purple: `#6b21a8`
- Dark Background: `#0a0806`
- Accent Green: `#6fcf97`

**Logo:** `school_logo.png` (SBI with ornate frame)

---

## 🐛 Troubleshooting

### Student Can't Login:
- Check email/ID and password are correct
- Verify owner created the account
- Clear browser cache & try again

### Teacher Assignments Not Showing:
- Teacher must post assignment AFTER student logs in
- Check course type filter matches
- Refresh page (refresh every 30 sec auto)

### Clock In Fails Due to Location:
- Enable location services on browser
- Move closer to school (within 100 ft)
- Owner can manually adjust hours if needed

### Data Disappeared:
- Browser localStorage was cleared
- All data gone (that's why backend DB needed for production)
- Re-create test data

---

## 📞 Support Contacts

**For Merch Orders:** Call or text Mr. Smith (contact info on /catalog.html)

---

**System Built:** April 2026 | **Version:** 1.0 Beta | **Status:** Fully Functional Demo
