console.log("SCRIPT CONNECTED");
// ================= LOGIN =================
function login() {

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (usernameInput === savedUsername && passwordInput === savedPassword) {
        showPopup("Login Successful!", "dashboard.html",false);
    } else {
        showPopup("Invalid Username or Password");
    }
}

// ================= SIGNUP =================
function createAccount() {

    const username = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username === "" || email === "" || password === "") {
        showPopup("Please fill all fields");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    showPopup("Account Created Successfully!", "login.html",false);
}


// ================= LEVEL SELECT =================
function selectLevel(level) {
    localStorage.setItem("selectedLevel", level);
    window.location.href = level + ".html";
}

// ================= NAVIGATION =================
function goDashboard() {
    window.location.href = "dashboard.html";
}

function goNotifications() {
    window.location.href = "notifications.html";
}

function goSettings() {
    window.location.href = "settings.html";
}
function goProfile() {
    window.location.href = "profile.html";
}
function logout() {
    showPopup("Are you sure you want to logout?", "login.html",true);
}



// ================= DASHBOARD NAME =================
document.addEventListener("DOMContentLoaded", function () {

    const user = localStorage.getItem("username");
    const welcomeElement = document.getElementById("welcomeText");

    if (welcomeElement && user) {
        welcomeElement.innerText = "Welcome " + user;
    }

});
function goLevels(){
    window.location.href="levels.html"
}

function sendMessage(level) {

    const input = document.getElementById("chatInput");
    const message = input.value;

    if (message.trim() === "") return;

    const chatBox = document.getElementById("chatBox");

    // 👤 User message
    const userText = "You: " + message;

    const newMsg = document.createElement("p");
    newMsg.textContent = userText;
    chatBox.appendChild(newMsg);

    saveMessage(level, userText);

    // 🤖 AI reply
    setTimeout(function () {

        let aiText = "";

        if (level === "beginner") {
            aiText = "AI Mentor: Great start! Try practicing variables and loops daily 🔥";
        }
        else if (level === "intermediate") {
            aiText = "AI Mentor: Good question! Try connecting APIs with database for better understanding 💡";
        }
        else if (level === "expert") {
            aiText = "AI Mentor: Think about scalability and security while designing systems ⚡";
        }

        const reply = document.createElement("p");
        reply.style.color = "cyan";
        reply.textContent = aiText;
        chatBox.appendChild(reply);

        saveMessage(level, aiText);

    }, 500);

    input.value = "";
}

function saveMessage(level, message) {

    let history = JSON.parse(localStorage.getItem(level)) || [];
    history.push(message);
    localStorage.setItem(level, JSON.stringify(history));
}
function loadChat(level) {

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    let history = JSON.parse(localStorage.getItem(level)) || [];

    history.forEach(function (msg) {
        const p = document.createElement("p");
        p.textContent = msg;
        chatBox.appendChild(p);
    });
}
document.addEventListener("DOMContentLoaded", function () {

    const page = window.location.pathname;

    if (page.includes("beginner")) {
        loadChat("beginner");
    }

    if (page.includes("intermediate")) {
        loadChat("intermediate");
    }

    if (page.includes("expert")) {
        loadChat("expert");
    }

});
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    menu.classList.toggle("active");
}
function showLevels() {
    const levels = document.getElementById("levelOptions");
    levels.style.display = "grid";
}
function showPopup(message, redirectPage = null, showCancel = false) {

    const popup = document.getElementById("appPopup");
    popup.innerHTML = "";

    const box = document.createElement("div");
    box.className = "popup-box";

    const text = document.createElement("p");
    text.innerText = message;

    const buttonDiv = document.createElement("div");
    buttonDiv.style.marginTop = "15px";

    const okBtn = document.createElement("button");
    okBtn.innerText = "OK";

    okBtn.onclick = function () {
        popup.style.display = "none";
        if (redirectPage) {
            window.location.href = redirectPage;
        }
    };

    buttonDiv.appendChild(okBtn);

    // Only show cancel if showCancel = true
    if (showCancel) {
        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.onclick = function () {
            popup.style.display = "none";
        };
        buttonDiv.appendChild(cancelBtn);
    }

    box.appendChild(text);
    box.appendChild(buttonDiv);
    popup.appendChild(box);

    popup.style.display = "flex";
}

function closePopup(redirectPage = null) {

    document.getElementById("appPopup").style.display = "none";

    if (redirectPage && redirectPage !== "null") {
        window.location.href = redirectPage;
    }
}
function toggleLevels() {
    var levels = document.getElementById("levelOptions");

    if (levels.style.display === "none" || levels.style.display === "") {
        levels.style.display = "block";
    } else {
        levels.style.display = "none";
    }
}
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu) {
        menu.classList.toggle("active");
    }
}