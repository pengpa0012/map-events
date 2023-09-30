import { Button, Card as MantineCard, Group, Image, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'

export default function Card() {
  const router = useRouter()
  return (
    <MantineCard
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="max-w-[329px]"
    >
      <MantineCard.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </MantineCard.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Title</Text>
        <Text fw={500}>Date</Text>
      </Group>
      <Text size="sm" c="dimmed" className="text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        possimus quo odit optio magnam assumenda provident sapiente. Hic, animi
        ducimus.
      </Text>
      <Button
        variant="filled"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => router.push('/map/123')}
      >
        View
      </Button>
    </MantineCard>
  )
}
