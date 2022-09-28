<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromotionModel extends Model
{
    protected $table = 'tbl_promotion';
    use HasFactory;


    public function getPlan()
    {
        return $this->belongsTo(PlansModel::class,'planId');
    }

    public function CollectionList()
    {
        return $this->hasMany(promotionCollectionModel::class,'promotionId');
    }
}
