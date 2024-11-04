import { useState, useEffect, useMemo } from 'react'

export function useRealTime(is24Hour = true) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(intervalId)
  }, [])

  const formattedTime = useMemo(() => {
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, '0')
      : (time.getHours() % 12 || 12).toString().padStart(2, '0')
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const seconds = time.getSeconds().toString().padStart(2, '0')

    return { hours, minutes, seconds }
  }, [time, is24Hour])

  return formattedTime
}
