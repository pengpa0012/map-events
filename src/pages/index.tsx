import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push('/login')
  }, [])

  return (
    <main>
      <h1>HOMEPAGE</h1>
    </main>
  )
}
