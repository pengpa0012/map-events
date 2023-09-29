import { Button, Group, Image, Input, Text, Textarea } from '@mantine/core'
import { DatePickerInput, TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useLocalStorage } from '@mantine/hooks'
import React, { useState } from 'react'
import { LatLng } from 'leaflet'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'

export default function Form() {
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [selectedPosition, _] = useLocalStorage<LatLng>({ key: 'position' })

  const onSubmit = (values: any) => {
    if (previewImages.length == 0) return console.log('Image Required')
    console.log(values)
  }

  const form = useForm({
    initialValues: {
      title: '',
      time: '',
      date: null,
      description: '',
    },
    validate: {
      title: (value) => (!value ? 'Title Required' : null),
      time: (value) => (!value ? 'Time Required' : null),
      date: (value) => (!value ? 'Date Required' : null),
      description: (value) => (!value ? 'Description Required' : null),
    },
  })
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 my-10">
        {previewImages.map((img, i) => (
          <Image
            src={img}
            key={`img-${i}`}
            className="w-[225px] h-[225px] rounded-md cursor-pointer"
            fit="contain"
          />
        ))}
        <Dropzone
          multiple
          onDrop={(files) => {
            const blob = window.URL.createObjectURL(files[0])
            setPreviewImages((prev) => [...prev, blob])
            setImages((prev) => [...prev, files[0]])
          }}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          className="border-2 border-dashed bg-gray-100/50 px-12 rounded-md cursor-pointer hover:bg-gray-100"
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: 'none' }}
          >
            <Text size="xl" className="text-center" inline>
              Upload Image
            </Text>
          </Group>
        </Dropzone>
      </div>
      <form
        className="p-2 flex flex-col gap-5"
        onSubmit={form.onSubmit(onSubmit)}
      >
        <Input.Wrapper label="Title" withAsterisk>
          <Input placeholder="Enter title" {...form.getInputProps('title')} />
        </Input.Wrapper>
        <Group grow>
          <DatePickerInput
            label="Date"
            placeholder="Pick date"
            withAsterisk
            {...form.getInputProps('date')}
          />
          <TimeInput
            label="Time"
            withAsterisk
            {...form.getInputProps('time')}
          />
        </Group>
        <Textarea
          placeholder="Enter description"
          label="Description"
          withAsterisk
          styles={{ input: { height: 150 } }}
          {...form.getInputProps('description')}
        />
        <Button variant="filled" size="lg" type="submit">
          Report Event
        </Button>
      </form>
    </>
  )
}
