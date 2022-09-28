<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowPccardUsers extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(Pccardusers::class, 'pcuserid');
    }
    
    public function Following() {
        return $this->belongsTo(Pccardusers::class, 'following_pcuserid');
    }
}
