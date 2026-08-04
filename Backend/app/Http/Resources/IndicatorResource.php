<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndicatorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
            'sort_order'  => $this->sort_order,
            'principle'   => $this->whenLoaded('principle', fn () => [
                'id'   => $this->principle->id,
                'name' => $this->principle->name,
                'outcome' => $this->principle->whenLoaded('outcome', fn () => [
                    'id'     => $this->principle->outcome->id,
                    'name'   => $this->principle->outcome->name,
                    'aspect' => $this->principle->outcome->whenLoaded('aspect', fn () => [
                        'id'   => $this->principle->outcome->aspect->id,
                        'name' => $this->principle->outcome->aspect->name,
                    ]),
                ]),
            ]),
            'questions'   => $this->whenLoaded('questions', fn () =>
                $this->questions->map(fn ($q) => [
                    'id'   => $q->id,
                    'text' => $q->text,
                ])
            ),
        ];
    }
}
