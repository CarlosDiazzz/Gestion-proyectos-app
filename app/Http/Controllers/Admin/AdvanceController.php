<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Proyecto;
use App\Models\Avance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdvanceController extends Controller
{
    /**
     * Display a listing of the project advances.
     */
    public function index(): Response
    {
        // Get all projects with their advances
        $projects = Proyecto::with(['avance', 'equipo'])->get();
        
        return Inertia::render('Admin/Advances/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Display the specified project advance.
     */
    public function show(Proyecto $project): Response
    {
        // Load the project with its advance and team
        $project->load(['avance', 'equipo']);
        
        return Inertia::render('Admin/Advances/Show', [
            'project' => $project,
        ]);
    }
}
