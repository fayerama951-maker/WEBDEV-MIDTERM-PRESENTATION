document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PAGE 1: POMODORO TIMER LOGIC (index.html)
  // ==========================================
  const timerDisplay = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');

  if (timerDisplay) {
    let timeLeft = 25 * 60;
    let timerInterval = null;

    function updateDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    startBtn.addEventListener('click', () => {
      if (timerInterval === null) {
        timerInterval = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
          } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up! Take a short break.");
          }
        }, 1000);
      }
    });

    pauseBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      
      timerInterval = null;
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      timerInterval = null;
      timeLeft = 25 * 60;
      updateDisplay();
    });
  }

  // ==========================================
  // 2. PAGE 1: TASK MANAGER LOGIC (index.html)
  // ==========================================
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;

      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <button style="padding: 0.3rem 0.6rem; font-size: 0.85rem;" onclick="this.parentElement.remove()">✓ Done</button>
      `;

      taskList.appendChild(li);
      taskInput.value = '';
    });
  }

  // ==========================================
  // 3. PAGE 2: GPA CALCULATOR LOGIC (gpa.html)
  // ==========================================
  const courseNameInput = document.getElementById('course-name');
  const courseGradeSelect = document.getElementById('course-grade');
  const courseCreditsInput = document.getElementById('course-credits');
  const addCourseBtn = document.getElementById('add-course-btn');
  const courseList = document.getElementById('course-list');
  const gpaValDisplay = document.getElementById('gpa-val');

  if (addCourseBtn) {
    let courses = [];

    function recalculateGPA() {
      let totalPoints = 0;
      let totalCredits = 0;

      courses.forEach(course => {
        totalPoints += course.grade * course.credits;
        totalCredits += course.credits;
      });

      const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
      gpaValDisplay.textContent = gpa;
    }

    addCourseBtn.addEventListener('click', () => {
      const name = courseNameInput.value.trim();
      const grade = parseFloat(courseGradeSelect.value);
      const credits = parseInt(courseCreditsInput.value);

      if (name === '' || isNaN(credits) || credits <= 0) {
        alert('Please enter a valid course name and credit hours.');
        return;
      }

      courses.push({ name, grade, credits });

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${name}</td>
        <td>${courseGradeSelect.options[courseGradeSelect.selectedIndex].text}</td>
        <td>${credits} hrs</td>
      `;
      courseList.appendChild(tr);

      recalculateGPA();
      courseNameInput.value = '';
      courseCreditsInput.value = '';
    });
  }

  // ==========================================
  // 4. PAGE 3: TIMETABLE PLANNER LOGIC (timetable.html)
  // ==========================================
  const timetableDaySelect = document.getElementById('timetable-day');
  const timetableTimeInput = document.getElementById('timetable-time');
  const timetableSubjectInput = document.getElementById('timetable-subject');
  const addTimetableBtn = document.getElementById('add-timetable-btn');
  const timetableList = document.getElementById('timetable-list');

  if (addTimetableBtn) {
    addTimetableBtn.addEventListener('click', () => {
      const day = timetableDaySelect.value;
      const time = timetableTimeInput.value.trim();
      const subject = timetableSubjectInput.value.trim();

      if (time === '' || subject === '') {
        alert('Please enter both a time slot and a subject.');
        return;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${day}</strong></td>
        <td>${time}</td>
        <td>${subject}</td>
      `;
      timetableList.appendChild(tr);

      timetableTimeInput.value = '';
      timetableSubjectInput.value = '';
    });
  }

})