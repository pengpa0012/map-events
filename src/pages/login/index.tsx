import React from 'react'
import { Container } from '@mantine/core'
import { useForm } from '@mantine/form'
import Form from '@/components/Form'

export default function login() {
  return (
    <Container size="xs">
      <Form isSignup={false} />
    </Container>
  )
}
