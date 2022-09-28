<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveViewCountModel extends Model
{
    protected $table = 'tbl_viewCount';
    use HasFactory;
    public function viewerData(){

        return $this->belongsTo(Pccardusers::class,'viewerId','id');
    }

}