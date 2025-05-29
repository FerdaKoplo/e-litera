<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DownloadHistory extends Model
{
    protected $fillable = [
        'user_id',
        'book_id',
        'downloaded_at'
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function ebook(): BelongsTo{
        return $this->belongsTo(EBook::class);
    }
}
