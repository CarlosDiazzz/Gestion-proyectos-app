<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Participant\TeamStoreRequest;
use App\Models\Equipo;
use App\Models\Participante;
use App\Models\Carrera;
use App\Models\Perfil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    /**
     * Show the form for creating a new team.
     */
    public function create(): Response
    {
        $user = Auth::user();
        $participant = $user->participante;
        
        // Get all participants except the current user, who don't have a team yet
        $availableParticipants = Participante::where('id', '!=', $participant->id)
            ->whereDoesntHave('equipos')
            ->with('carrera')
            ->get();
            
        // Get all careers
        $careers = Carrera::all();
        
        return Inertia::render('Participant/Teams/Create', [
            'availableParticipants' => $availableParticipants,
            'careers' => $careers,
            'currentParticipant' => $participant,
        ]);
    }

    /**
     * Store a newly created team in storage.
     */
    public function store(TeamStoreRequest $request)
    {
        $user = Auth::user();
        $participant = $user->participante;
        
        // Validate that all participants are from different careers
        $participantIds = $request->input('participantes');
        $participants = Participante::whereIn('id', $participantIds)->with('carrera')->get();
        
        $careers = $participants->pluck('carrera_id')->unique();
        if ($careers->count() < $participants->count()) {
            return redirect()->back()->withErrors(['participantes' => 'Todos los participantes deben ser de carreras diferentes.']);
        }
        
        // Create the team
        $team = Equipo::create([
            'nombre' => $request->input('nombre'),
            'codigo_registro' => strtoupper(substr(md5(time()), 0, 6)), // Generate a registration code
        ]);
        
        // Attach participants to the team with profiles
        $perfiles = Perfil::all();
        foreach ($participants as $index => $participante) {
            // Assign a different profile to each participant
            $perfil = $perfiles->get($index % $perfiles->count());
            $team->participantes()->attach($participante->id, ['perfil_id' => $perfil->id]);
        }
        
        // Also attach the current participant (team creator)
        $creatorProfile = $perfiles->first();
        $team->participantes()->attach($participant->id, ['perfil_id' => $creatorProfile->id]);
        
        return redirect()->route('participant.dashboard')->with('success', 'Equipo creado exitosamente.');
    }
}
