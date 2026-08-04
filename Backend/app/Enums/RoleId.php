<?php

namespace App\Enums;

/**
 * Konstanta untuk semua Role ID di sistem BECdex.
 * Gunakan enum ini di seluruh codebase — JANGAN hardcode angka.
 *
 * Sumber kebenaran: tabel `roles` (seeded via BecdexLookupSeeder / DatabaseSeeder)
 */
enum RoleId: int
{
    case SuperAdmin = 1;
    case Company    = 2;
    case Reviewer   = 6;
    case Supervisor = 7;
    case Manager    = 10;

    /**
     * Semua role yang memiliki hak akses admin (admin panel).
     *
     * @return int[]
     */
    public static function adminRoleIds(): array
    {
        return [
            self::SuperAdmin->value,
            self::Reviewer->value,
            self::Supervisor->value,
            self::Manager->value,
        ];
    }

    /**
     * Role yang berfungsi sebagai asesor (penilai submission).
     *
     * @return int[]
     */
    public static function assessorRoleIds(): array
    {
        return [
            self::Reviewer->value,
            self::Supervisor->value,
        ];
    }
}
