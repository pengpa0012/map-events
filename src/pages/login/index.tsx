import React from 'react'
import { Flex, Button, TextInput, PasswordInput, Container, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function login () {
  const form = useForm({});
  
  return (
    <Container size="xs">     
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Flex
          justify="center"
          direction="column"
          className="min-h-screen w-full"
          gap={20}
        >
          <Text ta="center" className='text-3xl'>Map Events</Text>                                  
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Enter Username"
            {...form.getInputProps('username')}

          />
          <PasswordInput
            label="Password"
            placeholder="Enter Password"
          />    
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </Container>
  )
}
