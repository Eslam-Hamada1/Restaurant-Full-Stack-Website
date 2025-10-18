<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Mail\BookingAcceptedMail;
use App\Mail\BookingRejectedMail;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller {
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'date'=>'required|date',
            'time'=>'required',
            'party_size'=>'required|integer|min:1',
            'name'=>'required',
            'email'=>'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $userId = Auth::id();
        $bookingDate = $request->date;

        // spam (multiple bookings per day)
        $existingBooking = Booking::where('user_id', $userId)
            ->where('date', $bookingDate)
            ->whereNotIn('status', ['cancelled', 'rejected'])
            ->first();

        if ($existingBooking) {
            return response()->json([
                'message' => 'You already have a booking for this date.'
            ], 409);
        }

        $booking = Booking::create(array_merge($request->only(['date','time','party_size','name','email','phone']), ['user_id'=>Auth::id()]));
        
        return response()->json($booking, 201);
    }

    public function cancel($id) {
        try {
            $booking = Booking::find($id);

            if (!$booking) {
                return response()->json(['message' => 'Booking not found'], 404);
            }

            if (in_array($booking->status, ['cancelled', 'rejected'])) {
                return response()->json(['message' => 'This booking cannot be cancelled again'], 400);
            }

            $booking->status = 'cancelled';
            $booking->save();

            return response()->json([
                'message' => 'Booking cancelled successfully',
                'booking' => $booking
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Server error while cancelling booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function myBookings() {
        return response()->json(Booking::where('user_id', Auth::id())->get());
    }

    // admin functions
    public function index() {
        return response()->json(Booking::with('user')->get());
    }

    public function accept($id) {
        $booking = Booking::findOrFail($id);
        $booking->status = 'accepted';
        $booking->save();

        // Send email notification
        Mail::to($booking->email)->send(new BookingAcceptedMail($booking));

        return response()->json(['message' => 'Booking accepted and email sent', 'booking' => $booking]);
    }

    public function reject($id) {
        $booking = Booking::findOrFail($id);
        $booking->status = 'rejected';
        $booking->save();

        // Send email notification
        Mail::to($booking->email)->send(new BookingRejectedMail($booking));

        return response()->json(['message' => 'Booking rejected and email sent', 'booking' => $booking]);
}

}
