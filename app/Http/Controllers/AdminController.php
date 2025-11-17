<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $events = Evento::all()->map(function ($event) {
            return [
                'title' => $event->nombre,
                'start' => $event->fecha_inicio,
                'end' => $event->fecha_fin,
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'events' => $events,
        ]);
    }
}
