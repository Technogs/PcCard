<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class RareteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('raretes')->insert([
            [
                'rareteName' => 'Rare',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'rareteName' => 'Rare Holographic',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'rareteName' => 'Ultra rare',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'rareteName' => 'Rainbow rare',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'rareteName' => 'Common',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'rareteName' => 'Uncommon',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'rareteName' => 'Rare Holographic GX',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'rareteName' => 'Rare Holographic V',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'rareteName' => 'Rare Holographic VMAX',
                'created_at' => now(),
                'updated_at' => now()
            ]
            ]);
    }
}
