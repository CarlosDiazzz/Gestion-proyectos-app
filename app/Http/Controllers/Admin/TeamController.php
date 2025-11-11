<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TeamStoreRequest;
use App\Http\Requests\Admin\TeamUpdateRequest;
use App\Models\Equipo;
use App\Models\Participante;
use App\Models\Perfil;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class TeamController extends Controller
{
    /**
     * Display a listing of the teams.
     */
    public function index(): Response
    {
        $teams = Equipo::all();

        return Inertia::render('Admin/Teams/Index', [
            'teams' => $teams,
        ]);
    }

    /**
     * Show the form for creating a new team.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Teams/Create');
    }

    /**
     * Store a newly created team in storage.
     */
    public function store(TeamStoreRequest $request): RedirectResponse
    {
        Equipo::create($request->validated());

        return to_route('admin.dashboard')->with('success', 'Team created successfully.');
    }

    /**
     * Show the form for editing the specified team.
     */
    public function edit(Equipo $team): Response
    {
        $team->load('participantes.carrera'); // Eager load participants and their careers

        $availableParticipants = Participante::whereDoesntHave('equipos') // Participants not in any team
                                            ->orWhereHas('equipos', function ($query) use ($team) {
                                                $query->where('equipo_id', $team->id); // Or in the current team
                                            })
                                            ->with('carrera')
                                            ->get();
        $perfiles = Perfil::all();

        return Inertia::render('Admin/Teams/Edit', [
            'team' => $team,
            'availableParticipants' => $availableParticipants,
            'perfiles' => $perfiles,
        ]);
    }

    /**
     * Update the specified team in storage.
     */
    public function update(TeamUpdateRequest $request, Equipo $team): RedirectResponse
    {
        $team->update($request->validated());

        // Sync participants
        $participantsToSync = [];
        foreach ($request->input('current_team_participants', []) as $participantData) {
            $participantsToSync[$participantData['participant_id']] = ['perfil_id' => $participantData['perfil_id']];
        }
        foreach ($request->input('new_participants', []) as $participantData) {
            if ($participantData['participant_id'] && $participantData['perfil_id']) {
                $participantsToSync[$participantData['participant_id']] = ['perfil_id' => $participantData['perfil_id']];
            }
        }
        $team->participantes()->sync($participantsToSync);


        return to_route('admin.teams.index')->with('success', 'Team updated successfully.');
    }
}