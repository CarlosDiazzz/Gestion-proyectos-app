<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calificacion extends Model
{
    use HasFactory;
    protected $table = 'calificaciones'; // Explicitly define the table name
    protected $fillable = ['proyecto_id', 'juez_id', 'criterio_id', 'puntuacion', 'comentarios'];

    // Relación Inversa (Uno a Muchos): Una Calificación pertenece a un Proyecto
    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class, 'proyecto_id');
    }

    // Relación Inversa (Uno a Muchos): Una Calificación pertenece a un Juez
    public function juez()
    {
        return $this->belongsTo(Juez::class, 'juez_id');
    }

    // Relación Inversa (Uno a Muchos): Una Calificación pertenece a un Criterio
    public function criterio()
    {
        return $this->belongsTo(Criterio::class, 'criterio_id');
    }
}
