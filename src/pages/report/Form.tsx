import { Button, Group, Image, Input, Text, Textarea } from '@mantine/core'
import { DatePickerInput, TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useLocalStorage } from '@mantine/hooks'
import React, { useState } from 'react'
import { LatLng } from 'leaflet'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconTrash } from '@tabler/icons-react'
import axios from 'axios'
import { storage } from '@/utilities/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'

export default function Form() {
  const [images, setImages] = useState<File[]>([])
  const [selectedPosition, _] = useLocalStorage<LatLng>({ key: 'position' })
  const [token, setToken] = useLocalStorage({ key: 'token' })
  const [userId] = useLocalStorage({ key: 'id' })
  const [btnLoading, setBtnLoading] = useState(false)
  const router = useRouter()

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

  const onSubmit = (values: any) => {
    const { title, description, date_created } = values
    if (description.length < 200) {
      notifications.show({
        title: 'Error',
        message: 'Add atleast 200 characters on description.',
        color: 'red',
      })
      return
    }

    if (images.length == 0) {
      notifications.show({
        title: 'Error',
        message: 'Add images',
        color: 'red',
      })
      return
    }

    if (selectedPosition?.lat == undefined) {
      notifications.show({
        title: 'Error',
        message: 'Pin a location!',
        color: 'red',
      })
      return
    }
    setBtnLoading(true)
    Promise.all(
      images.map(async (el: File) => {
        const imageRef = ref(storage, `/reports/${el.name + v4()}`)
        const snapshot = await uploadBytes(imageRef, el)
        const url = await getDownloadURL(snapshot.ref)
        return url
      })
    ).then((url) => {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/post/createPost`,
          {
            user: userId,
            title,
            description,
            location: selectedPosition,
            date_created,
            images: url,
          },
          {
            headers: {
              'x-access-token': token,
            },
          }
        )
        .then((data) => {
          notifications.show({
            title: 'Success',
            message: 'Report Created!',
            color: 'blue',
          })
          setBtnLoading(false)
          router.back()
          console.log(data)
        })
    })
  }

  const onRemoveImage = (name: string) => {
    const copyImages = [...images]
    const findImage = copyImages.findIndex((img) => img.name == name)
    copyImages.splice(findImage, 1)
    setImages(copyImages)
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 my-10">
        {images.map((img, i) => {
          const blob = window.URL.createObjectURL(img)
          return (
            <div className="bg-gray-100 rounded-md relative" key={`img-${i}`}>
              <IconTrash
                strokeWidth={2}
                color={'white'}
                onClick={() => onRemoveImage(img.name)}
                className="cursor-pointer bg-red-600 hover:bg-red-700 rounded-full w-[25px] h-[25px] p-1 absolute -top-1 -right-1"
              />
              <Image
                src={blob}
                key={`img-${i}`}
                className="w-[225px] h-[225px] rounded-md cursor-pointer"
                fit="contain"
              />
            </div>
          )
        })}
        <Dropzone
          onDrop={(files) => {
            setImages((prev) => [...prev, files[0]])
          }}
          onReject={(err) => {
            notifications.show({
              title: 'Error',
              message: err[0].errors[0].code,
              color: 'red',
            })
          }}
          maxSize={1024 ** 2}
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
        <Button variant="filled" size="lg" type="submit" loading={btnLoading}>
          Report Event
        </Button>
      </form>
    </>
  )
}
