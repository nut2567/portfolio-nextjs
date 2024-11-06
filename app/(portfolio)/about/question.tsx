// components/Repositories.tsx (Client Component)
"use client"; // ตรงนี้เป็น Client Component
import React from "react";

export default function Question({ repositories }: { repositories: any[] }) {
  console.log(repositories);
  return (
    <div
      className="border rounded-lg shadow p-4 relative bg-[#0000003d] "
      style={{ boxShadow: "#0097ff40 0px -10px 60px inset" }}
    >
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          <h1 className="text-xl font-bold text-blue-200 mb-5">
            1.เงินเดือนที่คาดหวัง
          </h1>
        </div>
        <div className="collapse-content">
          <p>45000 (01/11/67)</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <h1 className="text-xl font-bold text-blue-200 mb-5">
            2.ลองช่วยอธิบายวิธีการแก้ไขและตรวจสอบหาข้อผิดพลาดของโปรแกรม (Bugs)
            ของคุณให้หน่อย?
          </h1>
        </div>
        <div className="collapse-content">
          <p>
            {`2.1 ทำความเข้าใจข้อผิดพลาด
เริ่มต้นจากการทำความเข้าใจสิ่งที่เกิดขึ้น เช่น ข้อผิดพลาดแสดงข้อความอะไร หรืออาการของโปรแกรมที่ผิดปกติยังไง ดูจาก error log หรือ stopper ของระบบ`}
          </p>
          <p>
            {`2.2 ทำ (Test Case unit test)
    ทดสอบง่าย ๆ เพื่อทำให้ข้อผิดพลาดเกิดขึ้นได้ซ้ำ ๆ เช่น ใส่ข้อมูลบางอย่างที่ทำให้โปรแกรมเกิดข้อผิดพลาด เพื่อให้เห็นถึงเงื่อนไขที่ทำให้โปรแกรมทำงานไม่ถูกต้อง`}
          </p>
          <p>
            {`2.3 ใช้เครื่องมือ Debugger
        ดูค่าตัวแปรต่าง ๆ ขณะโปรแกรมทำงาน ตั้ง breakpoints และดูการเปลี่ยนแปลงในแต่ละขั้นตอน จะเห็นว่าโค้ดทำงานผิดพลาดหรือค่าตัวแปรต่าง ๆ ผิดปกติ  
        ถ้าเจอข้อผิดพลาดก็สามารถย้อนกลับไปใช้ โค้ด เดิมจากการควบคุมเวอร์ชัน Git เพื่อดูประวัติการแก้ไขและเปรียบเทียบการเปลี่ยนแปลง  บางครั้งข้อผิดพลาดเกิดจาก 
        dependencies หรือ environment ที่ไม่ตรงกัน เช่น เวอร์ชันของไลบรารีที่ใช้ไม่เข้ากัน การตรวจสอบและจัดการ dependencies 
        ให้สอดคล้องกันช่วยลดข้อผิดพลาดได้มาก ยิ่งบางทีถ้าเป็น framework ที่ปล่อย Version ใหม่ออกมาอาจจะทำให้โค้ดบางตัวของงาน error เฉยๆก็เป็นได้`}
          </p>
          <p>
            {`2.4 บางทีทำงานเป็นทีม
            การทำงานร่วมกับทีมและขอคำแนะนำจาก lead ก็จะช่วยได้จากหลายมุมมอง หากปัญหาซับซ้อนหรือหาสาเหตุไม่เจอ แล้วงานเร่ง ก็จะเป็นวิธีแก้ ช่วยให้งานเสร็จได้`}
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <h1 className="text-xl font-bold text-blue-200 mb-5">
            3.ลองช่วยอธิบายปัญหาทางเทคนิคที่ซับซ้อนที่สุดที่คุณเคยเจอให้หน่อย
            แล้วคุณแก้มันได้ยังไง?
          </h1>
        </div>
        <div className="collapse-content">
          <p>{`ส่วนใหญ่จะเกิดขึ้นกับเวลาใช้ Third-party Libraries เข้ามาทำงานในระบบ แล้วรายละเอียดของ API หรือ โค้ด ส่วนต่างมีน้อยหรือไม่ชัดเจน 
แล้วจะต้องประสานงานคุยกันหลายส่วน เช่น  อาจจะเป็นซอฟแวร์ ของหลายๆเจ้ามารวมกัน ในระบเดียวกันแล้วต้องเขียนให้มันทำงานรวมกันได้ของระบบที่ 
ของแต่ละเจ้ามีอยู่แล้ว การจะทำใหม่หรือแก้จากของเดิมอาจจะเป็นเรื่องที่อยากและใช้เวลา ก็เป็นปัญหาอย่าง มีแนวทางที่จะแก้คือต้องประชุมบ่อยๆ 
โดยใช้ระบบ  Agile ในการแบ่งงาน Sprint ออกมาย่อยมากๆ เพื่อให้มีการรายงานและติดตามได้ง่าย รวมทั้งเปิดโอกาสให้สมาชิกในทีมแต่ละคนช่วยให้คำแนะนำ
หรือแนวทางใหม่ ๆ ในการแก้ปัญหาได้ด้วย คราวๆก็จะประชุมกันทุกเช้าในช่วงที่ติดปัญหา`}</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <h1 className="text-xl font-bold text-blue-200 mb-5">
            4.วิธีการที่คุณใช้เพื่ออัพเดทเทรนด์และเทคโนโลยีใหม่ๆ ในวงการคืออะไร?
            ลองอธิบาย
          </h1>
        </div>
        <div className="collapse-content">
          <p>{`4 ในการอัปเดตเทรนด์และเทคโนโลยีใหม่ ๆ ในวงการ ผมมักใช้วิธีการหลายทางเพื่อให้แน่ใจว่าครอบคลุมทั้งด้านทฤษฎีและการใช้งานจริง วิธีหลัก ๆ ที่ผมใช้ ก็จะมี`}</p>
          <p>
            {`4.1 ติดตามข่าวสารจากเว็บไซต์และบล็อกเทคโนโลยีใหม่ ๆ ที่กำลังเป็นที่นิยมรวมถึงตัวอย่างการใช้งานจริงที่นักพัฒนาคนอื่นนำมาพูดถึงใน YouTube  คอนเฟอเรนซ์ต่าง ๆ 
    เช่น Google, Apple, Microsoft เป็นแหล่งข้อมูลที่ดีในการอัปเดตเทคโนโลยีล่าสุด รวมถึงการพูดคุยเกี่ยวกับแนวโน้มในอนาคต ซึ่งมักมีการอัปเดตฟีเจอร์ใหม่ ๆ และตัวอย่างการใช้งานที่เเห็นภาพได้ง่าย`}
          </p>
          <p>{`4.2 ผมมักจะเรียนรู้เทคโนโลยีใหม่ลองสร้างโปรเจกต์ทดลองขนาดเล็กหรือ POC ดูการสอนผ่านคอร์สออนไลน์ใน YouTube หรือบทความ 
        Stack Overflow, Reddit เพราะช่วยให้เข้าใจโครงสร้างพื้นฐานได้ดี จากนั้นผมจะลองนำเทคโนโลยีเหล่านี้มาสร้างโปรเจกต์ย่อย ๆ เพื่อฝึกใช้งานจริง 
        ซึ่งเป็นวิธีการที่ช่วยให้จดจำได้ดีกว่าการเรียนรู้ทฤษฎีอย่างเดียว  วิธีนี้ช่วยให้ได้ประสบการณ์ตรงและเข้าใจข้อดีข้อเสียของเทคโนโลยีมากขึ้น`}</p>
          <a
            className="mr-2"
            href={`https://portfolio-nutthawat-nextjs.vercel.app/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-primary">point-system-nuxt</button>
          </a>
          <a
            className="mr-2"
            href={`https://point-system-nuxt.vercel.app/home`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-primary">portfolio</button>
          </a>
          {`user admin:1234`}
          <p>{`การใช้หลายวิธีนี้ช่วยให้ผมสามารถติดตามเทรนด์และเข้าใจการเปลี่ยนแปลงในวงการได้ดีขึ้น และยังช่วยให้พร้อมปรับตัวหรือนำเทคโนโลยีใหม่ ๆ มาปรับใช้ในโปรเจกต์ได้อย่างรวดเร็ว แต่ทุกวันนี้ก็มีอีกหลายอย่างเลยที่จะจ้องติดตาม`}</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <h1 className="text-xl font-bold text-blue-200 mb-5">
            5.ตำแหน่งที่พักเมื่อทำงาน
          </h1>
        </div>
        <div className="collapse-content">
          <p>{`5. อยู่ที่ แถว ม.รังสิต ปทุม ใกล้ หลักหก`}</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <h1 className="text-xl font-bold text-blue-200 mb-5">
            6.ตำแหน่งงานที่อยากทำ และหน้าที่งานที่รับผิดชอบ
          </h1>
        </div>
        <div className="collapse-content">
          <p>1.FrontEnd Developer</p>
          <p>2.Software Engineer</p>
          <p>3.Full Strack</p>
          <p>JavaScript/NextJs/NuxtJs/Angular</p>
          <p>NodeJs Express.js</p>
          <p>PostgreSQL Mongoose</p>
        </div>
      </div>
    </div>
  );
}
