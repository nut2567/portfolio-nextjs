import React from "react";

export default function Question() {
  return (
    <div
      className="border  text-sm md:text-xl rounded-lg shadow p-4 relative bg-[#0000003d] "
      style={{ boxShadow: "#0097ff40 0px -10px 60px inset" }}
    >
      <div className="collapse collapse-plus bg-base-200 mb-4 break-all">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-medium w-fit">
          <h1 className=" font-bold text-blue-200 mb-5 break-words">
            ตำแหน่งงานที่อยากทำ และหน้าที่งานที่รับผิดชอบ
          </h1>
        </div>
        <div className="collapse-content">
          <p>1.FrontEnd Developer (JavaScript/NextJs)</p>
          <p>2.Software Engineer (NodeJs)</p>
          <p>3.Full Strack main front</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title  font-medium">
          <h1 className=" font-bold text-blue-200 mb-5">เงินเดือนที่คาดหวัง</h1>
        </div>
        <div className="collapse-content">
          <p>45000-50000 ต่อรองได้ (01/02/69)</p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title  font-medium">
          <h1 className=" font-bold text-blue-200 mb-5">
            สถานที่พักเมื่อทำงาน
          </h1>
        </div>
        <div className="collapse-content">
          <p>{`อยู่ที่ แถว ม.รังสิต ปทุม ใกล้ หลักหก`}</p>
          <a
            className="mr-2"
            href={`https://www.google.com/maps/d/u/0/edit?mid=1aMmI6qNemVuHLcwy15_XLWBuwHAqejE&usp=sharing`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-primary">www.google.com/maps</button>
          </a>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" className="peer" />
        <div className="collapse-title  font-medium">
          <h1 className=" font-bold text-blue-200 mb-5">
            วิธีการแก้ไขและตรวจสอบหาข้อผิดพลาดของโปรแกรม (Bugs)
          </h1>
        </div>
        <div className="collapse-content">
          <ul className="list-disc list-inside">
            <li>
              <strong>1 ทำความเข้าใจข้อผิดพลาด:</strong>
              อ่านข้อความ error log
              และวิเคราะห์อาการผิดปกติของโปรแกรมเพื่อหาสาเหตุ
            </li>
            <li>
              <strong>2 สร้าง Test Case:</strong>
              ทดสอบด้วย input ต่าง ๆ เพื่อทำให้ข้อผิดพลาดเกิดซ้ำ
              และดูว่าข้อผิดพลาดเกิดขึ้นเมื่อใด
            </li>
            <li>
              <strong>3 ใช้เครื่องมือ Debugger:</strong>
              ตรวจสอบค่าตัวแปรและตั้ง breakpoints
              เพื่อตรวจสอบการทำงานของโปรแกรมในแต่ละขั้นตอน
            </li>
            <li>
              <strong>4 ทำงานร่วมกับทีม:</strong>
              ขอคำแนะนำจากทีมและใช้ Git เพื่อเปรียบเทียบการเปลี่ยนแปลงของโค้ด
            </li>
          </ul>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" className="peer" />
        <div className="collapse-title  font-medium">
          <h1 className=" font-bold text-blue-200 mb-5">
            ปัญหาทางเทคนิคที่ซับซ้อนที่สุดที่คุณเคยเจอ แล้วคุณแก้มันได้ยังไง?
          </h1>
        </div>
        <div className="collapse-content">
          <p className="mb-3">
            ปัญหาทางเทคนิคที่ซับซ้อนที่สุดที่เคยเจอส่วนใหญ่จะเกิดจากการใช้
            Third-party Libraries หรือ APIs
            จากหลายแหล่งรวมเข้าด้วยกันในโปรเจกต์เดียว ซึ่งบางครั้งรายละเอียดของ
            API หรือเอกสารไม่ครบถ้วน
            ทำให้เกิดข้อผิดพลาดหรือความไม่เข้ากันของระบบ
          </p>
          <p className="mb-3">
            ตัวอย่างปัญหาที่พบคือเมื่อใช้ซอฟต์แวร์จากหลายเจ้าเข้าด้วยกัน
            ระบบมีความซับซ้อนเพิ่มขึ้น
            การเขียนโค้ดเพื่อให้แต่ละส่วนทำงานร่วมกันได้อย่างไม่มีปัญหาเป็นเรื่องท้าทาย
            เนื่องจากการอัพเดตเวอร์ชันของไลบรารีต่าง ๆ
            อาจทำให้เกิดข้อผิดพลาดที่ไม่คาดคิด เช่น บางฟีเจอร์ใน API
            ถูกลบออกไปในเวอร์ชันใหม่
          </p>
          <p className="mb-3">
            แนวทางในการแก้ปัญหาคือการประชุมกับทีมบ่อย ๆ โดยใช้วิธีการทำงานแบบ
            Agile แบ่งงานออกเป็น Sprint ย่อย ๆ
            เพื่อให้ติดตามและรายงานผลการทำงานได้ง่าย มีการใช้ระบบควบคุมเวอร์ชัน
            (Git) เพื่อตรวจสอบและเปรียบเทียบโค้ดเก่าและใหม่
            อีกทั้งยังเปิดโอกาสให้สมาชิกทีมช่วยกันเสนอแนะแนวทางแก้ไขปัญหาจากหลายมุมมอง
          </p>
          <p>
            สุดท้าย
            การแก้ปัญหานี้ต้องอาศัยการทดสอบอย่างละเอียดและการทำงานร่วมกันในทีม
            ทำให้ได้โซลูชันที่สามารถแก้ปัญหาได้
            และยังปรับปรุงการทำงานของระบบให้มีเสถียรภาพมากขึ้น
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title  font-medium">
          <h1 className=" font-bold text-blue-200 mb-5">
            วิธีการที่คุณใช้เพื่ออัพเดทเทรนด์และเทคโนโลยีใหม่ๆ ในวงการคืออะไร?
            ลองอธิบาย
          </h1>
        </div>
        <div className="collapse-content">
          <p>
            ในการอัปเดตเทรนด์และเทคโนโลยีใหม่ ๆ ในวงการ
            ผมมักใช้วิธีการหลายทางเพื่อให้แน่ใจว่าครอบคลุมทั้งด้านทฤษฎีและการใช้งานจริง
            วิธีหลัก ๆ ที่ผมใช้ ก็จะมี
          </p>
          <p>
            1 ติดตามข่าวสารจากเว็บไซต์และบล็อกเทคโนโลยีใหม่ ๆ
            ที่กำลังเป็นที่นิยมรวมถึงตัวอย่างการใช้งานจริงที่นักพัฒนาคนอื่นนำมาพูดถึงใน
            YouTube คอนเฟอเรนซ์ต่าง ๆ เช่น Google, Apple, Microsoft
            เป็นแหล่งข้อมูลที่ดีในการอัปเดตเทคโนโลยีล่าสุด
            รวมถึงการพูดคุยเกี่ยวกับแนวโน้มในอนาคต ซึ่งมักมีการอัปเดตฟีเจอร์ใหม่
            ๆ และตัวอย่างการใช้งานที่เเห็นภาพได้ง่าย
          </p>
          <p>
            2 ผมมักจะเรียนรู้เทคโนโลยีใหม่ลองสร้างโปรเจกต์ทดลองขนาดเล็กหรือ POC
            ดูการสอนผ่านคอร์สออนไลน์ใน YouTube หรือบทความ Stack Overflow, Reddit
            เพราะช่วยให้เข้าใจโครงสร้างพื้นฐานได้ดี
            จากนั้นผมจะลองนำเทคโนโลยีเหล่านี้มาสร้างโปรเจกต์ย่อย ๆ
            เพื่อฝึกใช้งานจริง
            ซึ่งเป็นวิธีการที่ช่วยให้จดจำได้ดีกว่าการเรียนรู้ทฤษฎีอย่างเดียว
            วิธีนี้ช่วยให้ได้ประสบการณ์ตรงและเข้าใจข้อดีข้อเสียของเทคโนโลยีมากขึ้น
          </p>
          <div className="">
            <a
              className="mr-2"
              href={`https://portfolio-nutthawat-nextjs.vercel.app/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary">portfolio</button>
            </a>
            <a
              className="mr-2"
              href={`https://learning-management-system-nutdeploys-projects.vercel.app/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary">
                learning-management-system
              </button>
            </a>
            <a
              className="mr-2"
              href={`https://point-system-nuxt.vercel.app/home`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary">point-system-nuxt</button>
            </a>
            <a
              className="mr-2"
              href={`https://point-system-backoffice.vercel.app/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary">
                point-system-backoffice
              </button>
            </a>
          </div>
          user admin:1234
          <p>
            การใช้หลายวิธีนี้ช่วยให้ผมสามารถติดตามเทรนด์และเข้าใจการเปลี่ยนแปลงในวงการได้ดีขึ้น
            และยังช่วยให้พร้อมปรับตัวหรือนำเทคโนโลยีใหม่ ๆ
            มาปรับใช้ในโปรเจกต์ได้อย่างรวดเร็ว
            แต่ทุกวันนี้ก็มีอีกหลายอย่างเลยที่จะจ้องติดตาม
          </p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title  font-medium">
          <h1 className=" font-bold text-blue-200 mb-5">
            หัวข้อต่างๆ ในการพัฒนาเว็บด้วย JavaScript, React, และ Next.js ดังนี้
          </h1>
        </div>
        <div className="collapse-content">
          <details>
            <summary>1. HOF (Higher-Order Function) - 5 topics</summary>
            <p>1. HOF (Higher-Order Function)</p>
            <p>
              ฟังก์ชันที่รับฟังก์ชันเป็นพารามิเตอร์หรือส่งคืนฟังก์ชันเป็นผลลัพธ์
              เช่น .map, .filter, .reduce
            </p>

            <p>2. Higher-Order Component (HOC)</p>
            <p>
              คอมโพเนนต์ที่รับคอมโพเนนต์เป็น input
              และส่งคืนคอมโพเนนต์ใหม่พร้อมคุณสมบัติหรือการทำงานเพิ่มเติม
            </p>

            <p>3. ตัวแปร const, let, และ var</p>
            <p>const ใช้สำหรับค่าคงที่ไม่เปลี่ยนแปลง</p>
            <p>let ใช้สำหรับตัวแปรที่สามารถเปลี่ยนค่าได้ใน block scope</p>
            <p>var มี function scope และสามารถ redeclare ได้</p>

            <p>4. Heap และ Stack</p>
            <p>
              Heap: หน่วยความจำสำหรับเก็บอ็อบเจกต์และข้อมูลที่ไม่สามารถจัดเก็บใน
              Stack ได้
            </p>
            <p>
              Stack: หน่วยความจำที่เก็บข้อมูลตามลำดับการเรียกใช้ เช่น function
              call
            </p>

            <p>5. Array Prototype</p>
            <p>
              เมธอดใน JavaScript ที่มีอยู่ใน Array เช่น .push, .pop, .map,
              .filter, .reduce
            </p>
          </details>

          <details>
            <summary>6. reduce และ map ใน JavaScript - 5 topics</summary>
            <p>6. reduce ใน JavaScript</p>
            <p>
              ใช้สำหรับการสรุปค่าจาก Array เป็นค่าเดียว เช่น
              การหาผลรวมของตัวเลขใน Array
            </p>

            <p>7. map ใน JavaScript</p>
            <p>
              ใช้สำหรับการแปลงข้อมูลใน Array โดยสร้าง Array
              ใหม่ตามผลลัพธ์ที่ได้จากการเรียกใช้ callback function
            </p>

            <p>8. Primitive Types ใน JavaScript</p>
            <p>
              เช่น string, number, boolean, undefined, null, symbol, และ bigint
            </p>

            <p>9. Custom Hook ใน React</p>

            <p>
              Hook ที่สร้างขึ้นเองเพื่อนำ logic
              ที่ใช้ซ้ำในหลายคอมโพเนนต์มารวมไว้ด้วยกัน เช่น การดึงข้อมูลจาก API
            </p>

            <p>10. Rules of Hooks</p>
            <p>ใช้ Hook ในระดับบนสุดของคอมโพเนนต์เท่านั้น</p>
            <p>
              ใช้ Hook ใน React function components หรือ Custom Hooks เท่านั้น
            </p>
          </details>

          <details>
            <summary>11. useContext และ useRef - 5 topics</summary>
            <p>11. useContext และ useRef</p>
            <p>useContext: ใช้สำหรับดึงค่าจาก Context API</p>
            <p>การใช้ useContext ในการแยกหน้าใน Next.js</p>
            <p>
              พิจารณาใช้ useContext เมื่อต้องการแชร์ข้อมูลระหว่างหลายคอมโพเนนต์
              แต่หากเป็นการส่งข้อมูลระหว่าง parent-child ควรใช้ props
            </p>
            <p>
              useRef: ใช้สำหรับเก็บ reference ของ DOM element
              หรือค่าที่ไม่ต้องการให้เปลี่ยนตามการ re-render
            </p>
          </details>

          <details>
            <summary>12. aria-label และการใช้ HTML tags - 5 topics</summary>
            <p>12. aria-label</p>
            <p>
              ใช้เพื่อให้ข้อมูลเพิ่มเติมสำหรับผู้ใช้งานที่ใช้ screen reader
              ช่วยในการเข้าถึงข้อมูลในหน้าเว็บ
            </p>

            <p>
              13. การเลือกใช้ <code>&lt;section&gt;</code> และ{" "}
              <code>&lt;div&gt;</code>
            </p>
            <p>
              <code>&lt;section&gt;</code> เป็น semantic element
              ใช้เมื่อเนื้อหามีความหมาย
            </p>
            <p>
              <code>&lt;div&gt;</code> เป็น non-semantic element
              ใช้สำหรับจัดกลุ่มเนื้อหาโดยไม่เน้นความหมาย
            </p>
            <p>
              การเข้าถึง <code>&lt;section&gt;</code> และ{" "}
              <code>&lt;div&gt;</code>
            </p>
            <p>
              ใช้ querySelector, getElementById ใน JavaScript หรือใช้ useRef ใน
              React
            </p>
          </details>

          <details>
            <summary>
              14. Directive และการใช้ Nullish Coalescing - 5 topics
            </summary>
            <p>14. Directive 'use client' และ 'use server' ใน Next.js 13</p>
            <p>'use client' บอกว่าไฟล์เป็น Client Component</p>
            <p>
              'use server' ใช้ระบุ Server Component (ไม่จำเป็นต้องใช้ถ้าไม่ใช่
              Client Component)
            </p>

            <p>15. Nullish Coalescing (??)</p>
            <p>
              ใช้ในการตรวจสอบค่าว่าง (null หรือ undefined) และใช้ค่า default
              เมื่อค่าที่ตรวจสอบเป็น null หรือ undefined เช่น value ?? 'default'
            </p>

            <p>{`16. Arrow Function (=>) และ Function Declaration`}</p>
            <p>
              Arrow Function: ใช้สำหรับนิพจน์ที่มี scope ของ this ที่คงที่ตาม
              scope ที่ประกาศ
            </p>
            <p>
              Function Declaration: มี hoisting และ this
              อาจเปลี่ยนไปตามบริบทที่เรียกใช้
            </p>

            <p>17. useMemo ใน React</p>
            <p>
              ใช้สำหรับเมโมไลซ์ค่าที่คำนวณจากฟังก์ชัน โดยจะเรียกคำนวณใหม่เมื่อ
              dependencies เปลี่ยนแปลงเท่านั้น
              ช่วยลดการคำนวณที่ไม่จำเป็นและปรับปรุงประสิทธิภาพ
            </p>
            <p>18. ชื่อไฟลใน /app next14 มีชื่ออะไรได้บ้าง</p>
            <p>
              page.js layout.js loading.js error.js head.js route.js
              not-found.js
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
