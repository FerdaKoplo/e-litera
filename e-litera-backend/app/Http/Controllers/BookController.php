<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function getAllBooks(Request $request): JsonResponse
    {

        $search = $request->get("search");

        $books = Book::with('category')
            ->when($search, function ($query, $search) {
                return $query->where('book_title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%");
            })
            ->paginate(8);

        $booksFormatted = $books->getCollection()->map(function ($book) {
            return [
                'id' => $book->id,
                'book_title' => $book->book_title,
                'author' => $book->author,
                'isbn' => $book->isbn,
                'description' => $book->description,
                'cover_image' => asset('storage/' . $book->cover_image),
                'year_published' => $book->year_published,
                'publisher' => $book->publisher,
                'status' => $book->status,
                'category_name' => $book->category->name ?? 'Unknown Category',
            ];
        });

        return response()->json(
            [
                'success' => true,
                'messages' => 'Get All Books',
                'data' => $booksFormatted,
                'pagination' => [
                    'current_page' => $books->currentPage(),
                    'total_pages' => $books->lastPage(),
                    'total_items' => $books->total(),
                    'per_page' => $books->perPage(),
                ]
            ],
            200
        );

    }

    public function showBooks(Book $book): JsonResponse
    {

        $formattedBook = [
            'id' => $book->id,
            'book_title' => $book->book_title,
            'author' => $book->author,
            'isbn' => $book->isbn,
            'description' => $book->description,
            'cover_image' => asset('storage/' . $book->cover_image),
            'year_published' => $book->year_published,
            'publisher' => $book->publisher,
            'status' => $book->status,
            'category_name' => $book->category->name ?? 'Unknown Category',
        ];

        return response()->json(
            [
                'success' => true,
                'messages' => 'Get Detail Books',
                'data' => $formattedBook
            ],
            200
        );

    }
}
