<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostsBookmarks extends Model
{
    use HasFactory;

    function getPost(){
        return $this->hasOne(CreatePost::class,'id','postid');
    }
    
}
