<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Participante;
use App\Models\Proyecto;
use App\Models\Calificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    /**
     * Display a listing of the participant's certificates.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $participant = $user->participante()->with(['equipos.proyectos.calificacion'])->first();
        
        // Collect all certificates for the participant
        $certificates = [];
        if ($participant && $participant->equipos) {
            foreach ($participant->equipos as $team) {
                foreach ($team->proyectos as $project) {
                    // Check if the project has a grade
                    if ($project->calificacion) {
                        $certificates[] = [
                            'project_name' => $project->nombre,
                            'team_name' => $team->nombre,
                            'puntuacion' => $project->calificacion->puntuacion,
                            'comentarios' => $project->calificacion->comentarios,
                            'fecha_calificacion' => $project->calificacion->fecha_calificacion,
                            'is_winner' => $project->calificacion->puntuacion >= 80, // Consider winners as those with 80 or more points
                        ];
                    }
                }
            }
        }
        
        return Inertia::render('Participant/Certificates/Index', [
            'certificates' => $certificates,
        ]);
    }
    
    /**
     * Display the specified certificate.
     */
    public function show(Proyecto $project)
    {
        $user = Auth::user();
        $participant = $user->participante;
        
        // Check if the participant belongs to the project's team
        if (!$participant->equipos->contains($project->equipo)) {
            abort(403, 'Unauthorized access to this certificate.');
        }
        
        // Load the project with its grade and team
        $project->load(['calificacion', 'equipo']);
        
        // Generate certificate data
        $certificateData = [
            'participant_name' => $participant->nombre,
            'project_name' => $project->nombre,
            'team_name' => $project->equipo->nombre,
            'puntuacion' => $project->calificacion->puntuacion,
            'fecha_calificacion' => $project->calificacion->fecha_calificacion,
            'is_winner' => $project->calificacion->puntuacion >= 80,
        ];
        
        // Generate QR code for the certificate
        $qrCodeData = json_encode($certificateData);
        $qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' . urlencode($qrCodeData);
        
        return Inertia::render('Participant/Certificates/Show', [
            'project' => $project,
            'certificateData' => $certificateData,
            'qrCodeUrl' => $qrCodeUrl,
        ]);
    }
}
