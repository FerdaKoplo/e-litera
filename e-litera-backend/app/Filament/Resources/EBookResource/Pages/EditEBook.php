<?php

namespace App\Filament\Resources\EBookResource\Pages;

use App\Filament\Resources\EBookResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEBook extends EditRecord
{
    protected static string $resource = EBookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
