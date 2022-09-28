<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreatePost extends Model
{
    use HasFactory;


    public function user() {
        return $this->belongsTo(Pccardusers::class, 'createdBy');
    }


    public function comments()
    {
        return $this->hasMany(PostComments::class);
    }

    public function likes()
    {
        return $this->hasMany(LikePost::class);
    }

    public function reports()
    {
        return $this->hasMany(ReportPost::class);
    }

    public function getMedia()
    {
        return $this->hasMany(Media::class, 'postid');
    }


    public function getPostCollection()
    {
        return $this->hasOne(promotionCollectionModel::class,'postId')
                        ->orderBy('created_at', 'desc');
    }


    
}
