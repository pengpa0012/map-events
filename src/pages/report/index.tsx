import { Input, Textarea, Group, Text, rem, Button } from '@mantine/core'
import dynamic from 'next/dynamic'
import React from 'react'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
const Map = dynamic(() => import('../../components/map'), { ssr: false })

export default function report() {
  return (
    <div className="pb-20">
      <Map report />
      <Dropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
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
          <Dropzone.Accept>
            <h1>IMAGE UPLOADED</h1>
          </Dropzone.Accept>
          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
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
