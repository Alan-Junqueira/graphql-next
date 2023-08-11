"use client";

import { INovel } from "@/@types/typings";
import { ADD_AUTHOR, DELETE_AUTHOR, UPDATE_NOVEL } from "@/graphql/mutations";
import { GET_NOVEL } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";

interface INovelIdPage {
  params: {
    id: string;
  };
}

export default function NovelIdPage({ params: { id } }: INovelIdPage) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const { data, loading, error } = useQuery(GET_NOVEL, {
    variables: { id },
  });

  const novel: INovel = data?.novel;

  const [updateNovel] = useMutation(UPDATE_NOVEL, {
    refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  });

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    variables: { novelId: id, name },
    refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  });

  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [{ query: GET_NOVEL, variables: { id } }],
  });

  const handleAddAuthor = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return alert("Please enter author name");
    addAuthor({ variables: { novelId: id, name } });
    setName("");
  };

  const handleUpdateNovel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !url) return alert("Please enter fields");
    updateNovel({ variables: { id, title, image: url } });
    setTitle("");
    setUrl("");
  };

  if (loading)
    return (
      <p className="flex items-center justify-center text-white">
        Loading ....
      </p>
    );
  if (error)
    return (
      <p className="flex items-center justify-center text-white">
        Oops! Something went wrong ....
      </p>
    );

  return (
    <article className="mx-auto max-w-5xl text-white">
      <section className="flex gap-2 ">
        {novel.image && (
          <img height={200} width={200} src={novel.image} alt="" />
        )}

        <div className="flex flex-col p-2">
          <h1 className="text-4xl ">Title : {novel.title}</h1>

          <div className="flex gap-2">
            {novel?.authors?.map((author) => (
              <div key={author.id} className="flex items-center gap-2">
                <h2 className="font-bold">{author?.name}</h2>
                <AiFillMinusCircle
                  onClick={() =>
                    deleteAuthor({
                      variables: {
                        id: author.id,
                      },
                    })
                  }
                  color="yellow"
                />
              </div>
            ))}
          </div>
          <p className="text-slate-400 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            cum nam sed voluptates sunt aliquid nemo maxime itaque tempora,
            autem alias nostrum molestiae deserunt earum animi numquam
            reprehenderit laboriosam libero? Quas, atque totam vero nostrum
            dolore, nihil autem neque architecto deserunt illo itaque, ab quae
            ipsam corrupti ipsum quaerat? Sed hic ipsum excepturi earum minus
            consectetur soluta totam temporibus libero.
          </p>
          {/* add author form */}
          <form onSubmit={handleAddAuthor} className="mt-5 space-x-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Author"
              className="mx-2 border bg-transparent p-2"
            />
            <button
              disabled={!name}
              className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:text-gray-500"
            >
              Add Author
            </button>
          </form>
        </div>
      </section>
      {/* update form */}
      <form onSubmit={handleUpdateNovel} className="flex gap-2 ">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter new title"
          className="rounded-lg border bg-transparent p-2 text-white"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="new url"
          className="rounded-lg border bg-transparent p-2 text-white"
        />
        <button className="rounded-lg bg-yellow-500 p-2">Update</button>
      </form>
    </article>
  );
}
