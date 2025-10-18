<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class IsAdmin {
    public function handle(Request $request, Closure $next) {
        try {
            // parse token and get the authenticated user
            $user = JWTAuth::parseToken()->authenticate();

            if ($user && $user->role === 'admin') {
                return $next($request);
            }

            return response()->json(['error' => 'Unauthorized - Admins only'], 403);
        } catch (Exception $e) {
            return response()->json(['error' => 'Token invalid or missing'], 401);
        }
    }
}
