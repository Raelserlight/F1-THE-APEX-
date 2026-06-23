<img width="1720" height="991" alt="page" src="https://github.com/user-attachments/assets/9870dea6-f624-4a34-8834-89823fb0faee" />



# Champions Legacy Telemetry
**สารานุกรมมอเตอร์สปอร์ต (1950-2025)**

เว็บแอปพลิเคชันแบบ Interactive ที่เน้นการมีส่วนร่วมของคอมมูนิตี้ สร้างขึ้นเพื่อรวบรวมและรักษากลิ่นอายประวัติศาสตร์ของแชมป์โลก Formula 1 โปรเจกต์นี้นำเสนอตำนานนักแข่งและรถแข่งที่คว้าแชมป์ตั้งแต่ปี 1950 ถึง 2025 ในรูปแบบดีไซน์ล้ำสมัยสไตล์กระจกฝ้า (Glassmorphism)

## ฟีเจอร์หลัก (Features)
* **Live Telemetry Dashboard:** ย้อนรอยประวัติศาสตร์ F1 ตลอด 76 ปี พร้อมรูปภาพคมชัด
* **Real-time Interaction (Firebase):**
  *  **Live Voting:** ระบบกดโหวตถูกใจซีซั่นโปรด อัปเดตตัวเลขสดๆ แบบเรียลไทม์โดยไม่ต้องรีเฟรชหน้าเว็บ
  * **Anonymous Public Discussion:** ระบบคอมเมนต์พูดคุย พร้อมสุ่มสร้างไอดีผู้ใช้ชั่วคราว
  * 🔧 **Suggest Specs Edit:** ฟอร์มพิเศษสำหรับให้ผู้ใช้ส่งข้อเสนอแนะหรือสเปครถที่ถูกต้องตรงเข้าฐานข้อมูล
* **Responsive Glassmorphism UI:** ดีไซน์กระจกฝ้า รองรับการแสดงผลทั้งบนคอมพิวเตอร์และโทรศัพท์มือถือ

## เทคโนโลยีที่ใช้ (Tech Stack)
* **Frontend:** HTML5, CSS3 (Custom Variables, Grid/Flexbox), Vanilla JavaScript (ES6+).
* **Backend / Database:** Firebase Firestore (ดึงข้อมูลแบบเรียลไทม์ผ่าน `onSnapshot`).
* **Libraries:** * [Marked.js](https://marked.js.org/) สำหรับแปลงโค้ด Markdown เป็นเนื้อหาที่อ่านง่าย
  * [SweetAlert2](https://sweetalert2.github.io/) สำหรับสร้างหน้าต่างป๊อปอัปแจ้งเตือน

##  วิธีการรันโปรเจกต์ (How to Run Locally)
เนื่องจากโปรเจกต์นี้ใช้ระบบคลาวด์ของ Firebase (Serverless) จึงไม่ต้องเซ็ตอัปเซิร์ฟเวอร์หลังบ้านให้วุ่นวายครับ
1. ดาวน์โหลด (Clone) โปรเจกต์นี้ลงเครื่อง
2. เปิดโฟลเดอร์โปรเจกต์
3. รันไฟล์ `index.html` ผ่าน Local Server (เช่น ใช้ส่วนเสริม **Live Server** ใน VS Code)
4. เอนจอยฮาฟโผม

---
*Developed By [Estazolam] passion for Motorsport & Web Development.* 
