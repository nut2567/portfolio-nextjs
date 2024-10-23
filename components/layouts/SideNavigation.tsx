"use client"; // ทำให้คอมโพเนนต์นี้ทำงานใน Client Side
import { useEffect, useState } from 'react'; // นำเข้า useEffect และ useState จาก react
import Link from "next/link";
import Swal from 'sweetalert2';
import Image from "next/image";
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
            <div className="mx-5">
              <Image
                className=""
                src="/images/nut.jpg"
                alt="me"
                width={90} // กำหนดความกว้างของรูปภาพ
                height={0} // ปล่อยค่า height เป็น auto โดย Next.js จะจัดการเอง
                style={{ height: 'auto' }} // กำหนดให้ความสูงปรับตามสัดส่วนของภาพ
                priority // ใช้ให้ Next.js โหลดภาพนี้เป็น priority
              />
            </div>
          </div></div>

        <nav className="flex flex-col space-y-2">
          <button><Link href="/"><div
            className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
          >
            <div className="flex">
              <i className="material-icons items-center flex ">file_copy</i>

            </div>
          </div></Link></button>

          <button><Link href="/addproduct"><div
            className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
          ><div className="flex">
              <i className="material-icons items-center flex ">account_tree</i>

            </div>
          </div></Link></button>


          <button><Link href="/profile">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
            ><div className="flex">
                <i className="material-icons items-center flex ">code_off</i>

              </div>
            </div></Link></button>
          <button><Link href="/profile">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
            ><div className="flex">
                <i className="material-icons items-center flex ">perm_contact_calendar</i>

              </div>
            </div></Link></button>

          <button><Link href="/dashboard">
            <div className="flex items-center p-2 hover:bg-gray-700 rounded justify-center"
            ><div className="flex">
                <i className="material-icons items-center flex ">dashboard</i>

              </div></div></Link></button>
        </nav>
      </div>
    </div>
  )

}