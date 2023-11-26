import { Container, Grid, Group, Image, Tabs } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
const Card = dynamic(() => import('../../components/Card'), { ssr: false })

export default function profile() {
  const [token, _] = useLocalStorage({ key: 'token' })
  const [id, setID] = useLocalStorage({ key: 'id' })
  const [profile, setProfile] = useState({
    name: '',
    posts: [],
  })
  const router = useRouter()

  useEffect(() => {
    if (!token) return
    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/user/getUser?id=${id}`, {
        headers: {
          'x-access-token': token,
        },
      }),
      axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/post/getUserPosts?id=${id}`,
        {
          headers: {
            'x-access-token': token,
          },
        }
      ),
    ])
      .then(([user, posts]) => {
        setProfile({
          name: user.data.result.username,
          posts: posts.data.result,
        })
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

  return (
    <Container className="pt-10 pb-20" size={1440}>
      <div className="flex flex-col items-center justify-center gap-5 mb-20">
        <Image
          src="https://via.placeholder.com/200x200"
          fit="cover"
          className="rounded-full max-w-[200px]"
        />
        <h2 className="text-3xl">{profile.name}</h2>
      </div>
      <Tabs defaultValue="All">
        <Tabs.List className="mb-10">
          <Tabs.Tab value="All">Reported Events</Tabs.Tab>
          {/* <Tabs.Tab value="Following">Profile Details</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="All">
          <Grid>
            {profile.posts.map((el, i) => (
              <Grid.Col span={12} key={`card-${i}`}>
                <Card details={el} />
              </Grid.Col>
            ))}
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Following">
          <ul>
            <li>Name</li>
            <li>Total Post</li>
            <li>Total Following</li>
          </ul>
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}
