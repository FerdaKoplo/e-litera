import NavUser from '@/components/layout/nav-user'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { forumSchema } from '@/lib/schema'
import { usePostForumMutation } from '@/store/slice/forum.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { title } from 'process'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'


const ForumPost = () => {

  const route = useNavigate()
  const [postForum] = usePostForumMutation()

  const form = useForm<z.infer<typeof forumSchema>>({
    resolver: zodResolver(forumSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  async function onSubmit(values: z.infer<typeof forumSchema>) {
    try {
      await postForum({
        title:values.title,
        content:values.content,
    }).unwrap()
      route('/forum');
    }
    catch (error) {
      console.log("Error Login : " + error)
    }
  }

  return (
    <div>
      <NavUser />
      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-full max-w-lg p-6 rounded-lg ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col w-full"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your content here..." className="h-32 resize-y" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ForumPost