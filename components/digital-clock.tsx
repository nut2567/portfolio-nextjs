'use client'

import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Card } from './card'
import { Button } from './ui/button'

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

  if (!currentTime) return null

  return (
    <div className="flex">
      <h2 className="font-sans text-[#8b5cf6] text-3xl font-bold mb-5">
        {currentTime.toLocaleDateString('th-TH', {
          weekday: 'long', // แสดงชื่อวัน
          year: 'numeric', // แสดงปี
          month: 'long', // แสดงเดือนเป็นชื่อภาษาไทย
          day: 'numeric', // แสดงวันที่
        })}
      </h2>
    </div>
  )
}

const DigitalClockPage = () => {
  //states
  const [time, setTime] = useState<Date>(new Date())
  const [is24Hour, setIs24Hour] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(true)
  //methods
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(interval)
  }, [])

  const formattedTime = useMemo<string>(() => {
    if (!mounted) {
      return ''
    }
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, '0')
      : (time.getHours() % 12 || 12).toString().padStart(2, '0')
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const seconds = time.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }, [time, is24Hour, mounted])

  return (
    <div
      className="flex items-center justify-center border bg-gradient-to-r from-[#261139] via-indigo-500 to-[#4e1431] py-5 mb-5 -mx-12 shadow relative "
      style={{ boxShadow: 'rgba(0, 0, 0, 0.5) 0px -10px 60px inset' }}
    >
      <Card
        className="p-8 shadow-2xl rounded-3xl bg-white bg-opacity-80 backdrop-blur-md"
        style={{ boxShadow: '#6366f1 0px -10px 60px inset' }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-extrabold text-gray-900 mb-2 animate-pulse">
            <div>{<CurrentTime />}</div>
          </div>
          <div className="text-7xl font-extrabold tracking-wider text-gray-800 mb-4 animate-fade-in">
            {formattedTime}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DigitalClockPage
