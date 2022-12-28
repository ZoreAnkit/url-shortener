<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class ShortUrl extends Model
{
    use HasFactory, SoftDeletes;
    public function generateShortUrl()
    {
        $this->short_url = Str::random(6);
        while (self::whereShortUrl($this->short_url)->exists()) {
            $this->short_url = Str::random(6);
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
