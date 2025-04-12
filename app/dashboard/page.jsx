
// import { prisma } from "@/app/util/db";
// import { prisma } from "./util/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {BlogPostCard } from "app/component/general/BlogPostCard"

async function getData(userId) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
   
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(data)
  return data;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // const data = await getData(user?.id);
  const data = await getData(user.id);

  

  // if (!user) {
  //     return redirect("/api/auth/register")
  // }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-medium">Your Blog Articles</h1>

        <Link className={buttonVariants()} href="/dashboard/create">
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     
        {data.map((item) => (
       

        <BlogPostCard data={item} key={item.id}/>
        ))}
      </div>
    </div>
  );
}
