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
  const [Minutes, setMinutes] = useState(Number(minutes || time ? '60' : '12'))

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
      ctx.strokeStyle = '#000000' // Circle color
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

      // คำนวณตำแหน่งปลายหัวลูกศรให้ตรงกับปลายเส้นโค้ง
      const arrowX = centerX + radius * Math.cos(endAngle - Math.PI / 2)
      const arrowY = centerY + radius * Math.sin(endAngle - Math.PI / 2)

      // บันทึกสถานะก่อนทำการหมุน
      ctx.save()

      // ย้ายไปยังตำแหน่งปลายเส้น
      ctx.translate(arrowX, arrowY)

      // วาดเงาชั้นแรก
      ctx.shadowColor = `hsl(${(seconds % Minutes) * 6}, 100%, 50%)` // ใช้สีตามเส้น
      ctx.shadowBlur = 20 // ขนาดเงาชั้นแรก

      // วาดหัวลูกศรเป็นวงกลม (เงาชั้นแรก)
      ctx.beginPath()
      ctx.arc(0, 0, 12, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${(seconds % Minutes) * 6}, 100%, 50%)`
      ctx.fill()

      // วาดเงาชั้นที่สอง
      ctx.shadowBlur = 60 // ขนาดเงาชั้นที่สอง
      ctx.beginPath()
      ctx.arc(0, 0, 12, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${(seconds % Minutes) * 6}, 100%, 50%)`
      ctx.fill()

      // กู้สถานะที่บันทึกไว้
      ctx.restore()
    }

    draw()

    // อัปเดตค่า seconds ทุกครั้งที่ props time, minutes หรือ hours เปลี่ยนแปลง
    setSeconds(Number(minutes ? minutes : time ? time : hours))

    return () => {
      // clearInterval(timerId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [time, minutes, hours])

  return <canvas ref={canvasRef} width={180} height={180} />
}

export default TimerCircle
