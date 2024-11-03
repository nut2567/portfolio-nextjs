'use client'
import { useState, useEffect } from 'react'

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // ตั้งค่า interval เพื่ออัปเดตเวลาในทุกๆ วินาที
    const timerId = setInterval(() => {
      setCurrentTime(new Date()) // อัปเดตเวลาใหม่
    }, 1000)

    // Clean-up ฟังก์ชัน: ล้าง interval เมื่อ component ถูก unmount
    return () => {
      clearInterval(timerId)
    }
  }, []) // [] ทำให้ useEffect นี้ทำงานครั้งเดียวเมื่อ component ถูก mount

  return (
    <div className="flex">
      <h2 className="font-sans text-[#8b5cf6] text-3xl font-bold mb-5">
        {currentTime.toLocaleDateString('th-TH', {
          weekday: 'long', // แสดงชื่อวัน
          year: 'numeric', // แสดงปี
          month: 'long', // แสดงเดือนเป็นชื่อภาษาไทย
          day: 'numeric', // แสดงวันที่
        })}{' '}
        เวลา:{' '}
        {currentTime.toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false, // เวลาแบบ 24 ชั่วโมง
        })}
      </h2>
    </div>
  )
}

function Time() {
  return (
    <div>
      <div>{<CurrentTime />}</div>
    </div>
  )
}

export default Time
