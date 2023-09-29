import {
  Input,
  Textarea,
  Group,
  Text,
  rem,
  Button,
  Image,
  Container,
} from '@mantine/core'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { LatLng } from 'leaflet'
import { DatePickerInput, TimeInput } from '@mantine/dates'

const Map = dynamic(() => import('../../components/map'), { ssr: false })

export default function report() {
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<LatLng>()

  console.log(selectedPosition)

  return (
    <Container className="py-20 px-4" size={1440}>
      <Map report setSelectedPosition={setSelectedPosition} />
      <Dropzone
        multiple
        onDrop={(files) => {
          const blob = window.URL.createObjectURL(files[0])
          setPreviewImages((prev) => [...prev, blob])
          setImages((prev) => [...prev, files[0]])
        }}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className="mt-10"
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <div className="w-full">
            {images.length <= 0 ? (
              <Text size="xl" className="text-center" inline>
                Drag images here or click to select files
              </Text>
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {previewImages.map((img, i) => (
                  <Image
                    src={img}
                    key={`img-${i}`}
                    className="w-[200px] h-[200px]"
                    fit="cover"
                  />
                ))}
              </div>
            )}
          </div>
        </Group>
      </Dropzone>
      <div className="p-2 flex flex-col gap-5">
        <Input.Wrapper label="Title">
          <Input placeholder="Enter title" />
        </Input.Wrapper>
        <Textarea
          placeholder="Enter description"
          label="Description"
          styles={{ input: { height: 150 } }}
        />
        <Group grow>
          <DatePickerInput label="Date" placeholder="Pick date" />
          <TimeInput label="Time" />
        </Group>
        <Button variant="filled">Report Event</Button>
      </div>
    </Container>
  )
}
