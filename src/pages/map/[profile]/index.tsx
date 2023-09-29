import { Carousel } from '@mantine/carousel'
import { Container, Image } from '@mantine/core'
import React from 'react'

export default function profile() {
  return (
    <Container fluid p={0}>
      <Carousel withIndicators height={500} loop withControls={false}>
        <Carousel.Slide>
          <Image
            src="https://via.placeholder.com/1280x500"
            className="w-full"
            fit="contain"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            src="https://via.placeholder.com/1280x500"
            className="w-full"
            fit="contain"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image
            src="https://via.placeholder.com/1280x500"
            className="w-full"
            fit="contain"
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
        <p className="text-lg py-2 text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
          corrupti minima adipisci et aliquam sit similique vero. Nulla ut
          aliquid odio hic quaerat ratione aperiam saepe, magnam excepturi cum.
          Aut delectus ratione dolorum repellat aliquam, velit, impedit
          voluptates assumenda voluptas natus fugiat omnis quo pariatur ab
          quidem minus? Esse, perspiciatis.
        </p>
      </div>
    </Container>
  )
}
