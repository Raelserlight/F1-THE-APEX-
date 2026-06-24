<img width="1720" height="991" alt="page" src="https://github.com/user-attachments/assets/9870dea6-f624-4a34-8834-89823fb0faee" />



# Champions Legacy Telemetry
**สารานุกรมมอเตอร์สปอร์ต (1950-2025)**

 **[คลิกเข้าสู่เว็บไซต์ (Live Demo)](https://raelserlight.github.io/F1-THE-APEX-/)**

เว็บแอปพลิเคชันแบบ Interactive ที่เน้นการมีส่วนร่วมของคอมมูนิตี้ สร้างขึ้นเพื่อรวบรวมและรักษากลิ่นอายประวัติศาสตร์ที่โคตรจะเร้าใจของแชมป์โลก Formula 1 ตั้งเเต่อดีตยันปัจจุบัน โปรเจกต์นี้นำเสนอตำนานนักแข่งและรถแข่งที่ได้แชมป์ตั้งแต่ปี 1950 ถึง 2025 ด้วยดีไซน์ Ui เเบบ (Glassmorphism)

## ฟีเจอร์หลัก (Features)
* **Live Telemetry Dashboard:** รวบรวมเเชมป์โลก F1 ทั้งฝั่งนักขับเเละรถ ตลอด 76 ปีที่ผ่านมา พร้อมรูปภาพที่อาจจะเเตกนิดหน่อย :>
* **Real-time Interaction (Firebase):**
  * **Live Voting:** ระบบกดไลค์ อัพเดทตัวเลขเเบบเรียลไทม์
  * **Anonymous Public Discussion:** ระบบคอมเมนต์ พร้อมระบบสุ่มไอดีผู้ใช้ให้เเบบชั่วคราว
  * **Suggest Specs Edit:** ฟอร์มสำหรับให้ผู้ใช้ส่งข้อเสนอแนะหรือสเปครถที่ถูกต้องเพื่อให้เเอดมินนำมาเเก้ไข
* **Responsive Glassmorphism UI:** ดีไซน์กระจกฝ้า รองรับการแสดงผลทั้งบนคอมพิวเตอร์และมือถือ

## เทคโนโลยีที่ใช้ (Tech Stack)
* **Frontend:** HTML5, CSS3 (Custom Variables, Grid/Flexbox), Vanilla JavaScript (ES6+).
* **Backend / Database:** Firebase Firestore (ดึงข้อมูลแบบเรียลไทม์ผ่าน `onSnapshot`).
* **Libraries:** * [Marked.js](https://marked.js.org/) สำหรับแปลงโค้ด Markdown เป็นเนื้อหาที่อ่านง่ายดูสบายตา
  * [SweetAlert2](https://sweetalert2.github.io/) สำหรับสร้างหน้าต่างป๊อปอัป

##  วิธีการรันโปรเจกต์ (How to Run Locally)
เนื่องจากโปรเจกต์นี้ใช้ระบบคลาวด์ของ Firebase (Serverless) จึงไม่ต้องเซ็ตอัปเซิร์ฟเวอร์หลังบ้านให้ว้าวุ่นเเละวุ่นวายครับ
1. ดาวน์โหลด (Clone) โปรเจกต์นี้ลงเครื่อง
2. เปิดโฟลเดอร์โปรเจกต์
3. รันไฟล์ `index.html` ผ่าน Local Server ( เช่นส่วนเสริม **Live Server** ใน VS Code ที่ทุกคนมีกันอยู่เเล้ว )


* ** หวังว่าจะเอนจอยนะครับ ~~

---
*Developed By [Estazolam] passion for Motorsport & Web Development.* 
