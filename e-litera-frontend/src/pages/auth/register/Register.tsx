import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema } from '@/lib/schema'
import { useRegisterMutation } from '@/store/slice/auth.service'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'
import Loading from '@/components/loading/loading'
import { PasswordInput } from '@/components/ui/password-input'
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import NavAuth from '@/components/ui/auth/nav-auth'
import { motion } from 'framer-motion'
import { fadeInWidthAnimationVariant } from '@/components/animation/variant'

const Register = () => {

  const router = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
  })

  if (!isLoading) {
    <Loading />
  }

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await register(values).unwrap()
      router(`/login`)
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }


  return (
    <div className='min-h-screen'>
      <NavAuth />
      <div className='min-h-screen px-32 items-center flex flex-row-reverse justify-center'>
        <motion.div variants={fadeInWidthAnimationVariant} initial="initial" whileInView="animate" viewport={{ once: true }}
          className='md:w-1/4 gap-3 bg-violet-600 md:h-1/2 text-white flex flex-col justify-center items-center p-8'>
          <h1 className='text-3xl flex items-center gap-2'>
            <span className='bg-white px-2 rounded-md  font-bold text-violet-600'>E</span><span className='text-white font-bold'>-</span>
            <span className='font-semibold text'>Litera</span>
          </h1>
        </motion.div>
        <div className='md:w-1/3 z-50 bg-white flex flex-col justify-center gap-10 p-10 shadow-lg'>
          <div>
            <h1 className='text-3xl font-bold'>Register</h1>
            <div className='flex items-center text-sm gap-2'>
              <span className='font-semibold '>Have an Account?</span>
              <Link to={'/login'}>
                <span className='font-semibold text-purple-500'>Login here</span>
              </Link>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input suffix={<LuUser className='text-purple-600' />} placeholder="Username" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input suffix={<MdOutlineEmail className='text-purple-600' />} type='email' placeholder="Email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='flex items-center gap-16'>
                <Button type="submit" className='bg-purple-500 hover:bg-purple-700'>Register</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register