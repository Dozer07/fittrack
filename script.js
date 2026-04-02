// ---------- Настройки ----------
const API_BASE = 'http://localhost:3000';
let currentUser = null;
let currentLang = 'ru';
let progressChartInstance = null;
let reportChartInstance = null;
let notificationInterval = null;
let currentCalendarYear = null;
let currentCalendarMonth = null;

let userProfile = {
    name: '',
    height: '',
    weight: '',
    notifications: false,
    reminderTime: { hour: 9, minute: 0 },
    categories: []
};

// ---------- Переводы (полные) ----------
const translations = {
    ru: {
        mainPage: "Главная",
        workoutsPage: "Тренировки",
        profilePage: "Профиль",
        settingsPage: "Настройки",
        reportPage: "Отчёт",
        logout: "Выйти",
        darkTheme: "Тёмная тема",
        lightTheme: "Светлая тема",
        authTitle: "Войдите или зарегистрируйтесь",
        loginTitle: "Вход",
        registerTitle: "Регистрация",
        email: "Email",
        password: "Пароль",
        name: "Имя",
        nameOptional: "Имя (необязательно)",
        loginBtn: "Войти",
        registerBtn: "Зарегистрироваться",
        forgotPassword: "Забыли пароль?",
        noAccount: "Нет аккаунта?",
        haveAccount: "Уже есть аккаунт?",
        registerLink: "Зарегистрироваться",
        loginLink: "Войти",
        emailLabel: "Email:",
        cancelProfile: "Отмена",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Пароль",
        namePlaceholder: "Имя (необязательно)",
        recoverTitle: "Восстановление пароля",
        recoverDesc: "Введите email, указанный при регистрации",
        sendCode: "Отправить код",
        cancel: "Отмена",
        profile: "Профиль",
        deleteAccount: "Удалить аккаунт",
        reminder: "Напоминание о тренировках",
        reminderText: "У вас нет запланированных тренировок на сегодня.",
        reminderSub: "Чтобы добавить напоминание, просто создайте тренировку на будущую дату.",
        progressMonth: "Прогресс за месяц",
        calendar: "Календарь тренировок",
        myWorkouts: "Мои тренировки",
        height: "Рост",
        weight: "Вес",
        cm: "см",
        kg: "кг",
        manageWorkouts: "Управление тренировками",
        addWorkout: "Добавить тренировку",
        presetWorkouts: "Предустановленные",
        addPreset: "Добавить из пресета",
        customWorkout: "Своя тренировка",
        workoutName: "Название",
        workoutDate: "Дата",
        workoutDuration: "Длительность (мин)",
        workoutCalories: "Калории (ккал)",
        workoutCategory: "Категория",
        save: "Сохранить",
        newCategory: "+ Новая категория",
        allWorkouts: "Все тренировки",
        actions: "Действия",
        delete: "Удалить",
        noWorkouts: "Нет тренировок. Добавьте!",
        selectPreset: "Выберите тип тренировки",
        fillFields: "Заполните все поля",
        deleteConfirm: "Удалить тренировку?",
        editProfile: "Редактирование профиля",
        personalData: "Личные данные",
        emailCannotChange: "Email нельзя изменить",
        saveChanges: "Сохранить изменения",
        notificationsSettings: "Push-уведомления",
        enableNotifications: "Включить уведомления",
        allowBrowserNotifications: "Разрешите браузеру показывать уведомления",
        reminderTimeLabel: "Время напоминания",
        dailyReminder: "Ежедневное напоминание о тренировках на сегодня",
        testNotification: "Тестовое уведомление",
        dangerZone: "Опасная зона",
        deleteAccountWarning: "Это действие необратимо. Все ваши данные будут удалены.",
        reportTitle: "Отчёт о тренировках",
        downloadPdf: "Скачать отчёт (PDF)",
        statsSummary: "Общая статистика",
        totalWorkouts: "Всего тренировок",
        totalDuration: "Общая длительность",
        totalCalories: "Сожжено калорий",
        avgDuration: "Средняя длительность",
        workoutsList: "Список тренировок",
        date: "Дата",
        name: "Название",
        category: "Категория",
        duration: "Длительность (мин)",
        calories: "Калории (ккал)",
        startDateLabel: "С:",
        endDateLabel: "По:",
        generateReport: "Сформировать отчёт",
        notificationTitle: "🏋️ Напоминание о тренировках",
        notificationBody: "У вас есть тренировки на сегодня: {workouts}",
        testNotificationMsg: "Это тестовое уведомление! Уведомления работают.",
        notificationEnabled: "Уведомления включены",
        notificationDisabled: "Уведомления выключены",
        permissionDenied: "Вы запретили уведомления. Включите их в настройках браузера.",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        registerSuccess: "Регистрация успешна! Теперь войдите.",
        emailExists: "Email уже существует",
        invalidCredentials: "Неверный email или пароль",
        accountDeleted: "Аккаунт удалён.",
        recoverSent: "Инструкция по восстановлению отправлена на email.",
        userNotFound: "Пользователь с таким email не найден",
        profileSaved: "Профиль сохранён",
        workoutAdded: "Тренировка добавлена",
        workoutDeleted: "Тренировка удалена",
        workoutSingular: "тренировка",
        workoutPlural: "тренировки",
        presetWorkoutsList: ["Силовая", "Кардио", "Интервальная"]
    },
    en: {
        mainPage: "Home",
        workoutsPage: "Workouts",
        profilePage: "Profile",
        settingsPage: "Settings",
        reportPage: "Report",
        logout: "Logout",
        darkTheme: "Dark theme",
        lightTheme: "Light theme",
        authTitle: "Login or Register",
        loginTitle: "Login",
        registerTitle: "Register",
        email: "Email",
        password: "Password",
        name: "Name",
        nameOptional: "Name (optional)",
        loginBtn: "Login",
        registerBtn: "Register",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        registerLink: "Register",
        loginLink: "Login",
        emailLabel: "Email:",
        cancelProfile: "Cancel",
        emailPlaceholder: "Email",
        passwordPlaceholder: "Password",
        namePlaceholder: "Name (optional)",
        recoverTitle: "Password Recovery",
        recoverDesc: "Enter the email you used to register",
        sendCode: "Send code",
        cancel: "Cancel",
        profile: "Profile",
        deleteAccount: "Delete account",
        reminder: "Workout Reminder",
        reminderText: "You have no workouts scheduled for today.",
        reminderSub: "To add a reminder, simply create a workout for a future date.",
        progressMonth: "Monthly Progress",
        calendar: "Workout Calendar",
        myWorkouts: "My Workouts",
        height: "Height",
        weight: "Weight",
        cm: "cm",
        kg: "kg",
        manageWorkouts: "Manage Workouts",
        addWorkout: "Add Workout",
        presetWorkouts: "Preset",
        addPreset: "Add from preset",
        customWorkout: "Custom workout",
        workoutName: "Name",
        workoutDate: "Date",
        workoutDuration: "Duration (min)",
        workoutCalories: "Calories (kcal)",
        workoutCategory: "Category",
        save: "Save",
        newCategory: "+ New category",
        allWorkouts: "All Workouts",
        actions: "Actions",
        delete: "Delete",
        noWorkouts: "No workouts. Add one!",
        selectPreset: "Select workout type",
        fillFields: "Please fill in all fields",
        deleteConfirm: "Delete workout?",
        editProfile: "Edit Profile",
        personalData: "Personal Information",
        emailCannotChange: "Email cannot be changed",
        saveChanges: "Save Changes",
        notificationsSettings: "Push Notifications",
        enableNotifications: "Enable notifications",
        allowBrowserNotifications: "Allow browser to show notifications",
        reminderTimeLabel: "Reminder Time",
        dailyReminder: "Daily reminder about today's workouts",
        testNotification: "Test Notification",
        dangerZone: "Danger Zone",
        deleteAccountWarning: "This action is irreversible. All your data will be deleted.",
        reportTitle: "Workout Report",
        downloadPdf: "Download Report (PDF)",
        statsSummary: "Statistics Summary",
        totalWorkouts: "Total Workouts",
        totalDuration: "Total Duration",
        totalCalories: "Calories Burned",
        avgDuration: "Average Duration",
        workoutsList: "Workouts List",
        date: "Date",
        name: "Name",
        category: "Category",
        duration: "Duration (min)",
        calories: "Calories (kcal)",
        startDateLabel: "From:",
        endDateLabel: "To:",
        generateReport: "Generate Report",
        notificationTitle: "🏋️ Workout Reminder",
        notificationBody: "You have workouts today: {workouts}",
        testNotificationMsg: "This is a test notification! Notifications are working.",
        notificationEnabled: "Notifications enabled",
        notificationDisabled: "Notifications disabled",
        permissionDenied: "You blocked notifications. Please enable them in browser settings.",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        registerSuccess: "Registration successful! Please login.",
        emailExists: "Email already exists",
        invalidCredentials: "Invalid email or password",
        accountDeleted: "Account deleted.",
        recoverSent: "Recovery instructions have been sent to your email.",
        userNotFound: "User with this email not found",
        profileSaved: "Profile saved",
        workoutAdded: "Workout added",
        workoutDeleted: "Workout deleted",
        workoutSingular: "workout",
        workoutPlural: "workouts",
        presetWorkoutsList: ["Strength", "Cardio", "Interval"]
    }
};

// ---------- Вспомогательные функции ----------
function getTodayStr() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m));
}

function validatePositiveNumber(value, fieldName) {
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    if (num < 0) {
        alert(`${fieldName} не может быть отрицательным`);
        return false;
    }
    return true;
}

function setDateInputMin() {
    const dateInput = document.getElementById('customWorkoutDate');
    if (dateInput) dateInput.setAttribute('min', getTodayStr());
}

// ---------- Профиль (localStorage) ----------
function loadUserProfile() {
    const saved = localStorage.getItem('fittrack_profile');
    if (saved) {
        const parsed = JSON.parse(saved);
        userProfile = {
            name: parsed.name || '',
            height: parsed.height || '',
            weight: parsed.weight || '',
            notifications: parsed.notifications === true,
            reminderTime: parsed.reminderTime || { hour: 9, minute: 0 },
            categories: parsed.categories || []
        };
    } else {
        userProfile = {
            name: currentUser?.name || '',
            height: '',
            weight: '',
            notifications: false,
            reminderTime: { hour: 9, minute: 0 },
            categories: []
        };
    }
    updateProfileDisplay();
}

function saveUserProfile() {
    localStorage.setItem('fittrack_profile', JSON.stringify(userProfile));
    updateProfileDisplay();
}

function updateProfileDisplay() {
    const nameSpan = document.getElementById('profileName');
    const heightSpan = document.getElementById('profileHeight');
    const weightSpan = document.getElementById('profileWeight');
    if (nameSpan) nameSpan.innerText = userProfile.name || currentUser?.name || '—';
    if (heightSpan) heightSpan.innerText = userProfile.height || '—';
    if (weightSpan) weightSpan.innerText = userProfile.weight || '—';
}

// ---------- Категории (localStorage) ----------
function loadCategories() {
    if (userProfile.categories) {
        updateCategorySelect();
    } else {
        userProfile.categories = [];
        updateCategorySelect();
    }
}

function addUserCategory(categoryName) {
    if (!userProfile.categories.includes(categoryName)) {
        userProfile.categories.push(categoryName);
        saveUserProfile();
        updateCategorySelect();
        return true;
    }
    return false;
}

function updateCategorySelect() {
    const catSelect = document.getElementById('customWorkoutCategory');
    if (!catSelect) return;
    let categories = ['Силовая', 'Кардио', 'Интервальная'];
    if (userProfile.categories) {
        categories = [...categories, ...userProfile.categories];
    }
    catSelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

function addCategory() {
    let newCat = prompt(translations[currentLang].newCategory);
    if (newCat && newCat.trim()) {
        newCat = newCat.trim();
        if (addUserCategory(newCat)) {
            alert(`Категория "${newCat}" добавлена`);
        } else {
            alert('Такая категория уже существует');
        }
    }
}

// ---------- Уведомления ----------
async function requestNotificationPermission() {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
    }
    return false;
}

function sendNotification(title, body) {
    if (!("Notification" in window)) return false;
    if (Notification.permission !== "granted") return false;
    if (!userProfile.notifications) return false;
    try {
        const notification = new Notification(title, {
            body: body,
            icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF8E53'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6z'/%3E%3C/svg%3E",
            silent: false
        });
        notification.onclick = () => { window.focus(); notification.close(); };
        setTimeout(() => notification.close(), 10000);
        return true;
    } catch (e) { return false; }
}

function checkAndNotifyTodaysWorkouts() {
    if (!currentUser || !currentUser.workouts) return;
    const today = getTodayStr();
    const todaysWorkouts = currentUser.workouts.filter(w => w.date === today);
    const t = translations[currentLang];
    if (todaysWorkouts.length > 0) {
        const workoutNames = todaysWorkouts.map(w => w.name).join(', ');
        const body = t.notificationBody.replace('{workouts}', workoutNames);
        sendNotification(t.notificationTitle, body);
    }
}

function startNotificationScheduler() {
    if (notificationInterval) clearInterval(notificationInterval);
    if (!userProfile.notifications) return;
    notificationInterval = setInterval(() => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const targetHour = userProfile.reminderTime?.hour || 9;
        const targetMinute = userProfile.reminderTime?.minute || 0;
        const lastSentDate = localStorage.getItem('fittrack_last_notification_date');
        const today = getTodayStr();
        if (currentHour === targetHour && currentMinute === targetMinute && lastSentDate !== today) {
            checkAndNotifyTodaysWorkouts();
            localStorage.setItem('fittrack_last_notification_date', today);
        }
    }, 60000);
}

function stopNotificationScheduler() {
    if (notificationInterval) { clearInterval(notificationInterval); notificationInterval = null; }
}

function updateNotificationSettings() {
    const timeSettings = document.getElementById('timeSettings');
    const hourSelect = document.getElementById('reminderHour');
    const minuteSelect = document.getElementById('reminderMinute');
    if (userProfile.notifications) {
        if (timeSettings) timeSettings.style.display = 'block';
        startNotificationScheduler();
        requestNotificationPermission();
    } else {
        if (timeSettings) timeSettings.style.display = 'none';
        stopNotificationScheduler();
    }
    if (hourSelect) hourSelect.value = userProfile.reminderTime?.hour || 9;
    if (minuteSelect) minuteSelect.value = userProfile.reminderTime?.minute || 0;
}

function saveReminderTime() {
    const hourSelect = document.getElementById('reminderHour');
    const minuteSelect = document.getElementById('reminderMinute');
    if (hourSelect && minuteSelect) {
        userProfile.reminderTime = { hour: parseInt(hourSelect.value), minute: parseInt(minuteSelect.value) };
        saveUserProfile();
        stopNotificationScheduler();
        startNotificationScheduler();
    }
}

// ---------- API-вызовы ----------
async function apiCall(url, options = {}) {
    const token = localStorage.getItem('fittrack_token');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    const response = await fetch(`${API_BASE}${url}`, options);
    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('fittrack_token');
        window.location.href = 'login.html';
        throw new Error('Session expired');
    }
    return response;
}

async function register(email, password, name) {
    // Проверка на символ @
    if (!email.includes('@')) {
        alert(translations[currentLang].emailInvalid);
        return false;
    }
    try {
        await apiCall('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name: name || email.split('@')[0] })
        });
        alert(translations[currentLang].registerSuccess);
        window.location.href = 'login.html';
        return true;
    } catch (err) {
        alert(err.message);
        return false;
    }
}

async function login(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        const err = await response.json();
        alert(err.error || translations[currentLang].invalidCredentials);
        return false;
    }
    const data = await response.json();
    localStorage.setItem('fittrack_token', data.token);
    window.location.href = 'index.html';
    return true;
}

async function logout() {
    localStorage.removeItem('fittrack_token');
    window.location.href = 'login.html';
}

async function loadWorkouts() {
    if (!currentUser) return;
    const response = await apiCall('/workouts');
    if (!response.ok) {
        console.error('Ошибка загрузки тренировок');
        currentUser.workouts = [];
        return;
    }
    const workouts = await response.json();
    currentUser.workouts = workouts;
    renderWorkouts();
    renderCalendar();
    updateReminder();
    updateProgressChart();
}

async function addWorkout(workoutData) {
    if (!validatePositiveNumber(workoutData.duration, translations[currentLang].workoutDuration)) return false;
    if (!validatePositiveNumber(workoutData.calories, translations[currentLang].workoutCalories)) return false;
    const response = await apiCall('/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.id, ...workoutData })
    });
    if (!response.ok) {
        const err = await response.json();
        alert(err.error);
        return false;
    }
    await loadWorkouts();
    return true;
}

async function deleteWorkout(id) {
    const response = await apiCall(`/workouts/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        const err = await response.json();
        alert(err.error);
        return false;
    }
    await loadWorkouts();
    return true;
}

// ---------- Отрисовка интерфейса ----------
function renderWorkouts() {
    const tbody = document.getElementById('workoutsList');
    if (!tbody) return;
    const t = translations[currentLang];
    if (!currentUser?.workouts?.length) {
        const colCount = tbody.closest('table')?.rows[0]?.cells.length || 6;
        tbody.innerHTML = `<tr><td colspan="${colCount}">${t.noWorkouts}</td></tr>`;
        return;
    }
    const isWorkoutsPage = window.location.pathname.includes('workouts.html');
    if (isWorkoutsPage) {
        tbody.innerHTML = currentUser.workouts.map(w => `
            <tr>
                <td>${escapeHtml(w.name)}</td>
                <td>${escapeHtml(w.category)}</td>
                <td>${w.date}</td>
                <td>${w.duration}</td>
                <td>${w.calories}</td>
                <td><i class="fas fa-trash-alt delete-workout" data-id="${w.id}" style="cursor:pointer;"></i></td>
            </tr>
        `).join('');
        document.querySelectorAll('.delete-workout').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = parseInt(btn.dataset.id);
                if (confirm(t.deleteConfirm)) await deleteWorkout(id);
            });
        });
    } else {
        const recentWorkouts = [...currentUser.workouts].slice(0, 5);
        tbody.innerHTML = recentWorkouts.map(w => `
            <tr>
                <td>${escapeHtml(w.name)}</td>
                <td>${escapeHtml(w.category)}</td>
                <td>${w.date}</td>
                <td>${w.duration}</td>
                <td>${w.calories}</td>
            </tr>
        `).join('');
        if (!recentWorkouts.length) {
            tbody.innerHTML = `<tr><td colspan="5">${t.noWorkouts}</td></tr>`;
        }
    }
}

function renderCalendar() {
    const calendarDiv = document.getElementById('calendar');
    if (!calendarDiv) return;
    if (!currentUser?.workouts) {
        calendarDiv.innerHTML = '<p style="text-align:center; padding:20px;">Загрузка календаря...</p>';
        return;
    }
    const t = translations[currentLang];
    const year = currentCalendarYear !== null ? currentCalendarYear : new Date().getFullYear();
    const month = currentCalendarMonth !== null ? currentCalendarMonth : new Date().getMonth();
    const monthNames = t.monthNames;
    if (document.getElementById('currentMonthYear')) {
        document.getElementById('currentMonthYear').innerText = `${monthNames[month]} ${year}`;
    }
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let html = '<div class="calendar-grid">';
    const weekdays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    weekdays.forEach(day => html += `<div><strong>${day}</strong></div>`);
    let offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    for (let i = 0; i < offset; i++) html += '<div></div>';
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const hasWorkout = currentUser.workouts?.some(w => w.date === dateStr);
        const cls = hasWorkout ? 'cal-day has-workout' : 'cal-day';
        html += `<div class="${cls}" data-date="${dateStr}">${d}</div>`;
    }
    html += '</div>';
    calendarDiv.innerHTML = html;
    document.querySelectorAll('.cal-day').forEach(day => {
        day.addEventListener('click', (e) => {
            const date = day.dataset.date;
            if (date) {
                const workoutsOnDay = currentUser.workouts?.filter(w => w.date === date) || [];
                const list = workoutsOnDay.map(w => `${w.name} (${w.duration} мин)`).join('\n') || 'Нет тренировок';
                alert(`Тренировки на ${date}:\n${list}`);
            }
        });
    });
}

function updateReminder() {
    const reminderDiv = document.getElementById('reminderText');
    if (!reminderDiv) return;
    if (!currentUser) return;
    const today = getTodayStr();
    const todaysWorkouts = currentUser.workouts?.filter(w => w.date === today) || [];
    const t = translations[currentLang];
    if (todaysWorkouts.length) {
        const count = todaysWorkouts.length;
        const word = count === 1 ? t.workoutSingular : t.workoutPlural;
        reminderDiv.innerHTML = `<i class="fas fa-check-circle"></i> Сегодня ${count} ${word}: ${todaysWorkouts.map(w => w.name).join(', ')}`;
    } else {
        reminderDiv.innerHTML = `<i class="fas fa-bell-slash"></i> ${t.reminderText}`;
    }
}

async function updateProgressChart() {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;
    if (!currentUser?.workouts) return;
    const ctx = canvas.getContext('2d');
    const today = new Date();
    const last30 = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        last30.push(`${year}-${month}-${day}`);
    }
    const caloriesPerDay = last30.map(date => {
        return currentUser.workouts?.filter(w => w.date === date).reduce((acc, w) => acc + w.calories, 0) || 0;
    });
    if (progressChartInstance) progressChartInstance.destroy();
    progressChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last30.map(d => d.slice(5)),
            datasets: [{
                label: translations[currentLang].progressMonth,
                data: caloriesPerDay,
                borderColor: '#FF8E53',
                backgroundColor: '#FF8E5320',
                tension: 0.2,
                fill: true
            }]
        },
        options: { responsive: true, maintainAspectRatio: true }
    });
}

function updateUIAfterLogin() {
    const displayName = currentUser.name || currentUser.email;
    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) profileEmail.innerText = currentUser.email;
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    if (userEmailDisplay) userEmailDisplay.innerHTML = `<i class="fas fa-user"></i> ${displayName}`;
    loadUserProfile();
    loadCategories();
    updateCategorySelect();
    renderWorkouts();
    renderCalendar();
    updateReminder();
    updateProgressChart();
    updateNotificationSettings();
}

// ---------- Отчёт ----------
let currentReportData = null;

async function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    if (!startDate || !endDate) {
        alert('Выберите период');
        return;
    }
    if (!currentUser?.workouts) {
        alert('Нет данных для отчёта');
        return;
    }
    const workouts = currentUser.workouts.filter(w => w.date >= startDate && w.date <= endDate);
    currentReportData = workouts;
    const t = translations[currentLang];
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
    const avgDuration = totalWorkouts > 0 ? (totalDuration / totalWorkouts).toFixed(1) : 0;
    const statsHtml = `
        <div class="stat-card"><i class="fas fa-calendar-check"></i> ${t.totalWorkouts}: ${totalWorkouts}</div>
        <div class="stat-card"><i class="fas fa-clock"></i> ${t.totalDuration}: ${totalDuration} мин</div>
        <div class="stat-card"><i class="fas fa-fire"></i> ${t.totalCalories}: ${totalCalories} ккал</div>
        <div class="stat-card"><i class="fas fa-chart-line"></i> ${t.avgDuration}: ${avgDuration} мин</div>
    `;
    document.getElementById('statsSummary').innerHTML = statsHtml;
    const tbody = document.getElementById('reportWorkoutsList');
    if (workouts.length === 0) {
        tbody.innerHTML = `肌理<td colspan="5">${t.noWorkouts}      `;
    } else {
        tbody.innerHTML = workouts.map(w => `
            <tr>
                <td>${w.date}     .
                <td>${escapeHtml(w.name)}     .
                <td>${escapeHtml(w.category)}     .
                <td>${w.duration}     .
                <td>${w.calories}     .
              `).join('');
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = [];
    const caloriesByDay = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().slice(0,10);
        days.push(dateStr.slice(5));
        const dayCalories = workouts.filter(w => w.date === dateStr).reduce((sum, w) => sum + w.calories, 0);
        caloriesByDay.push(dayCalories);
    }
    const ctx = document.getElementById('reportChart').getContext('2d');
    if (reportChartInstance) reportChartInstance.destroy();
    reportChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: t.progressMonth,
                data: caloriesByDay,
                borderColor: '#FF8E53',
                backgroundColor: '#FF8E5320',
                tension: 0.2,
                fill: true
            }]
        },
        options: { responsive: true, maintainAspectRatio: true }
    });
    document.getElementById('reportContent').style.display = 'block';
}

function downloadPdf() {
    if (!currentReportData) {
        alert('Сначала сформируйте отчёт');
        return;
    }
    const element = document.getElementById('reportContent');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `FitTrack_Report_${new Date().toISOString().slice(0,10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

// ---------- Перевод интерфейса ----------
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('fittrack_lang', lang);
    updateUITexts();
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) langBtn.innerHTML = `<i class="fas fa-globe"></i> ${lang === 'ru' ? 'English' : 'Русский'}`;
    if (currentUser) renderCalendar();
}

function updateUITexts() {
    const t = translations[currentLang];
    // Меню
    const navMain = document.getElementById('navMain');
    if (navMain) navMain.innerHTML = `<i class="fas fa-home"></i> ${t.mainPage}`;
    const navWorkouts = document.getElementById('navWorkouts');
    if (navWorkouts) navWorkouts.innerHTML = `<i class="fas fa-dumbbell"></i> ${t.workoutsPage}`;
    const navProfile = document.getElementById('navProfile');
    if (navProfile) navProfile.innerHTML = `<i class="fas fa-user"></i> ${t.profilePage}`;
    const navSettings = document.getElementById('navSettings');
    if (navSettings) navSettings.innerHTML = `<i class="fas fa-cog"></i> ${t.settingsPage}`;
    const navReport = document.getElementById('navReport');
    if (navReport) navReport.innerHTML = `<i class="fas fa-chart-bar"></i> ${t.reportPage}`;
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${t.logout}`;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        const isDark = document.body.classList.contains('dark');
        themeToggleBtn.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i> ${isDark ? t.lightTheme : t.darkTheme}`;
    }
    // Вход/регистрация
    const authTitle = document.getElementById('authTitle');
    if (authTitle) authTitle.innerText = t.authTitle;
    const loginTitle = document.getElementById('loginTitle');
    if (loginTitle) loginTitle.innerHTML = `<i class="fas fa-sign-in-alt"></i> ${t.loginTitle}`;
    const registerTitle = document.getElementById('registerTitle');
    if (registerTitle) registerTitle.innerHTML = `<i class="fas fa-user-plus"></i> ${t.registerTitle}`;
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) loginBtn.innerText = t.loginBtn;
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) registerBtn.innerText = t.registerBtn;
    const forgotLink = document.getElementById('forgotPasswordLink');
    if (forgotLink) forgotLink.innerText = t.forgotPassword;
    const registerLink = document.getElementById('registerLink');
    if (registerLink) registerLink.innerText = t.registerLink;
    const loginLink = document.getElementById('loginLink');
    if (loginLink) loginLink.innerText = t.loginLink;
    const noAccountText = document.getElementById('noAccountText');
    if (noAccountText) noAccountText.innerText = t.noAccount;
    const haveAccountText = document.getElementById('haveAccountText');
    if (haveAccountText) haveAccountText.innerText = t.haveAccount;
    // Восстановление
    const recoverTitle = document.getElementById('recoverTitle');
    if (recoverTitle) recoverTitle.innerText = t.recoverTitle;
    const recoverDesc = document.getElementById('recoverDesc');
    if (recoverDesc) recoverDesc.innerText = t.recoverDesc;
    const sendCodeBtn = document.getElementById('sendRecoverCode');
    if (sendCodeBtn) sendCodeBtn.innerText = t.sendCode;
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) closeModalBtn.innerText = t.cancel;
    // Главная
    const profileTitle = document.getElementById('profileTitle');
    if (profileTitle) profileTitle.innerHTML = `<i class="fas fa-user-circle"></i> ${t.profile}`;
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) deleteAccountBtn.innerHTML = `<i class="fas fa-trash"></i> ${t.deleteAccount}`;
    const reminderHeader = document.getElementById('reminderHeader');
    if (reminderHeader) reminderHeader.innerHTML = `<i class="fas fa-bell"></i> ${t.reminder}`;
    const reminderSub = document.getElementById('reminderSub');
    if (reminderSub) reminderSub.innerText = t.reminderSub;
    const progressTitle = document.getElementById('progressTitle');
    if (progressTitle) progressTitle.innerHTML = `<i class="fas fa-chart-line"></i> ${t.progressMonth}`;
    const calendarTitle = document.getElementById('calendarTitle');
    if (calendarTitle) calendarTitle.innerHTML = `<i class="fas fa-calendar-alt"></i> ${t.calendar}`;
    const workoutsTitle = document.getElementById('workoutsTitle');
    if (workoutsTitle) workoutsTitle.innerHTML = `<i class="fas fa-list"></i> ${t.myWorkouts}`;
    const nameLabel = document.getElementById('nameLabel');
    if (nameLabel) nameLabel.innerText = t.name;
    const heightLabel = document.getElementById('heightLabel');
    if (heightLabel) heightLabel.innerText = t.height;
    const weightLabel = document.getElementById('weightLabel');
    if (weightLabel) weightLabel.innerText = t.weight;
    const heightUnit = document.getElementById('heightUnit');
    if (heightUnit) heightUnit.innerText = t.cm;
    const weightUnit = document.getElementById('weightUnit');
    if (weightUnit) weightUnit.innerText = t.kg;
    const emailLabel = document.getElementById('emailLabel');
    if (emailLabel) emailLabel.innerText = t.emailLabel;
    // Профиль
    const editProfileTitle = document.getElementById('editProfileTitle');
    if (editProfileTitle) editProfileTitle.innerText = t.editProfile;
    const personalDataTitle = document.getElementById('personalDataTitle');
    if (personalDataTitle) personalDataTitle.innerHTML = `<i class="fas fa-id-card"></i> ${t.personalData}`;
    const emailCannotChange = document.getElementById('emailCannotChange');
    if (emailCannotChange) emailCannotChange.innerText = t.emailCannotChange;
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) saveProfileBtn.innerText = t.saveChanges;
    const cancelProfileBtn = document.getElementById('cancelProfileBtn');
    if (cancelProfileBtn) cancelProfileBtn.innerText = t.cancelProfile;
    // Настройки
    const notificationsSettingsTitle = document.getElementById('notificationsSettingsTitle');
    if (notificationsSettingsTitle) notificationsSettingsTitle.innerHTML = `<i class="fas fa-bell"></i> ${t.notificationsSettings}`;
    const notificationsLabel = document.getElementById('notificationsLabel');
    if (notificationsLabel) notificationsLabel.innerText = t.enableNotifications;
    const notificationsSmall = document.getElementById('notificationsSmall');
    if (notificationsSmall) notificationsSmall.innerText = t.allowBrowserNotifications;
    const reminderTimeLabel = document.getElementById('reminderTimeLabel');
    if (reminderTimeLabel) reminderTimeLabel.innerText = t.reminderTimeLabel;
    const reminderSmall = document.getElementById('reminderSmall');
    if (reminderSmall) reminderSmall.innerText = t.dailyReminder;
    const testNotificationText = document.getElementById('testNotificationText');
    if (testNotificationText) testNotificationText.innerText = t.testNotification;
    const dangerZoneTitle = document.getElementById('dangerZoneTitle');
    if (dangerZoneTitle) dangerZoneTitle.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${t.dangerZone}`;
    const deleteAccountWarning = document.getElementById('deleteAccountWarning');
    if (deleteAccountWarning) deleteAccountWarning.innerText = t.deleteAccountWarning;
    const deleteAccountSettingsBtn = document.getElementById('deleteAccountSettingsBtn');
    if (deleteAccountSettingsBtn) deleteAccountSettingsBtn.innerHTML = `<i class="fas fa-trash"></i> ${t.deleteAccount}`;
    // Отчёт
    const reportTitle = document.getElementById('reportTitle');
    if (reportTitle) reportTitle.innerText = t.reportTitle;
    const downloadPdfText = document.getElementById('downloadPdfText');
    if (downloadPdfText) downloadPdfText.innerText = t.downloadPdf;
    const statsSummaryTitle = document.getElementById('statsSummaryTitle');
    if (statsSummaryTitle) statsSummaryTitle.innerHTML = `<i class="fas fa-chart-line"></i> ${t.statsSummary}`;
    const reportProgressTitle = document.getElementById('reportProgressTitle');
    if (reportProgressTitle) reportProgressTitle.innerHTML = `<i class="fas fa-calendar-week"></i> ${t.progressMonth}`;
    const workoutsListTitle = document.getElementById('workoutsListTitle');
    if (workoutsListTitle) workoutsListTitle.innerHTML = `<i class="fas fa-list"></i> ${t.workoutsList}`;
    const startDateLabel = document.getElementById('startDateLabel');
    if (startDateLabel) startDateLabel.innerText = t.startDateLabel;
    const endDateLabel = document.getElementById('endDateLabel');
    if (endDateLabel) endDateLabel.innerText = t.endDateLabel;
    const generateReportBtn = document.getElementById('generateReportBtn');
    if (generateReportBtn) generateReportBtn.innerHTML = `<i class="fas fa-chart-line"></i> ${t.generateReport}`;
    // Плейсхолдеры
    const loginEmailInput = document.getElementById('loginEmail');
    if (loginEmailInput) loginEmailInput.placeholder = t.emailPlaceholder;
    const loginPasswordInput = document.getElementById('loginPassword');
    if (loginPasswordInput) loginPasswordInput.placeholder = t.passwordPlaceholder;
    const regEmailInput = document.getElementById('regEmail');
    if (regEmailInput) regEmailInput.placeholder = t.emailPlaceholder;
    const regPasswordInput = document.getElementById('regPassword');
    if (regPasswordInput) regPasswordInput.placeholder = t.passwordPlaceholder;
    const regNameInput = document.getElementById('regName');
    if (regNameInput) regNameInput.placeholder = t.namePlaceholder;
    // Таблицы
    const thName = document.getElementById('thName');
    if (thName) thName.innerText = t.name;
    const thCategory = document.getElementById('thCategory');
    if (thCategory) thCategory.innerText = t.category;
    const thDate = document.getElementById('thDate');
    if (thDate) thDate.innerText = t.date;
    const thDuration = document.getElementById('thDuration');
    if (thDuration) thDuration.innerText = t.duration.split(' ')[0];
    const thCalories = document.getElementById('thCalories');
    if (thCalories) thCalories.innerText = t.calories.split(' ')[0];
    const thActions = document.getElementById('thActions');
    if (thActions) thActions.innerText = t.actions;
    // Предустановленные тренировки
    const presetSelect = document.getElementById('presetWorkoutSelect');
    if (presetSelect) {
        const presetOptions = t.presetWorkoutsList;
        const currentValue = presetSelect.value;
        presetSelect.innerHTML = `<option value="" id="presetPlaceholder">${t.presetWorkouts}</option>`;
        presetOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            presetSelect.appendChild(opt);
        });
        if (currentValue && presetOptions.includes(currentValue)) {
            presetSelect.value = currentValue;
        }
    }
    if (currentUser) {
        updateReminder();
        renderCalendar();
    }
}

// ---------- Инициализация страниц ----------
async function initMainPage() {
    const token = localStorage.getItem('fittrack_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    try {
        const response = await apiCall('/workouts');
        if (response.ok) {
            const workouts = await response.json();
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            currentUser = {
                id: tokenPayload.id,
                email: tokenPayload.email,
                name: tokenPayload.name,
                workouts: workouts
            };
            updateUIAfterLogin();
        } else {
            throw new Error('Unauthorized');
        }
    } catch (e) {
        localStorage.removeItem('fittrack_token');
        window.location.href = 'login.html';
        return;
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            if (currentCalendarMonth === null) {
                const now = new Date();
                currentCalendarYear = now.getFullYear();
                currentCalendarMonth = now.getMonth();
            }
            currentCalendarMonth--;
            if (currentCalendarMonth < 0) {
                currentCalendarMonth = 11;
                currentCalendarYear--;
            }
            renderCalendar();
        });
        nextMonthBtn.addEventListener('click', () => {
            if (currentCalendarMonth === null) {
                const now = new Date();
                currentCalendarYear = now.getFullYear();
                currentCalendarMonth = now.getMonth();
            }
            currentCalendarMonth++;
            if (currentCalendarMonth > 11) {
                currentCalendarMonth = 0;
                currentCalendarYear++;
            }
            renderCalendar();
        });
    }
}

async function initWorkoutsPage() {
    const token = localStorage.getItem('fittrack_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    try {
        const response = await apiCall('/workouts');
        if (response.ok) {
            const workouts = await response.json();
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            currentUser = {
                id: tokenPayload.id,
                email: tokenPayload.email,
                name: tokenPayload.name,
                workouts: workouts
            };
            updateCategorySelect();
            renderWorkouts();
            setDateInputMin();
        } else {
            throw new Error('Unauthorized');
        }
    } catch (e) {
        localStorage.removeItem('fittrack_token');
        window.location.href = 'login.html';
        return;
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    const addPresetBtn = document.getElementById('addPresetWorkoutBtn');
    if (addPresetBtn) {
        addPresetBtn.addEventListener('click', async () => {
            const preset = document.getElementById('presetWorkoutSelect').value;
            if (!preset) return alert(translations[currentLang].selectPreset);
            let duration = 30, calories = 200;
            if (preset === 'Силовая') { duration = 45; calories = 250; }
            else if (preset === 'Кардио') { duration = 30; calories = 280; }
            else if (preset === 'Интервальная') { duration = 25; calories = 220; }
            await addWorkout({ name: preset, category: preset, date: getTodayStr(), duration, calories });
            document.getElementById('presetWorkoutSelect').value = '';
        });
    }
    const showAddCustomBtn = document.getElementById('showAddCustomBtn');
    if (showAddCustomBtn) {
        showAddCustomBtn.addEventListener('click', () => {
            setDateInputMin();
            const formDiv = document.getElementById('customWorkoutForm');
            if (formDiv) formDiv.style.display = formDiv.style.display === 'none' ? 'block' : 'none';
        });
    }
    const saveCustomWorkout = document.getElementById('saveCustomWorkout');
    if (saveCustomWorkout) {
        saveCustomWorkout.addEventListener('click', async () => {
            const name = document.getElementById('customWorkoutName').value.trim();
            const date = document.getElementById('customWorkoutDate').value;
            let duration = parseInt(document.getElementById('customWorkoutDuration').value);
            let calories = parseInt(document.getElementById('customWorkoutCalories').value);
            const category = document.getElementById('customWorkoutCategory').value;
            if (!name || !date || isNaN(duration) || isNaN(calories)) return alert(translations[currentLang].fillFields);
            if (!validatePositiveNumber(duration, translations[currentLang].workoutDuration)) return;
            if (!validatePositiveNumber(calories, translations[currentLang].workoutCalories)) return;
            await addWorkout({ name, category, date, duration, calories });
            document.getElementById('customWorkoutName').value = '';
            document.getElementById('customWorkoutDate').value = '';
            document.getElementById('customWorkoutDuration').value = '';
            document.getElementById('customWorkoutCalories').value = '';
            document.getElementById('customWorkoutForm').style.display = 'none';
        });
    }
    const newCategoryBtn = document.getElementById('newCategoryBtn');
    if (newCategoryBtn) newCategoryBtn.addEventListener('click', addCategory);
}

function initProfilePage() {
    const token = localStorage.getItem('fittrack_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    currentUser = {
        id: tokenPayload.id,
        email: tokenPayload.email,
        name: tokenPayload.name
    };
    loadUserProfile();
    document.getElementById('editName').value = userProfile.name || currentUser.name || '';
    document.getElementById('editEmail').value = currentUser.email;
    document.getElementById('editHeight').value = userProfile.height || '';
    document.getElementById('editWeight').value = userProfile.weight || '';
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const height = document.getElementById('editHeight').value;
            const weight = document.getElementById('editWeight').value;
            if (height && !validatePositiveNumber(height, translations[currentLang].height)) return;
            if (weight && !validatePositiveNumber(weight, translations[currentLang].weight)) return;
            userProfile.name = document.getElementById('editName').value;
            userProfile.height = height;
            userProfile.weight = weight;
            saveUserProfile();
            alert(translations[currentLang].profileSaved);
            window.location.href = 'index.html';
        });
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
}

function initSettingsPage() {
    const token = localStorage.getItem('fittrack_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    currentUser = {
        id: tokenPayload.id,
        email: tokenPayload.email,
        name: tokenPayload.name
    };
    loadUserProfile();
    const notificationsToggle = document.getElementById('notificationsToggle');
    const timeSettings = document.getElementById('timeSettings');
    const hourSelect = document.getElementById('reminderHour');
    const minuteSelect = document.getElementById('reminderMinute');
    const testNotificationBtn = document.getElementById('testNotificationBtn');
    if (notificationsToggle) {
        notificationsToggle.checked = userProfile.notifications;
        notificationsToggle.addEventListener('change', async (e) => {
            userProfile.notifications = e.target.checked;
            if (userProfile.notifications) {
                const granted = await requestNotificationPermission();
                if (!granted) {
                    alert(translations[currentLang].permissionDenied);
                    userProfile.notifications = false;
                    notificationsToggle.checked = false;
                } else alert(translations[currentLang].notificationEnabled);
            } else alert(translations[currentLang].notificationDisabled);
            saveUserProfile();
            updateNotificationSettings();
        });
    }
    if (hourSelect && minuteSelect) {
        hourSelect.value = userProfile.reminderTime?.hour || 9;
        minuteSelect.value = userProfile.reminderTime?.minute || 0;
        hourSelect.addEventListener('change', () => saveReminderTime());
        minuteSelect.addEventListener('change', () => saveReminderTime());
    }
    if (testNotificationBtn) {
        testNotificationBtn.addEventListener('click', () => {
            if (userProfile.notifications) sendNotification(translations[currentLang].notificationTitle, translations[currentLang].testNotificationMsg);
            else alert('Сначала включите уведомления');
        });
    }
    updateNotificationSettings();
    const deleteAccountSettingsBtn = document.getElementById('deleteAccountSettingsBtn');
    if (deleteAccountSettingsBtn) {
        deleteAccountSettingsBtn.addEventListener('click', async () => {
            if (confirm(translations[currentLang].accountDeleteConfirm)) {
                // Удаление аккаунта через API
                try {
                    const response = await apiCall('/user', { method: 'DELETE' });
                    if (response.ok) {
                        alert(translations[currentLang].accountDeleted);
                        logout();
                    } else {
                        alert('Ошибка удаления');
                    }
                } catch (e) {
                    alert('Ошибка сети');
                }
            }
        });
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
}

async function initReportPage() {
    const token = localStorage.getItem('fittrack_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    try {
        const response = await apiCall('/workouts');
        if (response.ok) {
            const workouts = await response.json();
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            currentUser = {
                id: tokenPayload.id,
                email: tokenPayload.email,
                name: tokenPayload.name,
                workouts: workouts
            };
        } else {
            throw new Error('Unauthorized');
        }
    } catch (e) {
        localStorage.removeItem('fittrack_token');
        window.location.href = 'login.html';
        return;
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    const generateReportBtn = document.getElementById('generateReportBtn');
    if (generateReportBtn) generateReportBtn.addEventListener('click', generateReport);
    const generatePdfBtn = document.getElementById('generatePdfBtn');
    if (generatePdfBtn) generatePdfBtn.addEventListener('click', downloadPdf);
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    document.getElementById('reportStartDate').value = thirtyDaysAgo.toISOString().slice(0,10);
    document.getElementById('reportEndDate').value = today.toISOString().slice(0,10);
}

function initLoginPage() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const email = document.getElementById('loginEmail').value;
            const pass = document.getElementById('loginPassword').value;
            await login(email, pass);
        });
    }
    const modal = document.getElementById('recoverModal');
    const forgotLink = document.getElementById('forgotPasswordLink');
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    const sendCodeBtn = document.getElementById('sendRecoverCode');
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', async () => {
            const email = document.getElementById('recoverEmail').value;
            const response = await fetch(`${API_BASE}/recover`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (response.ok) alert(translations[currentLang].recoverSent);
            else alert('Ошибка');
            modal.style.display = 'none';
        });
    }
}

function initRegisterPage() {
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', async () => {
            const email = document.getElementById('regEmail').value;
            const pass = document.getElementById('regPassword').value;
            const name = document.getElementById('regName').value;
            await register(email, pass, name);
        });
    }
}

// ---------- Общая инициализация ----------
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('fittrack_theme');
    if (savedTheme === 'dark') document.body.classList.add('dark');
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('fittrack_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
            const t = translations[currentLang];
            const isDark = document.body.classList.contains('dark');
            themeBtn.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i> ${isDark ? t.lightTheme : t.darkTheme}`;
        });
    }
    const savedLang = localStorage.getItem('fittrack_lang');
    if (savedLang === 'en') setLanguage('en'); else setLanguage('ru');
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) langBtn.addEventListener('click', () => setLanguage(currentLang === 'ru' ? 'en' : 'ru'));
    const path = window.location.pathname;
    if (path.includes('login.html')) initLoginPage();
    else if (path.includes('register.html')) initRegisterPage();
    else if (path.includes('profile.html')) initProfilePage();
    else if (path.includes('settings.html')) initSettingsPage();
    else if (path.includes('workouts.html')) initWorkoutsPage();
    else if (path.includes('report.html')) initReportPage();
    else initMainPage();
});