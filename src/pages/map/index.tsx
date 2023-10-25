import { useLocalStorage } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Map = dynamic(() => import('../../components/Map'), { ssr: false })
export default function map() {
  const [token, _] = useLocalStorage({ key: 'token' })

  useEffect(() => {
    if (token == undefined) return
    axios
      .post(`${process.env.NEXT_PUBLIC_ENDPOINT}/post/getAllPost`, {
        headers: {
          'x-access-token': token,
        },
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        notifications.show({
          title: 'Error',
          message: err.message,
          color: 'red',
        })
      })
  }, [token])
  return <Map />
}
