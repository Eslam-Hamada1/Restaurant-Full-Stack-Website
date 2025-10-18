<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingRejectedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;

    public function __construct(Booking $booking) {
        $this->booking = $booking;
    }

    public function build() {
        return $this->subject('Your Booking Has Been Rejected')
                    ->markdown('emails.booking_rejected')
                    ->with([
                        'name' => $this->booking->name,
                        'date' => $this->booking->date,
                        'time' => $this->booking->time,
                    ]);
    }
}
