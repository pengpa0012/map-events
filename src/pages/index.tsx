import {
  Card,
  Container,
  Group,
  Image,
  Text,
  Badge,
  Button,
  Tabs,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push('/login')
  }, [])

  const Feed = ({ array }: { array: any[] }) => (
    <Group wrap="wrap" gap={30}>
      {array.map((el, i) => (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          key={`card-${i}`}
          className="max-w-[329px]"
        >
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Title</Text>
            <Text fw={500}>Date</Text>
          </Group>
          <Text size="sm" c="dimmed" className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            possimus quo odit optio magnam assumenda provident sapiente. Hic,
            animi ducimus.
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
        </Card>
      ))}
    </Group>
  )

  return (
    <Container className="py-20 px-4" size={1440}>
      <Text className="text-2xl font-bold" mb={20}>
        FEED
      </Text>
      <Tabs defaultValue="All">
        <Tabs.List className="mb-10">
          <Tabs.Tab value="All">All</Tabs.Tab>
          <Tabs.Tab value="Following">Following</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="All">
          <Feed array={[1, 2, 3, 4, 5]} />
        </Tabs.Panel>
        <Tabs.Panel value="Following">
          <Feed array={[1, 2, 3]} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}
