<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowedRecordsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChattingController;
use App\Http\Controllers\DownloadHistoryController;
use App\Http\Controllers\EBookController;
use App\Http\Controllers\ForumPostController;
use App\Http\Controllers\ForumReplyController;
use App\Http\Controllers\ReviewController;
use App\Models\ForumPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    // Books
    Route::get('/books', [BookController::class, 'getAllBooks']);
    Route::get('/books/{book}', [BookController::class, 'showBooks']);

    // Eooks
    Route::get('/e-books', [EBookController::class, 'getAllEBooks']);
    Route::get('/e-books/{Ebook}', [EBookController::class, 'showEBooks']);

    // Categories
    Route::get('/categories', [CategoryController::class, 'getAllCategory']);
    Route::get('/categories/{category}', [CategoryController::class, 'showCategory']);

    // Borrow Records
    Route::get('/borrowed-records', [BorrowedRecordsController::class, 'getAllBorrowRecords']);
    Route::get('/borrowed-records/{borrowedRecords}', [BorrowedRecordsController::class, 'getDetailBorrowedRecords']);
    Route::post('/borrow-records', [BorrowedRecordsController::class, 'postBorrowRecord']);
    Route::patch('/borrowed-records/{id}/return', [BorrowedRecordsController::class, 'returnBook']);

    // Download History
    Route::post('/download', [DownloadHistoryController::class, 'postDownloadCount']);
    Route::get('/download-counts', [DownloadHistoryController::class, 'getDownloadCountByBook']);

    // Reviews
    Route::get('/reviews', [ReviewController::class, 'getAllReview']);
    Route::get('/reviews/{review}', [ReviewController::class, 'getDetailReview']);
    Route::post('/reviews', [ReviewController::class, 'postReview']);
    Route::put('/reviews/{review}', [ReviewController::class, 'updateReview']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'deleteReview']);

    // Forum Post
    Route::get('/forum-posts', [ForumPostController::class, 'getAllForumPosts']);
    Route::get('/forum-posts/{id}', [ForumPostController::class, 'getForumPost']);
    Route::post('/forum-posts', [ForumPostController::class, 'createForumPost']);
    Route::put('/forum-posts/{id}', [ForumPostController::class, 'updateForumPost']);
    Route::delete('/forum-posts/{id}', [ForumPostController::class, 'deleteForumPost']);

    // Forum Replies
    Route::get('/forum-replies', [ForumReplyController::class, 'getAllForumReplies']);
    Route::get('/forum-replies/{id}', [ForumReplyController::class, 'getForumReply']);
    Route::post('/forum-replies', [ForumReplyController::class, 'createForumReply']);
    Route::put('/forum-replies/{id}', [ForumReplyController::class, 'updateForumReply']);
    Route::delete('/forum-replies/{id}', [ForumReplyController::class, 'deleteForumReply']);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

require __DIR__.'/auth.php';

