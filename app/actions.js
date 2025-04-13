"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./util/db";

export async function handleSubmission(formData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if(!user) {
    return redirect("/api/auth/register");
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");



  if (!title || !content || !url || !user.picture) {
    throw new Error("Missing required fields");
  }

  if (!user.given_name || !user.picture) {
    console.log("Missing user data:", user);
    throw new Error("Incomplete user profile");
  }


  // console.log({
  //   title,
  //   content,
  //   imageUrl: url,
  //   authorId: user.id,
  //   authorImage: user.picture,
  //   authorName: user.given_name,
  // });
 
  try {
    // const data = await prisma.blogPost.create({
await prisma.blogPost.create({
      data: {
        title: title,
        content: content,
        imageUrl: url,
        authorId: user.id,
        // authorImage: user.picture || "default_image_url",
        authorImage: user.picture ,
        authorName: user.given_name,
      },
    });

   
  } catch (error) {
    console.error("Error creating blog post:", error);

    console.log("Detailed error message:", error.message);
    // console.log("user object:", user);
    throw new Error("Blog post creation failed");
  }

  revalidatePath("/");

  return redirect("/dashboard");
}
