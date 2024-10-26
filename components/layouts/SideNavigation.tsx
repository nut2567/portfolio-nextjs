"use client"; // ทำให้คอมโพเนนต์นี้ทำงานใน Client Side
import { useEffect, useState } from 'react'; // นำเข้า useEffect และ useState จาก react
import Link from "next/link";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function SideNavigation({ }) {

  const [sidebarOpen2, setSidebarOpen2] = useState(); // ตัวแปรเพื่อจัดการการเปิด/ปิดของ Sidebar

  const router = useRouter();
  const toggleSidebar = () => {
    // ฟังก์ชันสำหรับเปิด/ปิด Sidebar
  };


  // ฟังก์ชัน Logout
  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      text: "ออกจากบบ",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    }).then((result) => {
      if (result.isConfirmed) {

        // เปลี่ยนเส้นทางกลับไปยังหน้าล็อกอิน
      }
    });
  }

  return (
    <div >
      <div className={`z-50 fixed inset-0 w-12 bg-slate-800 text-white flex flex-col transform  
      duration-600 transition-all`}   >
        <div className="p-4 text-lg font-bold text-center">
          <div className="border shadow-xl border-indigo-500/50">
            
          </div></div>

        <nav className="flex flex-col space-y-2">
          <button title={`Home`}><Link href="/"><div
            className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
          >
            <div className="flex">
              <i className="material-icons items-center flex ">file_copy</i>

            </div>
          </div></Link></button>

          <button title={`GitHub`}><Link href="/git"><div
            className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
          ><div className="flex">
              <i className="material-icons items-center flex ">account_tree</i>

            </div>
          </div></Link></button>


          <button title={`Projects`}><Link href="/projects">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
            ><div className="flex">
                <i className="material-icons items-center flex ">code_off</i>

              </div>
            </div></Link></button>
          <button title={`About`}><Link href="/about">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
            ><div className="flex">
                <i className="material-icons items-center flex ">perm_contact_calendar</i>

              </div>
            </div></Link></button>

          <button title={`Contact`}><Link href="/contact">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
            ><div className="flex">
                <i className="material-icons items-center flex ">dashboard</i>

              </div></div></Link></button>
        </nav>
      </div>
    </div>
  )

}