<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    public function book(): HasMany
    {
        return $this->hasMany(Book::class);
    }
    public function ebook(): HasMany
    {
        return $this->hasMany(EBook::class);
    }
}
