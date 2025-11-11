<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Participant\AdvanceStoreRequest; // Import AdvanceStoreRequest
use App\Models\Proyecto;
use App\Models\Avance; // Import Avance model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Import Storage facade
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AdvanceController extends Controller
{
    /**
     * Show the form for creating a new advance.
     */
    public function create(Proyecto $project): Response
    {
        return Inertia::render('Participant/Advances/Create', [
            'project' => $project,
        ]);
    }

    /**
     * Store a newly created advance in storage.
     */
    public function store(AdvanceStoreRequest $request, Proyecto $project): RedirectResponse
    {
        $path = $request->file('archivo')->store('advances', 'public');

        Avance::create([
            'proyecto_id' => $project->id,
            'fecha' => now(),
            'descripcion' => $request->descripcion,
            'archivo_url' => Storage::url($path),
        ]);

        return to_route('participant.dashboard')->with('success', 'Advance uploaded successfully.');
    }
}
