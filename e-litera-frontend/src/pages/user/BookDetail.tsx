import { fadeInAnimationVariant, fadeInReverseAnimationVariant, fadeInWidthAnimationVariant, scaleInAnimationVariant } from '@/components/animation/variant';
import NavUser from '@/components/layout/nav-user';
import { useGetDetailBookQuery } from '@/store/slice/books.service';
import { motion } from 'framer-motion';
import React from 'react';
import { Link, useParams } from 'react-router';
import BookNotFound from '../error/book-detail/book-notFound';
import AlertBorrow from '@/components/modal/borrow-book';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading/loading';
import Stars from '@/components/ui/stars';

const BookDetail = () => {
  const { id } = useParams();

  const { data: book, error, isLoading } = useGetDetailBookQuery(id);

  if (isLoading) return < Loading />
  if (error) return <BookNotFound />
  if (!book?.data) return <p>No book found!</p>;

  const item = book.data

  return (
    <div className="flex flex-col gap-10">
      <NavUser />
      <div
        className="flex flex-col justify-center items-center gap-5"
      >
        <div className='flex gap-20 items-center'>
          <div className='flex flex-col gap-10 items-start'>
            <div className='flex items-center gap-20'>
              <motion.div className="relative z-20 mt-5" variants={fadeInWidthAnimationVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}>
                <img src={item.cover_image} alt={item.book_title} width={200} className="border-r-2 border-y-2 border-black" />
                <div className="absolute inset-y-[5%] w-[120%] grid place-content-center -z-20 bg-purple-300 shadow-lg border-r-2 border-y-2 border-black" />
              </motion.div>
              <div className='flex flex-col gap-4'>
                <motion.p className="text-2xl font-bold text-gray-800" variants={fadeInReverseAnimationVariant}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}>{item.book_title}</motion.p>
                <motion.p className="text-xl font text-gray-400 " custom={1} variants={fadeInReverseAnimationVariant}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}>{item.author}</motion.p>
                <motion.p
                  custom={1.5} variants={fadeInReverseAnimationVariant}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}

                >
                  <Stars bookId={item.id} />
                </motion.p>
                <motion.p custom={1} variants={fadeInReverseAnimationVariant}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }} className='text-sm px-3 py-1 rounded-md border-2 border-gray-300 text-gray-700 bg-white w-fit'>{item.category_name}</motion.p>
              </div>
            </div>
            <div className='flex flex-col gap-5 '>
              <motion.h1
                variants={scaleInAnimationVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className='text-2xl font-bold'>Book Description</motion.h1>
              <motion.p
                custom={1} variants={scaleInAnimationVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-lg italic w-[40rem] ">{item.description}</motion.p>
              <motion.p custom={1.5} variants={scaleInAnimationVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }} className="text-lg font-bold">Publisher : <span className='ml-1 text-sm px-3 font-normal py-1 rounded-md border-2 border-gray-300 text-gray-700 bg-white w-fit'>{item.publisher}</span></motion.p>
              <motion.p
                custom={2} variants={scaleInAnimationVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }} className="text-lg font-bold">Tahun Terbit : <span className='ml-1 text-sm px-3 py-1 font-normal rounded-md border-2 border-gray-300 text-gray-700 bg-white w-fit'>{item.year_published}</span> </motion.p>
              {/* <a href={item.pdf_url} target='_blank'>Pdf</a> */}
            </div>

          </div>
        </div>
        <AlertBorrow bookId={id ? parseInt(id, 10) : 0} />
      </div>
    </div>
  )
}

export default BookDetail
