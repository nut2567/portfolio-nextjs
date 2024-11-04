'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { Card } from './card'
import { Button } from '../ui/button'
import dynamic from 'next/dynamic'

const TimerCircle = dynamic(() => import('./TimerCircle'), { ssr: false })
const Countdown = dynamic(() => import('./time'), { ssr: false })

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  if (!currentTime) return null

  return (
    <div className="flex">
      <h2 className="font-sans text-[#8b5cf6] text-3xl font-bold mb-5">
        {currentTime.toLocaleDateString('th-TH', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </h2>
    </div>
  )
}

const DigitalClockPage = () => {
  const [is24Hour, setIs24Hour] = useState<boolean>(true)

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
          <div className="text-4xl font-extrabold text-gray-900 animate-pulse">
            <CurrentTime />
          </div>
          <div className="my-5 ">
            <Countdown />
          </div>
        </div>
      </Card>
      {/* <TimerCircle /> */}
    </div>
  )
}

export default DigitalClockPage
