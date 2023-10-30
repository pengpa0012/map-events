import { Container, Group, Text, Tabs } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconBan } from '@tabler/icons-react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Card = dynamic(() => import('../components/Card'), { ssr: false })

export default function Home() {
  const [token, _] = useLocalStorage({ key: 'token' })
  const [posts, setPosts] = useState([])
  const router = useRouter()
  useEffect(() => {
    if (!token) {
    } else
      axios
        .get(`${process.env.NEXT_PUBLIC_ENDPOINT}/post/getAllPost`, {
          headers: {
            'x-access-token': token,
          },
        })
        .then((data) => {
          setPosts(data.data.result)
        })
        .catch((err) => {
          if (!err.auth) router.push('/login')
          else
            notifications.show({
              title: 'Error',
              message: err.message,
              color: 'red',
            })
        })
  }, [token])
  const Feed = ({ array }: { array: any[] }) => (
    <Group wrap="wrap" gap={30}>
      {array.map((el, i) => (
        <Card key={`card-${i}`} details={el} />
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
          {/* <Tabs.Tab value="Following">Following</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="All">
          {posts.length > 0 ? (
            <Feed array={posts} />
          ) : (
            <div className="text-center flex flex-col items-center">
              <IconBan size={48} strokeWidth={2} color={'gray'} />
              <p className="text-2xl text-gray-400">No Data</p>
            </div>
          )}
        </Tabs.Panel>
        {/* <Tabs.Panel value="Following">
          {posts.length > 0 ? (
            <Feed array={posts} />
          ) : (
            <div className="text-center flex flex-col items-center">
              <IconBan size={48} strokeWidth={2} color={'gray'} />
              <p className="text-2xl text-gray-400">No Data</p>
            </div>
          )}
        </Tabs.Panel> */}
      </Tabs>
    </Container>
  )
}
