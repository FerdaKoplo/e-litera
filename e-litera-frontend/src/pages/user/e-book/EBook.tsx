import { fadeInAnimationVariant, fadeInReverseAnimationVariant, fadeInWidthAnimationVariant, fadeInWidthBorrowBookAnimationReverseVariant, fadeInWidthBorrowBookAnimationVariant } from '@/components/animation/variant'
import NavUser from '@/components/layout/nav-user'
import { Button } from '@/components/ui/button'
import { Books } from '@/interface/Books'
import { useGetAllBooksQuery } from '@/store/slice/books.service'
import { GiBookshelf } from "react-icons/gi"
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { PiBooksFill } from "react-icons/pi"
import { PiBooksLight } from "react-icons/pi"
import Loading from '@/components/loading/loading'
import { BsPinAngleFill, BsSearch } from "react-icons/bs"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useGetAllEBooksQuery } from '@/store/slice/ebooks.service'
import { EBooks } from '@/interface/EBook'
import { useGetDownloadCountByBookQuery } from '@/store/slice/download.service'
import { MdFileDownload, MdPeople } from 'react-icons/md'
import Book3D from '@/components/3d-item/book3d'

const EBook = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    const { data: ebooks, error, isLoading } = useGetAllEBooksQuery({ page, search })
    const { data: downloadCount } = useGetDownloadCountByBookQuery({})

    const totalPages = ebooks?.pagination?.total_pages || 0
    const totalItems = ebooks?.pagination?.total_items || 0


    if (error) return <p>Error fetching books!</p>
    if (isLoading) return < Loading />

    return (
        <div className='dark:bg-black min-h-screen'>
            <NavUser />
            <div className='px-32 flex flex-col gap-16 '>
                <div className='flex flex-col items-start mt-5 gap-5'>
                    <div className='flex  gap-4 text-4xl '>
                        <motion.p variants={fadeInWidthBorrowBookAnimationReverseVariant} initial="initial" whileInView={"animate"} viewport={{ once: false, }}>
                            <PiBooksLight className='' />
                        </motion.p>
                        <motion.h1 variants={fadeInReverseAnimationVariant} initial="initial" whileInView={"animate"} viewport={{ once: false, }} className='font-semibold  '>
                            Koleksi Digital
                        </motion.h1>
                        <motion.p variants={fadeInWidthBorrowBookAnimationVariant} initial="initial" whileInView={"animate"} viewport={{ once: false, }}>
                            <PiBooksFill className=' rotate-180' />
                        </motion.p>
                    </div>
                    <motion.p variants={fadeInAnimationVariant} initial="initial" whileInView={"animate"} viewport={{ once: false, }}>Lorem ipsum dolor sit amet consectetur</motion.p>
                    <div className='flex w-full items-center gap-2 '>
                        <BsSearch />
                        <input
                            type="text"
                            placeholder="Search books..."
                            className="border p-2 w-1/3 dark:text-white dark:bg-black"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className=''>
                    <div className='grid grid-cols-5 gap-8'>
                        {ebooks?.data?.map((item: EBooks, i: number) => (
                            <div className='flex flex-col '>
                                <div className='bg-gradient-to-t from-violet-600 to-purple-400 p-8 rounded-t-xl'>
                                    <Book3D
                                        src={item.cover_image}
                                        alt={item.book_title}
                                        width={200}
                                        height={280}
                                        edgeColor="#000000"
                                    />
                                </div>
                                <div className={` flex flex-col gap-2 shadow-lg p-5 rounded-b-xl bg-purple-50 dark:bg-transparent dark:border-2 dark:border-violet-600 `} >
                                    <p className='text-xl font-bold text-gray-800 dark:text-white truncate '>{item.book_title}</p>
                                    <p>{item.author}</p>
                                    <p className='text-xs px-3 py-1 rounded-md border-2 border-black dark:border-violet-600 font-semibold  dark:text-white  w-fit '>{item.category_name}
                                    </p>
                                    <p className='flex items-center gap-2 font-semibold'>
                                        <MdFileDownload />
                                        {downloadCount?.data?.[item.id] ?? 0}
                                    </p>
                                    <Link to={`/koleksi-digital/${item.id}`}>
                                        <Button className='w-full bg-white border-2 hover:text-white border-black text-black dark:bg-gradient-to-t dark:text-white from-violet-600 to-purple-500'>
                                            View
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-10">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious className={`hover:cursor-pointer ${page === 1 ? "pointer-events-none opacity-50" : ""
                                        }`}
                                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))} />
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                                    <PaginationItem key={pageNum} >
                                        <PaginationLink
                                            className={`${pageNum === page ? 'bg-violet-600 text-white dark:bg-' : 'bg-white text-black'}`}

                                            href="#"
                                            onClick={() => setPage(pageNum)}
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext className={`hover:cursor-pointer ${page === totalPages ? "pointer-events-none opacity-50" : ""
                                        }`} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EBook