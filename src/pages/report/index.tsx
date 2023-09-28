import { Input, Textarea, Group, Text, rem, Button, Image } from '@mantine/core'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
const Map = dynamic(() => import('../../components/map'), { ssr: false })

export default function report() {
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  return (
    <div className="pb-20">
      <Map report />
      <Dropzone
        multiple
        onDrop={(files) => {
          const blob = window.URL.createObjectURL(files[0])
          setPreviewImages((prev) => [...prev, blob])
          setImages((prev) => [...prev, files[0]])
        }}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className="border border-gray-100"
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <div>
            {images.length <= 0 ? (
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
            ) : (
              <div className="flex flex-wrap gap-2">
                {previewImages.map((img, i) => (
                  <Image
                    src={img}
                    key={`img-${i}`}
                    className="w-[200px] h-[200px]"
                  />
                ))}
              </div>
            )}
          </div>
        </Group>
      </Dropzone>
      <div className="p-2 flex flex-col gap-2">
        <Input placeholder="Name of event" />
        <Textarea
          placeholder="Event description"
          size="md"
          styles={{ input: { height: 150 } }}
        />
        <Button variant="filled">Report Event</Button>
      </div>
    </div>
  )
}
