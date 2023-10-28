import { Button, Card as MantineCard, Group, Image, Text } from '@mantine/core'
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
      className="max-w-[329px]"
    >
      <MantineCard.Section>
        <Image src={details.images[0]} height={160} alt="Norway" />
      </MantineCard.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{details.title}</Text>
        <Text fw={500}>{details.date}</Text>
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
