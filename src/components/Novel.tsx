import { INovel } from '@/@types/typings'
import { DELETE_NOVEL } from '@/graphql/mutations'
import { GET_NOVELS } from '@/graphql/queries'
import { BASE_URL } from '@/utils/config'
import { useMutation } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'

interface INovelProps {
  novel: INovel
}

export const Novel = ({ novel }: INovelProps) => {
  const [deleteNovel] = useMutation(DELETE_NOVEL, {
    refetchQueries: [{ query: GET_NOVELS }],
  })

  return (
    <article className="flex scale-90 flex-col  bg-slate-200 p-4 text-white shadow-sm transition duration-300 ease-out hover:scale-100 hover:bg-slate-300 hover:shadow-lg dark:bg-zinc-800 ">
      {novel.image && (
        <div className="relative h-56 rounded-t-lg  shadow-md ">
          <Image
            src={novel.image}
            alt={novel.title}
            className="h-56 w-full object-contain "
            fill
          />
        </div>
      )}

      {/* title  */}
      <h1 className="my-2 text-xl font-bold">{novel.title}</h1>
      {/* description */}
      <p className="my-2 line-clamp-3 text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ab
        recusandae repudiandae ratione quia voluptatibus tempora dolores,
        veritatis cum, soluta numquam voluptatum earum obcaecati illum dolor.
        Fuga incidunt maxime culpa.
      </p>
      {/* source and date */}
      <div className="mt-auto flex justify-between text-xs italic  text-slate-500">
        <p className="text-lg text-white">Authors :{novel?.authors.length}</p>
      </div>
      <Link
        href={`${BASE_URL}/novel/${novel.id}`}
        className="mt-5 rounded-lg bg-orange-500 p-2"
      >
        Read More
      </Link>

      <button
        onClick={() => deleteNovel({ variables: { id: novel.id } })}
        className="mt-5 rounded-lg bg-red-500 p-2"
      >
        Delete
      </button>
    </article>
  )
}
