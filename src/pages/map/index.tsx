import { API } from '@/util/fetch'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Map = dynamic(() => import('../../components/Map'), { ssr: false })
export default function map() {
  // useEffect(() => {
  //   API('/post/getAllPost').then((data) => console.log(data))
  // }, [])
  return <Map />
}
