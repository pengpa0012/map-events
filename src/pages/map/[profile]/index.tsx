import { Carousel } from '@mantine/carousel'
import { Button, Container, Image, Input, Avatar } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function profile() {
  const [token, _] = useLocalStorage({ key: 'token' })
  const [profile, setProfile] = useState<any>({})
  const router = useRouter()
  useEffect(() => {
    if (token == undefined || router.query.profile == undefined) return
    axios
      .get(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/post/getPost?id=${router.query.profile}`,
        {
          headers: {
            'x-access-token': token,
          },
        }
      )
      .then((data) => {
        setProfile(data.data.result[0])
      })
      .catch((err) => {
        notifications.show({
          title: 'Error',
          message: err.message,
          color: 'red',
        })
      })
  }, [token, router.query.profile])
  return (
    <Container className="pt-10 pb-20">
      <Carousel withIndicators height={500} loop withControls>
        {profile.images?.map((el: any) => (
          <Carousel.Slide>
            <Image
              src={el}
              className="w-full h-full rounded-md"
              fit="contain"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <div className="px-4">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl">{profile.title}</h2>
          <div className="flex gap-5">
            <p>{profile.date_created}</p>
          </div>
        </div>
        <p className="text-lg py-2 text-gray-600 text-justify">
          {profile.description}
        </p>
        {/* <div className="mt-10">
          <h3 className="mb-4 text-">Comments</h3>
          <div className="flex flex-col gap-5">
            <div className="p-2 rounded-md flex items-center gap-5">
              <Avatar src="https://via.placeholder.com/50x50" alt="Username" />
              <p className="text-sm text-gray-800 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, provident asperiores! Blanditiis, earum quisquam
                perspiciatis cupiditate fuga facere ratione voluptatum!
              </p>
            </div>
            <div className="flex gap-2">
              <Input className="w-full" placeholder="Enter Comment..." />
              <Button size="sm" variant="filled">
                Comment
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </Container>
  )
}
