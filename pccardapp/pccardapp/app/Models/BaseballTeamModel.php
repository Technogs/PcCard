<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseballTeamModel extends Model
{
    protected $table = 'tbl_baseballTeam'; 
    use HasFactory;
}