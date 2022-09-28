<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class plans extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tbl_plan')->insert([
            [
                'planName' => 'Economy',
                'planPrice' => '5.99',
                'postLimit' => '5',
                'planValidity' => '1 week',
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'planName' => 'Standard',
                'planPrice' => '10.99',
                'postLimit' => '10',
                'planValidity' => '2 week',
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'planName' => 'Premium',
                'planPrice' => '15.99',
                'postLimit' => '20',
                'planValidity' => '1 month',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
