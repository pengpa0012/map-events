import { API } from '@/util/fetch'
import { Carousel } from '@mantine/carousel'
import { Button, Container, Image, Input, Avatar } from '@mantine/core'
import React, { useEffect } from 'react'

export default function profile() {
  // useEffect(() => {
  //   API('/post/getPost').then((data) => console.log(data))
  // }, [])
  return (
    <Container className="pt-10 pb-20">
      <Carousel withIndicators height={500} loop withControls>
        <Carousel.Slide>
          <Image
            src="https://via.placeholder.com/1280x500"
            className="w-full h-full rounded-md"
            fit="cover"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            src="https://via.placeholder.com/1280x500"
            className="w-full h-full rounded-md"
            fit="cover"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            src="https://via.placeholder.com/1280x500"
            className="w-full h-full rounded-md"
            fit="cover"
          />
        </Carousel.Slide>
      </Carousel>
      <div className="px-4">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl">Title</h2>
          <div className="flex gap-5">
            <p>Date</p>
            <p>Time</p>
          </div>
        </div>
        <p className="text-lg py-2 text-gray-600 text-justify">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
          corrupti minima adipisci et aliquam sit similique vero. Nulla ut
          aliquid odio hic quaerat ratione aperiam saepe, magnam excepturi cum.
          Aut delectus ratione dolorum repellat aliquam, velit, impedit
          voluptates assumenda voluptas natus fugiat omnis quo pariatur ab
          quidem minus? Esse, perspiciatis.
        </p>
        <div className="mt-10">
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
        </div>
      </div>
    </Container>
  )
}
