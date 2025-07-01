<?php

namespace App\Http\Controllers;

use App\Models\DownloadHistory;
use App\Models\EBook;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DownloadHistoryController extends Controller
{
    public function getDownloadCountByBook(EBook $ebook): JsonResponse
    {

        $counts = \App\Models\DownloadHistory::select('e_book_id', \DB::raw('COUNT(*) as count'))
            ->groupBy('e_book_id')
            ->get()
            ->pluck('count', 'e_book_id');

        return response()->json(
            [
                'success' => true,
                'messages' => 'Get Detail Download History',
                'data' => $counts
            ],
            200
        );
    }

    public function postDownloadCount(Request $request): JsonResponse
    {
        $valData = $request->validate([
            'e_book_id' => 'required|exists:e_books,id',
        ]);

        $downloadHistory = DownloadHistory::create([
            'e_book_id' => $valData['e_book_id'],
            'user_id' => Auth::id(),
            'downloaded_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'messages' => 'Created Download History',
            'data' => $downloadHistory
        ], 201);
    }
}
