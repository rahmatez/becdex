<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Aspect;
use App\Models\Outcome;
use App\Models\Principle;

class AssessmentFrameworkSeeder extends Seeder
{
    public function run(): void
    {
        $framework = [
            ['name'=>'Environmental Aspect','outcomes'=>[
                ['name'=>'Food Security and Reduced Ecological Scarcities','principles'=>['Biodiversity Conservation']],
                ['name'=>'Food Security and Reduced Environmental Risk','principles'=>['Pollution Control','Energy and Water Management']],
            ]],
            ['name'=>'Social Aspect','outcomes'=>[
                ['name'=>'Improved Human Well Being','principles'=>['Safe and Healthy Working Environment','Social Inclusion','Social Equity']],
                ['name'=>'Quality Jobs','principles'=>['Labor Right Protection']],
            ]],
            ['name'=>'Economic Aspect','outcomes'=>[
                ['name'=>'Poverty Eradication','principles'=>['Wage Standards Fullfillments']],
                ['name'=>'Economic Growth','principles'=>['Tax and Insurance Compliances']],
                ['name'=>'Sustainable Production and Consumption','principles'=>['Competitive and Circular Economy']],
            ]],
        ];

        foreach ($framework as $asp) {
            $aspect = Aspect::updateOrCreate(['name'=>$asp['name']]);
            foreach ($asp['outcomes'] as $out) {
                $outcome = Outcome::updateOrCreate(['name'=>$out['name']],['aspect_id'=>$aspect->id]);
                foreach ($out['principles'] as $pName) {
                    Principle::updateOrCreate(['name'=>$pName,'outcome_id'=>$outcome->id]);
                }
            }
        }
    }
}
