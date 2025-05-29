import { fadeInAnimationVariant, fadeInReverseAnimationVariant, fadeInWidthAnimationVariant, scaleInAnimationVariant } from '@/components/animation/variant';
import NavUser from '@/components/layout/nav-user';
import { useGetDetailBookQuery } from '@/store/slice/books.service';
import { motion } from 'framer-motion';
import React from 'react';
import { Link, useParams } from 'react-router';
import AlertBorrow from '@/components/modal/borrow-book';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading/loading';
import Stars from '@/components/ui/stars';
import { useGetDetailEBookQuery } from '@/store/slice/ebooks.service';
import BookNotFound from '@/pages/error/book-detail/book-notFound';
import { IoMdDownload, IoMdShare } from 'react-icons/io';
import { Share } from 'lucide-react';

const EBookDetail = () => {
    const { id } = useParams();

    const { data: book, error, isLoading } = useGetDetailEBookQuery(id);

    if (isLoading) return < Loading />
    if (error) return <BookNotFound />
    if (!book?.data) return <p>No book found!</p>;

    const item = book.data

    return (
        <div className="transition-all duration-500 dark:bg-gradient-to-b dark:from-black dark:to-violet-950 flex flex-col gap-10">
            <NavUser />
            <div
                className="min-h-screen dark:text-white flex flex-col justify-center items-center "
            >
                <div className='flex  items-center'>
                    <div className='flex flex-col gap-20 items-start'>
                        <div className='flex items-center gap-20'>
                            <motion.div className="relative z-20 mt-5" variants={fadeInWidthAnimationVariant}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}>
                                <img src={item.cover_image} alt={item.book_title} width={200} className="border-r-2 border-y-2 border-black dark:border-violet-300" />
                                <div className="absolute inset-y-[5%] w-[120%] grid place-content-center -z-20 bg-gradient-to-br from-violet-600 to-purple-400 dark:bg-gradient-to-tr dark:from-black dark:to-violet-600 shadow-lg border-r-2 border-y-2 dark:border-violet-300 border-black" />
                            </motion.div>
                            <div className='flex flex-col gap-2'>
                                <motion.p className="text-2xl font-bold text-gray-800 dark:text-white" variants={fadeInReverseAnimationVariant}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}>{item.book_title}</motion.p>
                                <motion.p className="text-xl font text-gray-400 dark:text-white" custom={1} variants={fadeInReverseAnimationVariant}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}>{item.author}</motion.p>
                                <motion.p
                                    custom={1.5} variants={fadeInReverseAnimationVariant}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }}
                                >
                                </motion.p>
                                <motion.p custom={1} variants={fadeInReverseAnimationVariant}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }} className='text-sm px-3 py-1 rounded-md border-2 border-black dark:border-violet-600 font-bold  dark:text-white  w-fit'>{item.category_name}</motion.p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <motion.h1
                                variants={scaleInAnimationVariant}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className='text-2xl font-bold'>
                                Book
                                <span className='text-violet-500'> Description</span>
                            </motion.h1>
                            <motion.p
                                custom={1} variants={scaleInAnimationVariant}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className="text-lg italic w-[40rem] ">{item.description}</motion.p>
                            <div className='flex  items-center justify-between gap-20'>
                                <motion.p custom={1.5} variants={scaleInAnimationVariant}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }} className="text-lg font-bold items-start flex flex-col gap-4">Publisher<span className='ml-1 text-sm px-3 font-normal py-1 rounded-md border-2 border-gray-300 dark:border-violet-600 text-gray-700 dark:text-white w-fit'>{item.publisher}</span></motion.p>
                                <motion.p
                                    custom={2} variants={scaleInAnimationVariant}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true }} className="text-lg font-bold flex items-end flex-col gap-4">Tahun Terbit<span className='ml-1 text-sm px-3 py-1 font-normal rounded-md border-2 border-gray-300 dark:border-violet-600 text-gray-700 dark:text-white w-fit'>{item.year_published}</span> </motion.p>
                            </div>
                        </div>
                        <div className='w-full flex gap-4 flex-row-reverse '>
                            <a href={item.pdf_url} target='_blank' className='rounded-lg font-bold dark:bg-transparent dark:text-white dark:border-2 justify-center  dark:border-violet-600 flex items-center w-full gap-2'>
                                Unduh PDF
                                <IoMdDownload />
                            </a>
                            <Button className='dark:bg-transparent font-bold dark:text-white dark:border-2 dark:border-violet-600'>
                                <IoMdShare />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EBookDetail