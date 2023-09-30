import {
  Container,
  Group,
  Image,
  Text,
  Badge,
  Button,
  Tabs,
} from '@mantine/core'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Card = dynamic(() => import('../components/Card'), { ssr: false })

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.push('/login')
  }, [])

  const Feed = ({ array }: { array: any[] }) => (
    <Group wrap="wrap" gap={30}>
      {array.map((el, i) => (
        <Card key={`card-${i}`} />
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
