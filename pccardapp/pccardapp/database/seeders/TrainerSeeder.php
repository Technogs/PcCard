<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class TrainerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('trainers')->insert([
            [
                'trainerName' => 'Item',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'trainerName' => 'Tool',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'trainerName' => 'Stadium',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'trainerName' => 'Supporter',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'trainerName' => 'Ultra Prism',
                'created_at' => now(),
                'updated_at' => now()
            ]
            ]);
    }
}
