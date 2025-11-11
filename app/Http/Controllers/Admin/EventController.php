<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EventStoreRequest;
use App\Http\Requests\Admin\EventUpdateRequest;
use App\Models\Evento;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class EventController extends Controller
{
    /**
     * Display a listing of the events.
     */
    public function index(): Response
    {
        $events = Evento::all();

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new event.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Events/Create');
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(EventStoreRequest $request): RedirectResponse
    {
        Evento::create($request->validated());

        return to_route('admin.events.index')->with('success', 'Event created successfully.');
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit(Evento $event): Response
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => $event,
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(EventUpdateRequest $request, Evento $event): RedirectResponse
    {
        $event->update($request->validated());

        return to_route('admin.events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(Evento $event): RedirectResponse
    {
        $event->delete();

        return to_route('admin.events.index')->with('success', 'Event deleted successfully.');
    }
}
