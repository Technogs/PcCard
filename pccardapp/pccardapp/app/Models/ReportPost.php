<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportPost extends Model
{
    use HasFactory;

    public function post()
    {
        return $this->belongsTo(CreatePost::class);
    }

    // get reported id 
    public function getReportedId()
    {
        return $this->belongsTo(CreatePost::class);
    }
}
