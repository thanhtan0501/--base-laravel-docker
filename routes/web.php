<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/admin', "/admin/dashboard");

Route::middleware(['auth', 'verified'])->prefix("admin")->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get("/projects", [ProjectController::class, "index"])->name("admin.project");

    Route::get("/users", [UserController::class, "index"])->name("admin.user");
    Route::get("/users/{user}", [UserController::class, "edit"])->name("admin.user.edit");
    Route::put("/users", [UserController::class, "update"])->name("admin.user.update");
    Route::delete("/users", [UserController::class, "destroy"])->name("admin.user.delete");

    Route::get("/roles", [RoleController::class, "index"])->name("admin.role");
    Route::get("/roles/create", [RoleController::class, "create"])->name("admin.role.create");
    Route::post("/roles", [RoleController::class, "store"])->name("admin.role.store");
    Route::put("/roles/{role}", [RoleController::class, "update"])->name("admin.role.update");
    Route::get("/roles/{role}", [RoleController::class, "edit"])->name("admin.role.edit");
    Route::delete("/roles/{role}", [RoleController::class, "destroy"])->name("admin.role.delete");


    Route::get("/permissions", [PermissionController::class, "index"])->name("admin.permission");
});

Route::middleware('auth')->prefix("admin")->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
}); 

require __DIR__.'/auth.php';
