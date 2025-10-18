@component('mail::message')
# Hi {{ $name }},

Unfortunately, your booking for **{{ $date }} at {{ $time }}** has been **Rejected** .  
You can try booking again for another time slot.

Thanks,<br>
Eslam
@endcomponent