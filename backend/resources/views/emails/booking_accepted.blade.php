@component('mail::message')
# Hi {{ $name }},

Your booking for **{{ $date }} at {{ $time }}** has been **Accepted**!

We can't wait to see you soon.<br>
You can cancel, but there won't be a refund.

Thanks,<br>
Eslam
@endcomponent
