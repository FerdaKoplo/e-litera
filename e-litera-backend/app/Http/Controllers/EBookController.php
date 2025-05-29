<?php

namespace App\Http\Controllers;

use App\Models\EBook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EBookController extends Controller
{
     public function getAllEBooks(Request $request): JsonResponse
    {

        $search = $request->get("search");

        $Ebooks = EBook::with('category')
            ->when($search, function ($query, $search) {
                return $query->where('book_title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%");
            })
            ->paginate(8);

        $EbooksFormatted = $Ebooks->getCollection()->map(function ($Ebook) {
            return [
                'id' => $Ebook->id,
                'book_title' => $Ebook->book_title,
                'author' => $Ebook->author,
                'isbn' => $Ebook->isbn,
                'description' => $Ebook->description,
                'cover_image' => asset('storage/' . $Ebook->cover_image),
                'pdf_url' => asset('storage/' . $Ebook->pdf_url),
                'year_published' => $Ebook->year_published,
                'publisher' => $Ebook->publisher,
                'category_name' => $Ebook->category->name ?? 'Unknown Category',
            ];
        });

        return response()->json(
            [
                'success' => true,
                'messages' => 'Get All Books',
                'data' => $EbooksFormatted,
                'pagination' => [
                    'current_page' => $Ebooks->currentPage(),
                    'total_pages' => $Ebooks->lastPage(),
                    'total_items' => $Ebooks->total(),
                    'per_page' => $Ebooks->perPage(),
                ]
            ],
            200
        );

    }

    public function showEBooks(EBook $Ebook): JsonResponse
    {

        $EbooksFormatted = [
            'id' => $Ebook->id,
            'book_title' => $Ebook->book_title,
            'author' => $Ebook->author,
            'isbn' => $Ebook->isbn,
            'description' => $Ebook->description,
            'cover_image' => asset('storage/' . $Ebook->cover_image),
            'pdf_url' => asset('storage/' . $Ebook->pdf_url),
            'year_published' => $Ebook->year_published,
            'publisher' => $Ebook->publisher,
            'category_name' => $Ebook->category->name ?? 'Unknown Category',
        ];

        return response()->json(
            [
                'success' => true,
                'messages' => 'Get Detail EBooks',
                'data' => $EbooksFormatted
            ],
            200
        );

    }
}
