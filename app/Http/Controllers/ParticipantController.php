<?php

namespace App\Http\Controllers;

use App\Models\Participante;
use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantController extends Controller
{
    /**
     * Display the participant dashboard.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $participant = $user->participante()->with(['equipos.proyectos', 'carrera'])->first();

        $events = Evento::all()->map(function ($event) {
            return [
                'title' => $event->nombre,
                'start' => $event->fecha_inicio,
                'end' => $event->fecha_fin,
            ];
        });

        $progressData = [
            ['name' => 'Criterion A', 'progress' => 65],
            ['name' => 'Criterion B', 'progress' => 80],
            ['name' => 'Criterion C', 'progress' => 45],
        ];

        return Inertia::render('Participant/Dashboard', [
            'participant' => $participant,
            'events' => $events,
            'progressData' => $progressData,
        ]);
    }

    /**
     * Display a listing of events for the participant.
     */
    public function events(): Response
    {
        $events = Evento::all();

        return Inertia::render('Participant/Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Display a listing of certifications for the participant.
     */
    public function certifications(): Response
    {
        $user = Auth::user();
        $participant = $user->participante()->with(['equipos.proyectos.calificacion'])->first();

        $certifications = [];
        if ($participant && $participant->equipos) {
            foreach ($participant->equipos as $team) {
                foreach ($team->proyectos as $project) {
                    if ($project->calificacion) {
                        $certifications[] = [
                            'project_name' => $project->nombre,
                            'team_name' => $team->nombre,
                            'puntuacion' => $project->calificacion->puntuacion,
                            'comentarios' => $project->calificacion->comentarios,
                            'fecha_calificacion' => $project->calificacion->fecha_calificacion,
                        ];
                    }
                }
            }
        }

        return Inertia::render('Participant/Certifications/Index', [
            'certifications' => $certifications,
        ]);
    }
}
