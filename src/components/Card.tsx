import { Button, Card as MantineCard, Group, Image, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React from 'react'

export default function Card({ details }: { details: any }) {
  const router = useRouter()
  return (
    <MantineCard
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="min-w-[300px] flex-1"
    >
      <MantineCard.Section>
        <Image
          src={details.images[0] || 'https://via.placeholder.com/250x250'}
          alt="Norway"
          fit="contain"
          className="w-full h-[250px] p-4"
        />
      </MantineCard.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{details.title}</Text>
        <Text size="xs">
          {dayjs(details.date_created).format('MMMM DD, YYYY hh:mma')}
        </Text>
      </Group>
      <Text size="sm" c="dimmed" className="text-justify">
        {details.description}
      </Text>
      <Button
        variant="filled"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => router.push(`/map/${details._id}`)}
      >
        View
      </Button>
    </MantineCard>
  )
}
