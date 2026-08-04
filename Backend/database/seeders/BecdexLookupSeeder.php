<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\BecdexCategory;
use App\Models\SubmissionStatus;
use App\Models\PerIndicatorStatus;
use App\Models\Setting;

class BecdexLookupSeeder extends Seeder
{
    public function run(): void
    {
        // BECdex Categories
        $cats = [
            ['id'=>1,'name'=>'Not a Blue Economy Company','max_score'=>68,'color'=>'danger'],
            ['id'=>2,'name'=>'Standard Blue Economy Company','max_score'=>78,'color'=>'info'],
            ['id'=>3,'name'=>'Good Blue Economy Company','max_score'=>88,'color'=>'primary'],
            ['id'=>4,'name'=>'Excellent Economy Company','max_score'=>100,'color'=>'success'],
        ];
        foreach ($cats as $c) BecdexCategory::updateOrCreate(['id'=>$c['id']], $c);

        // Submission Statuses
        $statuses = [
            ['id'=>1,'name'=>'Pending Payment','color'=>'warning'],
            ['id'=>2,'name'=>'Document Submission','color'=>'info'],
            ['id'=>3,'name'=>'On Verification Process','color'=>'primary'],
            ['id'=>4,'name'=>'Document Submission (Second Attempt)','color'=>'warning'],
            ['id'=>5,'name'=>'Certified','color'=>'success'],
            ['id'=>6,'name'=>'Payment Successful','color'=>'success'],
            ['id'=>7,'name'=>'Continue To Location Survey','color'=>'light'],
            ['id'=>8,'name'=>'Approved (Ready for Payment)','color'=>'primary'],
            ['id'=>9,'name'=>'Rejected Permanently','color'=>'danger'],
        ];
        foreach ($statuses as $s) SubmissionStatus::updateOrCreate(['id'=>$s['id']], $s);

        // Per-Indicator Statuses
        $perInd = [
            ['id'=>1,'name'=>'Not Uploaded','color'=>'secondary'],
            ['id'=>2,'name'=>'Uploaded','color'=>'warning'],
            ['id'=>3,'name'=>'Submitted','color'=>'primary'],
            ['id'=>4,'name'=>'Verified','color'=>'success'],
            ['id'=>5,'name'=>'Declined','color'=>'danger'],
        ];
        foreach ($perInd as $p) PerIndicatorStatus::updateOrCreate(['id'=>$p['id']], $p);

        // Settings
        Setting::updateOrCreate(['key'=>'payment_amount'], ['value'=>'100000','description'=>'Certification fee in IDR']);
        Setting::updateOrCreate(['key'=>'xendit_secret_key'], ['value'=>'','description'=>'Xendit API Secret Key']);
        Setting::updateOrCreate(['key'=>'xendit_webhook_token'], ['value'=>'','description'=>'Xendit Webhook/Callback Token']);

        // Certificates Table Seed
        \App\Models\Certificate::updateOrCreate(['id' => 10], [
            'category' => 'good',
            'file_path' => 'certificates/good.jpg',
            'description' => 'Good'
        ]);
        \App\Models\Certificate::updateOrCreate(['id' => 11], [
            'category' => 'excellent',
            'file_path' => 'certificates/excellent.jpg',
            'description' => 'Excellent'
        ]);
        \App\Models\Certificate::updateOrCreate(['id' => 12], [
            'category' => 'standard',
            'file_path' => 'certificates/standard.jpg',
            'description' => 'Standar'
        ]);
    }
}
