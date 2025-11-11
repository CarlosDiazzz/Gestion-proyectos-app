<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    use HasFactory;
    protected $table = 'perfiles'; // Explicitly define the table name
    protected $fillable = ['nombre'];

    // Relación Muchos a Muchos: Un Perfil puede estar en muchos Participante_Equipo
    public function participanteEquipos()
    {
        return $this->hasMany(ParticipanteEquipo::class, 'perfil_id');
    }
}
