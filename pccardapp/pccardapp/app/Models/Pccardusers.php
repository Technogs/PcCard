<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Pccardusers extends Model
{
    protected $table = 'pccard_users';

    
	public $timestamps = true;
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
    protected $fillable = [
        'username',
        'email',
        'password',
        'device_type',
        'device_token',
    ];


    public function stories()
    {
        return $this->hasMany(Stories::class);
    }

}
