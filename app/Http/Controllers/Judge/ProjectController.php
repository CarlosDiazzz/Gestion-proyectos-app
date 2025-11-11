<?php

namespace App\Http\Controllers\Judge;

use App\Http\Controllers\Controller;
use App\Http\Requests\Judge\ProjectGradeStoreRequest; // Import ProjectGradeStoreRequest
use App\Models\Proyecto;
use App\Models\Calificacion; // Import Calificacion model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Import Auth facade
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    /**
     * Show the form for grading a specific project.
     */
    public function grade(Proyecto $project): Response
    {
        $project->load(['avances', 'criterios']);

        return Inertia::render('Judge/Projects/Grade', [
            'project' => $project,
        ]);
    }

    /**
     * Store the grades for a specific project.
     */
    public function storeGrade(ProjectGradeStoreRequest $request, Proyecto $project): RedirectResponse
    {
        $judge = Auth::user()->juez;

        // Calculate total score
        $totalScore = 0;
        foreach ($request->grades as $criterioId => $score) {
            $totalScore += $score;
        }
        // Assuming each criterion has equal weight for now, or a predefined weight
        $averageScore = $totalScore / count($request->grades);

        // Create or update Calificacion record
        Calificacion::updateOrCreate(
            [
                'proyecto_id' => $project->id,
                'juez_id' => $judge->id,
            ],
            [
                'puntuacion' => $averageScore,
                'comentarios' => $request->comentarios,
                'fecha_calificacion' => now(),
            ]
        );

        // Attach grades to project_criterio_calificacion pivot table if needed
        // For now, we'll just store the overall score and comments in Calificacion

        return to_route('judge.dashboard')->with('success', 'Project graded successfully.');
    }
}
