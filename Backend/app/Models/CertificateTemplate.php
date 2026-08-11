<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CertificateTemplate extends Model
{
    protected $fillable = [
        'name',
        'background_path',
        'config',
        'is_active',
    ];

    protected $casts = [
        'config' => 'array',
        'is_active' => 'boolean',
    ];

    public static function getDefaultConfig()
    {
        return [
            "mmic_code" => ["x" => 74, "y" => 12.3, "fontSize" => 12, "color" => "#000000", "textAlign" => "right", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "company_name" => ["x" => 17, "y" => 28.5, "fontSize" => 20, "color" => "#000000", "textAlign" => "left", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "80%", "text" => ""],
            "company_address" => ["x" => 17, "y" => 31, "fontSize" => 10, "color" => "#000000", "textAlign" => "left", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "80%", "text" => ""],
            "company_sector" => ["x" => 39, "y" => 62.5, "fontSize" => 13, "color" => "#000000", "textAlign" => "left", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "company_sector_en" => ["x" => 39, "y" => 64.5, "fontSize" => 13, "color" => "#000000", "textAlign" => "left", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "published_date_1" => ["x" => 23, "y" => 92.5, "fontSize" => 9, "color" => "#000000", "textAlign" => "center", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "valid_until" => ["x" => 38, "y" => 92.5, "fontSize" => 9, "color" => "#000000", "textAlign" => "center", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "published_date_2" => ["x" => 30, "y" => 95.8, "fontSize" => 9, "color" => "#000000", "textAlign" => "center", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "published_date_1_en" => ["x" => 23, "y" => 94, "fontSize" => 9, "color" => "#000000", "textAlign" => "center", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "valid_until_en" => ["x" => 38, "y" => 94, "fontSize" => 9, "color" => "#000000", "textAlign" => "center", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "published_date_2_en" => ["x" => 30, "y" => 97.4, "fontSize" => 9, "color" => "#000000", "textAlign" => "center", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => ""],
            "qr_code" => ["x" => 70, "y" => 78.5, "fontSize" => 75, "color" => "#000000", "textAlign" => "center", "fontFamily" => "Helvetica", "fontWeight" => "bold", "width" => "auto", "text" => "[QR CODE]"]
        ];
    }
}
