<?php

namespace App\Filament\Resources\EBookResource\Pages;

use App\Filament\Resources\EBookResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEBooks extends ListRecords
{
    protected static string $resource = EBookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
