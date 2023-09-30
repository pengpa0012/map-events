import { Container } from '@mantine/core'
import dynamic from 'next/dynamic'
import React from 'react'
import Form from './Form'

const Map = dynamic(() => import('../../components/Map'), { ssr: false })

export default function report() {
  return (
    <Container className="py-20 px-4" size={1440}>
      <Map report />
      <Form />
    </Container>
  )
}
