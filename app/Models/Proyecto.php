<?php

// app/Models/Proyecto.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    use HasFactory;
    // El modelo Proyecto tiene muchas FKs, lo que implica muchas relaciones "belongsTo"
    protected $fillable = [
        'equipo_id', 'calificacion_id', 'categoria', 'evento_id', 'asesor_id',
        'avance_id', 'repositorio_id', 'nombre'
    ];

    // Relación Inversa (Uno a Uno/Muchos): El Proyecto pertenece a un Equipo
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id'); // Id_equipo(FK)
    }

    // Relación Inversa (Uno a Uno/Muchos): El Proyecto tiene un Asesor
    public function asesor()
    {
        return $this->belongsTo(Asesor::class, 'asesor_id'); // Id_asesor(FK)
    }
    
    // Relación Inversa (Uno a Uno/Muchos): El Proyecto tiene una Calificación
    public function calificacion()
    {
        return $this->belongsTo(Calificacion::class, 'calificacion_id'); // Id_Calificación(FK)
    }

    // Relación Inversa (Uno a Uno/Muchos): El Proyecto pertenece a un Evento
    public function evento()
    {
        return $this->belongsTo(Evento::class, 'evento_id'); // Id_evento(FK)
    }

    // Relación Inversa (Uno a Uno/Muchos): El Proyecto tiene un Avance
    public function avance()
    {
        return $this->belongsTo(Avance::class, 'avance_id'); // Id_avance(FK)
    }

    // Relación Inversa (Uno a Uno/Muchos): El Proyecto tiene un Repositorio
    public function repositorio()
    {
        return $this->belongsTo(Repositorio::class, 'repositorio_id'); // Id_repositorio(FK)
    }

    // Relación Muchos a Muchos: Un Proyecto tiene varios Criterios
    public function criterios()
    {
        return $this->belongsToMany(Criterio::class, 'proyecto_criterio', 'proyecto_id', 'criterio_id');
    }
}
