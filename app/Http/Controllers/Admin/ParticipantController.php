<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ParticipantUpdateRequest; // Import the ParticipantUpdateRequest
use App\Models\Participante;
use App\Models\User;
use App\Models\Carrera;
use App\Models\Equipo;
use App\Models\Rol;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the participants.
     */
    public function index(): Response
    {
        $participants = Participante::with(['usuario', 'carrera', 'equipos'])->get();

        return Inertia::render('Admin/Participants/Index', [
            'participants' => $participants,
        ]);
    }

    /**
     * Show the form for editing the specified participant.
     */
    public function edit(Participante $participant): Response
    {
        $participant->load(['usuario.roles', 'carrera', 'equipos.participantes']);

        $carreras = Carrera::all();
        $equipos = Equipo::all();
        $roles = Rol::all();

        return Inertia::render('Admin/Participants/Edit', [
            'participant' => $participant,
            'carreras' => $carreras,
            'equipos' => $equipos,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified participant in storage.
     */
    public function update(ParticipantUpdateRequest $request, Participante $participant): RedirectResponse
    {
        // Update User details
        $user = $participant->usuario;
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Update User Role
        $user->roles()->sync([$request->role_id]);

        // Update Participant details
        $participant->update([
            'no_control' => $request->no_control,
            'carrera_id' => $request->carrera_id,
            'telefono' => $request->telefono,
        ]);

        // Update Participant's Team (assuming one team for simplicity, or detach/attach if multiple)
        if ($request->equipo_id) {
            // Detach from all current teams and attach to the new one
            $participant->equipos()->sync([$request->equipo_id]);
        } else {
            $participant->equipos()->detach(); // Remove from all teams if no team selected
        }

        return to_route('admin.participants.index')->with('success', 'Participant updated successfully.');
    }
}
