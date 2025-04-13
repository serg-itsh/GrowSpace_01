import { prisma } from "app/util/db";
import { BlogPostCard } from "./component/general/BlogPostCard";
import { Suspense } from "react";

export const revalidate = 60;

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,

      authorName: true,
      id: true,

      authorId: true,
      authorImage: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return data;
}

export default async function Home() {
  // const data = await getData();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold -tracking-tight mb-8 ">Latest post</h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          // <div key={item.title}>
          //   <h1>{item.title}</h1>
          //   <p>{item.content}</p>
          // </div>
          <BlogPostCard data={item} key={item.id}/>
        ))}
      </div> */}
<Suspense fallback={<p>Hello waiting...</p>}>

      <BlogPosts/>
</Suspense>
    </div>
  );



}


async function BlogPosts() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((item) => (
      // <div key={item.title}>
      //   <h1>{item.title}</h1>
      //   <p>{item.content}</p>
      // </div>
      <BlogPostCard data={item} key={item.id}/>
    ))}
  </div>

  )
}
