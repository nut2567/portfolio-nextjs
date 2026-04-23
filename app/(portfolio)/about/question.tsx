import React from "react";

interface TopicCardProps {
  title: string;
  description: string;
  tag?: string;
}

function TopicCard({ title, description, tag }: TopicCardProps) {
  return (
    <div className="bg-base-300 p-4 rounded-lg border border-base-200 hover:border-primary/30 transition-colors">
      <h3 className="font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-base-content/80">{description}</p>
      {tag && <span className="badge badge-outline badge-sm mt-2">{tag}</span>}
    </div>
  );
}

function TopicSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="collapse collapse-plus bg-base-200 mb-6">
      <input type="radio" name="my-accordion-3" />
      <div className="collapse-title">
        <h2 className="text-lg font-bold text-blue-200 flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {title}
        </h2>
      </div>
      <div className="collapse-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Question() {
  return (
    <div
      className="border text-sm md:text-xl rounded-lg shadow p-4 relative bg-[#0000003d]"
      style={{ boxShadow: "#0097ff40 0px -10px 60px inset" }}
    >
      <div className="collapse collapse-plus bg-base-200 mb-4 break-all">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-medium w-fit">
          <h1 className="font-bold text-blue-200 mb-5 break-words">
            ตำแหน่งงานที่อยากทำ และหน้าที่งานที่รับผิดชอบ
          </h1>
        </div>
        <div className="collapse-content">
          <div className="flex flex-wrap gap-3">
            <span className="badge badge-primary badge-lg">
              FrontEnd Developer
            </span>
            <span className="badge badge-secondary badge-lg">
              JavaScript/NextJs
            </span>
            <span className="badge badge-accent badge-lg">
              Software Engineer
            </span>
            <span className="badge badge-outline badge-lg">NodeJs</span>
          </div>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title">
          <h1 className="font-bold text-blue-200 mb-5">เงินเดือนที่คาดหวัง</h1>
        </div>
        <div className="collapse-content">
          <p className="text-2xl font-bold text-success">
            45,000 - 50,000 บาท/เดือน
          </p>
          <p className="text-sm text-base-content/60 mt-1">(23/04/69)</p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title">
          <h1 className="font-bold text-blue-200 mb-5">สถานที่พักเมื่อทำงาน</h1>
        </div>
        <div className="collapse-content">
          <a
            href="https://www.google.com/maps/d/u/0/edit?mid=1aMmI6qNemVuHLcwy15_XLWBuwHAqejE&usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-primary">Google Maps</button>
          </a>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" className="peer" />
        <div className="collapse-title">
          <h1 className="font-bold text-blue-200 mb-5">
            วิธีการแก้ไขและตรวจสอบข้อผิดพลาด (Bugs)
          </h1>
        </div>
        <div className="collapse-content">
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="badge badge-success">1</span>
              <div>
                <strong>ทำความเข้าใจข้อผิดพลาด</strong>
                <p className="text-sm text-base-content/70">
                  อ่าน error log และวิเคราะห์อาการผิดปกติ
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="badge badge-success">2</span>
              <div>
                <strong>สร้าง Test Case</strong>
                <p className="text-sm text-base-content/70">
                  ทดสอบด้วย input ต่างๆ เพื่อทำให้เกิดซ้ำ
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="badge badge-success">3</span>
              <div>
                <strong>ใช้เครื่องมือ Debugger</strong>
                <p className="text-sm text-base-content/70">
                  ตรวจสอบค่าตัวแปรและ breakpoints
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="badge badge-success">4</span>
              <div>
                <strong>ทำงานร่วมกับทีม</strong>
                <p className="text-sm text-base-content/70">
                  ขอคำแนะนำและใช้ Git เปรียบเทียบโค้ด
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-200 mb-4">
        <input type="radio" name="my-accordion-3" className="peer" />
        <div className="collapse-title">
          <h1 className="font-bold text-blue-200 mb-5">
            ปัญหาทางเทคนิคที่ซับซ้อนที่สุดที่เคยเจอ?
          </h1>
        </div>
        <div className="collapse-content">
          <div className="space-y-4">
            <p>
              ปัญหาส่วนใหญ่เกิดจากการใช้ Third-party Libraries หรือ APIs
              หลายตัวรวมกัน ทำให้เกิดความไม่เข้ากันของระบบ
            </p>
            <p>
              วิธีแก้: ใช้ Agile ความถี่งานเป็น Sprint ย่อยๆ ประชุมทีมบ่อยๆ
              และใช้ Git ตรวจสอบการเปลี่ยนแปลง
            </p>
          </div>
        </div>
      </div>

      <TopicSection title="JavaScript Fundamentals" icon="📚">
        <TopicCard
          title="HOF (Higher-Order Function)"
          description="ฟังก์ชันที่รับ/ส่งคืนฟังก์ชัน เช่น map, filter, reduce"
          tag="Core"
        />
        <TopicCard
          title="const, let, var"
          description="const=คงที่, let=block scope, var=function scope"
          tag="Basic"
        />
        <TopicCard
          title="Heap & Stack"
          description="Heap=objects, Stack=function calls"
          tag="Memory"
        />
        <TopicCard
          title="Array Methods"
          description="push, pop, map, filter, reduce"
          tag="Core"
        />
      </TopicSection>

      <TopicSection title="React Patterns" icon="⚛️">
        <TopicCard
          title="Higher-Order Component (HOC)"
          description="คอมโพเนนต์ที่รับคอมโพเนนต์และส่งคืนคอมโพเนนต์ใหม่"
          tag="Pattern"
        />
        <TopicCard
          title="Custom Hook"
          description="Hook ที่สร้างเองเพื่อ reuse logic"
          tag="Hook"
        />
        <TopicCard
          title="Rules of Hooks"
          description="เรียกในระดับบนสุด, ใช้ใน function component เท่านั้น"
          tag="Rule"
        />
        <TopicCard
          title="useContext"
          description="ดึงค่าจาก Context API"
          tag="Hook"
        />
        <TopicCard
          title="useRef"
          description="เก็บ reference ของ DOM หรือค่าที่ไม่ต้องการ re-render"
          tag="Hook"
        />
        <TopicCard
          title="useMemo"
          description="เมโมไลซ์ค่าที่คำนวณ"
          tag="Performance"
        />
      </TopicSection>

      <TopicSection title="Next.js" icon="🚀">
        <TopicCard
          title="'use client' / 'use server'"
          description="ระบุ Client หรือ Server Component"
          tag="Next.js 13+"
        />
        <TopicCard
          title="Nullish Coalescing (??)"
          description="ตรวจ null/undefined และค่า default"
          tag="Operator"
        />
        <TopicCard
          title="Arrow Function"
          description="this คงที่ตาม scope ที่ประกาศ"
          tag="Syntax"
        />
        <TopicCard
          title="File Conventions"
          description="page, layout, loading, error, head, route, not-found"
          tag="Next.js 14"
        />
      </TopicSection>

      <TopicSection title="Accessibility & HTML" icon="♿">
        <TopicCard
          title="aria-label"
          description="ข้อมูลเพิ่มเติมสำหรับ screen reader"
          tag="A11y"
        />
        <TopicCard
          title="&lt;section&gt; vs &lt;div&gt;"
          description="section=semantic, div=non-semantic"
          tag="HTML"
        />
        <TopicCard
          title="DOM Selection"
          description="querySelector, getElementById, useRef"
          tag="DOM"
        />
      </TopicSection>
    </div>
  );
}
