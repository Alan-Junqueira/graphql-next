'use client'

import { INovel } from '@/@types/typings'
import { ADD_NOVEL } from '@/graphql/mutations'
import { GET_NOVELS } from '@/graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { FormEvent, useState } from 'react'

export const Novels = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  const { data, loading, error } = useQuery(GET_NOVELS)

  const [addNovel] = useMutation(ADD_NOVEL, {
    variables: { image, title },
  })

  const novels: INovel[] = data?.novels

  if (loading) {
    return (
      <p className="flex items-center justify-center text-white">Loading...</p>
    )
  }
  if (error) {
    return (
      <p className="flex items-center justify-center text-white">
        Oops! Something went wrong...
      </p>
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!image || !title) {
      return alert('Enter fields')
    }

    addNovel({ variables: { title, image } })

    setTitle('')
    setImage('')
  }

  console.log(data?.novels)
  return (
    <div>
      <div className="mt-5">
        <form className="my-5 flex space-x-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="rounded-lg border bg-transparent p-2 text-white"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter title"
            className="rounded-lg border bg-transparent p-2 text-white"
          />
          <button className="rounded-lg bg-yellow-500 p-2">Add Novel</button>
        </form>
      </div>
    </div>
  )
}
