<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    protected $fillable = ['nombre'];

    // Relación Muchos a Muchos: Un Perfil puede estar en muchos Participante_Equipo
    public function participanteEquipos()
    {
        return $this->hasMany(ParticipanteEquipo::class, 'perfil_id');
    }
}
