import { API } from '@/util/fetch'
import { notifications } from '@mantine/notifications'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Map = dynamic(() => import('../../components/Map'), { ssr: false })
export default function map() {
  useEffect(() => {
    API(`${process.env.NEXT_PUBLIC_ENDPOINT}/post/getAllPost`, {
      method: 'POST',
      headers: {
        'x-access-token': 'TOKEN',
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
  }, [])
  return <Map />
}
