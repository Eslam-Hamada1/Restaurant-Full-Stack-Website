<?php
// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Public menu
Route::get('menu', [MenuController::class, 'index']);
Route::get('menu/{id}', [MenuController::class, 'show']);

// Protected routes
Route::group(['middleware' => ['auth:api']], function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);

    // Bookings
    Route::post('bookings', [BookingController::class, 'store']);
    Route::get('my-bookings', [BookingController::class, 'myBookings']);

    // Admin only
    Route::group(['middleware' => ['is_admin']], function() {
        Route::get('admin/bookings', [BookingController::class, 'index']);
        Route::post('admin/bookings/{id}/accept', [BookingController::class, 'accept']);
        Route::post('admin/bookings/{id}/reject', [BookingController::class, 'reject']);
        Route::apiResource('admin/menu', MenuController::class);
        Route::get('admin/users', [UserController::class, 'index']);
    });
});
