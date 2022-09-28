<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class TypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('types')->insert([
            [
                'typeName' => 'Basic',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'Stage 1',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'Stage 2',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'GX',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'EX',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'Turbo',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'Mega',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'V',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'VMAX',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'Ultra Beast',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'Tag Team',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'typeName' => 'Ultra Prism',
                'created_at' => now(),
                'updated_at' => now()
            ]
            
           ]);
    }
}
