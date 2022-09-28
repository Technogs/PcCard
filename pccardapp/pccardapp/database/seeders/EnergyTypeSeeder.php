<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;



class EnergyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('energy_types')->insert([
        [
            'EnergyTypeName' => 'Grass',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'fire',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Water',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Lightning',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Psychic',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Fighting',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Fighting',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Metal',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Colorless',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Fairy',
            'created_at' => now(),
            'updated_at' => now()
        ],
        [
            'EnergyTypeName' => 'Dragon',
            'created_at' => now(),
            'updated_at' => now()
        ]
        ]);
    }
}
