import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, doc, getDoc, orderBy, query, onSnapshot, updateDoc, increment, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQfgk11o-SA9EgToECcMS_P12cGBdBeew",
  authDomain: "motorsport-encyclopedia.firebaseapp.com",
  databaseURL: "https://motorsport-encyclopedia-default-rtdb.firebaseio.com/",
  projectId: "motorsport-encyclopedia",
  storageBucket: "motorsport-encyclopedia.firebasestorage.app",
  messagingSenderId: "485393675124",
  appId: "1:485393675124:web:2cc0b44720f9250543f221",
  measurementId: "G-FYPX9NRP3M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const timelineView = document.getElementById('timeline-view');
const detailView = document.getElementById('detail-view');
const listContainer = document.getElementById('list-container');
const detailContent = document.getElementById('detail-content');

let savedScrollPosition = 0;
let currentDetailId = null; 
let unsubscribeComments = null; 
let unsubscribeSuggestions = null; 

const driversList = [
  "Giuseppe Farina", "Juan Manuel Fangio", "Alberto Ascari", "Alberto Ascari", "Juan Manuel Fangio", "Juan Manuel Fangio", "Juan Manuel Fangio", "Juan Manuel Fangio", "Mike Hawthorn", "Jack Brabham", "Jack Brabham", "Phil Hill", "Graham Hill", "Jim Clark", "John Surtees", "Jim Clark", "Jack Brabham", "Denny Hulme", "Graham Hill", "Jackie Stewart", "Jochen Rindt", "Jackie Stewart", "Emerson Fittipaldi", "Jackie Stewart", "Emerson Fittipaldi", "Niki Lauda", "James Hunt", "Niki Lauda", "Mario Andretti", "Jody Scheckter", "Alan Jones", "Nelson Piquet", "Keke Rosberg", "Nelson Piquet", "Niki Lauda", "Alain Prost", "Alain Prost", "Nelson Piquet", "Ayrton Senna", "Alain Prost", "Ayrton Senna", "Ayrton Senna", "Nigel Mansell", "Alain Prost", "Michael Schumacher", "Michael Schumacher", "Damon Hill", "Jacques Villeneuve", "Mika Häkkinen", "Mika Häkkinen", "Michael Schumacher", "Michael Schumacher", "Michael Schumacher", "Michael Schumacher", "Michael Schumacher", "Fernando Alonso", "Fernando Alonso", "Kimi Räikkönen", "Lewis Hamilton", "Jenson Button", "Sebastian Vettel", "Sebastian Vettel", "Sebastian Vettel", "Sebastian Vettel", "Lewis Hamilton", "Lewis Hamilton", "Nico Rosberg", "Lewis Hamilton", "Lewis Hamilton", "Lewis Hamilton", "Lewis Hamilton", "Max Verstappen", "Max Verstappen", "Max Verstappen", "Max Verstappen", "Lando Norris"
];

const carsList = [
  "Alfa Romeo 158", "Alfa Romeo 159", "Ferrari 500", "Ferrari 500", "Maserati 250F", "Mercedes-Benz W196", "Mercedes-Benz W196", "Maserati 250F", "Ferrari 246", "Cooper T51", "Cooper T51", "Ferrari 156", "BRM P57", "Lotus 25", "Ferrari 158", "Lotus 33", "Brabham BT19", "Brabham BT24", "Lotus 49", "Matra MS80", "Lotus 72", "Tyrrell 003", "Lotus 72D", "Tyrrell 006", "McLaren M23", "Ferrari 312T", "McLaren M23", "Ferrari 312T2", "Lotus 79", "Ferrari 312T4", "Williams FW07", "Brabham BT49", "Williams FW08", "Brabham BT52", "McLaren MP4/2", "McLaren MP4/2", "McLaren MP4/2", "Williams FW11B", "McLaren MP4/4", "McLaren MP4/5", "McLaren MP4/5B", "McLaren MP4/6", "Williams FW14B", "Williams FW15C", "Benetton B194", "Benetton B195", "Williams FW18", "Williams FW19", "McLaren MP4/13", "McLaren MP4/13", "Ferrari F1-2000", "Ferrari F2001", "Ferrari F2002", "Ferrari F2003-GA", "Ferrari F2004", "Renault R25", "Renault R26", "Ferrari F2007", "McLaren MP4-23", "Brawn BGP 001", "Red Bull RB6", "Red Bull RB7", "Red Bull RB8", "Red Bull RB9", "Mercedes F1 W05", "Mercedes F1 W06", "Mercedes F1 W07", "Mercedes F1 W08", "Mercedes F1 W09", "Mercedes F1 W10", "Mercedes F1 W11", "Red Bull RB16B", "Red Bull RB18", "Red Bull RB19", "Red Bull RB20", "McLaren MCL39"
];

function initDashboard() {
  const seasonsRef = collection(db, "seasons");
  const q = query(seasonsRef, orderBy("year", "desc"));

  onSnapshot(q, (snapshot) => {
    let htmlString = '';
    
    snapshot.forEach((document) => {
      const data = document.data();
      const year = data.year;
      const docId = document.id;
      const likes = data.likes || 0; 
      
      const index = year - 1950;
      const driverName = driversList[index] || data.driverId;
      const carModel = carsList[index] || data.carId;
      
      const driverThumbPath = `assets/images/driver/thumb/d-${year}-t.jpg`;
      const carThumbPath = `assets/images/car/thumb/c-${year}-t.jpg`;

      htmlString += `
        <div class="glass-panel dashboard-row" onclick="window.openDetail('${docId}', ${year}, '${data.driverId}', '${data.carId}', '${driverName}', '${carModel}')">
          <div class="year-badge">${year}</div>
          
          <div class="info-group">
            <img src="${driverThumbPath}" class="avatar" onerror="this.src='https://placehold.co/60x60/222/FFF?text=D'">
            <div class="info-text">
              <p>World Champion</p>
              <h3>${driverName}</h3>
            </div>
          </div>
          
          <div class="info-group">
            <img src="${carThumbPath}" class="avatar" onerror="this.src='https://placehold.co/60x60/222/FFF?text=C'">
            <div class="info-text">
              <p>Championship Car</p>
              <h3>${carModel}</h3>
            </div>
          </div>

          <div class="action-group">
            <button class="btn-action like" onclick="window.likeSeason(event, '${docId}')">
              ❤️ <span id="like-count-${docId}">${likes}</span>
            </button>
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = htmlString;
  });
}

window.likeSeason = async function(event, docId) {
  event.stopPropagation(); 
  const docRef = doc(db, "seasons", docId);
  try { await updateDoc(docRef, { likes: increment(1) }); } 
  catch (error) { console.error(error); }
}

window.openDetail = async function(docId, year, driverId, carId, driverName, carModel) {
  savedScrollPosition = window.scrollY; 
  currentDetailId = docId;
  document.querySelectorAll('.year-label').forEach(el => el.innerText = year);

  const commentsRef = collection(db, "seasons", docId, "comments");
  const qComments = query(commentsRef, orderBy("timestamp", "desc"));
  unsubscribeComments = onSnapshot(qComments, (snapshot) => {
    let commentHTML = '';
    snapshot.forEach((docSnap) => {
      const cData = docSnap.data();
      const displayName = cData.userName || "Anonymous-000"; 
      commentHTML += `<div class="data-item"><strong>#${displayName}</strong><p>${cData.text}</p></div>`;
    });
    document.getElementById('comment-list').innerHTML = commentHTML || '<p style="color:#444; font-size:13px;">No Comment...</p>';
  });

  timelineView.classList.remove('active');
  detailView.classList.add('active');
  window.scrollTo(0, 0);

  detailContent.innerHTML = `<h2 style="text-align:center; color:var(--text-muted);">Processing...</h2>`;

  try {
    const [driverSnap, carSnap] = await Promise.all([
      getDoc(doc(db, "drivers", driverId)),
      getDoc(doc(db, "cars", carId))
    ]);

    let driverData = driverSnap.exists() ? driverSnap.data() : {};
    let carData = carSnap.exists() ? carSnap.data() : {};

    let driverMarkdown = driverData.markdownContent ? marked.parse(driverData.markdownContent) : '<p style="color:#aaa; text-align:center;">รอการอัปเดตข้อมูล...</p>';
    let carMarkdown = carData.markdownContent ? marked.parse(carData.markdownContent) : '<p style="color:#aaa; text-align:center;">รอการอัปเดตข้อมูล...</p>';

    let driverImg = `assets/images/driver/detail/d-${year}-d.jpg`;
    let carImg = `assets/images/car/detail/c-${year}-d.jpg`;

    detailContent.innerHTML = `
      <h1 style="color: var(--f1-red); font-size: 36px; text-align: center; margin-bottom: 35px; font-weight: 900;">${year} CHAMPION LEGACY</h1>
      
      <div class="specs-grid">
        <div class="spec-card">
          <h2 style="color: white; font-size: 22px; margin-bottom: 15px; border-left: 4px solid var(--f1-red); padding-left: 10px;">World Champion Driver</h2>
          <img src="${driverImg}" class="spec-hero" onerror="this.src='https://placehold.co/800x400/222/FFF?text=Driver+${year}'">
          <!-- โชว์ชื่อที่ดึงมาจากหน้าแรก -->
          <h3 style="color: var(--f1-red); font-size: 26px; margin-bottom: 15px; text-align: center;">${driverName}</h3>
          <div class="markdown-body">${driverMarkdown}</div>
        </div>

        <div class="spec-card">
          <h2 style="color: white; font-size: 22px; margin-bottom: 15px; border-left: 4px solid var(--accent-blue); padding-left: 10px;">Championship Car</h2>
          <img src="${carImg}" class="spec-hero" onerror="this.src='https://placehold.co/800x400/222/FFF?text=Car+${year}'">
          <!-- โชว์ชื่อที่ดึงมาจากหน้าแรก -->
          <h3 style="color: var(--f1-red); font-size: 26px; margin-bottom: 15px; text-align: center;">${carModel}</h3>
          <div class="markdown-body">${carMarkdown}</div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    detailContent.innerHTML = `<h2 style="color: red; text-align:center;">Error...</h2>`;
  }

  const suggestionsRef = collection(db, "seasons", docId, "suggestions");
  const qSuggestions = query(suggestionsRef, orderBy("timestamp", "desc"));
  unsubscribeSuggestions = onSnapshot(qSuggestions, (snapshot) => {
    let suggestionHTML = '';
    snapshot.forEach((docSnap) => {
      const sData = docSnap.data();
      suggestionHTML += `<div class="data-item blue-border"><strong>Suggest Request</strong><p>${sData.text}</p></div>`;
    });
    document.getElementById('suggestion-list').innerHTML = suggestionHTML || '<p style="color:#444; font-size:13px;">No Suggest...</p>';
  });
}

window.postComment = async function() {
  const inputEl = document.getElementById('comment-input');
  const text = inputEl.value.trim();
  if (!text || !currentDetailId) return;

  const userName = getUserId();

  try {
    const ref = collection(db, "seasons", currentDetailId, "comments");

    await addDoc(ref, { text: text, userName: userName, timestamp: serverTimestamp() });
    inputEl.value = '';
  } catch (error) { console.error(error); }
}

window.postSuggestion = async function() {
  const inputEl = document.getElementById('suggestion-input');
  const text = inputEl.value.trim();
  if (!text || !currentDetailId) return;
  try {
    const ref = collection(db, "seasons", currentDetailId, "suggestions");
    await addDoc(ref, { text: text, timestamp: serverTimestamp() });
    inputEl.value = '';
    Swal.fire({
      title: "Success!",
      text: "Send Suggest Complete Thank You For Your Information!! :>",
      icon: "success",
      background: "transparent",
      color: "#ffffff",
      confirmButtonColor: "#e10600",
      customClass: {
        popup: "glass-panel"
      }
    });
  } catch (error) { console.error(error); }
}

window.navigateBack = function() {
  if (unsubscribeComments) unsubscribeComments();
  if (unsubscribeSuggestions) unsubscribeSuggestions();
  detailView.classList.remove('active');
  timelineView.classList.add('active');
  window.scrollTo(0, savedScrollPosition);
}

initDashboard();

function getUserId() {
  let userId = localStorage.getItem('f1_guest_id');
  if (!userId) {
    const randomNum = Math.floor(Math.random() * 999) + 1;
    userId = "Anonymous " + String(randomNum).padStart(3, '0');
    localStorage.setItem('f1_guest_id', userId);
  }
  return userId;
}
