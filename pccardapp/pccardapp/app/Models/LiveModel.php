<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveModel extends Model
{
    protected $table = 'tbl_liveRecords';
    use HasFactory;
    // protected $appends = ['type' => 'live'];

    public function userData(){
        return $this->belongsTo(Pccardusers::class,'userId');
    }
}
