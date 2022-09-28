<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionMediaModel extends Model
{
    protected $table = 'tbl_CollectionMedias';
    use HasFactory;

    public function getMedia(){
        return $this->belongsTo(Media::class, 'mediaId');
    }
}
