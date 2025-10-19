<?php
// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('menu', [MenuController::class, 'index']);

Route::group(['middleware' => ['auth:api']], function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);

    // bookings
    Route::post('bookings', [BookingController::class, 'store']);
    Route::get('my-bookings', [BookingController::class, 'myBookings']);
    Route::delete('my-bookings/{id}/cancel', [BookingController::class, 'cancel']);

    // update profile
    Route::put('user/update', [AuthController::class, 'updateProfile']);

    //admins
    Route::group(['middleware' => ['is_admin']], function() {
        Route::get('admin/bookings', [BookingController::class, 'index']);
        Route::post('admin/bookings/{id}/accept', [BookingController::class, 'accept']);
        Route::post('admin/bookings/{id}/reject', [BookingController::class, 'reject']);
        Route::apiResource('admin/menu', MenuController::class);
        Route::get('admin/users', [UserController::class, 'index']);
    });
});

// email
Route::get('/email/verify/{id}/{hash}', function ($id, $hash) {
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found.'], 404);
    }

    if (!hash_equals(sha1($user->getEmailForVerification()), $hash)) {
        return response()->json(['message' => 'Invalid verification link.'], 403);
    }

    if ($user->hasVerifiedEmail()) {
        return redirect('http://localhost:5173/email-verified?status=already-verified');
    }

    $user->markEmailAsVerified();

    return redirect('http://localhost:5173/email-verified?status=success');
})->middleware(['signed'])->name('verification.verify');
