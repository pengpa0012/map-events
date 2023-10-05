import React from 'react'
import { Container } from '@mantine/core'
import Form from '@/components/Form'

export default function signup() {
  return (
    <Container size="xs">
      <Form isSignup />
    </Container>
  )
}
