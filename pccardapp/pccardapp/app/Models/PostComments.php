<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostComments extends Model
{
    use HasFactory;

    public function post()
    {
        return $this->belongsTo(CreatePost::class);
    }

    public function commentUser(){
        return $this->belongsTo(Pccardusers::class, 'pcuserid');
    }
}
