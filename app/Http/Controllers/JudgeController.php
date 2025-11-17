<?php

namespace App\Http\Controllers;

use App\Models\Juez;
use App\Models\Evento; // Import Evento model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class JudgeController extends Controller
{
    /**
     * Display the judge dashboard.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $judge = $user->juez()->with(['proyectos.equipo', 'proyectos.criterios', 'especialidad'])->first();

        $events = Evento::all()->map(function ($event) {
            return [
                'title' => $event->nombre,
                'start' => $event->fecha_inicio,
                'end' => $event->fecha_fin,
            ];
        });

        $gradingData = [
            ['name' => 'Project A', 'score' => 75],
            ['name' => 'Project B', 'score' => 90],
            ['name' => 'Project C', 'score' => 60],
        ];

        return Inertia::render('Judge/Dashboard', [
            'judge' => $judge,
            'events' => $events,
            'gradingData' => $gradingData,
        ]);
    }

    /**
     * Display a listing of events for the judge.
     */
    public function events(): Response
    {
        $events = Evento::all(); // Fetch all events

        return Inertia::render('Judge/Events/Index', [
            'events' => $events,
        ]);
    }
}
