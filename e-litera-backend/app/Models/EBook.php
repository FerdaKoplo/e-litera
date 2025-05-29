<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EBook extends Model
{
     protected $fillable = [
        'category_id',
        'author',
        'book_title',
        'isbn',
        'description',
        'cover_image',
        'pdf_url',
        'year_published',
        'publisher',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function downloadHistory(): HasMany
    {
        return $this->hasMany(DownloadHistory::class);
    }

}
