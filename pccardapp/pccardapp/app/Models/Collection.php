<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;
    public function getCollectionMedia(){
        return $this->hasMany(CollectionMediaModel::class,'collectionId');
    }
    
    public function userInfo(){
        return $this->belongsTo(Pccardusers::class, 'pcuserid');
    }
}
