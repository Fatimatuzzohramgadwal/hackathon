# Feature Quick Reference Guide

## 🎯 How to Use New Features

### 1. **Advanced Job Filtering**
Step-by-step guide:
1. Navigate to Internships page
2. Click "Filters" button (Settings icon)
3. Slide-out modal with advanced options appears
4. Select your preferences (Location, Domain, Work Type, etc.)
5. Click "Apply Filters"
6. Results auto-sort by Smart Match score
7. View match percentage on each card

### 2. **Smart Match Scores**
- **Color Coding:**
  - 🟢 80%+: Perfect Match
  - 🟡 60-79%: Good Match
  - 🔵 <60%: Fair Match
- Shows matched skills from user profile
- Helps prioritize applications

### 3. **Countdown Timers**
- Real-time display on Tech Events
- Automatically updates every second
- Shows: Days, Hours, Minutes, Seconds
- Turns red when ≤10 seconds remain
- Shows "Closed" message when expired

### 4. **Location Maps**
- Appears on Tech Events page for physical locations
- Hidden for Online/Remote events
- Click inside map to open in Google Maps
- Shows event location address

### 5. **Courses Page**
- 8 courses from top platforms (Coursera, Udemy, etc.)
- Filter by domain using pill buttons
- Search by course name or platform
- Click "Start Learning" to launch course
- Shows star ratings and student counts

### 6. **Mock Interview**
- Practice for 5 different roles
- Click a role to start interview
- 30 seconds per question (auto-advances)
- Can skip questions or submit early
- Review all answers at the end
- Try another role when done

### 7. **Mock Test**
- 3 categories: Aptitude, Coding, Core Subjects
- 5 MCQ questions per category
- Select answer by clicking radio button
- Navigate with Previous/Next buttons
- Automatic scoring on completion
- Detailed answer review shown
- Color-coded results

### 8. **Enhanced Internships**
- All jobs have match percentages
- Smart filters button accessible
- Sort by matching skills
- Internship-specific domains (AI, Web, etc.)
- Apply buttons functional

## 🔧 Environment Setup

### API Key Configuration
1. Create `.env.local` in project root (already done)
2. Contains: `VITE_GOOGLE_MAPS_API_KEY=<your_api_key>`
3. Never upload `.env.local` to Git
4. Maps will fail gracefully if key missing

### Add Custom API Key (Optional)
1. Get your API key from Google Cloud Console
2. Replace existing key in `.env.local`
3. Save file (dev server auto-reloads)

## 📱 Responsive Design

All features work on:
- ✅ Desktop (1920×1080+)
- ✅ Tablet (768×1024)
- ✅ Mobile (375×667)
- ✅ Mobile landscape (667×375)

## 🎨 Styling Consistency

All new features maintain:
- Same color palette
- Same card design (rounded borders, shadows)
- Same typography
- Same spacing (Tailwind defaults)
- Same animation patterns (Framer Motion)
- Consistent hover states

## 🔌 Data Integration Points

Ready to connect to backend:

### Internship Filtering:
```typescript
// POST /api/internships/search
{
  filters: JobFilters,
  page: number,
  limit: number
}
```

### Smart Matching:
```typescript
// POST /api/match/calculate
{
  jobId: string,
  userId: string,
  userSkills: string[]
}
```

### Mock Test Results:
```typescript
// POST /api/tests/submit
{
  testId: string,
  userId: string,
  answers: number[],
  timeSpent: number
}
```

### Mock Interview:
```typescript
// POST /api/interviews/save
{
  role: string,
  userId: string,
  answers: string[],
  duration: number
}
```

## 🚀 Deployment Checklist

- ✅ API key in environment variables
- ✅ No hardcoded sensitive data
- ✅ Build passes without errors
- ✅ All routes working
- ✅ Responsive on all devices
- ✅ Hot reload functional
- ✅ Console clean (no errors/warnings)

## 📱 Navigation Path

Quick access to all new features:

```
Dashboard Home (/student)
├── Internships (/student/internships) ⭐ Advanced Filters + Smart Match
├── Courses (/student/courses) 📚 Course Library
├── Mock Interview (/student/interview) 🎤 Practice Q&A
├── Mock Test (/student/test) 📝 MCQ Tests
├── Tech Events (/student/events) 🚀 Maps + Countdown
├── Alumni (/student/alumni)
├── Analytics (/student/analytics)
├── Applications (/student/applications)
└── Interviews (/student/interviews)
```

## 💡 Tips & Tricks

1. **Best Match First**: Internships page auto-sorts by match score
2. **Quick Filters**: Use dropdown filters for common searches
3. **Bookmark Jobs**: Click star icon to save for later
4. **Practice Daily**: Try mock interview/test once daily
5. **View Analytics**: Check your improvement over time
6. **Course Completion**: Track courses in profile
7. **Event Reminders**: Countdown timers notify before deadline

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Maps not showing | API key missing or invalid in `.env.local` |
| Filters not working | Refresh page (Ctrl+Shift+R) |
| Countdown wrong time | Check system time setting |
| Smart match at 0% | Update user skills in profile |
| Mock test not saving | Check browser console for errors |

## 🎓 Learning Resources

- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/embedding-map)
- [React Query for Data Fetching](https://tanstack.com/query/latest)
- [Framer Motion Animations](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

**Ready to use!** Start exploring the platform now! 🚀
