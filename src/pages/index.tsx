import {
  Card,
  Container,
  Group,
  Image,
  Text,
  Badge,
  Button,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push('/login')
  }, [])

  return (
    <Container className="py-20 px-4" size={1440}>
      <Text className="text-2xl font-bold" mb={20}>
        FEED
      </Text>
      <Group wrap="wrap" gap={30}>
        {[1, 2, 3, 4, 5].map((el, i) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={`card-${i}`}
            className="max-w-[350px]"
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Norway"
              />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Norway Fjord Adventures</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
            </Text>
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
            </Button>
          </Card>
        ))}
      </Group>
    </Container>
  )
}
