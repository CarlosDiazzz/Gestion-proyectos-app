<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectCriteriaUpdateRequest; // Import ProjectCriteriaUpdateRequest
use App\Models\Proyecto;
use App\Models\Criterio;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index(): Response
    {
        $projects = Proyecto::with(['equipo', 'evento', 'avances'])->get(); // Eager load avances

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for managing criteria for a specific project.
     */
    public function criteria(Proyecto $project): Response
    {
        $project->load('criterios');

        $availableCriteria = Criterio::all();

        return Inertia::render('Admin/Projects/Criteria', [
            'project' => $project,
            'availableCriteria' => $availableCriteria,
        ]);
    }

    /**
     * Update the specified project's criteria in storage.
     */
    public function updateCriteria(ProjectCriteriaUpdateRequest $request, Proyecto $project): RedirectResponse
    {
        $project->criterios()->sync($request->input('criteria_ids', []));

        return to_route('admin.projects.index')->with('success', 'Project criteria updated successfully.');
    }
}
