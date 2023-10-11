import React from 'react'
import {
  Flex,
  Button,
  TextInput,
  PasswordInput,
  Container,
  Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { useLocalStorage } from '@mantine/hooks'
type FormValues = {
  username: String
  password: String
  confirm_password?: String
}

export default function signup({ isSignup }: { isSignup?: boolean }) {
  const [, setID] = useLocalStorage({ key: 'id' })
  const [, setToken] = useLocalStorage({ key: 'token' })
  const form = useForm<FormValues>({
    validate: {
      username: (value) => (!value ? 'Enter Username' : null),
      password: (value) => (!value ? 'Enter Password' : null),
      confirm_password: (value, values) =>
        !isSignup
          ? null
          : value !== values.password
          ? 'Password does not match'
          : null,
    },
  })
  const router = useRouter()

  const onSubmit = (values: FormValues) => {
    form.validate()
    const { username, password } = values
    axios
      .post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/user/${
          isSignup ? 'signup' : 'login'
        }`,
        {
          username,
          password,
        }
      )
      .then((data) => {
        if (!isSignup) {
          setID(data.data.result[0]._id)
          setToken(data.data.accessToken)
        }
        router.push(`${isSignup ? '/login' : '/'}`)
      })
      .catch((err) => {
        notifications.show({
          title: 'Error',
          message: err.message,
          color: 'red',
        })
      })
  }

  return (
    <Container size="xs">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Flex
          justify="center"
          direction="column"
          className="min-h-screen w-full"
          gap={20}
        >
          <Text ta="center" className="text-3xl">
            Map Events
          </Text>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Enter Username"
            {...form.getInputProps('username')}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Enter Password"
            {...form.getInputProps('password')}
          />
          {isSignup && (
            <PasswordInput
              withAsterisk
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              {...form.getInputProps('confirm_password')}
            />
          )}
          {!isSignup && (
            <Button variant="light" onClick={() => router.push('/signup')}>
              Create Account
            </Button>
          )}
          <Button type="submit">{isSignup ? 'Signup' : 'Login'}</Button>
        </Flex>
      </form>
    </Container>
  )
}
