'use client'
import React, { useEffect, useRef, useState } from 'react'

// กำหนด PageProps
interface PageProps {
  time: string // เปลี่ยนตาม props ที่คุณต้องการ
  minutes: string
  hours: string
}
const TimerCircle: React.FC<PageProps> = ({ time, minutes, hours }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [seconds, setSeconds] = useState(
    Number(minutes ? minutes : time ? time : hours)
  )
  const [Minutes, setMinutes] = useState(Number(minutes || time ? '60' : '24'))
  const [Mutitime, setMutitime] = useState(
    Number(minutes ? '60' : hours ? '3600' : '1')
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return // ตรวจสอบว่า canvas ไม่เป็น null

    const ctx = canvas.getContext('2d')
    if (!ctx) return // ตรวจสอบว่า ctx ไม่เป็น null

    let animationFrameId: number

    const draw = () => {
      const radius = 60
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = '#ccc' // Circle color
      ctx.lineWidth = 8
      ctx.stroke()

      // Calculate the end angle based on seconds
      const endAngle = ((seconds % Minutes) * (Math.PI * 2)) / Minutes

      // Draw the progress line
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle - Math.PI / 2)
      ctx.strokeStyle = `hsl(${(seconds % Minutes) * 6}, 100%, 50%)` // Change color based on seconds
      ctx.lineWidth = 8
      ctx.stroke()

      // Request next frame
      animationFrameId = requestAnimationFrame(draw)
      // คำนวณตำแหน่งของหัวลูกศรให้หันเข้ามาใกล้ศูนย์กลาง
      const arrowRadius = radius - 5 // ลดระยะจากศูนย์กลางเล็กน้อยเพื่อให้ลูกศรหันเข้า

      const arrowX = centerX + arrowRadius * Math.cos(endAngle - Math.PI / 2)
      const arrowY = centerY + arrowRadius * Math.sin(endAngle - Math.PI / 2)

      // วาดหัวลูกศรให้ใหญ่ขึ้น
      ctx.beginPath()
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(
        arrowX - 10 * Math.cos(endAngle - Math.PI / 2 + 0.6), // ปรับขนาดให้ใหญ่ขึ้น
        arrowY - 10 * Math.sin(endAngle - Math.PI / 2 + 0.6)
      )
      ctx.lineTo(
        arrowX - 10 * Math.cos(endAngle - Math.PI / 2 - 0.6), // ปรับขนาดให้ใหญ่ขึ้น
        arrowY - 10 * Math.sin(endAngle - Math.PI / 2 - 0.6)
      )
      ctx.closePath()
      ctx.fillStyle = `hsl(${(seconds % Minutes) * 6}, 100%, 50%)` // เปลี่ยนสีตาม seconds
      ctx.fill()
    }

    draw()

    // Update seconds every second
    const timerId = setInterval(() => {
      setSeconds((prev) => (prev + 1) % Minutes)
    }, 1000 * Mutitime)

    return () => {
      clearInterval(timerId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [seconds])

  return <canvas ref={canvasRef} width={150} height={150} />
}

export default TimerCircle
