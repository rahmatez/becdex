<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@becdex.com'],
            [
                'name'              => 'BECdex Admin',
                'password'          => Hash::make('admin123'),
                'role_id'           => 1,
                'is_active'         => 1,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name'              => 'BECdex Admin',
                'password'          => Hash::make('admin123'),
                'role_id'           => 1,
                'is_active'         => 1,
                'email_verified_at' => now(),
            ]
        );


    }
}
