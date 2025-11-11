<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avance extends Model
{
    protected $fillable = ['proyecto_id', 'fecha', 'descripcion', 'archivo_url'];

    // Relación Inversa (Uno a Muchos): Un Avance pertenece a un Proyecto
    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class, 'proyecto_id');
    }
}
