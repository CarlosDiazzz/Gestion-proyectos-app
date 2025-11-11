<?php

use App\Http\Controllers\AdminController; // Import AdminController
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin Routes
    Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');

        // User Management
        Route::get('users/create', [\App\Http\Controllers\Admin\UserController::class, 'create'])->name('users.create');
        Route::post('users', [\App\Http\Controllers\Admin\UserController::class, 'store'])->name('users.store');

        // Team Management
        Route::get('teams/create', [\App\Http\Controllers\Admin\TeamController::class, 'create'])->name('teams.create');
        Route::post('teams', [\App\Http\Controllers\Admin\TeamController::class, 'store'])->name('teams.store');

        // Participant Management
        Route::get('participants', [\App\Http\Controllers\Admin\ParticipantController::class, 'index'])->name('participants.index');
        Route::get('participants/{participant}/edit', [\App\Http\Controllers\Admin\ParticipantController::class, 'edit'])->name('participants.edit');
        Route::patch('participants/{participant}', [\App\Http\Controllers\Admin\ParticipantController::class, 'update'])->name('participants.update');

        // Project Management
        Route::get('projects', [\App\Http\Controllers\Admin\ProjectController::class, 'index'])->name('projects.index');
        Route::get('projects/{project}/criteria', [\App\Http\Controllers\Admin\ProjectController::class, 'criteria'])->name('projects.criteria');
        Route::patch('projects/{project}/criteria', [\App\Http\Controllers\Admin\ProjectController::class, 'updateCriteria'])->name('projects.updateCriteria');
        Route::get('projects/{project}/advances', [\App\Http\Controllers\Admin\ProjectController::class, 'advances'])->name('projects.advances');

        // Judge Management
        Route::get('judges', [\App\Http\Controllers\Admin\JudgeController::class, 'index'])->name('judges.index');
        Route::get('judges/{judge}', [\App\Http\Controllers\Admin\JudgeController::class, 'show'])->name('judges.show');

        // Event Management
        Route::get('events', [\App\Http\Controllers\Admin\EventController::class, 'index'])->name('events.index');
        Route::get('events/create', [\App\Http\Controllers\Admin\EventController::class, 'create'])->name('events.create');
        Route::post('events', [\App\Http\Controllers\Admin\EventController::class, 'store'])->name('events.store');
        Route::get('events/{event}/edit', [\App\Http\Controllers\Admin\EventController::class, 'edit'])->name('events.edit');
        Route::patch('events/{event}', [\App\Http\Controllers\Admin\EventController::class, 'update'])->name('events.update');
        Route::delete('events/{event}', [\App\Http\Controllers\Admin\EventController::class, 'destroy'])->name('events.destroy');
    });

    // Participant Routes
    Route::middleware(['participant'])->prefix('participant')->name('participant.')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\ParticipantController::class, 'index'])->name('dashboard');

        // Project Advances
        Route::get('projects/{project}/advances/create', [\App\Http\Controllers\Participant\AdvanceController::class, 'create'])->name('projects.advances.create');
        Route::post('projects/{project}/advances', [\App\Http\Controllers\Participant\AdvanceController::class, 'store'])->name('projects.advances.store');

        // Events
        Route::get('events', [\App\Http\Controllers\ParticipantController::class, 'events'])->name('events.index');

        // Certifications
        Route::get('certifications', [\App\Http\Controllers\ParticipantController::class, 'certifications'])->name('certifications.index');
    });

    // Judge Routes
    Route::middleware(['judge'])->prefix('judge')->name('judge.')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\JudgeController::class, 'index'])->name('dashboard');

        // Project Grading
        Route::get('projects/{project}/grade', [\App\Http\Controllers\Judge\ProjectController::class, 'grade'])->name('projects.grade');
        Route::post('projects/{project}/grade', [\App\Http\Controllers\Judge\ProjectController::class, 'storeGrade'])->name('projects.storeGrade');

        // Events
        Route::get('events', [\App\Http\Controllers\JudgeController::class, 'events'])->name('events.index');
    });
});

require __DIR__.'/settings.php';
